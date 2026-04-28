import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Skeleton",
  description: "Loading placeholder with configurable dimensions and multi-line support",
};

export interface SkeletonProps {
  /** Tailwind width class (e.g. "w-full", "w-48") */
  width?: string;
  /** Tailwind height class (e.g. "h-4", "h-8") */
  height?: string;
  /** Additional classes */
  className?: string;
  /** Renders multiple skeleton bars with vertical spacing */
  lines?: number;
}

export function Skeleton({
  width = "w-full",
  height = "h-4",
  className = "",
  lines = 1,
}: SkeletonProps) {
  if (isDev && lines < 1) {
    console.warn("[Skeleton] lines must be at least 1, received:", lines);
  }

  const count = Math.max(1, Math.round(lines));

  if (count > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className={cn(
              width,
              height,
              "bg-surface-container-highest rounded animate-pulse",
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        width,
        height,
        "bg-surface-container-highest rounded animate-pulse",
        className,
      )}
    />
  );
}
