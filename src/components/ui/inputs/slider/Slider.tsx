import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Slider",
  description:
    "Single-value range slider with a primary-tinted active track, neutral inactive track, and a thumb that visually separates from the filled track via a surface-colored ring.",
};

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  /** Accessible label. Falls back to native input. */
  "aria-label"?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
  "aria-label": ariaLabel,
}: SliderProps) {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
  const trackStyle: CSSProperties = {
    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${pct}%, var(--color-outline-variant) ${pct}%, var(--color-outline-variant) 100%)`,
  };

  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      aria-label={ariaLabel}
      onChange={(e) => onChange(Number(e.target.value))}
      style={trackStyle}
      className={cn(
        "w-full h-1.5 rounded-full appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "[&::-webkit-slider-thumb]:appearance-none",
        "[&::-webkit-slider-thumb]:w-4",
        "[&::-webkit-slider-thumb]:h-4",
        "[&::-webkit-slider-thumb]:rounded-full",
        "[&::-webkit-slider-thumb]:bg-primary",
        "[&::-webkit-slider-thumb]:border-2",
        "[&::-webkit-slider-thumb]:border-surface-container-low",
        "[&::-webkit-slider-thumb]:cursor-pointer",
        "[&::-webkit-slider-thumb]:transition-transform",
        "[&::-webkit-slider-thumb]:active:scale-110",
        "[&::-moz-range-thumb]:appearance-none",
        "[&::-moz-range-thumb]:w-4",
        "[&::-moz-range-thumb]:h-4",
        "[&::-moz-range-thumb]:rounded-full",
        "[&::-moz-range-thumb]:bg-primary",
        "[&::-moz-range-thumb]:border-2",
        "[&::-moz-range-thumb]:border-surface-container-low",
        "[&::-moz-range-thumb]:cursor-pointer",
        className,
      )}
    />
  );
}
