import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Gauge",
  description:
    "A circular gauge that displays a 0-100 percentage value with optional threshold-based coloring.",
};

export interface GaugeProps {
  /** 0-100 */
  value: number;
  /** Label rendered below the gauge. */
  label?: string;
  /** Override display text inside the ring. If omitted: `${value}%`. */
  format?: string;
  /** Color breakpoints. Above `warn` is success, below `warn` is warning, below `error` is error. */
  thresholds?: {
    warn: number;
    error: number;
  };
  className?: string;
}

const CIRCUMFERENCE = 2 * Math.PI * 40; // ~251.33

function arcColor(value: number, thresholds?: GaugeProps["thresholds"]): string | undefined {
  if (!thresholds) return undefined;
  if (value < thresholds.error) return "var(--color-error)";
  if (value < thresholds.warn) return "var(--color-warning)";
  return "var(--color-success)";
}

export function Gauge({ value, label, format, thresholds, className }: GaugeProps) {
  if (isDev && (value < 0 || value > 100)) {
    console.warn(`[Gauge] value ${value} is outside the 0-100 range and will be clamped.`);
  }

  const clamped = Math.max(0, Math.min(100, value));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);
  const stroke = arcColor(clamped, thresholds);
  const displayText = format ?? `${value}%`;

  return (
    <div className={cn("flex h-full w-full flex-col items-center justify-center p-1", className)}>
      <svg
        className="aspect-square w-full max-w-[80%]"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          opacity="0.1"
        />

        {/* Value arc */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          {...(stroke
            ? { stroke, style: { stroke } }
            : { stroke: "currentColor", opacity: 0.7 })}
        />

        {/* Center text */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="18"
          fontWeight="bold"
          fill="currentColor"
        >
          {displayText}
        </text>
      </svg>

      {label && <span className="text-center text-xs opacity-60">{label}</span>}
    </div>
  );
}
