import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Button } from "@/components/ui/actions/button/Button";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

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
          "w-fit min-w-[280px] max-w-2xl bg-surface-container-high border rounded-2xl shadow-md",
          variantBorder[variant],
        )}
      >
        <div
          className={cn(
            "px-5 flex items-center justify-between gap-4 min-h-12",
            hasActions ? "py-1.5" : "py-2.5",
          )}
        >
          <div className="flex items-center gap-3">
            {variant === "unsave" && (
              <div className="w-2 h-2 rounded-full bg-warning animate-pulse shrink-0" />
            )}
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
            <span className={cn("text-sm whitespace-nowrap", variantTextColor[variant])}>
              {message}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {secondaryAction && (
              <Button
                variant="text"
                size="sm"
                onClick={secondaryAction.onClick}
                disabled={loading}
                className="!h-8 !py-1 !text-xs"
              >
                {secondaryAction.label}
              </Button>
            )}
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
