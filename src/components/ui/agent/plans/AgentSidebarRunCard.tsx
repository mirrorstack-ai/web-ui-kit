import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";
import { isSafeConfirmHref } from "./AgentSidebarPlanCard";

export const meta: ComponentMeta = {
  name: "AgentSidebarRunCard",
  description:
    "Build run card for the agent sidebar, shown beside the plan card — server facts only (state, status, last event) as plain text, plus a candidate link that exists only when the server sent a candidate id.",
};

/** What the server reports about one build run (`author_run` on the plan body). Every string is
 *  shown as a plain React text node: never markdown, HTML, an image or a link built from it. */
export interface AgentSidebarRun {
  /** Run state from the server (open string: shown through the host's label map, never branched on). */
  state: string;
  /** Server status line for the run, plain text. */
  status?: string;
  /** The last event the server recorded for the run, plain text. */
  lastEvent?: string;
  /** Set once the run produced a candidate. Without it the link slot is empty. Never printed. */
  candidateId?: string | null;
}

export interface AgentSidebarRunCardLabels {
  /** Card group name and heading. */
  run: string;
  /** Label before the last event text. */
  lastEvent: string;
  /** The candidate link text. */
  openCandidate: string;
  /** State text keyed by state; an unknown state shows as the server sent it. */
  runStates: Record<string, string>;
}

const DEFAULT_LABELS: AgentSidebarRunCardLabels = {
  run: "Build",
  lastEvent: "Last event",
  openCandidate: "Open the candidate",
  runStates: {
    queued: "Queued", running: "Running", done: "Done", failed: "Failed", cancelled: "Cancelled",
  },
};

const STATE_STYLE: Record<string, { icon: string; color: string }> = {
  queued: { icon: "schedule", color: "text-inverse-on-surface/70" },
  running: { icon: "progress_activity", color: "text-inverse-primary" },
  done: { icon: "check_circle", color: "text-inverse-primary" },
  failed: { icon: "error", color: "text-error-container" },
  cancelled: { icon: "cancel", color: "text-inverse-on-surface/55" },
};

export interface AgentSidebarRunCardProps extends AgentSidebarRun {
  /** Where the candidate page is. The HOST builds it from the candidate id (the kit knows no hosts).
   *  The link renders only when `candidateId` is set AND this is `https:` or a same-origin path. */
  candidateHref?: string;
  labels?: Partial<AgentSidebarRunCardLabels>;
  className?: string;
}

export function AgentSidebarRunCard({
  state, status, lastEvent, candidateId, candidateHref, labels: overrides, className,
}: AgentSidebarRunCardProps) {
  const labels = { ...DEFAULT_LABELS, ...overrides, runStates: { ...DEFAULT_LABELS.runStates, ...overrides?.runStates } };
  const style = STATE_STYLE[state] ?? STATE_STYLE.queued;
  const showLink = !!candidateId && isSafeConfirmHref(candidateHref);

  // Every server string below is a plain React text node: no markdown, no HTML, no images and no
  // links are ever built from run text. The candidate id is a gate, never text on the page.
  return (
    <div role="group" aria-label={labels.run}
      className={cn("rounded-lg border border-outline-variant/30 bg-inverse-on-surface/[0.03]", className)}>
      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1">
        <Icon name={style.icon} size={12} className={style.color} />
        <span role="status" className={cn("text-[10px] font-medium uppercase tracking-[0.08em]", style.color)}>
          {labels.run} · {labels.runStates[state] ?? state}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-3 pb-3">
        {status && <p className="min-w-0 break-words text-sm leading-snug text-inverse-on-surface">{status}</p>}
        {lastEvent && (
          <p className="min-w-0 break-words text-xs leading-snug text-inverse-on-surface/70">
            {labels.lastEvent}: {lastEvent}
          </p>
        )}
        {showLink && (
          <a href={candidateHref}
            className="inline-flex items-center gap-1 self-start text-sm font-medium text-inverse-primary underline-offset-2 hover:underline">
            {labels.openCandidate}
            <Icon name="arrow_forward" size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
