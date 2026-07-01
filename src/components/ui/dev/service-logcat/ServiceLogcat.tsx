import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Badge, type BadgeVariant } from "@/components/ui/feedback/badge/Badge";
import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { SectionLabel } from "@/components/ui/display/section-label/SectionLabel";
import { SegmentedButton } from "@/components/ui/inputs/segmented-button/SegmentedButton";
import { Surface } from "@/components/ui/surfaces/surface/Surface";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import type {
  LogEntry,
  LogLevel,
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

export interface ServiceLogcatProps {
  /** Log entries, chronological (oldest first); the console reverses them so the newest line sits at the top. */
  logs: LogEntry[];
  /** Load the next page of older entries. With `hasOlder`, renders a load-older row at the old end (bottom) that also auto-fires when the user scrolls near it. */
  onLoadOlder?: () => void;
  /** Whether older entries exist beyond the current `logs` window. */
  hasOlder?: boolean;
  /** Older page currently loading — shows the row in a loading state and suppresses re-fire. */
  loadingOlder?: boolean;
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

const FLOOR_OPTIONS: readonly { value: LevelFloor; label: string }[] = [
  { value: "all", label: "All" },
  { value: "warn", label: "Warn+" },
  { value: "error", label: "Errors" },
];

// Compact single-line timestamp: "2026-06-30T16:23:45.225373081Z" ->
// "2026-06-30 16:23:45.225" (drop the T, nanoseconds, and trailing Z).
function fmtTs(ts: string): string {
  const m = ts.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\.(\d{3})/);
  return m ? `${m[1]} ${m[2]}.${m[3]}` : ts;
}

// Auto-fire distance from the bottom (old end) for load-older, mirroring the
// 24px pinned-at-top threshold with room for the load-older row itself.
const LOAD_OLDER_NEAR_PX = 48;

// Stable row key: the source's sequence number when present; otherwise the
// ts/msg/filtered-index composite (ts+msg alone collides on repeated lines).
function rowKey(l: LogEntry, i: number): string {
  return l.seq != null ? `${l.seq}` : `${l.ts}-${l.msg}-${i}`;
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
}: ServiceLogcatProps) {
  const { query, setQuery, floor, setFloor, tailing, setTailing, filtered, total } =
    useLogcat(logs);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true); // is the view currently pinned at the top?
  const programmaticRef = useRef(false);

  // Accordion: only one row open at a time.
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggleRow = (key: string) => setOpenKey((cur) => (cur === key ? null : key));

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
  const prevTopKeyRef = useRef(filtered.length > 0 ? rowKey(filtered[0], 0) : null);
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const topKey = filtered.length > 0 ? rowKey(filtered[0], 0) : null;
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
  }, [tailing, filtered, openKey]);

  const copyAll = () => {
    const text = filtered.map((l) => `${l.ts} ${l.level.toUpperCase()} ${l.msg}`).join("\n");
    void navigator.clipboard?.writeText(text);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-2 mb-2">
        <SectionLabel>Logcat</SectionLabel>
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
          {tailing ? "Live" : "Paused"}
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <SegmentedButton
          aria-label="Filter by level"
          options={FLOOR_OPTIONS}
          value={floor}
          onChange={setFloor}
          size="sm"
        />
        <div className="flex-1">
          <FloatingLabelInput
            id="logcat-filter"
            label="Filter logs"
            size="sm"
            hideLabel
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <IconButton
          icon="close"
          aria-label="Clear filter"
          variant="filled"
          size="md"
          disabled={!query}
          onClick={() => setQuery("")}
        />
        <IconButton
          icon="content_copy"
          aria-label="Copy logs"
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
          className="h-full overflow-y-auto p-3 font-mono text-xs"
        >
          {filtered.length === 0 ? (
            <p className="text-on-surface-variant/50 py-6 text-center">No matching log entries.</p>
          ) : (
            <div className="space-y-0.5">
              {filtered.map((l, i) => {
                const key = rowKey(l, i);
                const hasDetail =
                  l.method != null || l.req_body != null || l.res_body != null;
                const open = openKey === key;
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
                        <Badge variant={LEVEL_BADGE[l.level]} size="sm">
                          {l.level}
                        </Badge>
                      </span>
                      <span className={cn("flex-1 break-all", LEVEL_TEXT[l.level])}>{l.msg}</span>
                      {l.duration_ms != null && (
                        <span className="text-on-surface-variant/40 shrink-0 tabular-nums">
                          {l.duration_ms}ms
                        </span>
                      )}
                    </div>
                    {open && (
                      <div className="mb-1 mt-0.5 ml-4 space-y-1.5 border-l border-outline-variant/40 pl-3">
                        {l.req_body ? <LogDetail label="Request" body={l.req_body} /> : null}
                        {l.res_body ? <LogDetail label="Response" body={l.res_body} /> : null}
                        {!l.req_body && !l.res_body ? (
                          <p className="text-on-surface-variant/40">No request or response body.</p>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {onLoadOlder && hasOlder && (
            <button
              type="button"
              disabled={loadingOlder}
              onClick={onLoadOlder}
              className={cn(
                "mt-1 flex w-full items-center justify-center gap-2 rounded py-1.5",
                "text-on-surface-variant/60 hover:bg-surface-container hover:text-on-surface",
                loadingOlder && "pointer-events-none",
              )}
            >
              {loadingOlder && (
                <span className="inline-block w-3 h-3 rounded-full border-2 border-on-surface-variant/30 border-t-on-surface-variant animate-spin" />
              )}
              {loadingOlder ? "Loading older entries…" : "Load older entries"}
            </button>
          )}
        </div>
      </Surface>

      <div className="flex items-center justify-between mt-2 px-1 text-xs text-on-surface-variant/50">
        <span>
          {filtered.length === total ? `${total} entries` : `${filtered.length} of ${total}`}
          {query && ` · “${query}”`}
        </span>
        <span className={cn(tailing && "text-success/70")}>{tailing ? "tailing" : "paused"}</span>
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
