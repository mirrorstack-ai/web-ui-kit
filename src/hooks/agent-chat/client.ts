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

// ---- Streamed reply (SSE) ----

/** Lifecycle of one streamed tool call. */
export type AgentToolEventStatus = "started" | "done" | "error";

export interface AgentStreamHandlers {
  onDelta: (text: string) => void;
  onDone: (messageId: string) => void;
  /** Server stream error event ("reply_failed" | "persist_failed") or
   *  "stream_interrupted" when the stream ends without a terminal event. */
  onError: (code: string) => void;
  /** One `event: tool` lifecycle frame. name is the wire name
   *  "<module_slug>__<tool>"; frames carry no call id — a done/error frame
   *  resolves the matching started one by name + order. */
  onTool?: (name: string, status: AgentToolEventStatus) => void;
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
 * connect-time failures reject with `.status` attached where known, while
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
}
