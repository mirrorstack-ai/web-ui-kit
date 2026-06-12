import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import type { AgentChatMessage } from "./useAgentChat";
import { useQueuedAgentSend } from "./useQueuedAgentSend";

const STREAMING: AgentChatMessage[] = [
  { id: "m-1", role: "user", content: "q" },
  { id: "__pending__", role: "agent", content: "", streaming: true },
];
const IDLE: AgentChatMessage[] = [
  { id: "m-1", role: "user", content: "q" },
  { id: "m-2", role: "agent", content: "a" },
];

/** Faithful stand-in for useAgentChat: send() raises the streaming flag
 *  synchronously (like the real hook's placeholder append); settle()
 *  finishes the stream. */
function setup(initialMessages: AgentChatMessage[] = IDLE) {
  const sent: string[] = [];
  const hook = renderHook(
    ({ scopeKey }: { scopeKey: string | null }) => {
      const [messages, setMessages] = useState(initialMessages);
      const queue = useQueuedAgentSend(
        {
          messages,
          send: (m) => {
            sent.push(m);
            setMessages(STREAMING);
          },
        },
        scopeKey,
      );
      return { ...queue, settle: () => setMessages(IDLE) };
    },
    { initialProps: { scopeKey: null as string | null } },
  );
  return { sent, ...hook };
}

describe("useQueuedAgentSend", () => {
  it("sends straight through when no reply is streaming", () => {
    const { result, sent } = setup();
    act(() => result.current.send("  hello  "));
    expect(sent).toEqual(["hello"]);
    expect(result.current.queued).toHaveLength(0);
  });

  it("ignores blank messages", () => {
    const { result, sent } = setup();
    act(() => result.current.send("   "));
    expect(sent).toEqual([]);
    expect(result.current.queued).toHaveLength(0);
  });

  it("queues while streaming, flushing one message per settled turn", () => {
    const { result, sent } = setup(STREAMING);

    act(() => result.current.send("first"));
    act(() => result.current.send("second"));
    expect(sent).toEqual([]);
    expect(result.current.queued.map((q) => q.text)).toEqual(["first", "second"]);

    // Stream settles → head goes out and re-raises the streaming flag,
    // so the rest waits for the next turn.
    act(() => result.current.settle());
    expect(sent).toEqual(["first"]);
    expect(result.current.queued.map((q) => q.text)).toEqual(["second"]);

    act(() => result.current.settle());
    expect(sent).toEqual(["first", "second"]);
    expect(result.current.queued).toHaveLength(0);
  });

  it("cancelQueued removes one queued message", () => {
    const { result } = setup(STREAMING);
    act(() => result.current.send("first"));
    act(() => result.current.send("second"));

    const id = result.current.queued[0].id;
    act(() => result.current.cancelQueued(id));
    expect(result.current.queued.map((q) => q.text)).toEqual(["second"]);
  });

  it("drops the queue on scope change", () => {
    const { result, rerender, sent } = setup(STREAMING);
    act(() => result.current.send("leftover"));
    expect(result.current.queued).toHaveLength(1);

    rerender({ scopeKey: "app-2" });
    expect(result.current.queued).toHaveLength(0);
    expect(sent).toEqual([]);
  });
});
