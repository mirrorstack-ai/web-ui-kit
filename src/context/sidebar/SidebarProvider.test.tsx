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
    // default stands on the SSR/first pass, the stored value applies in an
    // effect. Guards against hydration mismatch.
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

    // The width state still reflects the default on the committed render — the
    // sidebar doesn't auto-open from a persisted width.
    expect(screen.getByTestId("width").textContent).toBe("0");
    // After mount, lastOpenWidth carries the rehydrated value for reopen.
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
});
