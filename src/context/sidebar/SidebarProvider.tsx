import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Resolve the clamp ceiling for a rehydrated width: explicit prop wins, else
 *  the live viewport minus a small gutter, else unbounded (SSR / non-browser). */
function resolveMaxOpenWidth(maxOpenWidth: number | undefined): number {
  if (typeof maxOpenWidth === "number") return maxOpenWidth;
  if (typeof window !== "undefined") return window.innerWidth - 20;
  return Number.POSITIVE_INFINITY;
}

export interface SidebarContextType {
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  /** Last width the sidebar was opened to — survives close AND reload (when
   *  `persistKey` is set). Reopen logic should restore this, not the default,
   *  so the user's chosen size sticks. Falls back to `defaultWidth` until a
   *  real open width has been recorded. */
  lastOpenWidth: number;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/** Namespaced default localStorage key for the agent sidebar width. */
export const SIDEBAR_WIDTH_STORAGE_KEY = "ms.agentSidebar.width";

export interface SidebarProviderProps {
  children: ReactNode;
  defaultWidth?: number;
  /** localStorage key for persisting the sidebar width across reloads. Omit to
   *  disable persistence (in-memory only). The stored value is the last
   *  meaningful OPEN width — closing/collapsing does not erase it, so reopening
   *  restores the user's chosen size. Width is a per-device cosmetic
   *  preference, so localStorage is the right home (not server/session state). */
  persistKey?: string;
  /** Lower bound for a width considered a real "open" width worth persisting,
   *  and the floor used to clamp a rehydrated value. Widths at or below this
   *  (e.g. 0 = closed, or `minOpenWidth` itself = collapsed-to-floor) are not
   *  persisted, so a collapse never overwrites the remembered open width.
   *  Default 350. */
  minOpenWidth?: number;
  /** Upper bound used to clamp a rehydrated value, guarding against a stored
   *  value from a wider viewport. Defaults to the current window width (minus a
   *  small gutter) on the client, or `Infinity` when unknown. */
  maxOpenWidth?: number;
}

/** SSR-safe read of the persisted width. Returns null during SSR, when the key
 *  is unset, or when the stored value is missing/corrupt/out-of-range — callers
 *  fall back to the default in those cases. */
function readPersistedWidth(
  key: string | undefined,
  min: number,
  max: number,
): number | null {
  if (!key || typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    // localStorage can throw (private mode, disabled). Treat as no value.
    return null;
  }
  if (raw === null) return null;
  const value = Number(raw);
  if (!Number.isFinite(value)) return null;
  if (value < min || value > max) return null;
  return value;
}

export function SidebarProvider({
  children,
  defaultWidth = 350,
  persistKey,
  minOpenWidth = 350,
  maxOpenWidth,
}: SidebarProviderProps) {
  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
  // Tracked separately from sidebarWidth so a close (width → 0) keeps the last
  // size for reopen. Seeded from the default; rehydrated from storage on mount.
  const [lastOpenWidth, setLastOpenWidth] = useState(defaultWidth);

  // Rehydrate after mount only — never during render/SSR — so the server pass
  // and first client render both use `defaultWidth` (no hydration mismatch).
  // The persisted width applies one tick later. Clamped to [min, max]; corrupt
  // or out-of-range values are ignored (default stands).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const stored = readPersistedWidth(
      persistKey,
      minOpenWidth,
      resolveMaxOpenWidth(maxOpenWidth),
    );
    if (stored !== null) setLastOpenWidth(stored);
  }, []);

  // Persist every meaningful open width; skip closed/collapsed-to-floor states
  // so a close OR a collapse (width === minOpenWidth) doesn't wipe the
  // remembered size. The floor value itself is the collapsed state, not a real
  // open width, so it must use a strict comparison.
  const persist = useCallback(
    (width: number) => {
      if (!persistKey || typeof window === "undefined") return;
      if (width <= minOpenWidth) return;
      try {
        window.localStorage.setItem(persistKey, String(Math.round(width)));
      } catch {
        // Storage write failures (quota, disabled) are non-fatal — the live
        // width still updates, it just won't survive reload.
      }
    },
    [persistKey, minOpenWidth],
  );

  const handleSetWidth = useCallback(
    (width: number) => {
      setSidebarWidth(width);
      // Strict `>`: a width of exactly `minOpenWidth` is the collapsed floor
      // (AppShell collapses by setting the width to MIN_WIDTH), not a real open
      // width — recording it would erase the user's chosen drag size and make
      // reopen fall back to the default. Only widths strictly above the floor
      // count as the remembered open width.
      if (width > minOpenWidth) {
        setLastOpenWidth(width);
        persist(width);
      }
    },
    [minOpenWidth, persist],
  );

  const value = useMemo(
    () => ({ sidebarWidth, setSidebarWidth: handleSetWidth, lastOpenWidth }),
    [sidebarWidth, handleSetWidth, lastOpenWidth],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebarWidth() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarWidth must be used within a SidebarProvider");
  }
  return context;
}
