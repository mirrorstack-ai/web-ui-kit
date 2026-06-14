import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type {
  AgentSidebarMessageFeedback,
  AgentMessageSegment,
} from "@/components/ui/agent/messages/AgentSidebarMessage";
import type { AgentToolCall } from "@/components/ui/agent/messages/AgentSidebarToolCall";
import type { AgentSidebarInputModel } from "@/components/ui/agent/sidebar/AgentSidebarInput";
import type {
  AgentApiMessage,
  AgentChatClient,
  AgentConversation,
  AgentMessageMeta,
  AgentModelsResponse,
  AgentStreamHandlers,
  AgentToolEventStatus,
  AgentToolMessageMeta,
} from "./client";
import {
  groupConversationsByRecency,
  type ConversationHistoryGroup,
  type RecencyLabels,
} from "./history";

/** Sidebar-renderable chat message — assignable to the kit's
 *  AgentSidebarMessage union (text bubbles + tool-call rows). */
export type AgentChatMessage =
  | { id: string; role: "user"; content: string }
  | {
      id: string;
      role: "agent";
      content: string;
      /** Ordered text/tool segments captured during streaming so tool calls
       *  render interleaved with the response text (text → tool → more text)
       *  instead of hoisted above the reply. `content` mirrors the text runs
       *  for copy/replay. Absent on replayed rows (the server stores one text
       *  blob; their tool calls are separate `role:"tool"` messages). */
      segments?: AgentMessageSegment[];
      streaming?: boolean;
      feedback?: AgentSidebarMessageFeedback;
    }
  | { id: string; role: "tool"; tool: AgentToolCall };

/** Localizable strings the hook bakes into derived data. EN defaults. */
export interface UseAgentChatLabels {
  /** Bucket labels for the history dropdown's recency groups. */
  history?: Partial<RecencyLabels>;
  /** Hint on a disabled entry in the model picker. */
  modelDisabledHint?: string;
}

export interface UseAgentChatOptions {
  /** Conversation scope: app UUID, or null for account-level chats. */
  appId: string | null;
  /**
   * Reset key — when it changes, the thread, queue scope, and model pick
   * reset. Hosts whose route segment may lag behind the resolved appId
   * (slug → UUID) should pass the ROUTE ref so the resolution settling
   * doesn't wipe an active thread. Defaults to `appId`.
   */
  scopeKey?: string | null;
  /**
   * Resolve the scope right before a send. Defaults to `() => appId`;
   * hosts that route by slug can override to resolve slug → UUID on a cold
   * send before their app query settles, so the conversation can't be
   * misfiled as account-scoped.
   */
  resolveScope?: () => Promise<string | null>;
  /** Gate all fetching (e.g. on the session being ready). Default true. */
  enabled?: boolean;
  labels?: UseAgentChatLabels;
}

export interface UseAgentChatResult {
  messages: AgentChatMessage[];
  /** Error code of the last failed send/load, null when healthy. */
  error: string | null;
  send: (message: string) => void;
  /** Thumbs up/down on an agent reply — optimistic, rolls back on failure.
   *  null clears the rating (the kit sends null on re-clicking the active
   *  thumb). */
  rateMessage: (messageId: string, rating: AgentSidebarMessageFeedback) => void;
  /** Redo an agent reply in place: the old bubble becomes the streaming
   *  placeholder for the fresh answer. */
  rerunMessage: (messageId: string) => void;
  /** Date-grouped past conversations for the header history dropdown. */
  history: ConversationHistoryGroup[] | undefined;
  selectConversation: (id: string) => void;
  /** Retitle a past conversation — optimistic in history, rolls back on
   *  failure. Empty titles are ignored. */
  renameConversation: (id: string, title: string) => void;
  /** Permanently delete a past conversation — optimistic (the history row
   *  vanishes now), rolls back on failure. Clears the open thread when the
   *  deleted id is the active conversation. */
  deleteConversation: (id: string) => void;
  /** Roster for the input's model picker — undefined hides the picker
   *  (e.g. /v1/models not deployed yet). */
  models: AgentSidebarInputModel[] | undefined;
  /** The user's explicit pick, else the server default — undefined only
   *  while the roster is unknown. */
  selectedModelId: string | undefined;
  selectModel: (id: string) => void;
}

/** In-flight agent reply placeholder — swapped for the persisted message id
 *  on the SSE done event. */
const PENDING_ID = "__pending__";

const DEFAULT_HISTORY_LABELS: RecencyLabels = {
  today: "Today",
  yesterday: "Yesterday",
  thisWeek: "This week",
  earlier: "Earlier",
};
const DEFAULT_MODEL_DISABLED_HINT = "Currently unavailable";

// $/MTok for the picker's detail column: integers bare ("$1/$5"),
// fractions at exactly two decimals ("$1.50/$9").
const formatPrice = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

// Drop tool segments still running when the stream died — they never resolve,
// and only resolved calls persist server-side, so leaving them would strand an
// eternal spinner inside the finalized reply.
function settleSegments(
  segments: AgentMessageSegment[] | undefined,
): AgentMessageSegment[] | undefined {
  if (!segments) return undefined;
  const kept = segments.filter(
    (s) => s.type !== "tool" || s.tool.status !== "started",
  );
  return kept.length > 0 ? kept : undefined;
}

// Settle a stale pending reply before appending new turns: keep whatever
// text/resolved tool calls already streamed in (finalized as a local message),
// drop it if nothing landed. Top-level `started` tool rows (replay/legacy
// shape) are dropped for the same reason.
function settlePending(list: AgentChatMessage[]): AgentChatMessage[] {
  return list.flatMap((m) => {
    if (m.role === "tool" && m.tool.status === "started") return [];
    if (m.id !== PENDING_ID) return [m];
    if (m.role === "agent") {
      const segments = settleSegments(m.segments);
      if (m.content || segments) {
        return [
          {
            id: `local-${crypto.randomUUID()}`,
            role: "agent" as const,
            content: m.content,
            ...(segments ? { segments } : {}),
          },
        ];
      }
    }
    return [];
  });
}

// SSE tool frames name calls "<module_slug>__<tool>" (api-platform sseTool).
// Module slugs can't contain "__", so the first separator splits correctly
// even when the tool segment itself contains underscores.
function parseToolWireName(name: string): { moduleSlug: string; tool: string } {
  const i = name.indexOf("__");
  if (i === -1) return { moduleSlug: "", tool: name };
  return { moduleSlug: name.slice(0, i), tool: name.slice(i + 2) };
}

// Apply one tool lifecycle frame to the streaming reply's ordered segments,
// preserving stream order so tool calls render interleaved with the response
// text. "started" appends a running tool segment AFTER whatever text streamed
// so far; "done"/"error" resolve the OLDEST matching running segment in place
// (frames carry no call id — wire name + order is the join key). A resolution
// with no running counterpart (shouldn't happen, but the wire allows it) is
// appended as an already-resolved segment.
function applyToolToSegments(
  segments: AgentMessageSegment[],
  name: string,
  status: AgentToolEventStatus,
): AgentMessageSegment[] {
  const { moduleSlug, tool } = parseToolWireName(name);
  if (status !== "started") {
    const idx = segments.findIndex(
      (s) =>
        s.type === "tool" &&
        s.tool.status === "started" &&
        s.tool.moduleSlug === moduleSlug &&
        s.tool.tool === tool,
    );
    if (idx !== -1) {
      return segments.map((s, i) =>
        i === idx && s.type === "tool" ? { ...s, tool: { ...s.tool, status } } : s,
      );
    }
  }
  return [
    ...segments,
    {
      type: "tool",
      id: `tool-${crypto.randomUUID()}`,
      tool: { moduleSlug, tool, status },
    },
  ];
}

// Route a tool frame into the pending reply bubble's segments. Falls back to a
// no-op when the bubble has gone (e.g. settled by an error) — a stray frame
// must not resurrect a finished reply.
function applyToolEvent(
  list: AgentChatMessage[],
  name: string,
  status: AgentToolEventStatus,
): AgentChatMessage[] {
  return list.map((m) =>
    m.id === PENDING_ID && m.role === "agent"
      ? { ...m, segments: applyToolToSegments(m.segments ?? [], name, status) }
      : m,
  );
}

// Map one persisted replay row to its sidebar representation (or nothing).
function replayMessage(m: AgentApiMessage): AgentChatMessage[] {
  if (m.role === "user") return [{ id: m.id, role: "user", content: m.content }];
  if (m.role === "tool") {
    // Persisted rows are resolved calls only (content empty, meta carries
    // the call) — error text doubles as the status flag.
    const meta = (m.meta ?? undefined) as AgentToolMessageMeta | undefined;
    if (!meta?.module_slug || !meta.tool) return [];
    return [
      {
        id: m.id,
        role: "tool",
        tool: {
          moduleSlug: meta.module_slug,
          tool: meta.tool,
          status: meta.error ? "error" : "done",
          error: meta.error || undefined,
          durationMs: meta.duration_ms,
          args: meta.args,
          result: meta.result,
        },
      },
    ];
  }
  if (m.role !== "agent") return [];
  const meta = (m.meta ?? undefined) as AgentMessageMeta | undefined;
  // A rerun keeps the replaced reply server-side (stamped superseded_by) —
  // the open thread shows only the live answer.
  if (meta?.superseded_by) return [];
  return [{ id: m.id, role: "agent", content: m.content, feedback: meta?.feedback }];
}

// Append a text delta to the reply's ordered segments: extend the trailing
// text run, or open a new one when the last segment is a tool (so text after a
// tool call lands below it, not merged into the pre-tool prose).
function appendTextSegment(
  segments: AgentMessageSegment[] | undefined,
  text: string,
): AgentMessageSegment[] {
  const segs = segments ?? [];
  const last = segs[segs.length - 1];
  if (last?.type === "text") {
    return [...segs.slice(0, -1), { type: "text", text: last.text + text }];
  }
  return [...segs, { type: "text", text }];
}

// Build the four SSE handlers shared by send and rerunMessage. Both paths
// push deltas into the PENDING_ID bubble (as ordered segments + flat content),
// interleave tool rows, swap the bubble for the persisted id on done, and
// settle+error on failure.
function makeStreamHandlers(
  setMessages: Dispatch<SetStateAction<AgentChatMessage[]>>,
  setError: Dispatch<SetStateAction<string | null>>,
): Pick<AgentStreamHandlers, "onDelta" | "onTool" | "onDone" | "onError"> {
  return {
    onDelta: (text) =>
      setMessages((prev) =>
        prev.map((m) =>
          m.id === PENDING_ID && m.role === "agent"
            ? {
                ...m,
                content: m.content + text,
                segments: appendTextSegment(m.segments, text),
              }
            : m,
        ),
      ),
    onTool: (name, status) => setMessages((prev) => applyToolEvent(prev, name, status)),
    onDone: (messageId) =>
      setMessages((prev) =>
        prev.map((m) =>
          m.id === PENDING_ID && m.role === "agent"
            ? {
                id: messageId,
                role: "agent",
                content: m.content,
                ...(m.segments?.length ? { segments: m.segments } : {}),
              }
            : m,
        ),
      ),
    onError: (code) => {
      setError(code);
      setMessages((prev) => settlePending(prev));
    },
  };
}

/**
 * Headless agent-chat state machine for the sidebar surfaces: lazy
 * conversation creation, SSE reply/rerun streaming with tool-call rows,
 * history (date-grouped), replay loading, feedback, rename, and model
 * selection. Backend-agnostic — the transport is injected (`client`); see
 * AgentChatClient for the surface api-client-shared's `agent` module
 * provides. Hosts own i18n (labels via options) and routing (scope via
 * options); the hook never reads either.
 *
 * `client` and `resolveScope` are read through refs — their identities may
 * change per render without retriggering fetches.
 */
export function useAgentChat(
  client: AgentChatClient,
  options: UseAgentChatOptions,
): UseAgentChatResult {
  const { appId, enabled = true, labels } = options;
  const scopeKey = options.scopeKey !== undefined ? options.scopeKey : appId;

  // Injected collaborators ride refs so unstable identities (inline object
  // literals at the call site) don't churn effects or callbacks.
  const clientRef = useRef(client);
  clientRef.current = client;
  const appIdRef = useRef(appId);
  appIdRef.current = appId;
  const resolveScopeRef = useRef(options.resolveScope);
  resolveScopeRef.current = options.resolveScope;

  const [messages, setMessages] = useState<AgentChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  // User's explicit pick; undefined = unpinned (platform default applies).
  const [userModelId, setUserModelId] = useState<string | undefined>(undefined);
  const [roster, setRoster] = useState<AgentModelsResponse | undefined>(undefined);
  const [conversations, setConversations] = useState<AgentConversation[] | undefined>(undefined);

  const abortRef = useRef<AbortController | null>(null);
  // Guards stale selectConversation loads racing a newer selection.
  const loadSeq = useRef(0);
  // The open conversation — a ref, not state: nothing renders it, and send
  // must read it synchronously so rapid sends can't double-create.
  const conversationIdRef = useRef<string | null>(null);
  // In-flight lazy create, shared so concurrent sends land in ONE conversation.
  const createConversationRef = useRef<Promise<string> | null>(null);
  // Bumped on scope change (route switch / history selection) so a stale
  // in-flight create can't adopt its conversation into the new scope.
  const scopeEpoch = useRef(0);
  // Guards stale conversation-list responses racing a newer refresh.
  const conversationsSeq = useRef(0);

  // ---- Model roster (graceful: fetch failure → undefined → picker hidden) ----
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    clientRef.current
      .fetchAgentModels()
      .then((res) => {
        if (!cancelled) setRoster(res);
      })
      .catch(() => {
        // Roster endpoint absent/unreachable — keep the picker hidden.
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const models = useMemo<AgentSidebarInputModel[] | undefined>(
    () =>
      roster?.items.map((m) => ({
        id: m.id,
        label: m.label,
        detail:
          Number.isFinite(m.price_in) && Number.isFinite(m.price_out)
            ? `$${formatPrice(m.price_in)}/$${formatPrice(m.price_out)}`
            : undefined,
        disabled: !m.enabled,
        disabledHint: m.enabled
          ? undefined
          : (labels?.modelDisabledHint ?? DEFAULT_MODEL_DISABLED_HINT),
      })),
    [roster, labels?.modelDisabledHint],
  );

  // ---- History (newest first; the server's default first page is the only
  //      one its Redis read-through cache serves, and it's sized for this
  //      dropdown — don't ask for more) ----
  const refreshConversations = useCallback(() => {
    const seq = ++conversationsSeq.current;
    clientRef.current
      .listConversations({ appId: appIdRef.current })
      .then((page) => {
        if (conversationsSeq.current === seq) setConversations(page.items);
      })
      .catch((err) => {
        console.error("agent: list conversations failed", err);
      });
  }, []);

  useEffect(() => {
    if (!enabled) return;
    setConversations(undefined);
    refreshConversations();
  }, [enabled, appId, refreshConversations]);

  const historyLabels = labels?.history;
  const history = useMemo<ConversationHistoryGroup[] | undefined>(() => {
    if (!conversations || conversations.length === 0) return undefined;
    return groupConversationsByRecency(conversations, {
      ...DEFAULT_HISTORY_LABELS,
      ...historyLabels,
    });
  }, [conversations, historyLabels]);

  // ---- Scope switch: navigating between apps (or out of one) resets the
  //      thread. Keyed on scopeKey, not the resolved appId — a host's
  //      slug → UUID resolution settling must not wipe an active thread. ----
  useEffect(() => {
    abortRef.current?.abort();
    loadSeq.current++;
    scopeEpoch.current++;
    conversationIdRef.current = null;
    createConversationRef.current = null;
    setMessages([]);
    setError(null);
    setUserModelId(undefined);
  }, [scopeKey]);

  // Cancel any in-flight stream on unmount.
  useEffect(() => () => abortRef.current?.abort(), []);

  // Lazy-create on first send, deduped through a shared in-flight promise so
  // rapid sends can't create duplicate/orphan conversations.
  const ensureConversation = useCallback(
    (scopeId: string | null): Promise<string> => {
      if (conversationIdRef.current) return Promise.resolve(conversationIdRef.current);
      if (!createConversationRef.current) {
        const epoch = scopeEpoch.current;
        createConversationRef.current = clientRef.current
          .createConversation({
            appId: scopeId,
            // Only an explicit pick pins a model — otherwise the server
            // applies the platform default (cheapest enabled roster entry).
            ...(userModelId ? { model: userModelId } : {}),
          })
          .then((conv) => {
            if (scopeEpoch.current === epoch) conversationIdRef.current = conv.id;
            return conv.id;
          })
          .finally(() => {
            createConversationRef.current = null;
          });
      }
      return createConversationRef.current;
    },
    [userModelId],
  );

  const send = useCallback(
    (raw: string) => {
      // Hosts gate `enabled` on the session being ready — a send before
      // that would create a conversation against an unauthenticated client.
      if (!enabled) return;
      const content = raw.trim();
      if (!content) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      loadSeq.current++;
      setError(null);

      setMessages((prev) => [
        ...settlePending(prev),
        { id: `local-${crypto.randomUUID()}`, role: "user", content },
        { id: PENDING_ID, role: "agent", content: "", streaming: true },
      ]);

      void (async () => {
        try {
          const scopeId = resolveScopeRef.current
            ? await resolveScopeRef.current()
            : appIdRef.current;
          const convId = await ensureConversation(scopeId);
          if (controller.signal.aborted) return;

          await clientRef.current.streamAgentReply(
            convId,
            content,
            makeStreamHandlers(setMessages, setError),
            controller.signal,
          );
        } catch (err) {
          if (controller.signal.aborted) return;
          console.error("agent: send failed", err);
          setError("send_failed");
          setMessages((prev) => settlePending(prev));
        } finally {
          if (abortRef.current === controller) abortRef.current = null;
          // First message auto-titles the conversation; updatedAt reorders
          // it. Skip when aborted (scope switch / superseding send) — the
          // refresh would hit the OLD scope and race the new one's list.
          if (!controller.signal.aborted) refreshConversations();
        }
      })();
    },
    [enabled, ensureConversation, refreshConversations],
  );

  const selectConversation = useCallback(
    (id: string) => {
      abortRef.current?.abort();
      const seq = ++loadSeq.current;
      scopeEpoch.current++;
      conversationIdRef.current = id;
      setError(null);
      setMessages([]);
      // Adopt the conversation's pinned model so the picker reflects it.
      const conv = conversations?.find((c) => c.id === id);
      setUserModelId(conv?.model ?? undefined);

      void clientRef.current
        .listConversationMessages(id)
        .then((items) => {
          if (loadSeq.current !== seq) return;
          setMessages(items.flatMap(replayMessage));
        })
        .catch((err) => {
          if (loadSeq.current !== seq) return;
          console.error("agent: load conversation failed", err);
          setError("load_failed");
        });
    },
    [conversations],
  );

  const renameConversation = useCallback(
    (id: string, rawTitle: string) => {
      const title = rawTitle.trim();
      if (!title) return;

      // Optimistic: snapshot the prior title for rollback, then retitle the
      // history row now. The snapshot is read from state (not inside the
      // updater) so it can't depend on updater invocation count.
      const prevTitle = conversations?.find((c) => c.id === id)?.title;
      setConversations((prev) => prev?.map((c) => (c.id === id ? { ...c, title } : c)));

      clientRef.current.renameConversation(id, title).catch((err) => {
        console.error("agent: rename failed", err);
        setConversations((prev) =>
          prev?.map((c) =>
            c.id === id && prevTitle !== undefined ? { ...c, title: prevTitle } : c,
          ),
        );
      });
    },
    [conversations],
  );

  const deleteConversation = useCallback(
    (id: string) => {
      // Optimistic: snapshot the prior list for rollback, then drop the row
      // now so the history entry vanishes immediately. The snapshot is read
      // from state (not inside the updater) so it can't depend on updater
      // invocation count.
      const prevConversations = conversations;
      setConversations((prev) => prev?.filter((c) => c.id !== id));

      // Deleting the OPEN conversation must clear the thread too — otherwise a
      // freshly-deleted conversation keeps rendering its messages and the next
      // send would resurrect it under the dead id. Abort any in-flight stream
      // and null the ref so the next send lazy-creates a fresh conversation.
      if (conversationIdRef.current === id) {
        abortRef.current?.abort();
        conversationIdRef.current = null;
        createConversationRef.current = null;
        setMessages([]);
      }

      clientRef.current.deleteConversation(id).catch((err) => {
        console.error("agent: delete failed", err);
        // Restore the history row on failure; the cleared thread is not
        // re-loaded (the host can reselect the conversation to reopen it).
        setConversations(() => prevConversations);
      });
    },
    [conversations],
  );

  const rateMessage = useCallback(
    (messageId: string, rating: AgentSidebarMessageFeedback) => {
      const convId = conversationIdRef.current;
      if (!convId) return;

      // Optimistic: snapshot the prior rating for rollback, then flip the
      // thumb now. The snapshot is read from state (not inside the updater)
      // so it can't depend on updater invocation count.
      const target = messages.find((m) => m.id === messageId);
      const prevFeedback = target?.role === "agent" ? target.feedback : undefined;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId && m.role === "agent" ? { ...m, feedback: rating ?? undefined } : m,
        ),
      );

      clientRef.current.patchMessageFeedback(convId, messageId, rating).catch((err) => {
        console.error("agent: feedback patch failed", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId && m.role === "agent" ? { ...m, feedback: prevFeedback } : m,
          ),
        );
      });
    },
    [messages],
  );

  const rerunMessage = useCallback(
    (messageId: string) => {
      const convId = conversationIdRef.current;
      if (!convId) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      loadSeq.current++;
      setError(null);

      // The old reply becomes the streaming placeholder — the server
      // supersedes it in place, so the thread position stays.
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId && m.role === "agent"
            ? { id: PENDING_ID, role: "agent", content: "", streaming: true }
            : m,
        ),
      );

      void (async () => {
        try {
          await clientRef.current.streamAgentRerun(
            convId,
            messageId,
            makeStreamHandlers(setMessages, setError),
            controller.signal,
          );
        } catch (err) {
          if (controller.signal.aborted) return;
          // 409 message_superseded: another rerun already replaced this
          // reply — reload the thread instead of erroring.
          if ((err as Error & { status?: number }).status === 409) {
            selectConversation(convId);
            return;
          }
          console.error("agent: rerun failed", err);
          setError("send_failed");
          setMessages((prev) => settlePending(prev));
        } finally {
          if (abortRef.current === controller) abortRef.current = null;
          // The rerun bumps the conversation's updatedAt — reorder history.
          // Skip when aborted, same as send.
          if (!controller.signal.aborted) refreshConversations();
        }
      })();
    },
    [refreshConversations, selectConversation],
  );

  const selectModel = useCallback(
    (id: string) => {
      const prev = userModelId;
      setUserModelId(id);
      const convId = conversationIdRef.current;
      if (convId) {
        // Re-pin the open conversation; next sends use the new model. On
        // failure, revert (unless a newer pick superseded this one) so the
        // picker never advertises a model the conversation isn't pinned to.
        clientRef.current.patchConversationModel(convId, id).catch((err) => {
          console.error("agent: model patch failed", err);
          setUserModelId((curr) => (curr === id ? prev : curr));
        });
      }
    },
    [userModelId],
  );

  return {
    messages,
    error,
    send,
    rateMessage,
    rerunMessage,
    history,
    selectConversation,
    renameConversation,
    deleteConversation,
    models,
    // The pick when the user made one, else the server default — never
    // let the consumer guess (a first-enabled fallback can advertise a
    // model the server won't actually reply with).
    selectedModelId: userModelId ?? roster?.default_model_id,
    selectModel,
  };
}
