import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideNodeDetail",
  description:
    "Free-form body slot for a graph node's detail section — pairs naturally with GraphSideContent's collapsible items. Renders children with consistent text styling and spacing.",
};

export interface GraphSideNodeDetailProps {
  children: ReactNode;
  className?: string;
}

export function GraphSideNodeDetail({
  children,
  className,
}: GraphSideNodeDetailProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 px-2 py-1 text-sm text-on-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}
