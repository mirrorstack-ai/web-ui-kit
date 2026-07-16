import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

/** Structural width-persistence surface (docs 12.4 + 13b): the sidebar width
 *  is ONE per-user value shared across EVERY platform host (web-account,
 *  web-applications, future CRM/PM), persisted SERVER-SIDE — never per-origin
 *  localStorage. The kit stays backend-agnostic: a host injects any object
 *  with these methods, typically bound to the shared agent client's
 *  `/v1/sidebar-state` (the same record that carries open/tabs/activeTabId —
 *  this surface owns just the `width` field of that envelope):
 *
 *    const widthPersistence: SidebarWidthPersistence = {
 *      get: async () => (await getSidebarState(agentApi)).width,
 *      set: (width) => putSidebarWidth(agentApi, width), // host debounces + merges
 *    };
 *
 *  `set` is called with the last meaningful OPEN width (strictly above the
 *  collapse floor); the host is responsible for debouncing the write
 *  (resize-end) and folding `width` into the full sidebar-state PUT. A width
 *  of 0 from `get` means "no saved width — use the host default" (mirrors the
 *  server sentinel), so a fresh user paints at the default until the first
 *  drag persists a real width. */
export interface SidebarWidthPersistence {
  /** Read the persisted per-user width (0 = no saved width / host default). */
  get(): number | Promise<number>;
  /** Persist the last open width. The host debounces and merges into the
   *  shared sidebar-state record; failures are the host's to swallow. */
  set(width: number): void | Promise<void>;
}

export interface SidebarContextType {
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  /** Set a PLACEHOLDER width that must yield to the persisted width once it is
   *  fetched. Use for the open-flag-driven seed (AppShell's controlled-open
   *  effect, which on reload derives a ~30%-viewport / floor value because the
   *  real width hasn't hydrated yet) — NOT for a user gesture. Unlike
   *  `setSidebarWidth`, it never marks the width hydrated, so the async-fetched
   *  stored width overrides it exactly once on first hydrate (first REAL writer
   *  wins; a placeholder is not a real writer). It also never persists. */
  seedWidth: (width: number) => void;
  /** Last width the sidebar was opened to — survives close AND reload (when a
   *  persistence surface is wired). Reopen logic should restore this, not the
   *  default, so the user's chosen size sticks. Falls back to `defaultWidth`
   *  until a real open width has been recorded. */
  lastOpenWidth: number;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/** Namespaced localStorage key for the (now legacy) per-origin sidebar width.
 *  @deprecated Width is now ONE shared per-user server-side value (docs 12.4 +
 *  13b) — inject `widthPersistence` instead. Retained only for the legacy
 *  `persistKey` fallback so pre-migration consumers don't break. */
export const SIDEBAR_WIDTH_STORAGE_KEY = "ms.agentSidebar.width";

export interface SidebarProviderProps {
  children: ReactNode;
  defaultWidth?: number;
  /** Injected server-side width persistence (docs 12.4 + 13b). When wired, the
   *  width is read from / written to this surface (one shared per-user value
   *  across every host) and the legacy `persistKey` localStorage path is
   *  bypassed entirely. Omit it (and `persistKey`) for in-memory-only width
   *  (Storybook, tests, hosts that don't share width). */
  widthPersistence?: SidebarWidthPersistence;
  /** @deprecated Width moved to shared server-side persistence (docs 12.4 +
   *  13b) — pass `widthPersistence` instead. localStorage is per-origin, so a
   *  width saved here does NOT carry across platform hosts. Honored only when
   *  `widthPersistence` is NOT injected, to keep pre-migration consumers from
   *  losing their saved width. The stored value is the last meaningful OPEN
   *  width — closing/collapsing does not erase it. */
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

/** SSR-safe read of the LEGACY localStorage-persisted width. Returns null
 *  during SSR, when the key is unset, or when the stored value is
 *  missing/corrupt/out-of-range — callers fall back to the default in those
 *  cases. Only used for the deprecated `persistKey` fallback. */
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
  widthPersistence,
  persistKey,
  minOpenWidth = 350,
  maxOpenWidth,
}: SidebarProviderProps) {
  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
  // Tracked separately from sidebarWidth so a close (width → 0) keeps the last
  // size for reopen. Seeded from the default; rehydrated from persistence on
  // mount.
  const [lastOpenWidth, setLastOpenWidth] = useState(defaultWidth);

  // The injected persistence rides a ref so an unstable identity (an inline
  // object literal at the call site) doesn't churn the mount effect — same
  // pattern as useAgentTabs' injected collaborators.
  const persistenceRef = useRef(widthPersistence);
  persistenceRef.current = widthPersistence;

  // True once a REAL width has hydrated the rendered state — either the
  // async-fetched stored width landed (apply() below) OR a genuine user drag
  // recorded an open width before the fetch resolved. Until then, an open-flag
  // PLACEHOLDER seed (AppShell's controlled-open effect, which derives a
  // ~30%-viewport / floor width because lastOpenWidth is still 0 mid-restore)
  // does NOT count as hydrated, so the fetched stored width may overwrite it
  // exactly once. This makes the persisted width authoritative for the hydrate
  // window regardless of which writer seeded a non-zero placeholder first.
  const widthHydratedRef = useRef(false);

  // Rehydrate after mount only — never during render/SSR — so the server pass
  // and first client render both use `defaultWidth` (no hydration mismatch).
  // The persisted width applies one tick (or one round-trip) later. The
  // injected server persistence wins; the legacy localStorage `persistKey` is
  // honored only when no persistence surface is wired. Clamped to [min, max];
  // corrupt or out-of-range values are ignored (default stands).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const min = minOpenWidth;
    const max = resolveMaxOpenWidth(maxOpenWidth);
    const apply = (stored: number | null) => {
      // A stored 0 is the "no saved width — host default" sentinel; only a
      // value clear of the open floor is a real remembered width. Out-of-range
      // values (e.g. from a wider viewport, or a bad client) are ignored.
      if (stored === null) return;
      if (stored < min || stored > max) return;
      // FIRST REAL WRITER WINS. Once a genuine user gesture (a drag through
      // handleSetWidth) has recorded a width, widthHydratedRef is already true,
      // and the late-arriving hydration read must NOT touch anything — not the
      // rendered width AND not the remembered reopen width (lastOpenWidth).
      // Previously `setLastOpenWidth(stored)` ran unconditionally here, so a GET
      // that resolved just AFTER a drag overwrote the dragged size: the user
      // dragged to B, the stale read stamped lastOpenWidth back to A, and the
      // next reopen came back at A instead of B. A placeholder seed (seedWidth,
      // used by AppShell's controlled-open effect on reload) does NOT set the
      // flag, so the stored width still wins that race exactly once and reload
      // restore keeps working.
      if (widthHydratedRef.current) return;
      widthHydratedRef.current = true;
      setLastOpenWidth(stored);
      setSidebarWidth(stored);
    };

    const persistence = persistenceRef.current;
    if (persistence) {
      let cancelled = false;
      Promise.resolve()
        .then(() => persistence.get())
        .then((stored) => {
          if (!cancelled) apply(stored);
        })
        .catch(() => {
          // A failed read leaves the default in place — width simply isn't
          // restored this session; the next resize re-persists it.
        });
      return () => {
        cancelled = true;
      };
    }

    // Legacy fallback: per-origin localStorage (deprecated, does not share
    // across hosts). Only reached when no server persistence is injected.
    apply(readPersistedWidth(persistKey, min, max));
  }, []);

  // Persist a width. Called by handleSetWidth only for real open widths
  // (>= minOpenWidth, including a drag to the floor); a close (0) is gated out
  // upstream and a collapse never flows here (AppShell collapses via seedWidth).
  // The injected persistence wins; the legacy localStorage `persistKey` is
  // written only when no persistence is wired.
  const persist = useCallback(
    (width: number) => {
      const persistence = persistenceRef.current;
      if (persistence) {
        try {
          // The host owns debounce + the server PUT; a thrown/rejected write
          // is non-fatal (the live width still updates).
          void Promise.resolve(persistence.set(Math.round(width))).catch(
            () => {},
          );
        } catch {
          // Synchronous throw from a misbehaving setter — ignore.
        }
        return;
      }
      if (!persistKey || typeof window === "undefined") return;
      try {
        window.localStorage.setItem(persistKey, String(Math.round(width)));
      } catch {
        // Storage write failures (quota, disabled) are non-fatal — the live
        // width still updates, it just won't survive reload.
      }
    },
    [persistKey],
  );

  const handleSetWidth = useCallback(
    (width: number) => {
      setSidebarWidth(width);
      // `>=`, not `>`: minOpenWidth is the narrowest VALID OPEN width (the drag
      // floor), so a user dragging all the way to it (width === minOpenWidth) is
      // a deliberate choice and MUST be remembered. Only a CLOSE (width 0, below
      // the floor) is excluded. The collapse button does NOT come through here —
      // it uses `seedWidth`, so collapsing to the floor never overwrites the
      // remembered open width. (The old strict `>` dropped a drag-to-minimum,
      // leaving lastOpenWidth at the previous size, so reopen ignored it.)
      if (width >= minOpenWidth) {
        // A real user drag is the authoritative width — mark hydrated so a
        // late-arriving stored width can't overwrite it (first REAL writer wins).
        widthHydratedRef.current = true;
        setLastOpenWidth(width);
        persist(width);
      }
    },
    [minOpenWidth, persist],
  );

  // A placeholder seed (the open-flag-driven width on reload) paints the
  // sidebar open immediately, but it is NOT the user's real width — it must not
  // mark the width hydrated, or the async-fetched stored width would be
  // discarded (the bug). It also never persists. The fetched width overrides it
  // exactly once when the GET lands. Seeding 0 (or the floor) is a no-op for the
  // hydration race; only a positive placeholder needs the special handling.
  const seedWidth = useCallback((width: number) => {
    setSidebarWidth(width);
  }, []);

  const value = useMemo(
    () => ({
      sidebarWidth,
      setSidebarWidth: handleSetWidth,
      seedWidth,
      lastOpenWidth,
    }),
    [sidebarWidth, handleSetWidth, seedWidth, lastOpenWidth],
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
