import { render, act, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { ThemeProvider, useTheme } from "./ThemeProvider";

// Mock localStorage store
let store: Record<string, string> = {};

function setupMocks(mediaMatches = false) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockReturnValue({
      matches: mediaMatches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  });
  Object.defineProperty(window, "localStorage", {
    writable: true,
    value: {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
      get length() {
        return Object.keys(store).length;
      },
      key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    },
  });
}

beforeEach(() => {
  store = {};
  setupMocks();
  vi.spyOn(global, "fetch").mockRejectedValue(new Error("no api"));
});

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove("dark");
  vi.restoreAllMocks();
});

function TestConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button data-testid="set-dark" onClick={() => setTheme("dark")}>
        dark
      </button>
      <button data-testid="set-light" onClick={() => setTheme("light")}>
        light
      </button>
      <button data-testid="set-auto" onClick={() => setTheme("auto")}>
        auto
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  test("defaults to auto theme", () => {
    const { getByTestId } = render(
      <ThemeProvider apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId("theme").textContent).toBe("auto");
  });

  test("uses defaultTheme prop", () => {
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="dark" apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId("theme").textContent).toBe("dark");
    expect(getByTestId("resolved").textContent).toBe("dark");
  });

  test("reads theme from localStorage", () => {
    window.localStorage.setItem("theme", "dark");
    const { getByTestId } = render(
      <ThemeProvider apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId("theme").textContent).toBe("dark");
  });

  test("localStorage takes priority over defaultTheme", () => {
    window.localStorage.setItem("theme", "light");
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="dark" apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId("theme").textContent).toBe("light");
  });

  test("setTheme updates theme and persists to localStorage", () => {
    const { getByTestId } = render(
      <ThemeProvider apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );

    act(() => {
      getByTestId("set-dark").click();
    });

    expect(getByTestId("theme").textContent).toBe("dark");
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  test("applies .dark class to html for dark theme", () => {
    render(
      <ThemeProvider defaultTheme="dark" apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  test("removes .dark class for light theme", () => {
    document.documentElement.classList.add("dark");
    render(
      <ThemeProvider defaultTheme="light" apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  test("supports custom storageKey", () => {
    const { getByTestId } = render(
      <ThemeProvider storageKey="my-theme" apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );

    act(() => {
      getByTestId("set-dark").click();
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith("my-theme", "dark");
  });

  test("switching between themes works", () => {
    const { getByTestId } = render(
      <ThemeProvider apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );

    act(() => getByTestId("set-dark").click());
    expect(getByTestId("theme").textContent).toBe("dark");

    act(() => getByTestId("set-light").click());
    expect(getByTestId("theme").textContent).toBe("light");

    act(() => getByTestId("set-auto").click());
    expect(getByTestId("theme").textContent).toBe("auto");
  });

  test("resolvedTheme reflects system preference for auto", () => {
    setupMocks(true);

    const { getByTestId } = render(
      <ThemeProvider defaultTheme="auto" apiEndpoint="">
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(getByTestId("theme").textContent).toBe("auto");
    expect(getByTestId("resolved").textContent).toBe("dark");
  });
});

describe("useTheme", () => {
  test("throws when used outside ThemeProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
    spy.mockRestore();
  });
});
