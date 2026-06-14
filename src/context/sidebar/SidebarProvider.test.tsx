import { cleanup, render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import {
  SidebarProvider,
  useSidebarWidth,
  SIDEBAR_WIDTH_STORAGE_KEY,
} from "./SidebarProvider";

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

function TestConsumer() {
  const { sidebarWidth, setSidebarWidth, lastOpenWidth } = useSidebarWidth();
  return (
    <div>
      <span data-testid="width">{sidebarWidth}</span>
      <span data-testid="last-open">{lastOpenWidth}</span>
      <button onClick={() => setSidebarWidth(500)}>Resize</button>
      <button onClick={() => setSidebarWidth(0)}>Close</button>
      <button onClick={() => setSidebarWidth(350)}>Collapse</button>
    </div>
  );
}

describe("SidebarProvider", () => {
  it("provides default width", () => {
    render(
      <SidebarProvider>
        <TestConsumer />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("width").textContent).toBe("350");
  });

  it("accepts custom default width", () => {
    render(
      <SidebarProvider defaultWidth={400}>
        <TestConsumer />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("width").textContent).toBe("400");
  });

  it("updates width", () => {
    render(
      <SidebarProvider>
        <TestConsumer />
      </SidebarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    expect(screen.getByTestId("width").textContent).toBe("500");
  });

  it("throws when used outside provider", () => {
    expect(() => render(<TestConsumer />)).toThrow(
      "useSidebarWidth must be used within a SidebarProvider",
    );
  });
});

describe("SidebarProvider persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("does not read localStorage at module load (SSR-safe — value applied after mount)", () => {
    // A pre-existing stored value must NOT bleed into the first render: the
    // default stands on the SSR/first pass, the stored value applies in a
    // post-mount effect. Guards against hydration mismatch.
    localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, "500");
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    render(
      <SidebarProvider
        defaultWidth={0}
        persistKey={SIDEBAR_WIDTH_STORAGE_KEY}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );

    // After mount, the persisted width is reconciled into the RENDERED state
    // (defect #1 fix: a persisted width is restored on reload, not stranded in
    // reopen memory). The functional updater seeds only from the default floor
    // (cur <= 0), so a persisted 500 over a defaultWidth of 0 applies here.
    expect(screen.getByTestId("width").textContent).toBe("500");
    // lastOpenWidth also carries the rehydrated value for reopen.
    expect(screen.getByTestId("last-open").textContent).toBe("500");
    getItem.mockRestore();
  });

  it("persists a resize and exposes it as lastOpenWidth", () => {
    render(
      <SidebarProvider
        defaultWidth={0}
        persistKey={SIDEBAR_WIDTH_STORAGE_KEY}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    expect(localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY)).toBe("500");
    expect(screen.getByTestId("last-open").textContent).toBe("500");
  });

  it("a close (width 0) does not erase the persisted open width", () => {
    render(
      <SidebarProvider
        defaultWidth={0}
        persistKey={SIDEBAR_WIDTH_STORAGE_KEY}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    act(() => {
      fireEvent.click(screen.getByText("Close"));
    });
    expect(screen.getByTestId("width").textContent).toBe("0");
    // lastOpenWidth and the stored value both survive the close.
    expect(screen.getByTestId("last-open").textContent).toBe("500");
    expect(localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY)).toBe("500");
  });

  it("a collapse (width === minOpenWidth) does not erase the persisted open width", () => {
    // AppShell collapses by setting the width to the floor (MIN_WIDTH ===
    // minOpenWidth). That floor value is the collapsed state, not a real open
    // width, so it must NOT overwrite the remembered drag size — otherwise
    // reopen falls back to the default and the user's chosen size is lost.
    render(
      <SidebarProvider
        defaultWidth={0}
        persistKey={SIDEBAR_WIDTH_STORAGE_KEY}
        minOpenWidth={350}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    act(() => {
      fireEvent.click(screen.getByText("Collapse"));
    });
    // The live width follows the collapse to the floor.
    expect(screen.getByTestId("width").textContent).toBe("350");
    // But the remembered open width (in memory AND storage) still holds the
    // user's dragged 500 — the collapse did not clobber it.
    expect(screen.getByTestId("last-open").textContent).toBe("500");
    expect(localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY)).toBe("500");
  });

  it("rehydrates a valid stored width", () => {
    localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, "480");
    render(
      <SidebarProvider
        defaultWidth={0}
        persistKey={SIDEBAR_WIDTH_STORAGE_KEY}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("last-open").textContent).toBe("480");
  });

  it("ignores an out-of-range stored width (above max), falling back to default", () => {
    localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, "5000");
    render(
      <SidebarProvider
        defaultWidth={0}
        persistKey={SIDEBAR_WIDTH_STORAGE_KEY}
        minOpenWidth={350}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("last-open").textContent).toBe("0");
  });

  it("ignores an out-of-range stored width (below min), falling back to default", () => {
    localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, "100");
    render(
      <SidebarProvider
        defaultWidth={0}
        persistKey={SIDEBAR_WIDTH_STORAGE_KEY}
        minOpenWidth={350}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("last-open").textContent).toBe("0");
  });

  it("ignores a corrupt stored value, falling back to default", () => {
    localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, "not-a-number");
    render(
      <SidebarProvider
        defaultWidth={0}
        persistKey={SIDEBAR_WIDTH_STORAGE_KEY}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("last-open").textContent).toBe("0");
  });

  it("does not persist when persistKey is omitted", () => {
    render(
      <SidebarProvider defaultWidth={0}>
        <TestConsumer />
      </SidebarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    expect(localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY)).toBeNull();
    // In-memory state still updates.
    expect(screen.getByTestId("last-open").textContent).toBe("500");
  });
});

describe("SidebarProvider injected server persistence (docs 12.4 + 13b)", () => {
  it("rehydrates lastOpenWidth from the injected get() on mount", async () => {
    const widthPersistence = { get: () => 480, set: vi.fn() };
    render(
      <SidebarProvider
        defaultWidth={0}
        widthPersistence={widthPersistence}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    // get() resolves via a microtask (it may be async).
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByTestId("last-open").textContent).toBe("480");
  });

  it("supports an async get()", async () => {
    const widthPersistence = { get: () => Promise.resolve(520), set: vi.fn() };
    render(
      <SidebarProvider
        defaultWidth={0}
        widthPersistence={widthPersistence}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(screen.getByTestId("last-open").textContent).toBe("520");
  });

  it("treats a 0 width from get() as the host-default sentinel (no rehydrate)", async () => {
    const widthPersistence = { get: () => 0, set: vi.fn() };
    render(
      <SidebarProvider
        defaultWidth={0}
        widthPersistence={widthPersistence}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    await act(async () => {
      await Promise.resolve();
    });
    // 0 < minOpenWidth (350) → ignored; the default stands.
    expect(screen.getByTestId("last-open").textContent).toBe("0");
  });

  it("writes a real open width through the injected set() and bypasses localStorage", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const set = vi.fn();
    render(
      <SidebarProvider
        defaultWidth={0}
        widthPersistence={{ get: () => 0, set }}
        // persistKey present but MUST be ignored — server persistence wins.
        persistKey={SIDEBAR_WIDTH_STORAGE_KEY}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    expect(set).toHaveBeenCalledWith(500);
    expect(localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY)).toBeNull();
    expect(
      setItem.mock.calls.some(([key]) => key === SIDEBAR_WIDTH_STORAGE_KEY),
    ).toBe(false);
    setItem.mockRestore();
  });

  it("a close/collapse does not call set() (the open width is preserved)", () => {
    const set = vi.fn();
    render(
      <SidebarProvider
        defaultWidth={0}
        widthPersistence={{ get: () => 0, set }}
        minOpenWidth={350}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    set.mockClear();
    act(() => {
      fireEvent.click(screen.getByText("Collapse"));
    });
    act(() => {
      fireEvent.click(screen.getByText("Close"));
    });
    // Neither the collapse (350 === floor) nor the close (0) is a real open
    // width — nothing is written back, so the remembered 500 sticks.
    expect(set).not.toHaveBeenCalled();
    expect(screen.getByTestId("last-open").textContent).toBe("500");
  });

  it("swallows a rejected set() without crashing", async () => {
    const set = vi.fn(() => Promise.reject(new Error("network")));
    render(
      <SidebarProvider
        defaultWidth={0}
        widthPersistence={{ get: () => 0, set }}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    await act(async () => {
      await Promise.resolve();
    });
    // The live width still updated despite the failed write.
    expect(screen.getByTestId("width").textContent).toBe("500");
    expect(set).toHaveBeenCalledWith(500);
  });

  it("leaves the default in place when get() rejects", async () => {
    const widthPersistence = {
      get: () => Promise.reject(new Error("offline")),
      set: vi.fn(),
    };
    render(
      <SidebarProvider
        defaultWidth={0}
        widthPersistence={widthPersistence}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(screen.getByTestId("last-open").textContent).toBe("0");
  });

  // ---- Bug 1 regression: the seed-vs-fetch width race on reload ----
  //
  // On reload SidebarProvider mounts with defaultWidth 0, so sidebarWidth and
  // lastOpenWidth are both 0. A NON-ZERO placeholder writer then runs BEFORE the
  // async width GET resolves — either AppShell's controlled-open half-viewport
  // seed, or (in web-applications) AgentSessionBridge's setSidebarWidth(350)
  // clobber. The old reconcile only seeded a default-0 width
  // (`cur <= 0 ? stored : cur`), so any non-zero placeholder won the race and
  // the saved width was discarded — reload reopened at the placeholder, not the
  // user's drag size. The fix overrides the placeholder with the fetched width
  // exactly once on first hydrate.
  it("overrides a non-zero placeholder seed with the fetched width on first hydrate (Bug 1)", async () => {
    // A controllable get() that resolves only when we say so — this is the
    // async round-trip that lands AFTER the synchronous placeholder seed.
    let resolveGet!: (width: number) => void;
    const get = vi.fn(
      () =>
        new Promise<number>((resolve) => {
          resolveGet = resolve;
        }),
    );
    render(
      <SidebarProvider
        defaultWidth={0}
        widthPersistence={{ get, set: vi.fn() }}
        minOpenWidth={350}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );

    // The mount effect calls get() inside a microtask — let it run so the
    // deferred resolver is wired, while the GET itself stays in flight.
    await act(async () => {
      await Promise.resolve();
    });
    expect(get).toHaveBeenCalledTimes(1);

    // Reproduce the racing placeholder writer (e.g. AgentSessionBridge's 350
    // clobber): a non-zero width is set while the GET is still in flight. 350
    // === minOpenWidth, so it is NOT a "real" open width — it must not be
    // allowed to defeat the saved width.
    act(() => {
      fireEvent.click(screen.getByText("Collapse"));
    });
    expect(screen.getByTestId("width").textContent).toBe("350");

    // Now the GET resolves to the user's saved drag width.
    await act(async () => {
      resolveGet(700);
      await Promise.resolve();
    });

    // The fetched width wins: it overrides the non-zero placeholder seed once.
    // (Old behavior: 350 stayed because `cur <= 0` was false.)
    expect(screen.getByTestId("width").textContent).toBe("700");
    expect(screen.getByTestId("last-open").textContent).toBe("700");
  });

  // A genuine user drag landing before the fetch is a REAL width and must win
  // over the late GET — "first REAL writer wins". The placeholder seed above
  // never reaches this path (it stays at/below the floor), so only an actual
  // drag claims hydration.
  it("a real pre-fetch user drag wins over the late fetched width (Bug 1, inverse)", async () => {
    let resolveGet!: (width: number) => void;
    const get = vi.fn(
      () =>
        new Promise<number>((resolve) => {
          resolveGet = resolve;
        }),
    );
    render(
      <SidebarProvider
        defaultWidth={0}
        widthPersistence={{ get, set: vi.fn() }}
        minOpenWidth={350}
        maxOpenWidth={2000}
      >
        <TestConsumer />
      </SidebarProvider>,
    );

    // Let the mount effect wire the deferred resolver (GET still in flight).
    await act(async () => {
      await Promise.resolve();
    });
    expect(get).toHaveBeenCalledTimes(1);

    // A real drag (500 > minOpenWidth) lands before the GET resolves.
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    expect(screen.getByTestId("width").textContent).toBe("500");

    await act(async () => {
      resolveGet(700);
      await Promise.resolve();
    });

    // The user's live drag is authoritative — the stale GET does not clobber it.
    expect(screen.getByTestId("width").textContent).toBe("500");
  });
});
