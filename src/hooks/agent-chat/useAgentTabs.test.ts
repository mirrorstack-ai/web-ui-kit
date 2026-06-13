import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  deriveTabTitles,
  isDraftTab,
  useAgentTabs,
  type AgentSidebarState,
  type AgentTabsPersistence,
} from "./useAgentTabs";

function state(over: Partial<AgentSidebarState> = {}): AgentSidebarState {
  return { open: true, activeTabId: "c-2", tabs: ["c-1", "c-2"], ...over };
}

function fakePersistence(initial: AgentSidebarState = state()) {
  const get = vi.fn().mockImplementation(async () => initial);
  const put = vi.fn().mockResolvedValue(undefined);
  const persistence: AgentTabsPersistence = { get, put };
  return { persistence, get, put };
}

const flush = () => act(async () => {});
const advance = (ms: number) =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe("useAgentTabs", () => {
  it("hydrates on mount: tabs, active tab, and open flag restored; the initial draft placeholder is replaced", async () => {
    const { persistence, get, put } = fakePersistence(state());
    const { result } = renderHook(() => useAgentTabs(persistence));

    // Pre-hydration: a single local draft, closed.
    expect(result.current.tabs).toHaveLength(1);
    expect(isDraftTab(result.current.tabs[0])).toBe(true);
    expect(result.current.hydrated).toBe(false);

    await flush();

    expect(get).toHaveBeenCalledTimes(1);
    expect(result.current.hydrated).toBe(true);
    expect(result.current.tabs).toEqual(["c-1", "c-2"]);
    expect(result.current.activeTabId).toBe("c-2");
    expect(result.current.open).toBe(true);
    // Hydration is not a mutation — nothing to PUT.
    await advance(5000);
    expect(put).not.toHaveBeenCalled();
  });

  it("hydrate drops ids the host can't resolve (deleted conversations heal silently)", async () => {
    const { persistence } = fakePersistence(state({ tabs: ["gone", "c-1"], activeTabId: "gone" }));
    const resolveTabs = vi.fn().mockResolvedValue(["c-1"]);
    const { result } = renderHook(() => useAgentTabs(persistence, { resolveTabs }));

    await flush();

    expect(resolveTabs).toHaveBeenCalledWith(["gone", "c-1"]);
    expect(result.current.tabs).toEqual(["c-1"]);
    // The persisted active didn't survive — focus falls to the first tab.
    expect(result.current.activeTabId).toBe("c-1");
  });

  it("hydrating an empty session keeps the fresh draft strip", async () => {
    const { persistence, put } = fakePersistence(state({ open: false, tabs: [], activeTabId: null }));
    const { result } = renderHook(() => useAgentTabs(persistence));

    await flush();

    expect(result.current.hydrated).toBe(true);
    expect(result.current.tabs).toHaveLength(1);
    expect(isDraftTab(result.current.tabs[0])).toBe(true);
    await advance(5000);
    expect(put).not.toHaveBeenCalled();
  });

  it("debounces mutations into ONE trailing PUT carrying the final state", async () => {
    const { persistence, put } = fakePersistence();
    const { result } = renderHook(() => useAgentTabs(persistence));
    await flush();

    act(() => {
      result.current.openConversation("c-3");
      result.current.moveTab("c-3", 0);
      result.current.selectTab("c-1");
    });
    // Inside the window: nothing flushed yet.
    await advance(900);
    expect(put).not.toHaveBeenCalled();
    // A late mutation re-arms the trailing edge.
    act(() => result.current.setOpen(false));
    await advance(900);
    expect(put).not.toHaveBeenCalled();

    await advance(200);
    expect(put).toHaveBeenCalledTimes(1);
    expect(put).toHaveBeenCalledWith({
      open: false,
      activeTabId: "c-1",
      tabs: ["c-3", "c-1", "c-2"],
    });
  });

  it("closing a tab persists the removal (close ≠ delete, gone after reload)", async () => {
    const { persistence, put } = fakePersistence();
    const { result } = renderHook(() => useAgentTabs(persistence));
    await flush();

    act(() => result.current.closeTab("c-2"));

    // Active tab closed → left neighbor takes focus (rightmost closed).
    expect(result.current.tabs).toEqual(["c-1"]);
    expect(result.current.activeTabId).toBe("c-1");
    await advance(1100);
    expect(put).toHaveBeenCalledTimes(1);
    expect(put).toHaveBeenCalledWith({ open: true, activeTabId: "c-1", tabs: ["c-1"] });
  });

  it("refetches on focus and adopts the remote state, keeping local drafts", async () => {
    let remote = state();
    const get = vi.fn().mockImplementation(async () => remote);
    const put = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useAgentTabs({ get, put }));
    await flush();

    // A local draft exists on this host only — refetch must not drop it.
    act(() => result.current.newTab());
    const draftId = result.current.activeTabId;
    expect(isDraftTab(draftId)).toBe(true);
    // Focusing the draft nulls the persisted active — settle that PUT so
    // no flush is pending when the window refocuses.
    await advance(1100);

    // Another host closed c-2 and switched the active tab.
    remote = state({ tabs: ["c-1"], activeTabId: "c-1" });
    act(() => {
      window.dispatchEvent(new Event("focus"));
    });
    await flush();

    expect(get).toHaveBeenCalledTimes(2);
    expect(result.current.tabs).toEqual(["c-1", draftId]);
    // The locally active tab survived — focus stays put.
    expect(result.current.activeTabId).toBe(draftId);
  });

  it("skips the focus refetch while a local mutation is pending flush", async () => {
    const { persistence, get, put } = fakePersistence();
    const { result } = renderHook(() => useAgentTabs(persistence));
    await flush();

    act(() => result.current.selectTab("c-1"));
    act(() => {
      window.dispatchEvent(new Event("focus"));
    });
    await flush();

    // No GET fires beyond hydration — local state wins and the debounce
    // later PUTs it.
    expect(get).toHaveBeenCalledTimes(1);
    expect(result.current.activeTabId).toBe("c-1");
    await advance(1100);
    expect(put).toHaveBeenCalledTimes(1);
    expect(put).toHaveBeenCalledWith(state({ activeTabId: "c-1" }));
  });

  it("a failed PUT keeps local state authoritative: focus refetch can't clobber it, the next mutation re-PUTs", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { persistence, get, put } = fakePersistence();
    put.mockRejectedValueOnce(new Error("boom"));
    const { result } = renderHook(() => useAgentTabs(persistence));
    await flush();

    act(() => result.current.selectTab("c-1"));
    await advance(1100);
    expect(put).toHaveBeenCalledTimes(1);

    // The mutation never reached the server — a focus refetch must not
    // replace it with the stale remote state.
    act(() => {
      window.dispatchEvent(new Event("focus"));
    });
    await flush();
    expect(get).toHaveBeenCalledTimes(1);
    expect(result.current.activeTabId).toBe("c-1");

    // The next mutation re-PUTs the full state; once synced, refetches
    // resume.
    act(() => result.current.setOpen(false));
    await advance(1100);
    expect(put).toHaveBeenCalledTimes(2);
    expect(put).toHaveBeenLastCalledWith(state({ open: false, activeTabId: "c-1" }));
    act(() => {
      window.dispatchEvent(new Event("focus"));
    });
    await flush();
    expect(get).toHaveBeenCalledTimes(2);
    errorSpy.mockRestore();
  });

  it("refetch keeps an interleaved draft in place while adopting remote order", async () => {
    let remote = state();
    const get = vi.fn().mockImplementation(async () => remote);
    const put = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useAgentTabs({ get, put }));
    await flush();

    // Insert a draft BETWEEN the two conversation tabs.
    act(() => result.current.newTab());
    const draftId = result.current.activeTabId;
    act(() => result.current.moveTab(draftId, 1));
    expect(result.current.tabs).toEqual(["c-1", draftId, "c-2"]);
    await advance(1100); // settle the PUT so the refetch isn't skipped

    // Another host reordered the conversation tabs.
    remote = state({ tabs: ["c-2", "c-1"], activeTabId: "c-1" });
    act(() => {
      window.dispatchEvent(new Event("focus"));
    });
    await flush();

    // The draft stays at strip position 1; survivors adopt remote order.
    expect(result.current.tabs).toEqual(["c-2", draftId, "c-1"]);
    expect(result.current.activeTabId).toBe(draftId);
  });

  it("never persists draft tabs: draft-only changes don't PUT, bindDraft persists the real id", async () => {
    const { persistence, put } = fakePersistence();
    const { result } = renderHook(() => useAgentTabs(persistence));
    await flush();

    // Opening (then focusing) a draft tab flips the persisted active to
    // null — that PUT must carry conversation ids only.
    act(() => result.current.newTab());
    const draftId = result.current.activeTabId;
    await advance(1100);
    expect(put).toHaveBeenCalledTimes(1);
    expect(put).toHaveBeenCalledWith({ open: true, activeTabId: null, tabs: ["c-1", "c-2"] });

    // Closing the draft restores the persisted projection — no second PUT.
    act(() => result.current.closeTab(draftId));
    act(() => result.current.newTab());
    const secondDraft = result.current.activeTabId;
    await advance(1100);
    expect(put).toHaveBeenCalledTimes(1);

    // First send created the conversation: the draft rebinds and persists.
    act(() => result.current.bindDraft(secondDraft, "c-9"));
    expect(result.current.tabs).toEqual(["c-1", "c-2", "c-9"]);
    expect(result.current.activeTabId).toBe("c-9");
    await advance(1100);
    expect(put).toHaveBeenCalledTimes(2);
    expect(put).toHaveBeenLastCalledWith({
      open: true,
      activeTabId: "c-9",
      tabs: ["c-1", "c-2", "c-9"],
    });
    for (const call of put.mock.calls) {
      const persisted = call[0] as AgentSidebarState;
      expect(persisted.tabs.some(isDraftTab)).toBe(false);
      expect(persisted.activeTabId === null || !isDraftTab(persisted.activeTabId)).toBe(true);
    }
  });

  it("runs local-only without persistence (stories/mocks): hydrated immediately, strip still works", async () => {
    const { result } = renderHook(() => useAgentTabs(null));
    await flush();

    expect(result.current.hydrated).toBe(true);
    act(() => result.current.openConversation("c-1"));
    expect(result.current.tabs).toContain("c-1");
  });

  it("gates on enabled: no GET until the session is ready", async () => {
    const { persistence, get } = fakePersistence();
    const { result, rerender } = renderHook(
      ({ enabled }) => useAgentTabs(persistence, { enabled }),
      { initialProps: { enabled: false } },
    );
    await flush();
    expect(get).not.toHaveBeenCalled();
    expect(result.current.hydrated).toBe(false);

    rerender({ enabled: true });
    await flush();
    expect(get).toHaveBeenCalledTimes(1);
    expect(result.current.tabs).toEqual(["c-1", "c-2"]);
  });

  it("flushes a pending mutation on unmount", async () => {
    const { persistence, put } = fakePersistence();
    const { result, unmount } = renderHook(() => useAgentTabs(persistence));
    await flush();

    act(() => result.current.selectTab("c-1"));
    unmount();

    // The cleanup fires the PUT synchronously — the debounce window must
    // not swallow the last mutation on navigation.
    expect(put).toHaveBeenCalledTimes(1);
    expect(put).toHaveBeenCalledWith(state({ activeTabId: "c-1" }));
  });
});

describe("deriveTabTitles", () => {
  it("maps ids to history titles, drafts and unknown ids fall back to the draft title", () => {
    const history = [
      { items: [{ id: "c-1", title: "Billing question" }] },
      { items: [{ id: "c-2", title: "Deploy help" }] },
    ];
    expect(deriveTabTitles(["c-2", "draft-x", "c-7"], history, "New chat")).toEqual([
      { id: "c-2", title: "Deploy help" },
      { id: "draft-x", title: "New chat" },
      { id: "c-7", title: "New chat" },
    ]);
    expect(deriveTabTitles(["c-1"], undefined, "New chat")).toEqual([
      { id: "c-1", title: "New chat" },
    ]);
  });
});
