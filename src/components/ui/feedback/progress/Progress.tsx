import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Progress",
  description: "Linear and circular progress indicators with normal and wave variants",
};

export type ProgressType = "linear" | "circular";
export type ProgressColor = "primary" | "secondary" | "tertiary" | "error" | "warning" | "four-color" | "current";
export type ProgressVariant = "normal" | "wave";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
  type?: ProgressType;
  color?: ProgressColor;
  variant?: ProgressVariant;
  size?: ProgressSize;
  /** 0–100. Omit for indeterminate mode. */
  value?: number;
  /** Stroke / line thickness (SVG units for wave & circular, px for normal linear). Defaults by size. */
  lineWidth?: number;
  /** Show active loading animation. Without value → indeterminate. With value → animated determinate at value%. */
  progressive?: boolean;
  /** Force indeterminate animation regardless of value. */
  intermediate?: boolean;
  /** Accessible label for screen readers. Defaults to "Loading" (indeterminate) or "X% complete" (determinate). */
  "aria-label"?: string;
  className?: string;
  children?: ReactNode;
}

/* ── colour helpers ── */

const indeterminateTextColors: Record<ProgressColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  error: "text-error",
  warning: "text-warning",
  "four-color": "animate-progress-four-color",
  current: "text-current",
};

const trackBgColors: Record<ProgressColor, string> = {
  primary: "bg-primary/20",
  secondary: "bg-secondary/20",
  tertiary: "bg-tertiary/20",
  error: "bg-error/20",
  warning: "bg-warning/20",
  "four-color": "bg-primary/20",
  current: "bg-current/20",
};

const indicatorBgColors: Record<ProgressColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  error: "bg-error",
  warning: "bg-warning",
  "four-color": "bg-primary",
  current: "bg-current",
};

const strokeTrackColors: Record<ProgressColor, string> = {
  primary: "stroke-primary/20",
  secondary: "stroke-secondary/20",
  tertiary: "stroke-tertiary/20",
  error: "stroke-error/20",
  warning: "stroke-warning/20",
  "four-color": "stroke-primary/20",
  current: "stroke-current/20",
};

const strokeIndicatorColors: Record<ProgressColor, string> = {
  primary: "stroke-primary",
  secondary: "stroke-secondary",
  tertiary: "stroke-tertiary",
  error: "stroke-error",
  warning: "stroke-warning",
  "four-color": "stroke-primary",
  current: "stroke-current",
};

/* ── size maps ── */

const linearBarHeights: Record<ProgressSize, string> = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-2",
};


const waveContainerHeights: Record<ProgressSize, string> = {
  sm: "h-2.5",
  md: "h-3.5",
  lg: "h-5",
};

const circularSizes: Record<ProgressSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

/* ── default SVG stroke widths per size ── */

const defaultSvgStroke: Record<ProgressSize, number> = {
  sm: 5,
  md: 4,
  lg: 5,
};

/* ── circular geometry (fixed viewBox) ── */

const SVG_VIEWBOX = 48;
const SVG_RADIUS = 20;
const SVG_CENTER = SVG_VIEWBOX / 2;
const CIRCUMFERENCE = 2 * Math.PI * SVG_RADIUS;

/* ── linear wave path ── */

const WAVE_PW = 40;
const WAVE_VB_H = 24;

function buildLinearWave(periods: number): string {
  const yTop = 7;
  const yBot = 17;
  const cp = WAVE_PW / 6;
  const hp = WAVE_PW / 2;
  let d = `M0,${yTop}`;
  for (let i = 0; i < periods; i++) {
    const x = i * WAVE_PW;
    d += ` C${x + cp},${yTop} ${x + hp - cp},${yBot} ${x + hp},${yBot}`;
    d += ` C${x + hp + cp},${yBot} ${x + WAVE_PW - cp},${yTop} ${x + WAVE_PW},${yTop}`;
  }
  return d;
}

// Per-size wave periods: fewer periods = wider waves for larger sizes
// Indeterminate SVG is 200% wide, so ~half the periods are visible at a time
// Determinate is 100% wide, uses half the indet count for same visual density
const INDET_PERIODS: Record<ProgressSize, number> = { sm: 28, md: 20, lg: 14 };
const DET_PERIODS: Record<ProgressSize, number> = { sm: 14, md: 10, lg: 7 };

type WaveConfig = { path: string; vbW: number };

const indetWave: Record<ProgressSize, WaveConfig> = Object.fromEntries(
  (["sm", "md", "lg"] as const).map(s => [s, {
    path: buildLinearWave(INDET_PERIODS[s]),
    vbW: INDET_PERIODS[s] * WAVE_PW,
  }]),
) as Record<ProgressSize, WaveConfig>;

const detWave: Record<ProgressSize, WaveConfig> = Object.fromEntries(
  (["sm", "md", "lg"] as const).map(s => [s, {
    path: buildLinearWave(DET_PERIODS[s]),
    vbW: DET_PERIODS[s] * WAVE_PW,
  }]),
) as Record<ProgressSize, WaveConfig>;

// Seamless loop shift: translate by exactly one period (as % of the 200%-wide SVG element)
const waveShift: Record<ProgressSize, string> = {
  sm: `-${(100 / INDET_PERIODS.sm).toFixed(4)}%`,
  md: `-${(100 / INDET_PERIODS.md).toFixed(4)}%`,
  lg: `-${(100 / INDET_PERIODS.lg).toFixed(4)}%`,
};

/* ── circular wave path ── */

function buildWavyCircle(
  cx: number, cy: number, r: number,
  amplitude: number, waves: number, segments = 120,
): string {
  const pts: string[] = [];
  for (let i = 0; i <= segments; i++) {
    const θ = (i / segments) * 2 * Math.PI;
    const wr = r + amplitude * Math.sin(waves * θ);
    const x = cx + wr * Math.cos(θ);
    const y = cy + wr * Math.sin(θ);
    pts.push(i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : `L${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

const WAVY_CIRCLE = buildWavyCircle(SVG_CENTER, SVG_CENTER, SVG_RADIUS, 1.5, 8);

function clamp(v: number) {
  return Math.min(100, Math.max(0, v));
}

const isFourColor = (c: ProgressColor) => c === "four-color";

/* ── linear ── */

function LinearProgress({
  color = "primary",
  variant = "wave",
  size = "md",
  value,
  lineWidth,
  progressive,
  intermediate,
  "aria-label": ariaLabel,
  className,
}: ProgressProps) {
  const sw = lineWidth ?? defaultSvgStroke[size];
  const indeterminate = intermediate || value === undefined;
  const label = ariaLabel ?? (indeterminate ? "Loading" : `${clamp(value ?? 0)}% complete`);

  /* ── Indeterminate (no value) ── */
  if (indeterminate) {
    const colorClass = indeterminateTextColors[color];

    if (variant === "wave") {
      return (
        <div
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn("relative w-full overflow-hidden", waveContainerHeights[size], colorClass, className)}
        >
          <svg
            viewBox={`0 0 ${indetWave[size].vbW} ${WAVE_VB_H}`}
            preserveAspectRatio="none"
            className="absolute top-0 left-0 h-full animate-progress-wave-flow"
            style={{ width: "200%", "--wave-shift": waveShift[size] } as CSSProperties}
          >
            <path d={indetWave[size].path} stroke="currentColor" strokeWidth={sw} fill="none" />
          </svg>
        </div>
      );
    }

    // Normal: dual sliding bars
    const barHeight = lineWidth != null ? undefined : linearBarHeights[size];
    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          trackBgColors[color],
          barHeight,
          colorClass,
          className,
        )}
        style={lineWidth != null ? { height: lineWidth } : undefined}
      >
        <div className="absolute inset-y-0 rounded-full bg-current animate-progress-bar-1" />
        <div className="absolute inset-y-0 rounded-full bg-current animate-progress-bar-2" />
      </div>
    );
  }

  const pct = clamp(value);

  /* ── Progressive + value: animated wave clipped to value% ── */
  if (progressive && variant === "wave") {
    const shift = waveShift[size];
    const fc = isFourColor(color);
    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("relative w-full overflow-hidden", waveContainerHeights[size], fc && "animate-progress-four-color", className)}
      >
        {/* Track */}
        <svg
          viewBox={`0 0 ${indetWave[size].vbW} ${WAVE_VB_H}`}
          preserveAspectRatio="none"
          className="absolute top-0 left-0 h-full animate-progress-wave-flow"
          style={{ width: "200%", "--wave-shift": shift } as CSSProperties}
        >
          <path d={indetWave[size].path} className={strokeTrackColors[color]} strokeWidth={sw} fill="none" />
        </svg>
        {/* Indicator — stationary clip wrapper so wave flows under a fixed boundary */}
        <div
          className="absolute top-0 left-0 h-full w-full"
          style={{
            clipPath: `inset(0 ${100 - pct}% 0 0)`,
            transition: "clip-path 600ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <svg
            viewBox={`0 0 ${indetWave[size].vbW} ${WAVE_VB_H}`}
            preserveAspectRatio="none"
            className="absolute top-0 left-0 h-full animate-progress-wave-flow"
            style={{ width: "200%", "--wave-shift": shift } as CSSProperties}
          >
            <path d={indetWave[size].path} stroke={fc ? "currentColor" : undefined} className={fc ? undefined : strokeIndicatorColors[color]} strokeWidth={sw} fill="none" />
          </svg>
        </div>
      </div>
    );
  }

  if (progressive && variant === "normal") {
    const barHeight = lineWidth != null ? undefined : linearBarHeights[size];
    const colorClass = indeterminateTextColors[color];
    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          trackBgColors[color],
          barHeight,
          colorClass,
          className,
        )}
        style={lineWidth != null ? { height: lineWidth } : undefined}
      >
        {/* Filled portion with sliding bars inside */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden rounded-full"
          style={{ width: `${pct}%`, transition: "width 200ms ease" }}
        >
          <div className="absolute inset-y-0 rounded-full bg-current animate-progress-bar-1" style={{ width: pct > 0 ? `${100 * 100 / pct}%` : "100%" }} />
          <div className="absolute inset-y-0 rounded-full bg-current animate-progress-bar-2" style={{ width: pct > 0 ? `${100 * 100 / pct}%` : "100%" }} />
        </div>
      </div>
    );
  }

  /* ── Static determinate ── */

  // Wave
  if (variant === "wave") {
    const fc = isFourColor(color);
    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("relative w-full overflow-hidden", waveContainerHeights[size], fc && "animate-progress-four-color", className)}
      >
        <svg
          viewBox={`0 0 ${detWave[size].vbW} ${WAVE_VB_H}`}
          preserveAspectRatio="none"
          className="absolute top-0 left-0 h-full w-full"
        >
          <path d={detWave[size].path} className={strokeTrackColors[color]} strokeWidth={sw} fill="none" />
          <path
            d={detWave[size].path}
            stroke={fc ? "currentColor" : undefined}
            className={fc ? undefined : strokeIndicatorColors[color]}
            strokeWidth={sw}
            fill="none"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100 - pct}
            style={{ transition: "stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>
      </div>
    );
  }

  // Normal
  const fc = isFourColor(color);
  const barHeight = lineWidth != null ? undefined : linearBarHeights[size];
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "w-full overflow-hidden rounded-full",
        trackBgColors[color],
        barHeight,
        fc && "animate-progress-four-color",
        className,
      )}
      style={lineWidth != null ? { height: lineWidth } : undefined}
    >
      <div
        className={cn("h-full rounded-full", fc ? "bg-current" : indicatorBgColors[color])}
        style={{ width: `${pct}%`, transition: "width 200ms ease" }}
      />
    </div>
  );
}

/* ── circular ── */

function CircularProgress({
  color = "primary",
  variant = "wave",
  size = "md",
  value,
  lineWidth,
  progressive,
  intermediate,
  "aria-label": ariaLabel,
  className,
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
  // Rotate when progressive to show activity
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
        className={cn("relative inline-flex items-center justify-center", circularSizes[size], fc && "animate-progress-four-color", className)}
      >
        <svg viewBox={`0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`} className={svgClass}>
          <path
            d={WAVY_CIRCLE}
            className={strokeTrackColors[color]}
            fill="none" strokeWidth={sw}
          />
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

/* ── public component ── */

export function Progress(props: ProgressProps) {
  const { type = "linear", ...rest } = props;
  return type === "circular" ? (
    <CircularProgress {...rest} />
  ) : (
    <LinearProgress {...rest} />
  );
}
