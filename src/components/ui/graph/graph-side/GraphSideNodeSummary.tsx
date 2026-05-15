import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideNodeSummary",
  description:
    "Always-visible summary card for a graph node — a `source:id` line plus a one-sentence description. Place in GraphSideContent's `prepend` slot. Source is plain text here because tags already render as Badges in GraphSideHeader.",
};

export interface GraphSideNodeSummaryProps {
  description: string;
  source: string;
  id: string;
  className?: string;
}

export function GraphSideNodeSummary({
  description,
  source,
  id,
  className,
}: GraphSideNodeSummaryProps) {
  if (isDev && !id && !source) {
    console.warn(
      "[GraphSideNodeSummary] both `id` and `source` are empty — the source:id line will render as just a colon.",
    );
  }

  return (
    <div className={cn("flex flex-col gap-1 px-2 py-2", className)}>
      <span className="text-xs font-mono text-on-surface-variant truncate">
        {source}:{id}
      </span>
      <p className="text-sm text-on-surface">{description}</p>
    </div>
  );
}
