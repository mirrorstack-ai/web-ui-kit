import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** A single tab in the agent sidebar header strip. Defined here — the data
 *  layer owns the definitions so it never imports from the component layer;
 *  `sidebar/types.ts` re-exports it for component consumers. */
export interface ChatTab {
  id: string;
  title: string;
}

// ---- Wire state (mirrors the agent service's /v1/sidebar-state) ----
//
// These match @mirrorstack-ai/api-client-shared's AgentSidebarTab /
// AgentSidebarState 1:1 (field names + types) so a host can wire its
// getSidebarState/putSidebarState straight into AgentTabsPersistence below
// with no adapter — the shape IS the contract.

/** One persisted open tab in the cross-host sidebar strip (matches
 *  api-client-shared `AgentSidebarTab`, camelCase wire). conversationId is the
 *  OPEN conversation the tab tracks; id is the tab's stable identity (the kit
 *  mirrors it to conversationId — it tracks no separate server tab-row id);
 *  title is the cached strip label (the host still derives the live title from
 *  history and falls back to this); order is the strip position (ascending). */
export interface AgentSidebarTab {
  id: string;
  conversationId: string;
  title: string;
  order: number;
}

/** Persisted sidebar session — ONE row per platform user, shared by every
 *  host (web-account, web-applications, future platforms). Matches
 *  api-client-shared `AgentSidebarState`. tabs hold the OPEN tabs in strip
 *  order; titles still resolve from the conversation list each host already
 *  loads (the cached `title` is a fallback). width is the shared open-sidebar
 *  width (0 = no saved width, host default). Local draft tabs are never part
 *  of this state. */
export interface AgentSidebarState {
  open: boolean;
  /** Active tab's conversation id — null when a local draft was active. */
  activeTabId: string | null;
  /** Open tabs in strip order. */
  tabs: AgentSidebarTab[];
  /** Shared open-sidebar width (0 = host default). */
  width: number;
}

/** Structural persistence surface for the tab strip. The kit stays
 *  backend-agnostic: hosts inject any object with these methods —
 *  api-client-shared's `agent` module satisfies them directly once its free
 *  functions are bound to the host's service client:
 *
 *    const tabsPersistence: AgentTabsPersistence = {
 *      get: () => getSidebarState(agentApi),
 *      put: (state) => putSidebarState(agentApi, state),
 *    };
 *
 *  PUTs are full replace, last-write-wins — v1 is a single user's own UI
 *  state, so there is no version field to carry. */
export interface AgentTabsPersistence {
  get(): Promise<AgentSidebarState>;
  put(state: AgentSidebarState): Promise<void>;
}

// ---- Draft tabs ----

// A tab with no conversation yet — created locally, persisted never. The
// host's chat layer lazy-creates the conversation on the first send, then
// rebinds the tab through bindDraft so the next debounce persists it.
const DRAFT_PREFIX = "draft-";
export const isDraftTab = (id: string) => id.startsWith(DRAFT_PREFIX);
const freshDraft = () => `${DRAFT_PREFIX}${crypto.randomUUID()}`;

// ---- Pure strip transitions (the hook's internal state machine) ----
//
// The strip is keyed throughout by conversation id (drafts use their draft
// id as the conversation id) — that single id is the tab's public identity:
// every host-facing callback (select/close/open/bindDraft) takes it, and the
// public `tabs` projection maps each tab to it. The kit tracks no separate
// server tab-row id, so a tab's `id` mirrors its conversationId.

interface StripState {
  open: boolean;
  tabs: AgentSidebarTab[];
  activeTabId: string;
  width: number;
}

/** A tab object for a given conversation id at a given strip position. order
 *  is the position; title defaults empty (the host derives the live title from
 *  history and only falls back to the cached `title`). */
const makeTab = (conversationId: string, order: number, title = ""): AgentSidebarTab => ({
  id: conversationId,
  conversationId,
  title,
  order,
});

/** Re-stamp `order` to match array position after any insert/remove/move so
 *  the persisted order is always a dense ascending run. */
const reindex = (tabs: AgentSidebarTab[]): AgentSidebarTab[] =>
  tabs.map((tab, i) => (tab.order === i ? tab : { ...tab, order: i }));

const tabIndex = (tabs: AgentSidebarTab[], conversationId: string) =>
  tabs.findIndex((tab) => tab.conversationId === conversationId);

const hasTab = (tabs: AgentSidebarTab[], conversationId: string) =>
  tabIndex(tabs, conversationId) !== -1;

const initialStrip = (open = false, width = 0): StripState => {
  const draft = freshDraft();
  return { open, tabs: [makeTab(draft, 0)], activeTabId: draft, width };
};

const selectTabState = (s: StripState, id: string): StripState =>
  s.activeTabId !== id && hasTab(s.tabs, id) ? { ...s, activeTabId: id } : s;

/** Close ≠ delete: drop the tab from the strip only. Closing the active tab
 *  activates its right neighbor (the tab now at the closed index), or the
 *  left one when the rightmost tab closes — browser tab-strip behavior.
 *  Closing the only tab falls back to a fresh draft from the given factory
 *  (invoked only when actually needed). */
const closeTabState = (s: StripState, id: string, makeDraft: () => string): StripState => {
  const index = tabIndex(s.tabs, id);
  if (index === -1) return s;
  const next = reindex(s.tabs.filter((tab) => tab.conversationId !== id));
  if (next.length === 0) {
    const draft = makeDraft();
    return { ...s, tabs: [makeTab(draft, 0)], activeTabId: draft };
  }
  return {
    ...s,
    tabs: next,
    activeTabId:
      s.activeTabId === id ? next[Math.min(index, next.length - 1)].conversationId : s.activeTabId,
  };
};

const addDraftState = (s: StripState, draft: string): StripState => ({
  ...s,
  tabs: [...s.tabs, makeTab(draft, s.tabs.length)],
  activeTabId: draft,
});

/** Open a past conversation as a tab, or refocus its existing tab. */
const openConversationState = (s: StripState, id: string): StripState =>
  hasTab(s.tabs, id)
    ? selectTabState(s, id)
    : { ...s, tabs: [...s.tabs, makeTab(id, s.tabs.length)], activeTabId: id };

const moveTabState = (s: StripState, id: string, toIndex: number): StripState => {
  const from = tabIndex(s.tabs, id);
  if (from === -1) return s;
  const to = Math.max(0, Math.min(toIndex, s.tabs.length - 1));
  if (from === to) return s;
  const tabs = [...s.tabs];
  const [moved] = tabs.splice(from, 1);
  tabs.splice(to, 0, moved);
  return { ...s, tabs: reindex(tabs) };
};

/** First send created the conversation — the draft tab becomes its tab in
 *  place. If the conversation already has a tab (opened from history while
 *  the send was in flight), the draft dissolves into it instead. */
const bindDraftState = (s: StripState, draftId: string, conversationId: string): StripState => {
  if (!hasTab(s.tabs, draftId)) return s;
  const tabs = hasTab(s.tabs, conversationId)
    ? s.tabs.filter((tab) => tab.conversationId !== draftId)
    : s.tabs.map((tab) =>
        tab.conversationId === draftId ? { ...tab, id: conversationId, conversationId } : tab,
      );
  return {
    ...s,
    tabs: reindex(tabs),
    activeTabId: s.activeTabId === draftId ? conversationId : s.activeTabId,
  };
};

// Project the strip onto the wire: drafts are NEVER persisted — reload
// drops empty drafts by design (the first send creates the conversation
// and the next debounce persists it). order is re-stamped to the persisted
// (draft-stripped) position; width rides along unchanged.
const toPersisted = (s: StripState): AgentSidebarState => ({
  open: s.open,
  activeTabId: isDraftTab(s.activeTabId) ? null : s.activeTabId,
  tabs: s.tabs
    .filter((tab) => !isDraftTab(tab.conversationId))
    .map((tab, i) => ({ ...tab, order: i })),
  width: s.width,
});

const sameTabs = (a: readonly AgentSidebarTab[], b: readonly AgentSidebarTab[]) =>
  a.length === b.length &&
  a.every((tab, i) => {
    const other = b[i];
    return (
      tab.id === other.id &&
      tab.conversationId === other.conversationId &&
      tab.title === other.title &&
      tab.order === other.order
    );
  });

const samePersisted = (a: AgentSidebarState, b: AgentSidebarState) =>
  a.open === b.open &&
  a.activeTabId === b.activeTabId &&
  a.width === b.width &&
  sameTabs(a.tabs, b.tabs);

const sameStrip = (a: StripState, b: StripState) =>
  a.open === b.open &&
  a.activeTabId === b.activeTabId &&
  a.width === b.width &&
  sameTabs(a.tabs, b.tabs);

// Reconcile a fetched remote state into the local strip. Hydration replaces
// the untouched initial placeholder outright; refetches (and hydration after
// a local mutation) keep local drafts — they exist on this host only, so the
// server can't know about them. The merge happens in place: surviving
// conversation tabs adopt the remote (strip) order AND its cached title/order
// fields, drafts keep their interleaved positions, tabs closed elsewhere
// drop, tabs opened elsewhere append. The locally active tab keeps focus when
// it survives; otherwise the remote active wins, then the first tab. width
// always adopts the remote value (it's the shared per-user value).
function applyRemote(
  prev: StripState,
  remote: AgentSidebarState,
  ids: string[],
  keepDrafts: boolean,
): StripState {
  const prevIds = new Set(prev.tabs.map((tab) => tab.conversationId));
  const idSet = new Set(ids);
  // Remote tab objects survivors carry, keyed by conversation id so survivors
  // adopt the remote cached title (and we re-stamp order below).
  const remoteById = new Map(remote.tabs.map((tab) => [tab.conversationId, tab]));
  const survivors = ids.filter((id) => prevIds.has(id));
  let s = 0;
  const tabs: AgentSidebarTab[] = [];
  for (const tab of prev.tabs) {
    if (isDraftTab(tab.conversationId)) {
      if (keepDrafts) tabs.push(tab);
    } else if (idSet.has(tab.conversationId)) {
      const id = survivors[s++];
      tabs.push(remoteById.get(id) ?? makeTab(id, 0));
    }
  }
  for (const id of ids) {
    if (!prevIds.has(id)) tabs.push(remoteById.get(id) ?? makeTab(id, 0));
  }
  if (tabs.length === 0) return initialStrip(remote.open, remote.width);
  let activeTabId: string;
  if (keepDrafts && hasTab(tabs, prev.activeTabId)) activeTabId = prev.activeTabId;
  else if (remote.activeTabId && hasTab(tabs, remote.activeTabId)) activeTabId = remote.activeTabId;
  else activeTabId = tabs[0].conversationId;
  return { open: remote.open, tabs: reindex(tabs), activeTabId, width: remote.width };
}

// ---- Title derivation (render-time, host-side) ----

/** Resolve tab titles from the host's history groups so renames (optimistic,
 *  with rollback) and server auto-titles flow into the strip for free.
 *  Drafts (and tabs whose conversation hasn't hit history yet) fall back to
 *  the localized `draftTitle`. */
export const deriveTabTitles = (
  ids: readonly string[],
  history: ReadonlyArray<{ items: ReadonlyArray<{ id: string; title: string }> }> | undefined,
  draftTitle: string,
): ChatTab[] => {
  const titles = new Map<string, string>();
  for (const group of history ?? []) {
    for (const item of group.items) titles.set(item.id, item.title);
  }
  return ids.map((id) => ({ id, title: titles.get(id) ?? draftTitle }));
};

// ---- The hook ----

const DEFAULT_DEBOUNCE_MS = 1000;

export interface UseAgentTabsOptions {
  /** Gate hydration and persistence (e.g. on the session being ready).
   *  Default true. The strip works local-only while disabled. */
  enabled?: boolean;
  /**
   * Drop hydrated ids the host can't resolve (deleted conversations heal
   * silently): given the fetched conversation ids, return the subset that
   * still resolve. Resolve against an UNFILTERED source — the strip is
   * global per user, a tab may hold a conversation from another scope.
   * Errors keep all ids (don't drop tabs on a transient failure).
   */
  resolveTabs?: (ids: string[]) => string[] | Promise<string[]>;
  /** Trailing debounce for PUTs. Default 1000ms. */
  debounceMs?: number;
}

export interface UseAgentTabsResult {
  /** Sidebar open/closed — persisted, shared across hosts. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Open tabs as conversation ids (conversation ids + local draft ids),
   *  strip order. Map to titled ChatTabs with deriveTabTitles. */
  tabs: string[];
  activeTabId: string;
  /** True once the mount GET settled (or no persistence was injected). */
  hydrated: boolean;
  selectTab: (id: string) => void;
  /** Close ≠ delete: removes the tab from the strip everywhere — the
   *  conversation stays in history. */
  closeTab: (id: string) => void;
  /** Open a fresh draft tab (no conversation until the first send). */
  newTab: () => void;
  /** Open a past conversation as a tab, or refocus its existing tab. */
  openConversation: (id: string) => void;
  /** Reorder: move a tab to the given strip index (clamped). */
  moveTab: (id: string, toIndex: number) => void;
  /** Rebind a draft tab to its lazily-created conversation so the strip
   *  (and the next debounce) carries the real id. */
  bindDraft: (draftId: string, conversationId: string) => void;
}

/**
 * Cross-platform agent tab strip: open tabs + active tab + sidebar open
 * flag, hydrated from and persisted to the agent service so every host
 * shows the same strip. Backend-agnostic — the transport is injected
 * (`persistence`, structural; null runs the strip local-only, e.g. in
 * stories). Mutations (select/close/open/reorder tab, sidebar open/close)
 * PUT debounced (trailing, ~1s); the strip refetches on window focus /
 * visibilitychange so concurrent hosts converge — skipped while a local
 * mutation is pending flush so it can't clobber newer local state.
 *
 * The persisted record (AgentSidebarState) also carries the shared
 * open-sidebar `width`; the strip never MANAGES width (a host-side width
 * persistence owns the read/write — see api-client-shared), but it preserves
 * the hydrated width through every reducer so a tab PUT never drops it.
 *
 * `persistence` and `resolveTabs` are read through refs — their identities
 * may change per render without retriggering fetches.
 */
export function useAgentTabs(
  persistence: AgentTabsPersistence | null,
  options: UseAgentTabsOptions = {},
): UseAgentTabsResult {
  const { enabled = true, debounceMs = DEFAULT_DEBOUNCE_MS } = options;

  // Injected collaborators ride refs so unstable identities (inline object
  // literals at the call site) don't churn effects or callbacks.
  const persistenceRef = useRef(persistence);
  persistenceRef.current = persistence;
  const resolveTabsRef = useRef(options.resolveTabs);
  resolveTabsRef.current = options.resolveTabs;
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
  const debounceMsRef = useRef(debounceMs);
  debounceMsRef.current = debounceMs;

  const [strip, setStrip] = useState<StripState>(initialStrip);
  const [hydrated, setHydrated] = useState(false);

  // The strip rides a ref alongside state: mutations read/write it
  // synchronously (so back-to-back mutations in one tick compose) and the
  // trailing flush PUTs the latest value, not a stale closure.
  const stripRef = useRef(strip);
  // What the server is known to hold — set on hydrate/refetch and after a
  // successful PUT. Draft-only churn projects onto the same wire state, so
  // comparing against this skips redundant writes entirely.
  const lastPersistedRef = useRef<AgentSidebarState>(toPersisted(strip));
  // Set once any local mutation happened — hydration then keeps local
  // drafts instead of replacing the untouched initial placeholder.
  const touchedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True from the first unflushed mutation until its PUT settles. While
  // pending, fetched states are discarded (local wins; the flush PUTs it).
  const pendingRef = useRef(false);
  // Guards stale GET responses racing a newer fetch.
  const fetchSeq = useRef(0);
  // True once the FIRST successful load (hydrate OR a focus refetch that beat
  // the hydrate) has settled. The first load is authoritative: it forces
  // keepDrafts=false regardless of mode/touchedRef so an interleaving refetch
  // or host mutation (route-change newTab/selectTab, AgentSessionBridge setOpen)
  // can't strand a fresh placeholder draft over the restored conversation/active
  // tab. Until it flips true, focus/visibility refetches are skipped so they
  // can't pre-empt the in-flight hydrate via the shared fetchSeq.
  const hasHydratedRef = useRef(false);

  const schedulePut = useCallback(() => {
    if (!persistenceRef.current || !enabledRef.current) return;
    pendingRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      const p = persistenceRef.current;
      const payload = toPersisted(stripRef.current);
      // Mutations may have circled back to the persisted state (e.g. a
      // draft opened then closed) — nothing to write.
      if (!p || samePersisted(payload, lastPersistedRef.current)) {
        pendingRef.current = false;
        return;
      }
      p.put(payload)
        .then(() => {
          lastPersistedRef.current = payload;
          // A newer mutation may have re-armed the timer mid-flight.
          if (!timerRef.current) pendingRef.current = false;
        })
        .catch((err) => {
          // Stay pending: the local state is still unsynced, so focus
          // refetches keep being skipped and can't clobber it with the
          // stale server state. The next mutation re-PUTs the full state.
          console.error("agent: sidebar state put failed", err);
        });
    }, debounceMsRef.current);
  }, []);

  const mutate = useCallback(
    (updater: (s: StripState) => StripState) => {
      const prev = stripRef.current;
      const next = updater(prev);
      if (next === prev) return;
      touchedRef.current = true;
      stripRef.current = next;
      setStrip(next);
      // Draft-only changes don't reach the wire — PUT only when the
      // persisted projection actually moved off the server's state.
      if (!samePersisted(toPersisted(next), lastPersistedRef.current)) schedulePut();
    },
    [schedulePut],
  );

  const reconcile = useCallback(async (mode: "hydrate" | "refetch") => {
    // An unflushed local mutation always wins over a fetched state — skip
    // the round-trip entirely, the flush will PUT the local state.
    if (mode === "refetch" && pendingRef.current) return;
    const p = persistenceRef.current;
    if (!p) {
      if (mode === "hydrate") {
        hasHydratedRef.current = true;
        setHydrated(true);
      }
      return;
    }
    const seq = ++fetchSeq.current;
    // The first successful load is authoritative whether it arrives via the
    // hydrate effect or a focus refetch that beat it: force keepDrafts=false so
    // the restored remote tabs + active tab replace the initial placeholder
    // draft outright. An interleaving refetch/mutation (which would otherwise
    // set touchedRef or pass mode==='refetch') can no longer keep — and strand —
    // a fresh placeholder draft over the user's restored conversation.
    const isFirstLoad = !hasHydratedRef.current;
    try {
      const remote = await p.get();
      if (fetchSeq.current !== seq || pendingRef.current) return;
      // Defensive: the wire never carries drafts, but never trust it to.
      let ids = remote.tabs
        .map((tab) => tab.conversationId)
        .filter((id) => !isDraftTab(id));
      if (resolveTabsRef.current && ids.length > 0) {
        try {
          ids = await resolveTabsRef.current(ids);
        } catch (err) {
          console.error("agent: resolve tabs failed", err);
        }
        if (fetchSeq.current !== seq || pendingRef.current) return;
      }
      const prev = stripRef.current;
      const next = applyRemote(
        prev,
        remote,
        ids,
        !isFirstLoad && (mode === "refetch" || touchedRef.current),
      );
      // Healed drops stay silent (no write-back) — the next real mutation
      // PUTs the full healed state anyway.
      lastPersistedRef.current = toPersisted(next);
      if (!sameStrip(prev, next)) {
        stripRef.current = next;
        setStrip(next);
      }
    } catch (err) {
      console.error("agent: sidebar state get failed", err);
    } finally {
      // Mark hydrated whenever a load WINS its seq — not just mode==='hydrate'.
      // A focus refetch that completes before the hydrate effect's GET settles
      // is the first authoritative load; it must flip the flag (and surface
      // `hydrated`) so the next load takes the normal keep-drafts path.
      if (fetchSeq.current === seq) {
        hasHydratedRef.current = true;
        setHydrated(true);
      }
    }
  }, []);

  // ---- Hydrate on mount (requirement 1: reload restores the strip) ----
  useEffect(() => {
    if (!enabled) return;
    void reconcile("hydrate");
  }, [enabled, reconcile]);

  // ---- Converge concurrent hosts on focus/visibility (requirement 4) ----
  useEffect(() => {
    if (!enabled) return;
    const onVisible = () => {
      // Until the first hydrate settles, a focus/visibility refetch must NOT
      // fire: it shares fetchSeq with the in-flight hydrate, so a refetch that
      // bumps the seq would make the hydrate GET early-return (stale seq) and a
      // fresh placeholder draft could win. Once hydrated, refetches converge
      // concurrent hosts as normal.
      if (!hasHydratedRef.current) return;
      if (document.visibilityState === "visible") void reconcile("refetch");
    };
    window.addEventListener("focus", onVisible);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", onVisible);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [enabled, reconcile]);

  // Best-effort flush on unmount so a mutation inside the debounce window
  // isn't lost on navigation.
  useEffect(
    () => () => {
      if (!timerRef.current) return;
      clearTimeout(timerRef.current);
      timerRef.current = null;
      pendingRef.current = false;
      const payload = toPersisted(stripRef.current);
      if (samePersisted(payload, lastPersistedRef.current)) return;
      persistenceRef.current?.put(payload).catch(() => {});
    },
    [],
  );

  const setOpen = useCallback(
    (open: boolean) => mutate((s) => (s.open === open ? s : { ...s, open })),
    [mutate],
  );
  const selectTab = useCallback((id: string) => mutate((s) => selectTabState(s, id)), [mutate]);
  const closeTab = useCallback(
    (id: string) => mutate((s) => closeTabState(s, id, freshDraft)),
    [mutate],
  );
  const newTab = useCallback(() => {
    const draft = freshDraft();
    mutate((s) => addDraftState(s, draft));
  }, [mutate]);
  const openConversation = useCallback(
    (id: string) => mutate((s) => openConversationState(s, id)),
    [mutate],
  );
  const moveTab = useCallback(
    (id: string, toIndex: number) => mutate((s) => moveTabState(s, id, toIndex)),
    [mutate],
  );
  const bindDraft = useCallback(
    (draftId: string, conversationId: string) =>
      mutate((s) => bindDraftState(s, draftId, conversationId)),
    [mutate],
  );

  // Public strip is the conversation ids in order — hosts map these to titled
  // ChatTabs (deriveTabTitles) and key everything off this single id, never
  // the internal AgentSidebarTab objects. Memoized so identity is stable
  // until the strip actually changes.
  const tabs = useMemo(() => strip.tabs.map((tab) => tab.conversationId), [strip.tabs]);

  return {
    open: strip.open,
    setOpen,
    tabs,
    activeTabId: strip.activeTabId,
    hydrated,
    selectTab,
    closeTab,
    newTab,
    openConversation,
    moveTab,
    bindDraft,
  };
}
