import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SegmentedButton",
  description:
    "Horizontal group of toggle buttons where exactly one option is selected at a time",
};

export interface SegmentedButtonOption<T extends string = string> {
  readonly value: T;
  readonly label: string;
}

export interface SegmentedButtonProps<T extends string = string> {
  options: readonly SegmentedButtonOption<T>[];
  value: T;
  onChange: (value: T) => void;
  "aria-label"?: string;
  disabled?: boolean;
  className?: string;
}

export function SegmentedButton<T extends string = string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  disabled = false,
  className,
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
            "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
            value === opt.value
              ? "bg-primary text-on-primary"
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
