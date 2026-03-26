"use client";

import { cn } from "../utils/cn";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  /** Badge label text */
  children: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Material Symbols icon name shown before the text */
  icon?: string;
  /** Show a pulsing dot indicator */
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-surface-container text-on-surface-variant border border-outline-variant",
  primary: "bg-primary/10 text-primary border border-primary/20",
  success: "bg-success/10 text-success border border-success/20",
  warning: "bg-warning/10 text-warning border border-warning/20",
  error: "bg-error/10 text-error border border-error/20",
  info: "bg-tertiary/10 text-tertiary border border-tertiary/20",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-on-surface-variant",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-tertiary",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

const iconSizes: Record<BadgeSize, number> = {
  sm: 12,
  md: 14,
};

/**
 * Status badge for indicating state (pending, ready, failed, processing, etc.).
 *
 * @example
 * ```tsx
 * <Badge variant="success">Ready</Badge>
 * <Badge variant="error" icon="error">Failed</Badge>
 * <Badge variant="warning" dot>Processing</Badge>
 * ```
 */
export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0 animate-pulse",
            dotColors[variant],
          )}
          aria-hidden="true"
        />
      )}
      {icon && (
        <span
          className="material-symbols-rounded shrink-0"
          style={{ fontSize: iconSizes[size] }}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
