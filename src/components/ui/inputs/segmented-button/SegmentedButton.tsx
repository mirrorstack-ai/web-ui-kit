import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SegmentedButton",
  description:
    "Horizontal group of toggle buttons where exactly one option is selected at a time",
};

export type SegmentedButtonOptionTone = "default" | "warning" | "muted";

export interface SegmentedButtonOption<T extends string = string> {
  readonly value: T;
  readonly label: string;
  /** Visual tone for the unselected state. Defaults to "default". */
  readonly tone?: SegmentedButtonOptionTone;
}

export type SegmentedButtonSize = "sm" | "md";

export interface SegmentedButtonProps<T extends string = string> {
  options: readonly SegmentedButtonOption<T>[];
  value: T;
  onChange: (value: T) => void;
  "aria-label"?: string;
  disabled?: boolean;
  className?: string;
  size?: SegmentedButtonSize;
}

const sizeStyles: Record<SegmentedButtonSize, string> = {
  sm: "px-3 py-1.5 rounded-md text-xs",
  md: "px-4 py-2 rounded-xl text-sm",
};

export function SegmentedButton<T extends string = string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  disabled = false,
  className,
  size = "md",
}: SegmentedButtonProps<T>) {
  if (isDev) {
    if (options.length === 0) {
      console.warn("[SegmentedButton] options array should not be empty");
    }
    if (!ariaLabel) {
      console.warn(
        "[SegmentedButton] aria-label is recommended for accessibility",
      );
    }
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("flex gap-2", className)}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          disabled={disabled}
          aria-pressed={value === opt.value}
          className={cn(
            "font-medium transition-colors",
            sizeStyles[size],
            value === opt.value
              ? "bg-primary text-on-primary"
              : opt.tone === "warning"
                ? "bg-warning-container text-on-warning-container hover:bg-warning/20"
                : opt.tone === "muted"
                  ? "bg-surface-container/40 text-on-surface-variant/70 hover:bg-surface-container hover:text-on-surface-variant"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high",
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
