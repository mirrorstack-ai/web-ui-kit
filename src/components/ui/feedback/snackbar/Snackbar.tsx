import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Button } from "@/components/ui/actions/button/Button";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "Snackbar",
  description: "Toast-style notification bar with slide-in/out animation, auto-dismiss, and optional action buttons",
};

export type SnackbarVariant = "default" | "success" | "error" | "warning" | "unsave";

export const SNACKBAR_EXIT_MS = 300;

export interface SnackbarAction {
  label: string;
  onClick: () => void;
}

export interface SnackbarProps {
  message: string;
  variant?: SnackbarVariant;
  open?: boolean;
  onDismiss?: () => void;
  /** Auto-dismiss after ms (default: 4000, 0 = no auto-dismiss). Unsave defaults to 0. */
  duration?: number;
  action?: SnackbarAction;
  secondaryAction?: SnackbarAction;
  loading?: boolean;
  /** Use absolute positioning instead of fixed viewport */
  inline?: boolean;
  className?: string;
}

const variantIcon: Record<SnackbarVariant, string | null> = {
  default: null,
  success: "check_circle",
  error: "error",
  warning: "warning",
  unsave: null,
};

const variantBorder: Record<SnackbarVariant, string> = {
  default: "border-outline-variant",
  success: "border-success",
  error: "border-error",
  warning: "border-warning",
  unsave: "border-outline-variant",
};

const variantTextColor: Record<SnackbarVariant, string> = {
  default: "text-on-surface",
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
  unsave: "text-on-surface",
};

const ACTION_BTN_CLS = "!h-8 !py-1 !text-xs";

export function Snackbar({
  message,
  variant = "default",
  open = true,
  onDismiss,
  duration,
  action,
  secondaryAction,
  loading = false,
  inline = false,
  className,
}: SnackbarProps) {
  const [visible, setVisible] = useState(false);
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  const effectiveDuration = duration ?? (variant === "unsave" ? 0 : 4000);

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
    if (!open || effectiveDuration === 0 || !onDismissRef.current) return;
    const timer = setTimeout(() => onDismissRef.current?.(), effectiveDuration);
    return () => clearTimeout(timer);
  }, [open, effectiveDuration]);

  if (!open && !visible) return null;

  const icon = variantIcon[variant];
  const hasActions = !!action || !!secondaryAction;

  return (
    <div
      className={cn(
        "z-50 flex justify-center px-4",
        "transition-all duration-300 ease-out",
        inline ? "absolute bottom-4 inset-x-0" : "fixed bottom-4 inset-x-0",
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
          "w-full max-w-lg bg-surface-container-high border rounded-2xl shadow-md",
          variantBorder[variant],
        )}
      >
        <div
          className={cn(
            "px-3 sm:px-4 flex min-h-12",
            hasActions
              ? "flex-col items-start gap-2 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-2"
              : "items-center justify-between gap-3 py-2.5",
          )}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {variant === "unsave" && (
              <div className="w-2 h-2 rounded-full bg-warning animate-pulse shrink-0" />
            )}
            {icon && (
              <Icon
                name={icon}
                size={20}
                className={variantTextColor[variant]}
              />
            )}
            <span className={cn("text-sm line-clamp-3 break-all", variantTextColor[variant])}>
              {message}
            </span>
          </div>

          <div className={cn("flex items-center gap-2 shrink-0 self-center", hasActions && "self-end sm:self-center w-full sm:w-auto")}>
            {secondaryAction && (
              <Button
                variant="outline"
                size="sm"
                onClick={secondaryAction.onClick}
                disabled={loading}
                className={ACTION_BTN_CLS + " flex-1 sm:flex-none sm:border-0 sm:bg-transparent"}
              >
                {secondaryAction.label}
              </Button>
            )}
            {action && (
              <Button
                size="sm"
                onClick={action.onClick}
                loading={loading}
                className={ACTION_BTN_CLS + " flex-1 sm:flex-none"}
              >
                {action.label}
              </Button>
            )}
            {onDismiss && !hasActions && (
              <IconButton
                icon="close"
                variant="text"
                size="sm"
                className={cn("-my-1", variantTextColor[variant])}
                onClick={onDismiss}
                aria-label="Dismiss"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
