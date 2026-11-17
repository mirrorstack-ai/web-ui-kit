import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { AgentAskEvent, AgentChatClient, AgentPlanEvent, AgentStreamHandlers } from "./client";
import { useAgentChat } from "./useAgentChat";

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
async function startTurn(over: Partial<AgentChatClient> = {}) {
  let handlers!: AgentStreamHandlers;
  const client = {
    listConversations: vi.fn().mockResolvedValue({ items: [conv], nextCursor: null }),
    createConversation: vi.fn().mockResolvedValue(conv),
    listConversationMessages: vi.fn().mockResolvedValue([]),
    fetchAgentModels: vi.fn().mockResolvedValue({ items: [] }),
    streamAgentReply: vi.fn(async (_i, _c, h) => { handlers = h; }),
    ...over,
  } as unknown as AgentChatClient;
  const hook = renderHook(() => useAgentChat(client, { appId: null }));
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

  it("exposes approvePlanStep only when the client has it, and rolls back on failure", async () => {
    expect((await startTurn()).hook.result.current.approvePlanStep).toBeUndefined();
    const approve = vi.fn().mockRejectedValue(new Error("no"));
    const { hook, handlers } = await startTurn({ approvePlanStep: approve });
    act(() => handlers.onPlan?.(PLAN));
    act(() => hook.result.current.approvePlanStep?.("plan:p-1", "s1"));
    expect(approve).toHaveBeenCalledWith("p-1", "s1");
    await waitFor(() => expect((row(hook, "plan:p-1") as { steps: { state: string }[] }).steps[0].state).toBe("draft"));
  });
});
