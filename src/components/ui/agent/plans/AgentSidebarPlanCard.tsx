import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Button } from "@/components/ui/actions/button/Button";

export const meta: ComponentMeta = {
  name: "AgentSidebarPlanCard",
  description:
    "Install-plan card for the agent sidebar — server facts only (plain-text step titles, category and state badges), an optional Approve button on draft/edit_text steps and one confirm link.",
};

/** One step as the server reports it. `category` and `state` are OPEN strings:
 *  show them, never branch on them (only `draft`/`edit_text` unlock Approve). */
export interface AgentSidebarPlanStep {
  id: string;
  title: string;
  category: string;
  state: string;
}

export interface AgentSidebarPlanCardLabels {
  /** Card group name and heading. */
  plan: string;
  approve: string;
  review: string;
  /** State text keyed by state; an unknown state shows as the server sent it. */
  planStates: Record<string, string>;
  stepStates: Record<string, string>;
}

const DEFAULT_LABELS: AgentSidebarPlanCardLabels = {
  plan: "Plan",
  approve: "Approve",
  review: "Review and confirm",
  planStates: {
    proposed: "Proposed", approved: "Approved", executing: "Executing", done: "Done",
    failed: "Failed", expired: "Expired", cancelled: "Cancelled",
  },
  stepStates: {},
};

/** Plan states that are over: no button, no link. */
const FINISHED = new Set(["done", "failed", "expired", "cancelled"]);
/** Step states the user can approve from the sidebar. */
const APPROVABLE = new Set(["draft", "edit_text"]);

const dim = "text-inverse-on-surface/55";
const STATE_STYLE: Record<string, { icon: string; color: string }> = {
  proposed: { icon: "pending_actions", color: "text-inverse-on-surface/70" },
  approved: { icon: "thumb_up", color: "text-inverse-primary" }, executing: { icon: "progress_activity", color: "text-inverse-primary" },
  done: { icon: "check_circle", color: "text-inverse-primary" }, failed: { icon: "error", color: "text-error-container" },
  expired: { icon: "schedule", color: dim }, cancelled: { icon: "cancel", color: dim },
};

/** Only `https:` or a same-origin relative path may become the link — never
 *  `javascript:`, `data:` or a protocol-relative `//host` URL. */
export function isSafeConfirmHref(href: string | undefined): href is string {
  if (!href) return false;
  if (href.startsWith("/")) return !/^\/[/\\]/.test(href);
  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
}

export interface AgentSidebarPlanCardProps {
  planId: string;
  /** Plan-level state from the server. */
  state: string;
  steps: AgentSidebarPlanStep[];
  /** Where "Review and confirm" goes. The HOST builds it (the kit knows no hosts). */
  confirmHref?: string;
  /** Without a handler no step shows Approve (no server route exists yet). */
  onApproveStep?: (planId: string, stepId: string) => void;
  labels?: Partial<AgentSidebarPlanCardLabels>;
  className?: string;
}

const badge = "rounded-full px-2 py-0.5 text-[10px] font-medium text-inverse-on-surface/70";

export function AgentSidebarPlanCard({
  planId, state, steps, confirmHref, onApproveStep, labels: overrides, className,
}: AgentSidebarPlanCardProps) {
  const labels = {
    ...DEFAULT_LABELS,
    ...overrides,
    planStates: { ...DEFAULT_LABELS.planStates, ...overrides?.planStates },
  };
  const live = !FINISHED.has(state);
  const canApprove = (s: AgentSidebarPlanStep) => live && !!onApproveStep && APPROVABLE.has(s.state);
  const showLink = live && isSafeConfirmHref(confirmHref) && steps.some((s) => !canApprove(s));
  const style = STATE_STYLE[state] ?? STATE_STYLE.proposed;

  // Every server string below is a plain React text node: no markdown, no
  // HTML, no images and no links are ever built from step text.
  return (
    <div role="group" aria-label={labels.plan}
      className={cn("rounded-lg border border-outline-variant/30 bg-inverse-on-surface/[0.03]", className)}>
      <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1">
        <Icon name={style.icon} size={12} className={style.color} /><span role="status" className={cn("text-[10px] font-medium uppercase tracking-[0.08em]", style.color)}>
          {labels.plan} · {labels.planStates[state] ?? state}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-3 pb-3">
        <ul className="flex flex-col gap-2">
          {steps.map((s) => (
            <li key={s.id} className="flex flex-col gap-1.5 rounded-md border border-outline-variant/20 px-3 py-2.5">
              <span className="min-w-0 break-words text-sm font-medium leading-snug text-inverse-on-surface">
                {s.title}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={cn(badge, "bg-inverse-on-surface/[0.08]")}>{s.category}</span>
                <span className={cn(badge, "border border-outline-variant/30")}>
                  {labels.stepStates[s.state] ?? s.state}
                </span>
                {canApprove(s) && (
                  <Button variant="tonal" color="primary" size="sm" className="ml-auto"
                    aria-label={`${labels.approve}: ${s.title}`} onClick={() => onApproveStep?.(planId, s.id)}>
                    {labels.approve}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
        {showLink && (
          <a
            href={confirmHref}
            className="inline-flex items-center gap-1 self-start text-sm font-medium text-inverse-primary underline-offset-2 hover:underline"
          >
            {labels.review}
            <Icon name="arrow_forward" size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
