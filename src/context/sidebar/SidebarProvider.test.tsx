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
