import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type {
  AgentChatClient,
  AgentConversation,
  AgentStreamHandlers,
} from "./client";
import { useAgentChat } from "./useAgentChat";

const NOW = new Date().toISOString();

function conv(over: Partial<AgentConversation> = {}): AgentConversation {
  return {
    id: "c-1",
    appId: null,
    title: "New chat",
    model: null,
    createdAt: NOW,
    updatedAt: NOW,
    ...over,
  };
}

function fakeClient(over: Partial<AgentChatClient> = {}): AgentChatClient {
  return {
    listConversations: vi.fn().mockResolvedValue({ items: [], nextCursor: null }),
    createConversation: vi.fn().mockResolvedValue(conv()),
    renameConversation: vi.fn().mockImplementation(async (id: string, title: string) =>
      conv({ id, title }),
    ),
    deleteConversation: vi.fn().mockResolvedValue(undefined),
    patchConversationModel: vi.fn().mockImplementation(async (id: string, model: string) =>
      conv({ id, model }),
    ),
    listConversationMessages: vi.fn().mockResolvedValue([]),
    fetchAgentModels: vi.fn().mockResolvedValue({ items: [] }),
    patchMessageFeedback: vi.fn().mockResolvedValue(undefined),
    streamAgentReply: vi.fn().mockResolvedValue(undefined),
    streamAgentRerun: vi.fn().mockResolvedValue(undefined),
    ...over,
  };
}

/** streamAgentReply/Rerun stub that hands the SSE handlers to the test and
 *  stays open until the test resolves it. */
function controlledStream() {
  let handlers: AgentStreamHandlers | undefined;
  let release: (() => void) | undefined;
  const fn = vi.fn().mockImplementation((...args: unknown[]) => {
    handlers = args.find(
      (a): a is AgentStreamHandlers => typeof a === "object" && a !== null && "onDelta" in a,
    );
    return new Promise<void>((resolve) => {
      release = resolve;
    });
  });
  return {
    fn,
    get handlers() {
      if (!handlers) throw new Error("stream not started");
      return handlers;
    },
    release: () => release?.(),
  };
}

const flush = () => act(async () => {});

describe("useAgentChat", () => {
  it("streams a reply: user bubble + placeholder, deltas accumulate, done swaps the persisted id", async () => {
    const stream = controlledStream();
    const client = fakeClient({ streamAgentReply: stream.fn });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));

    act(() => result.current.send("  hello  "));
    await flush();

    expect(client.createConversation).toHaveBeenCalledWith({ appId: null });
    expect(stream.fn).toHaveBeenCalledWith(
      "c-1",
      "hello",
      expect.anything(),
      expect.any(AbortSignal),
    );
    expect(result.current.messages).toEqual([
      expect.objectContaining({ role: "user", content: "hello" }),
      expect.objectContaining({ role: "agent", content: "", streaming: true }),
    ]);

    act(() => stream.handlers.onDelta("Hi "));
    act(() => stream.handlers.onDelta("there"));
    expect(result.current.messages[1]).toMatchObject({ content: "Hi there", streaming: true });

    act(() => stream.handlers.onDone("m-1"));
    stream.release();
    await flush();
    // A text-only reply keeps a single text segment alongside the flat content.
    expect(result.current.messages[1]).toEqual({
      id: "m-1",
      role: "agent",
      content: "Hi there",
      segments: [{ type: "text", text: "Hi there" }],
    });
    expect(result.current.error).toBeNull();
  });

  it("reuses the lazily created conversation on later sends", async () => {
    const client = fakeClient();
    const { result } = renderHook(() => useAgentChat(client, { appId: "app-1" }));

    act(() => result.current.send("one"));
    await flush();
    act(() => result.current.send("two"));
    await flush();

    expect(client.createConversation).toHaveBeenCalledTimes(1);
    expect(client.createConversation).toHaveBeenCalledWith({ appId: "app-1" });
    expect(client.streamAgentReply).toHaveBeenLastCalledWith(
      "c-1",
      "two",
      expect.anything(),
      expect.any(AbortSignal),
    );
  });

  it("send failure settles the pending bubble and reports send_failed", async () => {
    const client = fakeClient({
      createConversation: vi.fn().mockRejectedValue(new Error("boom")),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));

    act(() => result.current.send("hello"));
    await flush();

    expect(result.current.error).toBe("send_failed");
    // Pending placeholder dropped (no streamed text), user bubble kept.
    expect(result.current.messages).toEqual([
      expect.objectContaining({ role: "user", content: "hello" }),
    ]);
  });

  it("stream onError settles the pending bubble, keeping streamed text", async () => {
    const stream = controlledStream();
    const client = fakeClient({ streamAgentReply: stream.fn });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));

    act(() => result.current.send("hello"));
    await flush();
    act(() => stream.handlers.onDelta("partial"));
    act(() => stream.handlers.onError("reply_failed"));
    stream.release();
    await flush();

    expect(result.current.error).toBe("reply_failed");
    expect(result.current.messages[1]).toMatchObject({ role: "agent", content: "partial" });
    expect(result.current.messages[1].id).not.toBe("__pending__");
  });

  it("interleaves tool calls with response text in stream order, resolving in place", async () => {
    const stream = controlledStream();
    const client = fakeClient({ streamAgentReply: stream.fn });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));

    act(() => result.current.send("hello"));
    await flush();
    // text → tool → more text: the reply is ONE bubble whose ordered segments
    // preserve occurrence order (no top-level tool rows, no hoisting).
    act(() => stream.handlers.onDelta("Let me check. "));
    act(() => stream.handlers.onTool?.("analytics__summarize_views", "started"));
    act(() => stream.handlers.onDelta("Here's the result."));

    expect(result.current.messages).toHaveLength(2);
    const pending = result.current.messages[1];
    expect(pending).toMatchObject({ role: "agent", streaming: true });
    expect((pending as { content: string }).content).toBe(
      "Let me check. Here's the result.",
    );
    expect((pending as { segments: unknown }).segments).toEqual([
      { type: "text", text: "Let me check. " },
      {
        type: "tool",
        id: expect.any(String),
        tool: { moduleSlug: "analytics", tool: "summarize_views", status: "started" },
      },
      { type: "text", text: "Here's the result." },
    ]);

    // done/error resolves the matching started segment in place (no new row).
    act(() => stream.handlers.onTool?.("analytics__summarize_views", "done"));
    const segs = (result.current.messages[1] as { segments: { type: string; tool?: { status: string } }[] }).segments;
    expect(segs[1].tool?.status).toBe("done");
    expect(segs).toHaveLength(3);

    act(() => stream.handlers.onDone("m-1"));
    stream.release();
    await flush();
    // done keeps the interleaved segments and swaps in the persisted id.
    expect(result.current.messages[1]).toMatchObject({
      id: "m-1",
      role: "agent",
      content: "Let me check. Here's the result.",
    });
    expect(
      (result.current.messages[1] as { segments: unknown[] }).segments,
    ).toHaveLength(3);
  });

  it("drops an unresolved tool segment when the stream errors but keeps text", async () => {
    const stream = controlledStream();
    const client = fakeClient({ streamAgentReply: stream.fn });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));

    act(() => result.current.send("hello"));
    await flush();
    act(() => stream.handlers.onDelta("Working on it. "));
    act(() => stream.handlers.onTool?.("cms__publish", "started"));
    act(() => stream.handlers.onError("reply_failed"));
    stream.release();
    await flush();

    expect(result.current.error).toBe("reply_failed");
    const reply = result.current.messages[1] as {
      content: string;
      segments: { type: string }[];
    };
    expect(reply.content).toBe("Working on it. ");
    // The eternal-spinner tool segment is gone; the text segment survives.
    expect(reply.segments).toEqual([{ type: "text", text: "Working on it. " }]);
  });

  it("skips the history refresh when a send is superseded (aborted) by a newer send", async () => {
    const listConversations = vi.fn().mockResolvedValue({ items: [], nextCursor: null });
    const streamAgentReply = vi
      .fn()
      // First stream stays open until its signal aborts (like a real fetch).
      .mockImplementationOnce(
        (_c: string, _m: string, _h: AgentStreamHandlers, signal: AbortSignal) =>
          new Promise<void>((_resolve, reject) => {
            signal.addEventListener("abort", () => reject(new Error("aborted")));
          }),
      )
      .mockResolvedValue(undefined);
    const client = fakeClient({ listConversations, streamAgentReply });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));
    await flush();
    const mountCalls = listConversations.mock.calls.length;

    act(() => result.current.send("one"));
    await flush();
    act(() => result.current.send("two")); // aborts "one"
    await flush();

    // Only the second send's settle refreshes — the aborted one must not
    // fire a list request.
    expect(listConversations.mock.calls.length).toBe(mountCalls + 1);
  });

  // Seed a finished turn so a persisted agent reply ("m-1") exists to rerun.
  async function seedFirstTurn(
    result: { current: ReturnType<typeof useAgentChat> },
    reply: ReturnType<typeof controlledStream>,
  ) {
    act(() => result.current.send("hello"));
    await flush();
    act(() => reply.handlers.onDelta("old answer"));
    act(() => reply.handlers.onDone("m-1"));
    reply.release();
    await flush();
  }

  it("rerunMessage streams the replacement in place and swaps the persisted id", async () => {
    const reply = controlledStream();
    const rerun = controlledStream();
    const client = fakeClient({ streamAgentReply: reply.fn, streamAgentRerun: rerun.fn });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));
    await seedFirstTurn(result, reply);

    act(() => result.current.rerunMessage("m-1"));
    await flush();

    expect(rerun.fn).toHaveBeenCalledWith("c-1", "m-1", expect.anything(), expect.any(AbortSignal));
    // The old reply became the streaming placeholder, holding its position.
    expect(result.current.messages).toEqual([
      expect.objectContaining({ role: "user", content: "hello" }),
      expect.objectContaining({ role: "agent", content: "", streaming: true }),
    ]);

    act(() => rerun.handlers.onDelta("fresh"));
    act(() => rerun.handlers.onDone("m-2"));
    rerun.release();
    await flush();
    expect(result.current.messages[1]).toEqual({
      id: "m-2",
      role: "agent",
      content: "fresh",
      segments: [{ type: "text", text: "fresh" }],
    });
    expect(result.current.error).toBeNull();
  });

  it("rerun failure settles the pending bubble and reports send_failed", async () => {
    const reply = controlledStream();
    const client = fakeClient({
      streamAgentReply: reply.fn,
      streamAgentRerun: vi.fn().mockRejectedValue(new Error("boom")),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));
    await seedFirstTurn(result, reply);

    act(() => result.current.rerunMessage("m-1"));
    await flush();

    expect(result.current.error).toBe("send_failed");
    // The placeholder had no streamed text yet → dropped with the old reply.
    expect(result.current.messages).toEqual([
      expect.objectContaining({ role: "user", content: "hello" }),
    ]);
  });

  it("rerun 409 (message superseded) reloads the conversation instead of erroring", async () => {
    const reply = controlledStream();
    const client = fakeClient({
      streamAgentReply: reply.fn,
      streamAgentRerun: vi
        .fn()
        .mockRejectedValue(Object.assign(new Error("conflict"), { status: 409 })),
      listConversationMessages: vi.fn().mockResolvedValue([
        { id: "m-1", role: "user", content: "hello", createdAt: NOW },
        { id: "m-3", role: "agent", content: "winner", createdAt: NOW },
      ]),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));
    await seedFirstTurn(result, reply);

    act(() => result.current.rerunMessage("m-1"));
    await flush();

    expect(client.listConversationMessages).toHaveBeenCalledWith("c-1");
    expect(result.current.error).toBeNull();
    expect(result.current.messages).toEqual([
      { id: "m-1", role: "user", content: "hello" },
      { id: "m-3", role: "agent", content: "winner", feedback: undefined },
    ]);
  });

  it("selectConversation replays history, hiding superseded replies and mapping tool meta", async () => {
    const client = fakeClient({
      listConversationMessages: vi.fn().mockResolvedValue([
        { id: "m-1", role: "user", content: "q", createdAt: NOW },
        {
          id: "m-2",
          role: "tool",
          content: "",
          createdAt: NOW,
          meta: { module_id: "x", module_slug: "mod", tool: "do_it", error: "bad", duration_ms: 12 },
        },
        { id: "m-3", role: "agent", content: "old", createdAt: NOW, meta: { superseded_by: "m-4" } },
        { id: "m-4", role: "agent", content: "fresh", createdAt: NOW, meta: { feedback: "up" } },
      ]),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));

    act(() => result.current.selectConversation("c-9"));
    await flush();

    expect(client.listConversationMessages).toHaveBeenCalledWith("c-9");
    expect(result.current.messages).toEqual([
      { id: "m-1", role: "user", content: "q" },
      {
        id: "m-2",
        role: "tool",
        tool: {
          moduleSlug: "mod",
          tool: "do_it",
          status: "error",
          error: "bad",
          durationMs: 12,
          args: undefined,
          result: undefined,
        },
      },
      { id: "m-4", role: "agent", content: "fresh", feedback: "up" },
    ]);
  });

  it("rateMessage is optimistic and rolls back when the PATCH fails", async () => {
    const stream = controlledStream();
    const client = fakeClient({
      streamAgentReply: stream.fn,
      patchMessageFeedback: vi.fn().mockRejectedValue(new Error("nope")),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));

    act(() => result.current.send("hello"));
    await flush();
    act(() => stream.handlers.onDone("m-1"));
    stream.release();
    await flush();

    act(() => result.current.rateMessage("m-1", "up"));
    expect(result.current.messages[1]).toMatchObject({ feedback: "up" });
    expect(client.patchMessageFeedback).toHaveBeenCalledWith("c-1", "m-1", "up");

    await flush();
    expect(
      (result.current.messages[1] as { feedback?: unknown }).feedback,
    ).toBeUndefined();
  });

  it("groups history by recency with the provided labels", async () => {
    const client = fakeClient({
      listConversations: vi.fn().mockResolvedValue({
        items: [
          conv({ id: "c-1", title: "Fresh", updatedAt: NOW }),
          conv({ id: "c-2", title: "Ancient", updatedAt: "2001-01-01T00:00:00Z" }),
        ],
        nextCursor: null,
      }),
    });
    const { result } = renderHook(() =>
      useAgentChat(client, { appId: "app-1", labels: { history: { today: "今天" } } }),
    );

    await waitFor(() => expect(result.current.history).toBeDefined());
    expect(client.listConversations).toHaveBeenCalledWith({ appId: "app-1" });
    expect(result.current.history).toEqual([
      { label: "今天", items: [{ id: "c-1", title: "Fresh", updatedAt: NOW }] },
      { label: "Earlier", items: [{ id: "c-2", title: "Ancient", updatedAt: "2001-01-01T00:00:00Z" }] },
    ]);
  });

  it("renameConversation retitles optimistically and rolls back on failure", async () => {
    const client = fakeClient({
      listConversations: vi.fn().mockResolvedValue({
        items: [conv({ id: "c-1", title: "Old title", updatedAt: NOW })],
        nextCursor: null,
      }),
      renameConversation: vi.fn().mockRejectedValue(new Error("422")),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));
    await waitFor(() => expect(result.current.history).toBeDefined());

    act(() => result.current.renameConversation("c-1", "  New title  "));
    expect(result.current.history?.[0]?.items[0]?.title).toBe("New title");
    expect(client.renameConversation).toHaveBeenCalledWith("c-1", "New title");

    await flush();
    expect(result.current.history?.[0]?.items[0]?.title).toBe("Old title");
  });

  it("deleteConversation removes the history row optimistically and rolls back on failure", async () => {
    const client = fakeClient({
      listConversations: vi.fn().mockResolvedValue({
        items: [
          conv({ id: "c-1", title: "Keep me", updatedAt: NOW }),
          conv({ id: "c-2", title: "Delete me", updatedAt: NOW }),
        ],
        nextCursor: null,
      }),
      deleteConversation: vi.fn().mockRejectedValue(new Error("500")),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));
    await waitFor(() => expect(result.current.history).toBeDefined());

    act(() => result.current.deleteConversation("c-2"));
    expect(result.current.history?.[0]?.items.map((i) => i.id)).toEqual(["c-1"]);
    expect(client.deleteConversation).toHaveBeenCalledWith("c-2");

    await flush();
    expect(result.current.history?.[0]?.items.map((i) => i.id)).toEqual(["c-1", "c-2"]);
  });

  it("deleteConversation clears the open thread when the deleted id is active", async () => {
    const client = fakeClient({
      listConversations: vi.fn().mockResolvedValue({
        items: [conv({ id: "c-1", title: "Open one", updatedAt: NOW })],
        nextCursor: null,
      }),
      listConversationMessages: vi
        .fn()
        .mockResolvedValue([{ id: "m-1", role: "user", content: "hi", createdAt: NOW }]),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));
    await waitFor(() => expect(result.current.history).toBeDefined());

    act(() => result.current.selectConversation("c-1"));
    await waitFor(() => expect(result.current.messages.length).toBe(1));

    act(() => result.current.deleteConversation("c-1"));
    expect(result.current.messages).toEqual([]);
    expect(client.deleteConversation).toHaveBeenCalledWith("c-1");
  });

  it("maps the model roster and falls back to the server default selection", async () => {
    const client = fakeClient({
      fetchAgentModels: vi.fn().mockResolvedValue({
        items: [
          { id: "haiku", label: "Haiku", adapter: "a", enabled: true, price_in: 1, price_out: 5 },
          { id: "opus", label: "Opus", adapter: "a", enabled: false, price_in: 1.5, price_out: 9 },
        ],
        default_model_id: "haiku",
      }),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));

    await waitFor(() => expect(result.current.models).toBeDefined());
    expect(result.current.models).toEqual([
      { id: "haiku", label: "Haiku", detail: "$1/$5", disabled: false, disabledHint: undefined },
      {
        id: "opus",
        label: "Opus",
        detail: "$1.50/$9",
        disabled: true,
        disabledHint: "Currently unavailable",
      },
    ]);
    expect(result.current.selectedModelId).toBe("haiku");
  });

  it("selectModel pins the open conversation and reverts the pick when the PATCH fails", async () => {
    const client = fakeClient({
      patchConversationModel: vi.fn().mockRejectedValue(new Error("nope")),
    });
    const { result } = renderHook(() => useAgentChat(client, { appId: null }));

    act(() => result.current.send("hello"));
    await flush();

    act(() => result.current.selectModel("opus"));
    expect(result.current.selectedModelId).toBe("opus");
    expect(client.patchConversationModel).toHaveBeenCalledWith("c-1", "opus");

    await flush();
    expect(result.current.selectedModelId).toBeUndefined();
  });

  it("resets the thread when the scope changes", async () => {
    const client = fakeClient();
    const { result, rerender } = renderHook(
      ({ appId }: { appId: string | null }) => useAgentChat(client, { appId }),
      { initialProps: { appId: "app-1" as string | null } },
    );

    act(() => result.current.send("hello"));
    await flush();
    expect(result.current.messages).not.toHaveLength(0);

    rerender({ appId: "app-2" });
    await flush();
    expect(result.current.messages).toHaveLength(0);

    // Next send creates a conversation in the NEW scope.
    act(() => result.current.send("again"));
    await flush();
    expect(client.createConversation).toHaveBeenLastCalledWith({ appId: "app-2" });
  });

  it("does not fetch anything while disabled, and send is a no-op", async () => {
    const client = fakeClient();
    const { result } = renderHook(() => useAgentChat(client, { appId: null, enabled: false }));
    await flush();
    expect(client.fetchAgentModels).not.toHaveBeenCalled();
    expect(client.listConversations).not.toHaveBeenCalled();

    act(() => result.current.send("hello"));
    await flush();
    expect(client.createConversation).not.toHaveBeenCalled();
    expect(result.current.messages).toHaveLength(0);
  });
});
