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
  /** When true, the canvas wrapper shrinks horizontally to leave room for the side panel. */
  sideOpen?: boolean;
  /** Width reserved for the side panel when sideOpen is true. Default 260. */
  sideWidth?: number;
  className?: string;
}

// Matches the side panel's right-1.5 inset (6px) in GraphSide.
const SIDE_GAP = 6;

export function GraphLayout({
  canvas,
  action,
  side,
  sideOpen,
  sideWidth = 260,
  className,
}: GraphLayoutProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Inner clip — canvas and the slide-in side panel are confined here
          so the panel doesn't leak past the container's right edge when
          closed. Matches the kit's rounded-xl chrome. */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {/* Canvas wrapper shrinks when the side panel is open so the
            consumer's Graph (or any canvas content) reflows into the
            visible area rather than being overlaid. */}
        <div
          className="absolute top-0 bottom-0 left-0 transition-[right] duration-200 ease-out"
          style={{ right: sideOpen ? sideWidth + SIDE_GAP : 0 }}
        >
          {canvas}
        </div>
        {side}
      </div>
      {action && (
        <div className="absolute -top-1.5 -right-1.5 z-10">{action}</div>
      )}
    </div>
  );
}
