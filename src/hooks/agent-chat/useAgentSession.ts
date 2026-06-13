import { useCallback, useEffect, useMemo, useRef } from "react";
import type { AgentQueuedMessage } from "@/components/ui/agent/sidebar/AgentSidebarInput";
import type { SidebarWidthPersistence } from "@/context/sidebar/SidebarProvider";
import type { AgentChatClient, AgentConversation, CreateConversationOptions } from "./client";
import {
  useAgentChat,
  type AgentChatMessage,
  type UseAgentChatLabels,
  type UseAgentChatResult,
} from "./useAgentChat";
import {
  deriveTabTitles,
  isDraftTab,
  useAgentTabs,
  type AgentTabsPersistence,
  type ChatTab,
} from "./useAgentTabs";
import { useQueuedAgentSend } from "./useQueuedAgentSend";

/**
 * Everything a host injects to mount the cross-platform agent sidebar
 * session. The hook is framework-agnostic and transport-agnostic: it imports
 * ONLY from React and within web-ui-kit, so it never reaches for
 * api-client-shared, next/*, or next-intl — the host binds all of those and
 * passes them through here.
 */
export interface UseAgentSessionDeps {
  /** Agent transport bound to the host's service client. The hook WRAPS this
   *  internally to add draft-binding — inject a PLAIN client (do NOT wrap
   *  createConversation yourself). */
  chatClient: AgentChatClient;
  /** Tab-strip persistence — typically the agent service's /v1/sidebar-state.
   *  PUTs are full-replace, last-write-wins. */
  persistence: AgentTabsPersistence;
  /** Server-side, ONE-shared-per-user sidebar WIDTH persistence. Passed
   *  straight back out as `widthPersistence` for the host's AppShell. */
  widthPersistence: SidebarWidthPersistence;
  /**
   * List ALL of the user's conversation ids — UNFILTERED by scope. The strip
   * is global per user, so a persisted tab may hold a conversation from
   * another scope; resolution must span every scope. Errors keep all tabs.
   */
  listAllConversationIds: () => Promise<string[]>;
  /**
   * Existence probe for one conversation id: resolves when it exists, rejects
   * with `.status === 404` when it was deleted (the tab then heals silently).
   * Any other rejection keeps the tab (never drop on a transient failure).
   */
  probeConversation: (id: string) => Promise<void>;
  /** Localized strings the hook bakes into derived data (history buckets,
   *  model-disabled hint, draft tab title). */
  labels: UseAgentSessionLabels;
  /** Gate all fetching/persistence on the session being ready. */
  enabled: boolean;
  /**
   * Conversation scope: app UUID, or null/undefined for account-level chats.
   * Forwarded straight into `useAgentChat` so conversations are created and
   * listed in the right scope. web-applications injects the current app's
   * UUID; web-account omits it (account-level). Omitting it (account-level)
   * is the same as passing null.
   */
  appId?: string | null;
  /**
   * Resolve the scope right before a send — forwarded into `useAgentChat`.
   * Hosts that route by slug override this to resolve slug → UUID on a cold
   * send before their app query settles, so a conversation can't be misfiled
   * as account-scoped. Defaults to `() => appId`.
   */
  resolveScope?: () => Promise<string | null>;
  /**
   * Optional cross-context reset signal. When it CHANGES, the hook focuses a
   * fresh draft tab (web-applications passes the route's app ref so entering a
   * different app starts a clean draft that picks up that app's pre-mounted
   * tools). Omit it when there is no such notion (web-account). It does NOT
   * feed the chat reset key — that is derived internally from the active tab
   * and the in-place draft binding.
   */
  resetKey?: string;
}

/** Labels the session bakes into derived data. Extends the chat hook's labels
 *  with the draft tab title (rendered for drafts and not-yet-historied tabs). */
export interface UseAgentSessionLabels extends UseAgentChatLabels {
  /** Title for draft tabs (and tabs whose conversation hasn't hit history
   *  yet) — e.g. the localized "New chat". */
  newChat: string;
}

/** The full agent sidebar session surface — identical for every host. */
export interface UseAgentSessionResult
  extends Pick<
    UseAgentChatResult,
    | "messages"
    | "error"
    | "rateMessage"
    | "rerunMessage"
    | "history"
    | "renameConversation"
    | "models"
    | "selectedModelId"
    | "selectModel"
  > {
  /** Queue-aware send: goes out now, or queues while a reply streams. */
  send: (message: string) => void;
  /** Open-conversation strip, titles resolved from history. Close ≠ delete:
   *  closing removes the tab everywhere — the conversation stays. */
  tabs: ChatTab[];
  activeTabId: string;
  selectTab: (id: string) => void;
  closeTab: (id: string) => void;
  /** Open a fresh draft tab (no conversation until the first send). */
  newTab: () => void;
  /** Open a past conversation as a tab, or refocus its existing tab. */
  openConversation: (id: string) => void;
  /** Sidebar open/closed — part of the persisted cross-host session. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Messages waiting for the in-flight reply to finish, in send order. */
  queued: AgentQueuedMessage[];
  cancelQueued: (id: string) => void;
  /** Server-side shared-per-user sidebar WIDTH persistence — pass to the
   *  AppShell's `sidebarWidthPersistence`. */
  widthPersistence: SidebarWidthPersistence;
}

/**
 * Consolidated, injection-based agent sidebar session — the single hook every
 * platform host (web-account, web-applications, future CRM/PM) wraps in a thin
 * adapter. It composes the kit's `useAgentTabs` (cross-host tab strip),
 * `useAgentChat` (SSE chat state machine), and `useQueuedAgentSend` (FIFO
 * queue), then internalizes the two pieces hosts used to diverge on:
 *
 *  1. DRAFT BINDING (in-place). The first send on a draft tab lazy-creates the
 *     conversation. The hook WRAPS the injected `chatClient.createConversation`
 *     so it has the new id synchronously, rebinds the active draft tab to it
 *     via `bindDraft`, and pins the chat reset key (scopeKey) to the ORIGINAL
 *     draft id through the flip — so the streaming first reply isn't reset away
 *     by its own conversation's birth. No host-side history-diffing.
 *
 *  2. TAB RESOLUTION. The strip is global per user, so a hydrated tab may hold
 *     a conversation outside the current scope. The hook resolves hydrated ids
 *     through the injected `listAllConversationIds()` (unfiltered) plus per-id
 *     `probeConversation()` for ids that fell off that list, caches resolved
 *     ids for the session, and captures cross-scope titles so the strip can
 *     label tabs the host's (scoped) history can't see.
 *
 * The hook reads persistence/width as injected surfaces (it never builds them)
 * and imports nothing framework- or client-specific.
 */
export function useAgentSession(deps: UseAgentSessionDeps): UseAgentSessionResult {
  const {
    chatClient,
    persistence,
    widthPersistence,
    listAllConversationIds,
    probeConversation,
    labels,
    enabled,
    appId = null,
    resolveScope,
    resetKey,
  } = deps;

  // ---- Tab resolution (internalized; was resolveOpenTabs / resolveSidebarTabs) ----
  // Ids that resolve once stay resolved for the session — focus refetches then
  // skip the existence probes (deleted-elsewhere tabs heal on the next full
  // hydrate). Cross-scope tabs (a conversation the host's scoped history can't
  // see) carry no title from the ids-only list, so they fall back to the
  // newChat label until they surface in history.
  const resolvedCacheRef = useRef(new Set<string>());
  const listAllRef = useRef(listAllConversationIds);
  listAllRef.current = listAllConversationIds;
  const probeRef = useRef(probeConversation);
  probeRef.current = probeConversation;

  const resolveTabs = useCallback(async (ids: string[]): Promise<string[]> => {
    const cache = resolvedCacheRef.current;
    // Every id already proven this session — skip the round-trip entirely.
    if (ids.every((id) => cache.has(id))) return ids;
    // One UNFILTERED list (global per user) resolves most ids; the rest fall
    // through to per-id probes below.
    const known = new Set(await listAllRef.current());
    for (const id of ids) {
      if (known.has(id)) cache.add(id);
    }
    // allSettled (not all): the keep-on-transient-failure policy is per probe
    // — one 500 must neither block the other probes nor close their tabs.
    const offPage = ids.filter((id) => !known.has(id) && !cache.has(id));
    const settled = await Promise.allSettled(offPage.map((id) => probeRef.current(id)));
    const dropped = new Set(
      offPage.filter((id, i) => {
        const r = settled[i];
        return r.status === "rejected" && isNotFound(r.reason);
      }),
    );
    for (const id of offPage) {
      if (!dropped.has(id)) cache.add(id);
    }
    return ids.filter((id) => !dropped.has(id));
  }, []);

  const strip = useAgentTabs(persistence, { enabled, resolveTabs });

  // ---- Draft binding (in-place; was use-draft-bind + the createConversation wrap) ----
  // A draft-born tab keeps its DRAFT id as the chat reset key after bindDraft
  // renames the tab to the conversation id, so the rebind can't change scopeKey
  // mid-stream and abort the very reply that created the conversation.
  const draftOriginRef = useRef(new Map<string, string>());
  const activeScopeId = draftOriginRef.current.get(strip.activeTabId) ?? strip.activeTabId;

  // Closed tabs drop their draft-origin mapping — otherwise the map grows for
  // the session's lifetime and re-opening the conversation later would wrongly
  // inherit the old draft scope key.
  useEffect(() => {
    const open = new Set(strip.tabs);
    for (const id of draftOriginRef.current.keys()) {
      if (!open.has(id)) draftOriginRef.current.delete(id);
    }
  }, [strip.tabs]);

  // Latest-value refs so the wrapped client (memoized on the plain client) can
  // read the live active tab + bind without re-binding per strip render.
  const activeTabIdRef = useRef(strip.activeTabId);
  activeTabIdRef.current = strip.activeTabId;
  const bindDraftRef = useRef(strip.bindDraft);
  bindDraftRef.current = strip.bindDraft;

  // Wrap the injected client so createConversation binds the draft in place
  // with the id it already has (the kit chat hook never surfaces that id),
  // and streamAgentReply releases that draft pin once the FIRST reply settles.
  const boundClient = useMemo<AgentChatClient>(
    () => ({
      ...chatClient,
      createConversation: async (opts?: CreateConversationOptions): Promise<AgentConversation> => {
        // Capture the draft BEFORE the round-trip: a tab switch while the
        // create is in flight must not bind some other draft to this
        // conversation. The bind stays correct if focus moved — the
        // originating draft tab becomes the conversation tab in place.
        const active = activeTabIdRef.current;
        const conv = await chatClient.createConversation(opts);
        if (isDraftTab(active)) {
          // Pin the reset key to the draft id through the flip, then rebind.
          draftOriginRef.current.set(conv.id, active);
          resolvedCacheRef.current.add(conv.id);
          bindDraftRef.current(active, conv.id);
        }
        return conv;
      },
      // The draft pin holds scopeKey at the draft id ONLY long enough for the
      // first reply (the one that created the conversation) not to be reset
      // away by its own conversation's birth. Once that reply settles the pin
      // has done its job — drop it so the tab keys off its real conversation
      // id like any other. Left in place, every later switch back to this tab
      // would re-resolve activeScopeId to the dead draft id and trigger a full
      // scope-switch reload. The post-settle scopeKey flip (draft → conv id)
      // is harmless: the conversation is now fully persisted, so the resulting
      // replay load returns the same finalized thread.
      streamAgentReply: (conversationId, content, handlers, signal) => {
        const releasePin = () => {
          draftOriginRef.current.delete(conversationId);
        };
        return chatClient.streamAgentReply(
          conversationId,
          content,
          {
            ...handlers,
            onDone: (messageId) => {
              releasePin();
              handlers.onDone(messageId);
            },
            onError: (code) => {
              releasePin();
              handlers.onError(code);
            },
          },
          signal,
        );
      },
    }),
    [chatClient],
  );

  const chatLabels = useMemo<UseAgentChatLabels>(
    () => ({ history: labels.history, modelDisabledHint: labels.modelDisabledHint }),
    [labels.history, labels.modelDisabledHint],
  );

  const chat = useAgentChat(boundClient, {
    // Host-injected scope: app UUID for web-applications, null (account-level)
    // for web-account. createConversation / listConversations honor it so
    // conversations land — and are listed — in the right scope.
    appId,
    resolveScope,
    // Switching tabs resets the thread; the effect below loads the replay for
    // conversation-backed tabs. Draft rebinds keep activeScopeId stable.
    scopeKey: activeScopeId,
    enabled,
    labels: chatLabels,
  });

  // ---- Select-conversation effect ----
  // Activating a conversation-backed tab loads its replay. Keyed on the scope
  // id alone — selectConversation is read through a ref so history refreshes
  // (which rebuild its identity) can't retrigger a reload mid-stream. Draft
  // rebinds keep the same scope id, so they don't reload (which would abort the
  // streaming first reply).
  const selectConversationRef = useRef(chat.selectConversation);
  selectConversationRef.current = chat.selectConversation;
  useEffect(() => {
    const id = activeTabIdRef.current;
    if (!isDraftTab(id)) selectConversationRef.current(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScopeId]);

  // ---- resetKey: focus a fresh draft on cross-context navigation ----
  // Entering a different app focuses a fresh draft tab so the first message
  // picks up that app's pre-mounted tools cleanly; the global strip survives.
  const tabsRef = useRef(strip.tabs);
  tabsRef.current = strip.tabs;
  const selectTabRef = useRef(strip.selectTab);
  selectTabRef.current = strip.selectTab;
  const newTabRef = useRef(strip.newTab);
  newTabRef.current = strip.newTab;
  const prevResetKeyRef = useRef(resetKey);
  useEffect(() => {
    if (resetKey === undefined) return;
    if (prevResetKeyRef.current === resetKey) return;
    prevResetKeyRef.current = resetKey;
    const draft = tabsRef.current.find(isDraftTab);
    if (draft) selectTabRef.current(draft);
    else newTabRef.current();
  }, [resetKey]);

  // ---- Queue-aware send + draft-cancel-on-close ----
  const queuedSend = useQueuedAgentSend(chat, activeScopeId);

  const closeTab = useCallback(
    (id: string) => {
      // Closing a pending draft before its conversation id lands cancels the
      // bind: the createConversation wrap reads the live active tab, so once
      // the draft tab is gone (and focus moved) bindDraft no-ops on a missing
      // tab. Drop any draft-origin mapping for it too.
      draftOriginRef.current.delete(id);
      strip.closeTab(id);
    },
    [strip.closeTab],
  );

  // ---- Title derivation ----
  // Tab titles derive from history at render time, so renames (optimistic,
  // with rollback) and server auto-titles flow into the strip for free. Drafts
  // — and cross-scope conversations the host's history can't see — render the
  // localized newChat label.
  const tabs = useMemo<ChatTab[]>(
    () => deriveTabTitles(strip.tabs, chat.history, labels.newChat),
    [strip.tabs, chat.history, labels.newChat],
  );

  return {
    messages: chat.messages,
    error: chat.error,
    send: queuedSend.send,
    rateMessage: chat.rateMessage,
    rerunMessage: chat.rerunMessage,
    history: chat.history,
    renameConversation: chat.renameConversation,
    models: chat.models,
    selectedModelId: chat.selectedModelId,
    selectModel: chat.selectModel,
    tabs,
    activeTabId: strip.activeTabId,
    selectTab: strip.selectTab,
    closeTab,
    newTab: strip.newTab,
    openConversation: strip.openConversation,
    open: strip.open,
    setOpen: strip.setOpen,
    queued: queuedSend.queued,
    cancelQueued: queuedSend.cancelQueued,
    widthPersistence,
  };
}

// Structural 404 check (instead of `instanceof ApiError`) — works across
// module instances and keeps the hook dependency-free.
function isNotFound(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { status?: unknown }).status === 404;
}
