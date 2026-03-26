"use client";

import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export interface EmptyStateProps {
  /** Material Symbols icon name */
  icon?: string;
  /** Heading text */
  title: string;
  /** Description text */
  description?: string;
  /** Action area (e.g. a button) */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className,
      )}
    >
      {icon && (
        <span className="material-symbols-rounded text-6xl text-on-surface-variant/40 mb-4">
          {icon}
        </span>
      )}
      <h2 className="text-lg font-medium text-on-surface mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-on-surface-variant max-w-md mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
