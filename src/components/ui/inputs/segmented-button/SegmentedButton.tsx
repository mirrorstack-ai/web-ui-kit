import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SegmentedButton",
  description:
    "Horizontal group of toggle buttons where exactly one option is selected at a time",
};

export interface SegmentedButtonOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

export interface SegmentedButtonProps<T extends string> {
  options: readonly SegmentedButtonOption<T>[];
  value: T;
  onChange: (value: T) => void;
  "aria-label": string;
  disabled?: boolean;
  className?: string;
}

export function SegmentedButton<T extends string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  disabled = false,
  className,
}: SegmentedButtonProps<T>) {
  if (isDev) {
    if (!ariaLabel) {
      console.warn("[SegmentedButton] aria-label is required for accessibility");
    }
    if (options.length === 0) {
      console.warn("[SegmentedButton] options array should not be empty");
    }
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex rounded-lg border border-outline-variant overflow-hidden",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            disabled={disabled}
            onClick={() => {
              if (!isSelected) {
                onChange(option.value);
              }
            }}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "disabled:cursor-not-allowed",
              index > 0 && "border-l border-outline-variant",
              isSelected
                ? "bg-secondary-container text-on-secondary-container"
                : "bg-surface text-on-surface hover:bg-surface-container-highest",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
