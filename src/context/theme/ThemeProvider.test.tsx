import { cleanup, render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import { ThemeProvider, useTheme, parentDomain, type Theme } from "./ThemeProvider";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(cleanup);

function TestConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("auto")}>Set Auto</button>
      {/* The cast is the POINT, not a convenience: `Theme` has no "system", and
          the only callers that pass it are untyped — a JSON fixture, a `?mock`
          profile, a theme-sync relay. Writing it any other way would test a
          value no real caller sends. */}
      <button onClick={() => setTheme("system" as Theme)}>Set System</button>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("ThemeProvider", () => {
  it("defaults to auto theme", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("auto");
  });

  it("sets theme and persists to localStorage", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Set Dark"));
    });
    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("reads from localStorage on mount", () => {
    localStorage.setItem("theme", "dark");
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  // 🔴 web-ui-kit#409. Every ?mock / /dev fixture carries theme "system" (the
  // word every OS-level setting uses), setTheme passed it through unmapped,
  // resolve() returned the literal, applyClass toggled `dark` OFF — and every
  // DARK preview rendered LIGHT. Production never saw it: the account API
  // answers only auto|light|dark, so the only path that hit this is the one
  // nobody reviews.
  it("normalizes the untyped 'system' the preview fixtures carry to auto", () => {
    const mq = vi.fn().mockReturnValue({
      matches: true, // OS prefers dark — so "auto" must resolve DARK
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.stubGlobal("matchMedia", mq);

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText("Set System"));

    expect(screen.getByTestId("theme").textContent).toBe("auto");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    // Persisted normalized too, or the next mount reads "system" back and the
    // bug returns one reload later.
    expect(localStorage.getItem("theme")).toBe("auto");
  });

  // The control for the test above: "system" must behave like "auto" in BOTH
  // directions, or the assertion above would pass against a setter that simply
  // forced dark.
  it("'system' follows the OS the same way auto does when the OS prefers light", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText("Set System"));

    expect(screen.getByTestId("theme").textContent).toBe("auto");
    expect(screen.getByTestId("resolved").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("throws when useTheme used outside provider", () => {
    expect(() => render(<TestConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
  });

  it("resolves to dark on mount when OS prefers dark and no preference is stored (incognito repro)", () => {
    (window.matchMedia as ReturnType<typeof vi.fn>).mockImplementation(
      (query: string) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    );

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});

describe("parentDomain (theme cookie sharing)", () => {
  it("strips the leftmost label so siblings share the cookie", () => {
    expect(parentDomain("apps.mirrorstack.ai")).toBe("mirrorstack.ai");
    expect(parentDomain("account.mirrorstack.ai")).toBe("mirrorstack.ai");
    expect(parentDomain("admin.acme.com")).toBe("acme.com");
    expect(parentDomain("apps.acme.co.uk")).toBe("acme.co.uk");
  });

  it("returns the host unchanged for an apex domain", () => {
    expect(parentDomain("mirrorstack.ai")).toBe("mirrorstack.ai");
  });

  it("stays host-only (undefined) for localhost, IPs, and single-label hosts", () => {
    expect(parentDomain("localhost")).toBeUndefined();
    expect(parentDomain("127.0.0.1")).toBeUndefined();
    expect(parentDomain("host")).toBeUndefined();
  });
});
