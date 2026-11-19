// Structural transport surface for the agent chat hooks. The kit stays
// backend-agnostic: hosts inject any object with these methods —
// api-client-shared's `agent` module satisfies them once its free functions
// are bound to the host's service client:
//
//   const chatClient: AgentChatClient = {
//     listConversations: (o) => listConversations(agentApi, o),
//     createConversation: (o) => createConversation(agentApi, o),
//     renameConversation: (id, t) => renameConversation(agentApi, id, t),
//     deleteConversation: (id) => deleteConversation(agentApi, id),
//     patchConversationModel: (id, m) => patchConversationModel(agentApi, id, m),
//     listConversationMessages: (id) => listConversationMessages(agentApi, id),
//     fetchAgentModels: () => fetchAgentModels(agentApi),
//     patchMessageFeedback: (id, mid, r) => patchMessageFeedback(agentApi, id, mid, r),
//     streamAgentReply: (id, c, h, s) => streamAgentReply(client, id, c, h, s),
//     streamAgentRerun: (id, mid, h, s) => streamAgentRerun(client, id, mid, h, s),
//   };
//
// The wire types below mirror api-client-shared/src/agent/types.ts
// structurally (api-platform internal/agent JSON casing) — values returned
// by that package are assignable to these without casts.

// ---- Wire types ----

/** appId null = account-level chat; model null = platform default. */
export interface AgentConversation {
  id: string;
  appId: string | null;
  title: string;
  model: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Keyset page from GET /v1/conversations. */
export interface AgentConversationsPage {
  items: AgentConversation[];
  nextCursor: string | null;
}

/** One persisted message from GET /v1/conversations/{id}/messages. */
export interface AgentApiMessage {
  id: string;
  role: "user" | "agent" | "tool";
  content: string;
  meta?: unknown;
  createdAt: string;
  /** Present on a replayed ask card; absent on every other row. */
  ask?: AgentAskReplay;
  /** Present on a replayed plan card (PROPOSED: the plan frame as last sent, like `ask`);
   *  absent on every other row. */
  plan?: AgentPlanEvent;
}

/** Known keys in an agent message's meta JSONB. feedback comes from the
 *  feedback PATCH; superseded_by is stamped on a reply replaced by a rerun
 *  (the replay GET returns superseded rows — clients hide them). */
export interface AgentMessageMeta {
  feedback?: "up" | "down";
  superseded_by?: string;
}

/** Meta envelope on a persisted role='tool' row (snake_case wire). The
 *  row's content is always empty — this envelope carries the whole call.
 *  Only RESOLVED calls persist, and there is no status key: a non-empty
 *  error means the call failed, otherwise it succeeded. */
export interface AgentToolMessageMeta {
  module_id: string;
  module_slug: string;
  tool: string;
  args?: unknown;
  result?: unknown;
  error?: string;
  duration_ms: number;
}

/** Roster entry from GET /v1/models. disabled entries render greyed-out.
 *  Prices are USD per million tokens (display only). */
export interface AgentModel {
  id: string;
  label: string;
  adapter: string;
  enabled: boolean;
  price_in: number;
  price_out: number;
}

/** GET /v1/models response. default_model_id serves replies when a
 *  conversation has no pick — the selector shows it as selected. */
export interface AgentModelsResponse {
  items: AgentModel[];
  default_model_id?: string;
}

// ---- Ask cards and plan frames (mirror api-client-shared's agent types) ----

export interface AgentAskOption { value: string; label: string; description?: string }

export interface AgentAskQuestion {
  id: string;
  type: "text" | "toggle" | "choice";
  label: string;
  description?: string;
  multiline?: boolean;
  placeholder?: string;
  defaultValue?: string | boolean | string[];
  style?: "segmented" | "cards";
  multiple?: boolean;
  options?: AgentAskOption[];
}

/** `event: ask` frame — one card of questions. */
export interface AgentAskEvent {
  ask_id: string;
  title: string;
  description?: string;
  questions: AgentAskQuestion[];
}

/** Answers keyed by question id. */
export type AgentAskAnswers = Record<string, string | boolean | string[]>;

/** `ask` on a replayed message; `answers` is omitted while pending. */
export interface AgentAskReplay {
  ask_id: string;
  status: "pending" | "answered";
  answers?: AgentAskAnswers;
}

/** `meta` of the `done` frame. PROPOSED: a turn that streamed several ask cards names the stored
 *  row of each, `ask_message_ids[ask_id]`; `message_id` stays the row the turn ended on. */
export interface AgentDoneMeta {
  ask_message_ids?: Record<string, string>;
  [key: string]: unknown;
}

/** Step states of the plan contract: `agent_plan_steps.status` CHECK in api-platform
 *  migration 117 (`pending`, `approved`, `running`, `done`, `failed`). One list for the
 *  wire type, the card and the tests; the contract test in AgentSidebarPlanCard.test.tsx
 *  pins it to the migration's list. */
export const PLAN_STEP_STATES = ["pending", "approved", "running", "done", "failed"] as const;
export type AgentPlanStepState = (typeof PLAN_STEP_STATES)[number];

/** What a plan step acts on (an app or a module). `type` is `app` or `module` (open tail: an
 *  unknown type shows as sent). The card never shows `id`: a target with no `name` shows the host
 *  text for `ref` (a new app; the server sends a zero-based step index, so 0 counts) or `unavailable`. */
export interface AgentPlanTarget {
  type: "app" | "module" | (string & {});
  id?: string; name?: string; ref?: number | string; unavailable?: boolean;
}

/** One plan-frame step. category is an OPEN string; state is the contract states plus an
 *  open tail (an unknown state still renders, it just never unlocks Approve). `targets` is optional:
 *  a server that does not send it renders the card as before. */
export interface AgentPlanStep {
  id: string; kind: string; category: string; title: string;
  state: AgentPlanStepState | (string & {});
  targets?: AgentPlanTarget[];
}

/** `event: plan` frame; sent again when the plan changes state. */
export interface AgentPlanEvent {
  plan_id: string;
  version: number;
  state: string;
  hash: string;
  /** Relative to the account host, `/approvals/{plan_id}`. */
  confirm_path: string;
  steps: AgentPlanStep[];
}

// ---- Streamed reply (SSE) ----

/** Lifecycle of one streamed tool call. */
export type AgentToolEventStatus = "started" | "done" | "error";

export interface AgentStreamHandlers {
  onDelta: (text: string) => void;
  onDone: (messageId: string, meta?: AgentDoneMeta) => void;
  /** Server stream error event ("reply_failed" | "persist_failed") or
   *  "stream_interrupted" when the stream ends without a terminal event. */
  onError: (code: string) => void;
  /** One `event: tool` lifecycle frame. name is the wire name
   *  "<module_slug>__<tool>"; frames carry no call id — a done/error frame
   *  resolves the matching started one by name + order. */
  onTool?: (name: string, status: AgentToolEventStatus) => void;
  /** One `event: ask` frame. The turn still ends with `done` whose
   *  messageId is the persisted card row. */
  onAsk?: (ask: AgentAskEvent) => void;
  /** One `event: plan` frame (again on every state change). */
  onPlan?: (plan: AgentPlanEvent) => void;
}

// ---- Message actions ----

/** Rating on the feedback wire. null removes an existing rating (un-vote). */
export type AgentFeedbackRating = "up" | "down" | null;

// ---- Client surface ----

export interface ListConversationsOptions {
  /** Scope: app UUID, or null/undefined for account-level conversations. */
  appId?: string | null;
  /** Page size; omit for the server default. */
  limit?: number;
  /** Opaque keyset cursor from a previous page's nextCursor. */
  cursor?: string;
}

export interface CreateConversationOptions {
  /** Scope: app UUID, or null/undefined for an account-level chat. */
  appId?: string | null;
  /** Explicit model pin; omit for the platform default. */
  model?: string;
}

/**
 * Everything useAgentChat needs from the agent service. Method names match
 * api-client-shared's `agent` exports one-to-one so the binding is
 * mechanical. Streaming methods resolve once the stream is fully consumed;
 * connect-time failures reject with `status`, `code`, `serverMessage`, and
 * `retryAfterSeconds` attached where known (api-client-shared#90's error
 * shape, read structurally — see useAgentChat's `errorInfo`), while
 * stream-time failures surface through `handlers.onError`.
 */
export interface AgentChatClient {
  listConversations(opts?: ListConversationsOptions): Promise<AgentConversationsPage>;
  createConversation(opts?: CreateConversationOptions): Promise<AgentConversation>;
  renameConversation(conversationId: string, title: string): Promise<AgentConversation>;
  /** Permanently delete a conversation and all its messages (ms_agent.message
   *  FK is ON DELETE CASCADE, so one DELETE removes the whole thread). */
  deleteConversation(conversationId: string): Promise<void>;
  /** Re-pin the conversation's model ("" clears to the platform default). */
  patchConversationModel(conversationId: string, model: string): Promise<AgentConversation>;
  /** Full replay, oldest first — includes superseded rows (clients hide them). */
  listConversationMessages(conversationId: string): Promise<AgentApiMessage[]>;
  fetchAgentModels(): Promise<AgentModelsResponse>;
  patchMessageFeedback(
    conversationId: string,
    messageId: string,
    rating: AgentFeedbackRating,
  ): Promise<void>;
  streamAgentReply(
    conversationId: string,
    content: string,
    handlers: AgentStreamHandlers,
    signal: AbortSignal,
  ): Promise<void>;
  streamAgentRerun(
    conversationId: string,
    messageId: string,
    handlers: AgentStreamHandlers,
    signal: AbortSignal,
  ): Promise<void>;
  /** Answer one pending ask card; the continuing turn streams through the
   *  same handlers. Optional so existing hosts compile; without it the hook
   *  never marks a card submitted. Connect-time 409 = already answered. */
  streamAgentAskAnswer?(
    conversationId: string,
    askId: string,
    answers: AgentAskAnswers,
    handlers: AgentStreamHandlers,
    signal: AbortSignal,
  ): Promise<void>;
}
