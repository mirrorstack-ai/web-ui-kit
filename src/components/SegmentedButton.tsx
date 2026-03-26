"use client";

import { cn } from "../utils/cn";

export interface SegmentedButtonOption<T extends string = string> {
  value: T;
  label: string;
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
  return (
    <div role="group" aria-label={ariaLabel} className={cn("flex gap-2", className)}>
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
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
