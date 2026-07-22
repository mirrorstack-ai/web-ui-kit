import { cleanup, render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import { ThemeProvider, useTheme, parentDomain } from "./ThemeProvider";

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
