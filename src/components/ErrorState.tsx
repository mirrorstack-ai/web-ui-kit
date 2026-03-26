"use client";

import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { Button } from "./Button";

export interface ErrorStateProps {
  /** Error object or message */
  error: Error | string;
  /** Override the heading text */
  title?: string;
  /** Retry handler -- shows a retry button when provided */
  onRetry?: () => void;
  /** Extra action area */
  action?: ReactNode;
  className?: string;
}

export function ErrorState({
  error,
  title = "Something went wrong",
  onRetry,
  action,
  className,
}: ErrorStateProps) {
  const message = error instanceof Error ? error.message : error;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className,
      )}
      role="alert"
    >
      <span className="material-symbols-rounded text-6xl text-error/40 mb-4">
        error
      </span>
      <h2 className="text-lg font-medium text-on-surface mb-2">{title}</h2>
      <p className="text-sm text-on-surface-variant max-w-md mb-6">
        {message}
      </p>
      <div className="flex items-center gap-3">
        {onRetry && (
          <Button variant="tonal" color="error" onClick={onRetry}>
            Try again
          </Button>
        )}
        {action}
      </div>
    </div>
  );
}
