import { cn } from "@/utils/cn";
import type { ProgressProps } from "./types";
import {
  indeterminateTextColors,
  strokeTrackColors, strokeIndicatorColors,
  circularSizes, defaultSvgStroke,
  clamp, isFourColor,
} from "./types";
import { WAVY_CIRCLE, CIRCUMFERENCE, SVG_VIEWBOX, SVG_CENTER, SVG_RADIUS } from "./wave-paths";

export function CircularProgress({
  color = "primary",
  variant = "wave",
  size = "md",
  value,
  lineWidth,
  progressive,
  intermediate,
  "aria-label": ariaLabel,
  className,
  style,
  children,
}: ProgressProps) {
  const sw = lineWidth ?? defaultSvgStroke[size];
  const indeterminate = intermediate || value === undefined;
  const isWave = variant === "wave";
  const label = ariaLabel ?? (indeterminate ? "Loading" : `${clamp(value ?? 0)}% complete`);

  /* ── Indeterminate ── */
  if (indeterminate) {
    const colorClass = indeterminateTextColors[color];
    const pathD = isWave ? WAVY_CIRCLE : undefined;

    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        style={style}
        className={cn("relative inline-flex items-center justify-center", circularSizes[size], colorClass, className)}
      >
        <svg
          viewBox={`0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`}
          className="h-full w-full animate-progress-rotate"
        >
          {isWave ? (
            <>
              <path d={pathD} stroke="currentColor" opacity={0.2} fill="none" strokeWidth={sw} />
              <path
                d={pathD}
                stroke="currentColor"
                className="animate-progress-wave-dash"
                fill="none"
                strokeWidth={sw}
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="100"
              />
            </>
          ) : (
            <>
              <circle
                cx={SVG_CENTER} cy={SVG_CENTER} r={SVG_RADIUS}
                stroke="currentColor" opacity={0.2} fill="none" strokeWidth={sw}
              />
              <circle
                cx={SVG_CENTER} cy={SVG_CENTER} r={SVG_RADIUS}
                stroke="currentColor"
                className="animate-progress-dash"
                fill="none"
                strokeWidth={sw}
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="100"
              />
            </>
          )}
        </svg>
      </div>
    );
  }

  const pct = clamp(value);
  const fc = isFourColor(color);
  const svgClass = progressive ? "h-full w-full animate-progress-rotate" : "h-full w-full";

  /* ── Wave (progressive or static) ── */
  if (isWave) {
    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        style={style}
        className={cn("relative inline-flex items-center justify-center", circularSizes[size], fc && "animate-progress-four-color", className)}
      >
        <svg viewBox={`0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`} className={svgClass}>
          <path d={WAVY_CIRCLE} className={strokeTrackColors[color]} fill="none" strokeWidth={sw} />
          <path
            d={WAVY_CIRCLE}
            stroke={fc ? "currentColor" : undefined}
            className={fc ? undefined : strokeIndicatorColors[color]}
            fill="none" strokeWidth={sw}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100 - pct}
            style={{ transition: "stroke-dashoffset 200ms ease" }}
          />
        </svg>
        {children && (
          <span className="absolute inset-0 flex items-center justify-center text-on-surface text-xs">
            {children}
          </span>
        )}
      </div>
    );
  }

  /* ── Normal (progressive or static) ── */
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={style}
      className={cn("relative inline-flex items-center justify-center", circularSizes[size], fc && "animate-progress-four-color", className)}
    >
      <svg viewBox={`0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`} className={svgClass}>
        <circle
          className={strokeTrackColors[color]}
          cx={SVG_CENTER} cy={SVG_CENTER} r={SVG_RADIUS}
          fill="none" strokeWidth={sw}
        />
        <circle
          stroke={fc ? "currentColor" : undefined}
          className={fc ? undefined : strokeIndicatorColors[color]}
          cx={SVG_CENTER} cy={SVG_CENTER} r={SVG_RADIUS}
          fill="none" strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 200ms ease" }}
          transform={`rotate(-90 ${SVG_CENTER} ${SVG_CENTER})`}
        />
      </svg>
      {children && (
        <span className="absolute inset-0 flex items-center justify-center text-on-surface text-xs">
          {children}
        </span>
      )}
    </div>
  );
}
