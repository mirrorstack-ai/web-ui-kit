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

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start with "auto" to match the server render and avoid hydration mismatch.
  // The real stored theme is applied in the mount effect below.
  const [theme, setThemeState] = useState<Theme>("auto");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    const resolved = resolve(next);
    setResolvedTheme(resolved);
    applyClass(resolved);
  }, []);

  // Sync from localStorage on mount
  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme) || "auto";
    setThemeState(stored);
    const resolved = resolve(stored);
    setResolvedTheme(resolved);
    applyClass(resolved);
  }, []);

  // Listen for OS color-scheme changes when in "auto" mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const current = (localStorage.getItem(STORAGE_KEY) as Theme) || "auto";
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
