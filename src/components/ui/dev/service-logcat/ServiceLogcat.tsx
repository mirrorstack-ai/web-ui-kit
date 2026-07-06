import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Badge, type BadgeVariant } from "@/components/ui/feedback/badge/Badge";
import { Button } from "@/components/ui/actions/button/Button";
import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { SectionLabel } from "@/components/ui/display/section-label/SectionLabel";
import { SegmentedButton } from "@/components/ui/inputs/segmented-button/SegmentedButton";
import { Surface } from "@/components/ui/surfaces/surface/Surface";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import {
  effectiveLevel,
  type LogEntry,
  type LogLevel,
} from "@/components/ui/dev/service-logcat/types";
import {
  useLogcat,
  type LevelFloor,
} from "@/components/ui/dev/service-logcat/useLogcat";

export const meta: ComponentMeta = {
  name: "ServiceLogcat",
  description:
    "Service log console with severity-floor filter, text filter, live-tail toggle, copy, load-older paging, and an expandable request/response detail per line",
};

/** Every user-facing string ServiceLogcat renders, for callers that need it
 *  in a locale other than English — all optional, defaulting to the current
 *  English copy, so passing nothing is fully backward compatible. */
export interface ServiceLogcatLabels {
  /** Default: "Logcat" */
  title?: string;
  /** Live-tail toggle when on. Default: "Live" */
  live?: string;
  /** Live-tail toggle when off. Default: "Paused" */
  paused?: string;
  /** Severity-floor option: no filter. Default: "All" */
  floorAll?: string;
  /** Severity-floor option: warn and above. Default: "Warn+" */
  floorWarn?: string;
  /** Severity-floor option: errors only. Default: "Errors" */
  floorError?: string;
  /** aria-label on the severity-floor segmented control. Default: "Filter by level" */
  filterAriaLabel?: string;
  /** Text-filter input label. Default: "Filter logs" */
  filterPlaceholder?: string;
  /** aria-label on the clear-filter button. Default: "Clear filter" */
  clearFilterAriaLabel?: string;
  /** aria-label on the copy-logs button. Default: "Copy logs" */
  copyAriaLabel?: string;
  /** aria-label on an expanded row's copy-this-entry button. Default: "Copy this log entry" */
  copyEntryAriaLabel?: string;
  /** aria-label on a copy-this-entry button in its just-copied state. Default: "Copied" */
  copiedAriaLabel?: string;
  /** Shown when the filter matches nothing. Default: "No matching log entries." */
  noMatchingEntries?: string;
  /** Expanded-row request section heading. Default: "Request" */
  request?: string;
  /** Expanded-row response section heading. Default: "Response" */
  response?: string;
  /** Expanded-row body when neither request nor response is present.
   *  Default: "No request or response body." */
  noRequestResponseBody?: string;
  /** Load-older-entries row label. Default: "Load older entries" */
  loadOlderEntries?: string;
  /** Footer entry-count line, e.g. "42 entries" or "5 of 42" plus the active
   *  query. Called with (filteredCount, total, query). */
  entriesLabel?: (filteredCount: number, total: number, query: string) => string;
  /** Footer status when tailing. Default: "tailing" */
  tailingStatus?: string;
  /** Footer status when paused. Default: "paused" */
  pausedStatus?: string;
}

const defaultEntriesLabel = (filteredCount: number, total: number, query: string) =>
  `${filteredCount === total ? `${total} entries` : `${filteredCount} of ${total}`}${query ? ` · "${query}"` : ""}`;

export interface ServiceLogcatProps {
  /** Log entries, chronological (oldest first); the console reverses them so the newest line sits at the top. */
  logs: LogEntry[];
  /** Load the next page of older entries. With `hasOlder`, renders a load-older row at the old end (bottom) that also auto-fires when the user scrolls near it. */
  onLoadOlder?: () => void;
  /** Whether older entries exist beyond the current `logs` window. */
  hasOlder?: boolean;
  /** Older page currently loading — shows the row in a loading state and suppresses re-fire. */
  loadingOlder?: boolean;
  /** Seeds the text filter box on mount (e.g. a module slug, to land pre-filtered
   *  from a deep link) — after that, the input is normal uncontrolled state. */
  initialQuery?: string;
  /** Override any/all of the component's own strings for i18n. Unset fields
   *  fall back to the English default. */
  labels?: ServiceLogcatLabels;
}

const LEVEL_BADGE: Record<LogLevel, BadgeVariant> = {
  info: "default",
  warn: "warning",
  error: "error",
};

// Message text colour by level — warn/error lines read in their palette so a
// failure stands out, not just its badge. Info stays neutral.
const LEVEL_TEXT: Record<LogLevel, string> = {
  info: "text-on-surface",
  warn: "text-warning",
  error: "text-error",
};

// Compact single-line timestamp: "2026-06-30T16:23:45.225373081Z" ->
// "2026-06-30 16:23:45.225" (drop the T, nanoseconds, and trailing Z).
function fmtTs(ts: string): string {
  const m = ts.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\.(\d{3})/);
  return m ? `${m[1]} ${m[2]}.${m[3]}` : ts;
}

// Header line shared by per-log copy and copy-all: timestamp + effective
// severity (not the raw level — an HTTP failure logged at "info" still reads
// as an error) + message.
function formatHeader(l: LogEntry): string {
  return `${l.ts} ${effectiveLevel(l).toUpperCase()} ${l.msg}`;
}

// Single-entry copy payload: header line plus any expanded request/response
// bodies, pretty-printed to match the detail view.
function formatEntry(l: LogEntry): string {
  const parts = [formatHeader(l)];
  if (l.req_body) parts.push(`Request:\n${prettyJson(l.req_body)}`);
  if (l.res_body) parts.push(`Response:\n${prettyJson(l.res_body)}`);
  return parts.join("\n");
}

// Auto-fire distance from the bottom (old end) for load-older, mirroring the
// 24px pinned-at-top threshold with room for the load-older row itself.
const LOAD_OLDER_NEAR_PX = 48;

// Stable row keys for one filtered window: the source's sequence number when
// present; otherwise ts+msg plus a duplicate-occurrence suffix (ts+msg alone
// collides on repeated lines, and an index suffix would re-key every row each
// time a new line prepends). Occurrences count from the OLD end so existing
// rows keep their keys as newer lines arrive; seq-less sources don't page
// older (seq is what the cursor API provides), so bottom-appends can't shift
// them in practice.
function rowKeysFor(filtered: LogEntry[]): string[] {
  const seen = new Map<string, number>();
  const keys = new Array<string>(filtered.length);
  for (let i = filtered.length - 1; i >= 0; i--) {
    const l = filtered[i];
    if (l.seq != null) {
      keys[i] = `${l.seq}`;
      continue;
    }
    const base = `${l.ts}-${l.msg}`;
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    keys[i] = n === 0 ? base : `${base}-${n}`;
  }
  return keys;
}

/**
 * ServiceLogcat — the module service log console. A severity-floor filter, a
 * text filter, a live-tail toggle, copy, and a mono scroll surface that pins to
 * the newest line while tailing. Purely presentational: the caller supplies the
 * `logs` array (mock today; a live stream tomorrow) and the co-located
 * `useLogcat` hook owns all internal state.
 */
export function ServiceLogcat({
  logs,
  onLoadOlder,
  hasOlder = false,
  loadingOlder = false,
  initialQuery,
  labels,
}: ServiceLogcatProps) {
  const floorOptions: readonly { value: LevelFloor; label: string }[] = [
    { value: "all", label: labels?.floorAll ?? "All" },
    { value: "warn", label: labels?.floorWarn ?? "Warn+" },
    { value: "error", label: labels?.floorError ?? "Errors" },
  ];
  const { query, setQuery, floor, setFloor, tailing, setTailing, filtered, total } =
    useLogcat(logs, initialQuery);
  const rowKeys = useMemo(() => rowKeysFor(filtered), [filtered]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true); // is the view currently pinned at the top?
  const programmaticRef = useRef(false);

  // Accordion: only one row open at a time.
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggleRow = (key: string) => setOpenKey((cur) => (cur === key ? null : key));

  // Per-log copy: which row last copied (drives its check/text-success flash),
  // cleared ~2s later. Mirrors the copy affordance in ReadOnlyField.
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  useEffect(
    () => () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    },
    [],
  );
  const copyEntry = (key: string, l: LogEntry) => {
    navigator.clipboard
      ?.writeText(formatEntry(l))
      .then(() => {
        setCopiedKey(key);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setCopiedKey(null), 2000);
      })
      .catch(() => {});
  };

  const scrollToTop = () => {
    const el = scrollRef.current;
    if (!el) return;
    programmaticRef.current = true;
    el.scrollTop = 0;
    pinnedRef.current = true;
  };

  // One-shot latch so a burst of scroll events fires onLoadOlder once; rearmed
  // when the caller reacts (loadingOlder toggles or new entries arrive).
  const loadOlderFiredRef = useRef(false);
  useEffect(() => {
    loadOlderFiredRef.current = false;
  }, [loadingOlder, logs]);

  // Track whether the view is at the top. A programmatic scroll-to-top is
  // ignored (guarded by programmaticRef). No auto-pause: tailing stays on; we
  // just stop following while the user is scrolled away from the top.
  // Scrolling near the bottom (the OLD end) auto-fires load-older.
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (programmaticRef.current) {
      programmaticRef.current = false;
      return;
    }
    pinnedRef.current = el.scrollTop < 24;
    if (
      onLoadOlder &&
      hasOlder &&
      !loadingOlder &&
      !loadOlderFiredRef.current &&
      el.scrollHeight - el.scrollTop - el.clientHeight < LOAD_OLDER_NEAR_PX
    ) {
      loadOlderFiredRef.current = true;
      onLoadOlder();
    }
  };

  // Newest sits at the TOP. When tailing + pinned, follow to the top. Otherwise,
  // if new lines were prepended above while the user is reading lower down, they
  // would shove the view down — so offset scrollTop by the added height to keep
  // the user anchored to the line they're reading. Older pages append at the
  // BOTTOM (the top row's key is unchanged) — content below the viewport never
  // moves scrollTop, so no offset there. openKey is a dep so the height
  // baseline updates after an expand/collapse too (no false offset).
  const prevLenRef = useRef(filtered.length);
  const prevHeightRef = useRef(0);
  const prevTopKeyRef = useRef<string | null>(rowKeys[0] ?? null);
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const topKey = rowKeys[0] ?? null;
    const grewAbove =
      filtered.length > prevLenRef.current && topKey !== prevTopKeyRef.current;
    if (tailing && pinnedRef.current) {
      scrollToTop();
    } else if (grewAbove) {
      const added = el.scrollHeight - prevHeightRef.current;
      if (added > 0) {
        programmaticRef.current = true;
        el.scrollTop += added;
      }
    }
    prevLenRef.current = filtered.length;
    prevHeightRef.current = el.scrollHeight;
    prevTopKeyRef.current = topKey;
  }, [tailing, filtered, rowKeys, openKey]);

  const copyAll = () => {
    const text = filtered.map(formatHeader).join("\n");
    void navigator.clipboard?.writeText(text);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-2 mb-2">
        <SectionLabel>{labels?.title ?? "Logcat"}</SectionLabel>
        <button
          type="button"
          onClick={() => {
            const next = !tailing;
            setTailing(next);
            if (next) scrollToTop();
          }}
          aria-pressed={tailing}
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
            tailing
              ? "border-success/40 bg-success/10 text-success"
              : "border-outline-variant/50 text-on-surface-variant hover:text-on-surface",
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              tailing ? "bg-success animate-pulse" : "bg-on-surface-variant/40",
            )}
          />
          {tailing ? (labels?.live ?? "Live") : (labels?.paused ?? "Paused")}
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <SegmentedButton
          aria-label={labels?.filterAriaLabel ?? "Filter by level"}
          options={floorOptions}
          value={floor}
          onChange={setFloor}
          size="sm"
        />
        <div className="flex-1">
          <FloatingLabelInput
            id="logcat-filter"
            label={labels?.filterPlaceholder ?? "Filter logs"}
            size="sm"
            hideLabel
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <IconButton
          icon="close"
          aria-label={labels?.clearFilterAriaLabel ?? "Clear filter"}
          variant="filled"
          size="md"
          disabled={!query}
          onClick={() => setQuery("")}
        />
        <IconButton
          icon="content_copy"
          aria-label={labels?.copyAriaLabel ?? "Copy logs"}
          variant="tonal"
          size="md"
          disabled={filtered.length === 0}
          onClick={copyAll}
        />
      </div>

      <Surface className="overflow-hidden flex-1 min-h-0">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          // overflow-anchor:none — the browser's own scroll anchoring would also
          // shift scrollTop when new lines prepend at the TOP, double-counting the
          // manual compensation in the layout effect below and jumping the view;
          // we own that offset. Load-older pages append at the BOTTOM (below the
          // viewport, where anchoring never adjusts), so paging keeps the read
          // position untouched either way.
          style={{ overflowAnchor: "none" }}
          className="h-full overflow-y-auto p-3 font-mono text-xs"
        >
          {filtered.length === 0 ? (
            <p className="text-on-surface-variant/50 py-6 text-center">{labels?.noMatchingEntries ?? "No matching log entries."}</p>
          ) : (
            <div className="space-y-0.5">
              {filtered.map((l, i) => {
                const key = rowKeys[i];
                const hasDetail =
                  l.method != null || l.req_body != null || l.res_body != null;
                const open = openKey === key;
                // Escalate badge + row colour by HTTP status (a 500 logged at
                // "info" still reads as an error), falling back to entry.level.
                const level = effectiveLevel(l);
                return (
                  <div key={key}>
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded px-1 -mx-1 py-0.5 hover:bg-surface-container",
                        hasDetail && "cursor-pointer",
                        open && "bg-surface-container",
                      )}
                      onClick={hasDetail ? () => toggleRow(key) : undefined}
                    >
                      <span className="text-on-surface-variant/50 shrink-0 whitespace-nowrap tabular-nums">
                        {fmtTs(l.ts)}
                      </span>
                      <span className="shrink-0">
                        <Badge variant={LEVEL_BADGE[level]} size="sm">
                          {level}
                        </Badge>
                      </span>
                      <span className={cn("flex-1 break-all", LEVEL_TEXT[level])}>{l.msg}</span>
                      {l.duration_ms != null && (
                        <span className="text-on-surface-variant/40 shrink-0 tabular-nums">
                          {l.duration_ms}ms
                        </span>
                      )}
                    </div>
                    {open && (
                      <div className="mb-1 mt-0.5 ml-4 space-y-1.5 border-l border-outline-variant/40 pl-3">
                        {/* Copy just this entry. Lives in the detail region — a
                            sibling of the toggle above, not inside it — so copying
                            never collapses the row. Global copy-all is unchanged. */}
                        <div className="flex justify-end">
                          <IconButton
                            icon={copiedKey === key ? "check" : "content_copy"}
                            variant="text"
                            size="sm"
                            aria-label={
                              copiedKey === key
                                ? (labels?.copiedAriaLabel ?? "Copied")
                                : (labels?.copyEntryAriaLabel ?? "Copy this log entry")
                            }
                            onClick={() => copyEntry(key, l)}
                            className={cn(
                              "shrink-0",
                              copiedKey === key ? "text-success" : "text-on-surface-variant",
                            )}
                          />
                        </div>
                        {l.req_body ? <LogDetail label={labels?.request ?? "Request"} body={l.req_body} /> : null}
                        {l.res_body ? <LogDetail label={labels?.response ?? "Response"} body={l.res_body} /> : null}
                        {!l.req_body && !l.res_body ? (
                          <p className="text-on-surface-variant/40">
                            {labels?.noRequestResponseBody ?? "No request or response body."}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {onLoadOlder && hasOlder && (
            <Button
              variant="text"
              size="xs"
              fullWidth
              loading={loadingOlder}
              onClick={onLoadOlder}
              className="mt-1"
            >
              {labels?.loadOlderEntries ?? "Load older entries"}
            </Button>
          )}
        </div>
      </Surface>

      <div className="flex items-center justify-between mt-2 px-1 text-xs text-on-surface-variant/50">
        <span>
          {(labels?.entriesLabel ?? defaultEntriesLabel)(filtered.length, total, query)}
        </span>
        <span className={cn(tailing && "text-success/70")}>{tailing ? (labels?.tailingStatus ?? "tailing") : (labels?.pausedStatus ?? "paused")}</span>
      </div>
    </div>
  );
}

function LogDetail({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant/60">
        {label}
      </p>
      <pre className="whitespace-pre-wrap break-all rounded bg-surface-container-low px-2 py-1.5 text-[11px] text-on-surface/80">
        {prettyJson(body)}
      </pre>
    </div>
  );
}

// Pretty-print JSON bodies; leave non-JSON text as-is.
function prettyJson(s: string): string {
  try {
    return JSON.stringify(JSON.parse(s), null, 2);
  } catch {
    return s;
  }
}
