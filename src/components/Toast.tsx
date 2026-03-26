"use client";

import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Button } from "./Button";

export type ToastVariant =
  | "default"
  | "success"
  | "error"
  | "warning";

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  open?: boolean;
  onDismiss?: () => void;
  /** Auto-dismiss after ms (default: 4000, 0 = no auto-dismiss) */
  duration?: number;
  /** Primary action button */
  action?: { label: string; onClick: () => void };
  /** Show loading state on primary action button */
  loading?: boolean;
  /** Use inline positioning (inside a scroll container) instead of fixed viewport */
  inline?: boolean;
  className?: string;
}

const variantIcon: Record<ToastVariant, string | null> = {
  default: null,
  success: "check_circle",
  error: "error",
  warning: "warning",
};

const variantBorder: Record<ToastVariant, string> = {
  default: "border-outline-variant",
  success: "border-success",
  error: "border-error",
  warning: "border-warning",
};

const variantTextColor: Record<ToastVariant, string> = {
  default: "text-on-surface",
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
};

export function Toast({
  message,
  variant = "default",
  open = true,
  onDismiss,
  duration = 4000,
  action,
  loading = false,
  inline = false,
  className,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  // Slide-in animation
  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
    }
  }, [open]);

  // Auto-dismiss
  useEffect(() => {
    if (!open || duration === 0 || !onDismiss) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onDismiss]);

  if (!open && !visible) return null;

  const icon = variantIcon[variant];

  return (
    <div
      className={cn(
        "z-50 flex justify-center px-4",
        "transition-all duration-300 ease-out",
        inline
          ? "absolute bottom-4 inset-x-0"
          : "fixed bottom-4 inset-x-0",
        visible && open
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy={loading}
    >
      <div
        className={cn(
          "w-full max-w-2xl bg-surface-container-high border rounded-2xl shadow-2xl shadow-black/20",
          variantBorder[variant],
        )}
      >
        <div
          className={cn(
            "px-5 flex items-center justify-between gap-4 whitespace-nowrap min-h-12",
            action ? "py-1.5" : "py-2.5",
          )}
        >
          <div className="flex items-center gap-3">
            {icon && (
              <span
                className={cn(
                  "material-symbols-rounded !text-xl shrink-0",
                  variantTextColor[variant],
                )}
              >
                {icon}
              </span>
            )}
            <span className={cn("text-sm", variantTextColor[variant])}>
              {message}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {action && (
              <Button
                size="sm"
                onClick={action.onClick}
                loading={loading}
                className="!h-8 !py-1 !text-xs"
              >
                {action.label}
              </Button>
            )}
            {onDismiss && !action && (
              <button
                type="button"
                className={cn(
                  "h-8 w-8 rounded-lg inline-flex items-center justify-center transition-colors",
                  variantTextColor[variant],
                )}
                onClick={onDismiss}
                aria-label="Dismiss"
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: 20 }}
                >
                  close
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
