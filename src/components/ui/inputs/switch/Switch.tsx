import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Switch",
  description:
    "Toggle switch with primary/error/warning color variants, sm/md sizes, and accessible role='switch' semantics",
};

export type SwitchColor = "primary" | "error" | "warning";
export type SwitchSize = "sm" | "md";

export interface SwitchProps {
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly "aria-label"?: string;
  readonly "aria-labelledby"?: string;
  readonly disabled?: boolean;
  readonly color?: SwitchColor;
  readonly size?: SwitchSize;
  readonly className?: string;
  /** Use inverse-themed tokens (for placement on inverse surfaces such as
   *  the agent sidebar where the surrounding bg is `on-background`). */
  readonly inverse?: boolean;
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

const trackSizes: Record<SwitchSize, string> = {
  sm: "w-9 h-5",
  md: "w-11 h-6",
};

const thumbSizes: Record<SwitchSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
};

const thumbTranslate: Record<SwitchSize, string> = {
  sm: "translate-x-4",
  md: "translate-x-5",
};

export function Switch({
  checked,
  onChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  disabled = false,
  color = "primary",
  size = "md",
  className,
  inverse = false,
}: SwitchProps) {
  if (isDev) {
    if (!ariaLabel && !ariaLabelledBy) {
      console.warn(
        "[Switch] aria-label or aria-labelledby is recommended for accessibility",
      );
    }
  }

  const trackOn = inverse && color === "primary"
    ? "bg-inverse-primary"
    : trackColors[color];
  const trackOff = inverse ? "bg-inverse-on-surface/20" : "bg-outline-variant";
  const thumbOn = inverse && color === "primary"
    ? "bg-inverse-surface"
    : thumbColors[color];
  const thumbOff = inverse ? "bg-inverse-surface" : "bg-surface";

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
        "relative rounded-full transition-colors shrink-0",
        trackSizes[size],
        checked ? trackOn : trackOff,
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 rounded-full transition-transform",
          thumbSizes[size],
          checked ? `${thumbTranslate[size]} ${thumbOn}` : thumbOff,
        )}
      />
    </button>
  );
}
