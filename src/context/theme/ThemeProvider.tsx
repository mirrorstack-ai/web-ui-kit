import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "auto" | "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";

function getMediaDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyClass(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

function resolve(theme: Theme): "light" | "dark" {
  if (theme === "auto") return getMediaDark() ? "dark" : "light";
  return theme;
}

function normalize(raw: string | null | undefined): Theme {
  if (raw === "system") return "auto";
  if (raw === "light" || raw === "dark" || raw === "auto") return raw;
  return "auto";
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** API base URL for fetching user theme preference. If omitted, no API sync. */
  apiBaseUrl?: string;
}

export function ThemeProvider({ children, apiBaseUrl }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("auto");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    const resolved = resolve(next);
    setResolvedTheme(resolved);
    applyClass(resolved);
  }, []);

  useEffect(() => {
    const stored = normalize(localStorage.getItem(STORAGE_KEY));
    setThemeState(stored);
    const resolved = resolve(stored);
    setResolvedTheme(resolved);
    applyClass(resolved);

    if (!apiBaseUrl) return;

    fetch(`${apiBaseUrl}/v1/auth/me/preferences`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.theme) return;
        const apiTheme = normalize(data.theme);
        const localTheme = normalize(localStorage.getItem(STORAGE_KEY));
        if (apiTheme !== localTheme) {
          localStorage.setItem(STORAGE_KEY, apiTheme);
          setThemeState(apiTheme);
          const r = resolve(apiTheme);
          setResolvedTheme(r);
          applyClass(r);
        }
      })
      .catch(() => {});
  }, [apiBaseUrl]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (normalize(localStorage.getItem(STORAGE_KEY)) === "auto") {
        const resolved = mq.matches ? "dark" : "light";
        setResolvedTheme(resolved);
        applyClass(resolved);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
