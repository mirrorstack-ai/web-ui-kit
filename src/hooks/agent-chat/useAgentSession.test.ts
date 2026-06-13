import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SidebarWidthPersistence } from "@/context/sidebar/SidebarProvider";
import type {
  AgentChatClient,
  AgentConversation,
  AgentStreamHandlers,
} from "./client";
import type { AgentSidebarState, AgentSidebarTab, AgentTabsPersistence } from "./useAgentTabs";
import { isDraftTab } from "./useAgentTabs";
import { useAgentSession, type UseAgentSessionDeps } from "./useAgentSession";

const NOW = new Date().toISOString();

function conv(over: Partial<AgentConversation> = {}): AgentConversation {
  return {
    id: "c-new",
    appId: null,
    title: "New chat",
    model: null,
    createdAt: NOW,
    updatedAt: NOW,
    ...over,
  };
}

const tab = (id: string, order: number, title = ""): AgentSidebarTab => ({
  id,
  conversationId: id,
  title,
  order,
});

function emptyState(over: Partial<AgentSidebarState> = {}): AgentSidebarState {
  return { open: false, activeTabId: null, tabs: [], width: 0, ...over };
}

function fakeTabsPersistence(initial: AgentSidebarState = emptyState()) {
  const get = vi.fn().mockResolvedValue(initial);
  const put = vi.fn().mockResolvedValue(undefined);
  const persistence: AgentTabsPersistence = { get, put };
  return { persistence, get, put };
}

function fakeChatClient(over: Partial<AgentChatClient> = {}): AgentChatClient {
  return {
    listConversations: vi.fn().mockResolvedValue({ items: [], nextCursor: null }),
    createConversation: vi.fn().mockResolvedValue(conv()),
    renameConversation: vi
      .fn()
      .mockImplementation(async (id: string, title: string) => conv({ id, title })),
    patchConversationModel: vi
      .fn()
      .mockImplementation(async (id: string, model: string) => conv({ id, model })),
    listConversationMessages: vi.fn().mockResolvedValue([]),
    fetchAgentModels: vi.fn().mockResolvedValue({ items: [] }),
    patchMessageFeedback: vi.fn().mockResolvedValue(undefined),
    streamAgentReply: vi.fn().mockResolvedValue(undefined),
    streamAgentRerun: vi.fn().mockResolvedValue(undefined),
    ...over,
  };
}

/** streamAgentReply stub that hands the SSE handlers to the test and stays
 *  open until released. */
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

const labels = {
  history: { today: "Today", yesterday: "Yesterday", thisWeek: "This week", earlier: "Earlier" },
  modelDisabledHint: "Unavailable",
  newChat: "New chat",
};

function makeDeps(over: Partial<UseAgentSessionDeps> = {}): UseAgentSessionDeps {
  return {
    chatClient: fakeChatClient(),
    persistence: fakeTabsPersistence().persistence,
    widthPersistence: { get: () => 0, set: vi.fn() },
    listAllConversationIds: vi.fn().mockResolvedValue([]),
    probeConversation: vi.fn().mockResolvedValue(undefined),
    labels,
    enabled: true,
    ...over,
  };
}

const flush = () => act(async () => {});

describe("useAgentSession", () => {
  it("binds a draft to its conversation IN PLACE on the first send (scope key stays stable)", async () => {
    const stream = controlledStream();
    const created = conv({ id: "c-created" });
    const createConversation = vi.fn().mockResolvedValue(created);
    const chatClient = fakeChatClient({ createConversation, streamAgentReply: stream.fn });
    const { put } = fakeTabsPersistence();
    const tabsPersistence: AgentTabsPersistence = {
      get: vi.fn().mockResolvedValue(emptyState()),
      put,
    };
    const deps = makeDeps({ chatClient, persistence: tabsPersistence });

    const { result } = renderHook(() => useAgentSession(deps));
    await flush(); // hydrate → fresh draft strip

    const draftId = result.current.activeTabId;
    expect(isDraftTab(draftId)).toBe(true);

    act(() => result.current.send("hello"));
    await flush();

    // The wrapped client created the conversation and rebound the draft tab
    // to the real id in place — same single tab, now the conversation id.
    expect(createConversation).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(result.current.activeTabId).toBe("c-created"));
    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.tabs[0].id).toBe("c-created");
    expect(isDraftTab(result.current.tabs[0].id)).toBe(false);

    // The streaming first reply survived the flip (scopeKey pinned to the
    // draft id), so the placeholder is still present and streaming.
    expect(result.current.messages.some((m) => m.role === "agent" && m.streaming)).toBe(true);
    // No replay reload was triggered for the rebound tab.
    expect(chatClient.listConversationMessages).not.toHaveBeenCalled();

    act(() => stream.handlers.onDone("m-1"));
    stream.release();
    await flush();
  });

  it("forwards the injected appId into createConversation and listConversations", async () => {
    const listConversations = vi.fn().mockResolvedValue({ items: [], nextCursor: null });
    const created = conv({ id: "c-app", appId: "app-uuid" });
    const createConversation = vi.fn().mockResolvedValue(created);
    const stream = controlledStream();
    const chatClient = fakeChatClient({
      listConversations,
      createConversation,
      streamAgentReply: stream.fn,
    });
    const deps = makeDeps({
      chatClient,
      persistence: { get: vi.fn().mockResolvedValue(emptyState()), put: vi.fn().mockResolvedValue(undefined) },
      appId: "app-uuid",
    });

    const { result } = renderHook(() => useAgentSession(deps));
    await flush();

    // History is listed for the injected scope, not account-level (null).
    expect(listConversations).toHaveBeenCalledWith({ appId: "app-uuid" });

    act(() => result.current.send("hello"));
    await flush();

    // The lazy-created conversation is filed under the injected app scope.
    expect(createConversation).toHaveBeenCalledWith(
      expect.objectContaining({ appId: "app-uuid" }),
    );

    act(() => stream.handlers.onDone("m-1"));
    stream.release();
    await flush();
  });

  it("releases the draft pin after the first reply settles (round-trip tab switch reloads once, then keys off the real id)", async () => {
    const stream = controlledStream();
    const created = conv({ id: "c-created" });
    const createConversation = vi.fn().mockResolvedValue(created);
    const chatClient = fakeChatClient({ createConversation, streamAgentReply: stream.fn });
    // A second pre-existing conversation to switch away to and back from.
    const hydrated = emptyState({ open: true, activeTabId: null, tabs: [tab("c-other", 0)] });
    const deps = makeDeps({
      chatClient,
      persistence: { get: vi.fn().mockResolvedValue(hydrated), put: vi.fn().mockResolvedValue(undefined) },
      listAllConversationIds: vi.fn().mockResolvedValue(["c-other"]),
    });

    const { result } = renderHook(() => useAgentSession(deps));
    await flush();

    // Start a brand-new draft tab and send — the draft binds to c-created.
    act(() => result.current.newTab());
    await flush();
    act(() => result.current.send("hello"));
    await flush();
    await waitFor(() => expect(result.current.activeTabId).toBe("c-created"));

    // Finish the first reply: the pin is released here.
    act(() => stream.handlers.onDone("m-1"));
    stream.release();
    await flush();

    // Releasing the pin flips scopeKey draft → c-created, so the replay loads
    // exactly once at settle (the conversation is now persisted, so this is
    // benign — same finalized thread).
    const loadsOf = (id: string) =>
      (chatClient.listConversationMessages as ReturnType<typeof vi.fn>).mock.calls.filter(
        (c) => c[0] === id,
      ).length;
    await waitFor(() => expect(loadsOf("c-created")).toBe(1));

    // Switch away to the other tab, then back to the draft-born tab.
    act(() => result.current.selectTab("c-other"));
    await flush();
    act(() => result.current.selectTab("c-created"));
    await flush();

    // The round-trip adds EXACTLY one more c-created load — a normal tab
    // switch. With the pin left in place, activeScopeId would still resolve to
    // the dead draft id on the return render, so the tab would never key off
    // its real conversation id (the regression this guards).
    expect(loadsOf("c-created")).toBe(2);
  });

  it("closing the pending draft before the create lands cancels the bind", async () => {
    let releaseCreate: ((c: AgentConversation) => void) | undefined;
    const createConversation = vi.fn().mockImplementation(
      () =>
        new Promise<AgentConversation>((resolve) => {
          releaseCreate = resolve;
        }),
    );
    const stream = controlledStream();
    const chatClient = fakeChatClient({ createConversation, streamAgentReply: stream.fn });
    const deps = makeDeps({
      chatClient,
      persistence: { get: vi.fn().mockResolvedValue(emptyState()), put: vi.fn().mockResolvedValue(undefined) },
    });

    const { result } = renderHook(() => useAgentSession(deps));
    await flush();
    const draftId = result.current.activeTabId;

    act(() => result.current.send("hi"));
    await flush();
    // Create is in flight; close the draft tab before it resolves.
    act(() => result.current.closeTab(draftId));
    await flush();

    // Resolve the create AFTER the draft is gone — bindDraft must no-op (the
    // draft tab no longer exists), so the new id is NOT adopted as a tab.
    act(() => releaseCreate?.(conv({ id: "c-orphan" })));
    await flush();

    expect(result.current.tabs.some((tt) => tt.id === "c-orphan")).toBe(false);
    // Closing the only tab fell back to a fresh draft.
    expect(isDraftTab(result.current.activeTabId)).toBe(true);

    stream.release();
    await flush();
  });

  it("resolution probes off-list ids, drops 404s, and caches resolved ids", async () => {
    const hydrated = emptyState({
      open: true,
      activeTabId: "c-live",
      tabs: [tab("c-live", 0), tab("c-gone", 1)],
    });
    const listAllConversationIds = vi.fn().mockResolvedValue([]); // neither on the global list
    const probeConversation = vi.fn().mockImplementation(async (id: string) => {
      if (id === "c-gone") throw Object.assign(new Error("not found"), { status: 404 });
      // c-live exists.
    });
    const deps = makeDeps({
      persistence: { get: vi.fn().mockResolvedValue(hydrated), put: vi.fn().mockResolvedValue(undefined) },
      listAllConversationIds,
      probeConversation,
    });

    const { result } = renderHook(() => useAgentSession(deps));
    await flush();

    // Both ids fell off the global list → both probed; the 404 dropped.
    expect(probeConversation).toHaveBeenCalledWith("c-live");
    expect(probeConversation).toHaveBeenCalledWith("c-gone");
    await waitFor(() => expect(result.current.tabs.map((tt) => tt.id)).toEqual(["c-live"]));

    // c-live cached this session: a refetch (focus, server still reports both
    // ids) re-probes only the unresolved c-gone, never the cached c-live.
    probeConversation.mockClear();
    act(() => window.dispatchEvent(new Event("focus")));
    await flush();
    expect(probeConversation).toHaveBeenCalledWith("c-gone");
    expect(probeConversation).not.toHaveBeenCalledWith("c-live");
  });

  it("resetKey change focuses a fresh draft tab", async () => {
    const hydrated = emptyState({
      open: true,
      activeTabId: "c-live",
      tabs: [tab("c-live", 0)],
    });
    const deps = makeDeps({
      persistence: { get: vi.fn().mockResolvedValue(hydrated), put: vi.fn().mockResolvedValue(undefined) },
      listAllConversationIds: vi.fn().mockResolvedValue(["c-live"]),
      resetKey: "app-a",
    });

    const { result, rerender } = renderHook(
      (p: { resetKey?: string }) => useAgentSession({ ...deps, resetKey: p.resetKey }),
      { initialProps: { resetKey: "app-a" } },
    );
    await flush();
    expect(result.current.activeTabId).toBe("c-live");

    // Navigate to a different app — a fresh draft tab takes focus.
    act(() => rerender({ resetKey: "app-b" }));
    await flush();
    expect(isDraftTab(result.current.activeTabId)).toBe(true);
    // The conversation tab survived the navigation (global strip).
    expect(result.current.tabs.some((tt) => tt.id === "c-live")).toBe(true);
  });

  it("passes the injected width persistence straight through", async () => {
    const widthPersistence: SidebarWidthPersistence = { get: () => 321, set: vi.fn() };
    const deps = makeDeps({ widthPersistence });
    const { result } = renderHook(() => useAgentSession(deps));
    await flush();
    expect(result.current.widthPersistence).toBe(widthPersistence);
  });

  it("does not clobber the persisted open flag (carried through PUTs)", async () => {
    const put = vi.fn().mockResolvedValue(undefined);
    const hydrated = emptyState({ open: true, activeTabId: "c-1", tabs: [tab("c-1", 0)] });
    const deps = makeDeps({
      persistence: { get: vi.fn().mockResolvedValue(hydrated), put },
      listAllConversationIds: vi.fn().mockResolvedValue(["c-1"]),
    });
    const { result } = renderHook(() => useAgentSession(deps));
    await flush();
    expect(result.current.open).toBe(true);

    // A tab mutation PUTs the full record — the open flag rides along untouched.
    act(() => result.current.newTab());
    await act(async () => {
      await new Promise((r) => setTimeout(r, 1100));
    });
    expect(put).toHaveBeenCalled();
    const lastPut = put.mock.calls.at(-1)?.[0] as AgentSidebarState;
    expect(lastPut.open).toBe(true);
  });
});
