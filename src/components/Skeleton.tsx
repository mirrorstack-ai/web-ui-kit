"use client";

import { cn } from "../utils/cn";

export interface SkeletonProps {
  /** Width class or style (e.g. "w-full", "w-32") */
  width?: string;
  /** Height class or style (e.g. "h-4", "h-8") */
  height?: string;
  /** Use circular shape */
  circle?: boolean;
  /** Number of skeleton lines to render */
  lines?: number;
  className?: string;
}

export function Skeleton({
  width = "w-full",
  height = "h-4",
  circle = false,
  lines = 1,
  className,
}: SkeletonProps) {
  if (lines > 1) {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              "animate-pulse rounded-md bg-on-surface/10",
              width,
              height,
              i === lines - 1 && "w-3/4",
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "animate-pulse bg-on-surface/10",
        circle ? "rounded-full" : "rounded-md",
        width,
        height,
        className,
      )}
    />
  );
}
