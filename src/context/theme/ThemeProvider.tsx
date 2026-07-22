import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// useEffect fires after the browser paints; useLayoutEffect fires synchronously
// before it. The mount correction below must run before paint so it never
// visibly overrides what the pre-paint <head> script already applied to
// document.documentElement (SSR has no window, so fall back to useEffect there
// to avoid React's "useLayoutEffect does nothing on the server" warning).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type Theme = "auto" | "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";
const COOKIE_KEY = "ms-theme";

// Registrable parent domain so the theme cookie is shared across sibling
// subdomains (account.mirrorstack.ai + apps.mirrorstack.ai → .mirrorstack.ai,
// admin.acme.com + apps.acme.com → .acme.com). Strip the leftmost label; keep
// the cookie host-only for localhost, bare IPs, and single-label hosts (dev),
// where a Domain attribute is invalid or rejected.
export function parentDomain(
  host: string = window.location.hostname,
): string | undefined {
  if (host === "localhost" || /^[0-9.]+$/.test(host) || !host.includes(".")) {
    return undefined;
  }
  const parts = host.split(".");
  if (parts.length <= 2) return host; // apex, e.g. mirrorstack.ai
  return parts.slice(1).join("."); // apps.mirrorstack.ai → mirrorstack.ai
}

function setCookie(theme: Theme) {
  const domain = parentDomain();
  if (domain) {
    // Expire any legacy host-only cookie first so it cannot shadow the shared,
    // parent-domain cookie in document.cookie reads.
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }
  const domainAttr = domain ? `; Domain=${domain}` : "";
  document.cookie = `${COOKIE_KEY}=${theme}; path=/; max-age=31536000; SameSite=Lax${domainAttr}`;
}

function getCookie(): string | null {
  return document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=(\\w+)`))?.[1] ?? null;
}

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
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("auto");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    setCookie(next);
    const resolved = resolve(next);
    setResolvedTheme(resolved);
    applyClass(resolved);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const stored = normalize(getCookie() ?? localStorage.getItem(STORAGE_KEY));
    setThemeState(stored);
    localStorage.setItem(STORAGE_KEY, stored);
    setCookie(stored);
    const resolved = resolve(stored);
    setResolvedTheme(resolved);
    applyClass(resolved);
  }, []);

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
