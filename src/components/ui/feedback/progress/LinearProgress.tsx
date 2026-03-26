import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import type { ProgressProps } from "./types";
import {
  indeterminateTextColors, trackBgColors, indicatorBgColors,
  strokeTrackColors, strokeIndicatorColors,
  linearBarHeights, waveContainerHeights, defaultSvgStroke,
  clamp, isFourColor,
} from "./types";
import { indetWave, detWave, waveShift, WAVE_VB_H } from "./wave-paths";

export function LinearProgress({
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

  /* ── Indeterminate ── */
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

    const barHeight = lineWidth != null ? undefined : linearBarHeights[size];
    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("relative w-full overflow-hidden rounded-full", trackBgColors[color], barHeight, colorClass, className)}
        style={lineWidth != null ? { height: lineWidth } : undefined}
      >
        <div className="absolute inset-y-0 rounded-full bg-current animate-progress-bar-1" />
        <div className="absolute inset-y-0 rounded-full bg-current animate-progress-bar-2" />
      </div>
    );
  }

  const pct = clamp(value);
  const fc = isFourColor(color);

  /* ── Progressive wave ── */
  if (progressive && variant === "wave") {
    const shift = waveShift[size];
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
          viewBox={`0 0 ${indetWave[size].vbW} ${WAVE_VB_H}`}
          preserveAspectRatio="none"
          className="absolute top-0 left-0 h-full animate-progress-wave-flow"
          style={{ width: "200%", "--wave-shift": shift } as CSSProperties}
        >
          <path d={indetWave[size].path} className={strokeTrackColors[color]} strokeWidth={sw} fill="none" />
        </svg>
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

  /* ── Progressive normal ── */
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
        className={cn("relative w-full overflow-hidden rounded-full", trackBgColors[color], barHeight, colorClass, className)}
        style={lineWidth != null ? { height: lineWidth } : undefined}
      >
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

  /* ── Static wave ── */
  if (variant === "wave") {
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

  /* ── Static normal ── */
  const barHeight = lineWidth != null ? undefined : linearBarHeights[size];
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("w-full overflow-hidden rounded-full", trackBgColors[color], barHeight, fc && "animate-progress-four-color", className)}
      style={lineWidth != null ? { height: lineWidth } : undefined}
    >
      <div
        className={cn("h-full rounded-full", fc ? "bg-current" : indicatorBgColors[color])}
        style={{ width: `${pct}%`, transition: "width 200ms ease" }}
      />
    </div>
  );
}
