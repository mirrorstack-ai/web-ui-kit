import { useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui/media/icon/Icon";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "AgentSidebarToolCall",
  description:
    "Compact collapsible row showing one executed module tool call inside the agent message thread.",
};

/** One module tool call, camelCase at the kit boundary — the consumer maps
 *  wire meta (snake_case replay rows, `slug__tool` SSE names) into this. */
export interface AgentToolCall {
  /** Present only for account-scope 3-segment calls (app · module · tool). */
  appSlug?: string;
  moduleSlug: string;
  tool: string;
  status: "started" | "done" | "error";
  error?: string;
  /** Milliseconds. Shown right-aligned (e.g. "1.2s") when present. */
  durationMs?: number;
  /** Raw args value — pretty-printed in the expandable detail panel. */
  args?: unknown;
  /** Raw result value — pretty-printed in the expandable detail panel. */
  result?: unknown;
}

/** Localizable status/aria text for tool-call rows (English defaults). */
export interface AgentToolCallLabels {
  running?: string;
  done?: string;
  failed?: string;
  showDetail?: string;
  hideDetail?: string;
}

export interface AgentSidebarToolCallProps {
  tool: AgentToolCall;
  toolLabels?: AgentToolCallLabels;
  className?: string;
}

const DEFAULT_LABELS: Required<AgentToolCallLabels> = {
  running: "Running",
  done: "Done",
  failed: "Failed",
  showDetail: "Show detail",
  hideDetail: "Hide detail",
};

function formatDuration(ms: number): string {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

export function AgentSidebarToolCall({
  tool,
  toolLabels,
  className,
}: AgentSidebarToolCallProps) {
  const labels = { ...DEFAULT_LABELS, ...toolLabels };
  const [open, setOpen] = useState(false);

  const hasDetail =
    tool.args !== undefined ||
    tool.result !== undefined ||
    tool.error !== undefined;
  const isError = tool.status === "error";
  const isStarted = tool.status === "started";

  if (isDev && isError && !hasDetail) {
    console.warn(
      "[AgentSidebarToolCall] status=error without error/args/result — the row cannot explain the failure.",
    );
  }

  const statusLabel = isStarted
    ? labels.running
    : isError
      ? labels.failed
      : labels.done;

  const label = [tool.appSlug, tool.moduleSlug, tool.tool]
    .filter(Boolean)
    .join(" · ");

  const leadingIcon = isStarted ? (
    // Material Symbols has no animated glyph — border-arc spinner instead.
    <span
      className="inline-block w-[14px] h-[14px] rounded-full border-2 border-inverse-on-surface/30 border-t-inverse-on-surface animate-spin shrink-0"
      aria-hidden
    />
  ) : (
    <Icon
      name={isError ? "error" : "check_circle"}
      size={14}
      className={cn("shrink-0", isError ? "text-error" : "text-inverse-on-surface/60")}
    />
  );

  const rowContent = (
    <>
      {leadingIcon}
      <span
        className={cn(
          "font-mono text-[11px] leading-none min-w-0 truncate flex-1",
          isError ? "text-error" : "text-inverse-on-surface/60",
        )}
      >
        {label}
      </span>
      {tool.durationMs !== undefined && !isStarted && (
        <span className="font-mono text-[11px] leading-none text-inverse-on-surface/40 shrink-0 tabular-nums">
          {formatDuration(tool.durationMs)}
        </span>
      )}
      {hasDetail && (
        <Icon
          name={open ? "expand_less" : "expand_more"}
          size={14}
          className="text-inverse-on-surface/40 shrink-0"
        />
      )}
    </>
  );

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {hasDetail ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={`${statusLabel}: ${label}. ${open ? labels.hideDetail : labels.showDetail}`}
          className="flex items-center gap-1.5 min-h-[24px] w-full text-left"
        >
          {rowContent}
        </button>
      ) : (
        <div
          className="flex items-center gap-1.5 min-h-[24px]"
          role="status"
          aria-label={`${statusLabel}: ${label}`}
        >
          {rowContent}
        </div>
      )}
      {open && hasDetail && (
        <div className="rounded bg-inverse-on-surface/[0.08] max-h-40 overflow-y-auto p-2 space-y-2 font-mono text-[11px] leading-relaxed text-inverse-on-surface/70">
          {tool.args !== undefined && (
            <DetailSection label="args" text={JSON.stringify(tool.args, null, 2)} />
          )}
          {tool.result !== undefined && (
            <DetailSection label="result" text={JSON.stringify(tool.result, null, 2)} />
          )}
          {tool.error !== undefined && (
            <DetailSection label="error" text={tool.error} error />
          )}
        </div>
      )}
    </div>
  );
}

function DetailSection({
  label,
  text,
  error = false,
}: {
  label: string;
  text: string;
  error?: boolean;
}) {
  return (
    <section>
      <p className={cn("mb-0.5", error ? "text-error/70" : "text-inverse-on-surface/40")}>
        {label}
      </p>
      <pre className={cn("whitespace-pre-wrap break-all", error && "text-error")}>
        {text}
      </pre>
    </section>
  );
}
