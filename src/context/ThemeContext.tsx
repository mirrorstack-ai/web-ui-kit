"use client";

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

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";
const API_BASE =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://localhost:8081"
    : undefined;

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

/** Normalize legacy "system" value to "auto" */
function normalize(raw: string | null | undefined): Theme {
  if (raw === "system") return "auto";
  if (raw === "light" || raw === "dark" || raw === "auto") return raw;
  return "auto";
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** API base URL — if omitted, auto-detected from hostname */
  apiBaseUrl?: string;
}

export function ThemeProvider({ children, apiBaseUrl }: ThemeProviderProps) {
  // Always start with "auto" to match the server render and avoid hydration mismatch.
  // The blocking <script> in <head> already applied the correct class before paint.
  const [theme, setThemeState] = useState<Theme>("auto");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    const resolved = resolve(next);
    setResolvedTheme(resolved);
    applyClass(resolved);
  }, []);

  // On mount: read localStorage first (instant), then fetch API (source of truth)
  useEffect(() => {
    // 1. Immediate: apply from localStorage (matches the blocking script)
    const stored = normalize(localStorage.getItem(STORAGE_KEY));
    setThemeState(stored);
    const resolved = resolve(stored);
    setResolvedTheme(resolved);
    applyClass(resolved);

    // 2. Background: fetch from API and reconcile
    const base = apiBaseUrl || API_BASE;
    if (!base) return;

    fetch(`${base}/v1/auth/me/preferences`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.theme) return;
        const apiTheme = normalize(data.theme);
        const localTheme = normalize(localStorage.getItem(STORAGE_KEY));
        // Only update if API differs from local
        if (apiTheme !== localTheme) {
          localStorage.setItem(STORAGE_KEY, apiTheme);
          setThemeState(apiTheme);
          const r = resolve(apiTheme);
          setResolvedTheme(r);
          applyClass(r);
        }
      })
      .catch(() => {
        // Offline or not logged in — use localStorage as-is
      });
  }, [apiBaseUrl]);

  // Listen for OS color-scheme changes when in "auto" mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const current = normalize(localStorage.getItem(STORAGE_KEY));
      if (current === "auto") {
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
