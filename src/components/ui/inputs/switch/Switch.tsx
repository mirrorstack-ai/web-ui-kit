import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Switch",
  description:
    "Toggle switch with primary/error/warning color variants and accessible role='switch' semantics",
};

export type SwitchColor = "primary" | "error" | "warning";

export interface SwitchProps {
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly "aria-label"?: string;
  readonly "aria-labelledby"?: string;
  readonly disabled?: boolean;
  readonly color?: SwitchColor;
  readonly className?: string;
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
  if (isDev) {
    if (!ariaLabel && !ariaLabelledBy) {
      console.warn(
        "[Switch] aria-label or aria-labelledby is recommended for accessibility",
      );
    }
  }

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
