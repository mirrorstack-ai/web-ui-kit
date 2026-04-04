import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isDev } from "@/utils/env";

export type Theme = "light" | "dark" | "auto";

export interface ThemeContextValue {
  /** Current theme preference (light | dark | auto) */
  readonly theme: Theme;
  /** Resolved theme after evaluating system preference (light | dark) */
  readonly resolvedTheme: "light" | "dark";
  /** Update the theme preference */
  readonly setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  readonly children: ReactNode;
  /** Initial theme override (defaults to localStorage or "auto") */
  readonly defaultTheme?: Theme;
  /** localStorage key for persisting theme */
  readonly storageKey?: string;
  /** API endpoint to fetch/sync user preferences */
  readonly apiEndpoint?: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY_DEFAULT = "theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "auto" ? getSystemTheme() : theme;
}

function readStoredTheme(key: string): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(key);
    if (stored === "light" || stored === "dark" || stored === "auto") {
      return stored;
    }
  } catch {
    // localStorage may be unavailable
  }
  return null;
}

function applyThemeClass(resolved: "light" | "dark") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({
  children,
  defaultTheme,
  storageKey = STORAGE_KEY_DEFAULT,
  apiEndpoint = "/v1/auth/me/preferences",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = readStoredTheme(storageKey);
    return stored ?? defaultTheme ?? "auto";
  });

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    getSystemTheme,
  );

  const resolvedTheme = theme === "auto" ? systemTheme : theme;

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Apply .dark class on html element
  useEffect(() => {
    applyThemeClass(resolvedTheme);
  }, [resolvedTheme]);

  // Fetch user preferences from API in background
  useEffect(() => {
    if (!apiEndpoint) return;

    const controller = new AbortController();

    fetch(apiEndpoint, { signal: controller.signal, credentials: "include" })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        const apiTheme = data?.theme ?? data?.preferences?.theme;
        if (
          apiTheme &&
          (apiTheme === "light" || apiTheme === "dark" || apiTheme === "auto")
        ) {
          const currentStored = readStoredTheme(storageKey);
          if (apiTheme !== currentStored) {
            setThemeState(apiTheme);
            try {
              localStorage.setItem(storageKey, apiTheme);
            } catch {
              // ignore
            }
          }
        }
      })
      .catch(() => {
        // API fetch is best-effort
        if (isDev) {
          console.warn(
            "[ThemeProvider] Failed to fetch user preferences from API",
          );
        }
      });

    return () => controller.abort();
  }, [apiEndpoint, storageKey]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
