"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Use interactive styles (hover effect, cursor pointer) */
  interactive?: boolean;
}

export function Card({
  children,
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface-container-low border border-outline-variant",
        interactive &&
          "cursor-pointer hover:bg-surface-container transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
