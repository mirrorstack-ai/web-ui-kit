"use client";

import { cn } from "../utils/cn";

export type SwitchColor = "primary" | "error" | "warning";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  disabled?: boolean;
  color?: SwitchColor;
  className?: string;
}

const trackColors: Record<SwitchColor, string> = {
  primary: "bg-primary",
  error: "bg-error",
  warning: "bg-warning",
};

const thumbColors: Record<SwitchColor, string> = {
  primary: "bg-on-primary",
  error: "bg-on-error",
  warning: "bg-on-warning",
};

export function Switch({
  checked,
  onChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  disabled = false,
  color = "primary",
  className,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors shrink-0",
        checked ? trackColors[color] : "bg-outline-variant",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform",
          checked ? `translate-x-5 ${thumbColors[color]}` : "bg-surface",
        )}
      />
    </button>
  );
}
