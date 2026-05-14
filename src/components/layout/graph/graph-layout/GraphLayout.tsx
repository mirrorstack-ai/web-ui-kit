import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphLayout",
  description:
    "Layout shell for a Graph view with optional canvas, action toolbar (top-right), and side panel slots.",
};

export interface GraphLayoutProps {
  canvas?: ReactNode;
  /** Rendered absolutely at the top-right corner, slightly bleeding outside the container. */
  action?: ReactNode;
  /** Rendered as a direct child — the side component owns its own positioning. */
  side?: ReactNode;
  className?: string;
}

export function GraphLayout({
  canvas,
  action,
  side,
  className,
}: GraphLayoutProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {canvas}
      {action && (
        <div className="absolute -top-1.5 -right-1.5 z-10">{action}</div>
      )}
      {side}
    </div>
  );
}
