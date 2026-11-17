import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { AgentAskEvent, AgentChatClient, AgentPlanEvent, AgentStreamHandlers } from "./client";
import { useAgentChat, type UseAgentChatOptions } from "./useAgentChat";

const NOW = new Date().toISOString();
const conv = { id: "c-1", appId: null, title: "t", model: null, createdAt: NOW, updatedAt: NOW };
const ASK: AgentAskEvent = {
  ask_id: "a-1",
  title: "Pick a theme",
  questions: [
    { id: "q1", type: "choice", label: "Theme", options: [{ value: "dark", label: "Dark" }] },
    { id: "q2", type: "toggle", label: "Notify" },
  ],
};
const PLAN: AgentPlanEvent = {
  plan_id: "p-1", version: 1, state: "proposed", hash: "abc", confirm_path: "/approvals/p-1",
  steps: [{ id: "s1", kind: "install", category: "module", title: "Install quiz", state: "draft" }],
};
/** Sends one turn on a stub client and hands back the turn's SSE handlers. */
async function startTurn(over: Partial<AgentChatClient> = {}, opts: Partial<UseAgentChatOptions> = {}) {
  let handlers!: AgentStreamHandlers;
  const client = {
    listConversations: vi.fn().mockResolvedValue({ items: [conv], nextCursor: null }),
    createConversation: vi.fn().mockResolvedValue(conv),
    listConversationMessages: vi.fn().mockResolvedValue([]),
    fetchAgentModels: vi.fn().mockResolvedValue({ items: [] }),
    streamAgentReply: vi.fn(async (_i, _c, h) => { handlers = h; }),
    ...over,
  } as unknown as AgentChatClient;
  const hook = renderHook(() => useAgentChat(client, { appId: null, ...opts }));
  act(() => hook.result.current.send("make a form"));
  await waitFor(() => expect(handlers).toBeDefined());
  return { hook, handlers, client };
}
const flush = () => act(async () => { await Promise.resolve(); });
const row = (hook: { result: { current: { messages: object[] } } }, id: string) =>
  hook.result.current.messages.find((m) => (m as { id: string }).id === id);
/** A turn that ended on an ask card named `m-card`. */
async function askedTurn(over: Partial<AgentChatClient> = {}) {
  const t = await startTurn(over);
  act(() => t.handlers.onAsk?.(ASK));
  act(() => t.handlers.onDone("m-card"));
  await flush();
  return t;
}

vi.spyOn(console, "error").mockImplementation(() => {});

describe("useAgentChat question card", () => {
  it("builds a pending card from an ask frame, named by the done row, with no empty bubble", async () => {
    const { hook } = await askedTurn();
    expect(row(hook, "m-card")).toMatchObject({ kind: "multi-question", askId: "a-1", status: "pending" });
    expect(hook.result.current.messages.filter((m) => m.role === "agent")).toHaveLength(1);
  });

  it("submitAsk sends the answers once and marks the card submitted; a second call does nothing", async () => {
    const answerStream = vi.fn().mockResolvedValue(undefined);
    const { hook } = await askedTurn({ streamAgentAskAnswer: answerStream });
    const answers = { q1: "dark", q2: true };
    act(() => hook.result.current.submitAsk("m-card", answers));
    act(() => hook.result.current.submitAsk("m-card", answers));
    await flush();
    expect(answerStream).toHaveBeenCalledTimes(1);
    expect(answerStream.mock.calls[0].slice(0, 3)).toEqual(["c-1", "a-1", answers]);
    expect(row(hook, "m-card")).toMatchObject({ status: "submitted", answers });
  });

  it("rolls the card back to pending when the answer cannot connect, and allows a retry", async () => {
    const answerStream = vi.fn().mockRejectedValue(new Error("down"));
    const { hook } = await askedTurn({ streamAgentAskAnswer: answerStream });
    act(() => hook.result.current.submitAsk("m-card", { q1: "dark" }));
    await waitFor(() => expect(hook.result.current.error).toBe("send_failed"));
    expect(row(hook, "m-card")).toMatchObject({ status: "pending" });
    act(() => hook.result.current.submitAsk("m-card", { q1: "dark" }));
    expect(answerStream).toHaveBeenCalledTimes(2);
  });

  it("a refused answer keeps the server's code and wait, and rolls the card back", async () => {
    const refusal = Object.assign(new Error("denied for acme-corp"), {
      code: "agent_turn_limit",
      status: 429,
      retryAfterSeconds: 30,
    });
    const answerStream = vi.fn().mockRejectedValue(refusal);
    const { hook } = await askedTurn({ streamAgentAskAnswer: answerStream });
    act(() => hook.result.current.submitAsk("m-card", { q1: "dark" }));
    await waitFor(() => expect(hook.result.current.error).toBe("agent_turn_limit"));
    expect(hook.result.current.errorInfo).toEqual({
      code: "agent_turn_limit",
      status: 429,
      retryAfterSeconds: 30,
    });
    expect(row(hook, "m-card")).toMatchObject({ status: "pending" });
  });

  it("replays a persisted ask: answered as read-only submitted with its answers, pending as pending", async () => {
    const replay = (id: string, status: string, answers?: object) => ({
      id, role: "agent", content: "text", createdAt: NOW,
      meta: { ask: { ...ASK, ask_id: id, status } }, ask: { ask_id: id, status, answers },
    });
    const { hook } = await startTurn({
      listConversationMessages: vi.fn().mockResolvedValue([replay("a-1", "answered", { q1: "dark" }), replay("a-2", "pending")]),
    });
    act(() => hook.result.current.selectConversation("c-1"));
    await waitFor(() => expect(hook.result.current.messages).toHaveLength(2));
    expect(hook.result.current.messages[0]).toMatchObject({ status: "submitted", answers: { q1: "dark" } });
    expect(hook.result.current.messages[1]).toMatchObject({ status: "pending", askId: "a-2" });
  });
});

describe("useAgentChat plan card", () => {
  it("turns a plan frame into a card (server facts only) and updates it in place on the next frame", async () => {
    const { hook, handlers } = await startTurn();
    act(() => handlers.onPlan?.(PLAN));
    act(() => handlers.onPlan?.({ ...PLAN, version: 2, state: "approved" }));
    const plans = hook.result.current.messages.filter((m) => "kind" in m && m.kind === "plan");
    expect(plans).toHaveLength(1);
    expect(plans[0]).toMatchObject({ planId: "p-1", state: "approved", version: 2 });
    expect(Object.keys((plans[0] as { steps: object[] }).steps[0]).sort()).toEqual(["category", "id", "state", "title"]);
  });

  it("exposes approvePlanStep only when the host supplies confirmPlanStep (X1)", async () => {
    expect((await startTurn()).hook.result.current.approvePlanStep).toBeUndefined();
    const { hook } = await startTurn({}, { confirmPlanStep: vi.fn().mockResolvedValue(undefined) });
    expect(hook.result.current.approvePlanStep).toBeTypeOf("function");
  });

  it("marks a step approved only AFTER the host confirm succeeds, and never when it rejects", async () => {
    let settle!: { ok: () => void; fail: (e: Error) => void };
    const confirm = vi.fn(() => new Promise<void>((ok, fail) => { settle = { ok, fail }; }));
    const { hook, handlers } = await startTurn({}, { confirmPlanStep: confirm });
    act(() => handlers.onPlan?.(PLAN));
    const stepState = () => (row(hook, "plan:p-1") as { steps: { state: string }[] }).steps[0].state;
    act(() => hook.result.current.approvePlanStep?.("plan:p-1", "s1"));
    act(() => hook.result.current.approvePlanStep?.("plan:p-1", "s1"));
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(confirm).toHaveBeenCalledWith("p-1", "s1");
    expect(stepState()).toBe("draft"); // in flight: not approved yet
    await act(async () => settle.fail(new Error("no passkey")));
    expect(stepState()).toBe("draft");
    act(() => hook.result.current.approvePlanStep?.("plan:p-1", "s1")); // retry allowed
    expect(confirm).toHaveBeenCalledTimes(2);
    await act(async () => settle.ok());
    expect(stepState()).toBe("approved");
  });

  it("rebuilds a plan card that still awaits confirmation when the thread reloads, and no settled one", async () => {
    const msg = (id: string, plan: AgentPlanEvent) => ({ id, role: "agent" as const, content: "", createdAt: NOW, plan });
    const list = vi.fn().mockResolvedValue([
      { id: "u1", role: "user", content: "install quiz", createdAt: NOW },
      msg("m-p1", PLAN),
      msg("m-p2", { ...PLAN, plan_id: "p-2", state: "done" }),
    ]);
    const { hook } = await startTurn({ listConversationMessages: list });
    act(() => hook.result.current.selectConversation("c-1"));
    await waitFor(() => expect(row(hook, "plan:p-1")).toBeDefined());
    expect(row(hook, "plan:p-1")).toMatchObject({ kind: "plan", planId: "p-1", state: "proposed", confirmPath: "/approvals/p-1" });
    expect(row(hook, "plan:p-2")).toBeUndefined();
    expect(hook.result.current.messages.filter((m) => "content" in m && m.role === "agent")).toHaveLength(0);
  });
});

describe("useAgentChat plan replay with an approved step", () => {
  it("shows no approve control for a step the stored plan already holds as approved", async () => {
    const approved: AgentPlanEvent = { ...PLAN, steps: [{ ...PLAN.steps[0], state: "approved" }] };
    const list = vi.fn().mockResolvedValue([
      { id: "u1", role: "user", content: "install quiz", createdAt: NOW },
      { id: "m-p1", role: "agent" as const, content: "", createdAt: NOW, plan: approved },
    ]);
    const { hook } = await startTurn({ listConversationMessages: list }, { confirmPlanStep: vi.fn() });
    act(() => hook.result.current.selectConversation("c-1"));
    await waitFor(() => expect(row(hook, "plan:p-1")).toBeDefined());
    expect(row(hook, "plan:p-1")).toMatchObject({ steps: [{ id: "s1", state: "approved" }] });
  });
});

describe("useAgentChat ask card ids on done", () => {
  it("keeps the card's React key when done assigns the stored id", async () => {
    const { hook, handlers } = await startTurn();
    act(() => handlers.onAsk?.(ASK));
    const key = (hook.result.current.messages[1] as { clientKey: string }).clientKey;
    act(() => handlers.onDone("m-card"));
    expect(row(hook, "m-card")).toMatchObject({ clientKey: key });
    expect(key).toBe("ask:a-1");
  });

  it("maps EVERY ask card of a turn to its stored id, not only the first", async () => {
    const { hook, handlers } = await startTurn();
    act(() => handlers.onAsk?.(ASK));
    act(() => handlers.onAsk?.({ ...ASK, ask_id: "a-2", title: "Second" }));
    act(() => handlers.onDone("m-2", { ask_message_ids: { "a-1": "m-1", "a-2": "m-2" } }));
    expect(row(hook, "m-1")).toMatchObject({ askId: "a-1" });
    expect(row(hook, "m-2")).toMatchObject({ askId: "a-2" });
    expect(hook.result.current.messages.some((m) => m.id.startsWith("__ask__:"))).toBe(false);
  });

  it("without the map the card the turn ended on takes message_id and no card keeps a pending id", async () => {
    const { hook, handlers } = await startTurn();
    act(() => handlers.onAsk?.(ASK));
    act(() => handlers.onAsk?.({ ...ASK, ask_id: "a-2" }));
    act(() => handlers.onDone("m-2"));
    expect(row(hook, "m-2")).toMatchObject({ askId: "a-2" });
    const cards = hook.result.current.messages.filter((m) => "askId" in m);
    expect(cards).toHaveLength(2);
    expect(cards.some((m) => m.id.startsWith("__ask__:"))).toBe(false);
    expect(new Set(cards.map((m) => m.id)).size).toBe(2);
  });

  it("submitAsk refuses an earlier card that kept a local id: sends nothing and shows an error", async () => {
    const answerStream = vi.fn().mockResolvedValue(undefined);
    const { hook, handlers } = await startTurn({ streamAgentAskAnswer: answerStream });
    act(() => handlers.onAsk?.(ASK));
    act(() => handlers.onAsk?.({ ...ASK, ask_id: "a-2" }));
    act(() => handlers.onDone("m-2"));
    const earlier = hook.result.current.messages.find((m) => "askId" in m && m.askId === "a-1")!;
    expect(earlier.id.startsWith("local-")).toBe(true);
    act(() => hook.result.current.submitAsk(earlier.id, { q1: "dark" }));
    await flush();
    expect(answerStream).not.toHaveBeenCalled();
    expect(hook.result.current.error).toBe("ask_unlinked");
    expect(row(hook, earlier.id)).toMatchObject({ status: "pending" });
  });
});
