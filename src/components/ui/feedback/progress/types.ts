import type { CSSProperties, ReactNode } from "react";

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
  /** Stroke / line thickness. Defaults by size. */
  lineWidth?: number;
  /** Animated determinate: shows wave/bar animation clipped to value%. */
  progressive?: boolean;
  /** Force indeterminate animation regardless of value. */
  intermediate?: boolean;
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ── colour maps ── */

export const indeterminateTextColors: Record<ProgressColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  error: "text-error",
  warning: "text-warning",
  "four-color": "animate-progress-four-color",
  current: "text-current",
};

export const trackBgColors: Record<ProgressColor, string> = {
  primary: "bg-primary/20",
  secondary: "bg-secondary/20",
  tertiary: "bg-tertiary/20",
  error: "bg-error/20",
  warning: "bg-warning/20",
  "four-color": "bg-primary/20",
  current: "bg-current/20",
};

export const indicatorBgColors: Record<ProgressColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  error: "bg-error",
  warning: "bg-warning",
  "four-color": "bg-primary",
  current: "bg-current",
};

export const strokeTrackColors: Record<ProgressColor, string> = {
  primary: "stroke-primary/20",
  secondary: "stroke-secondary/20",
  tertiary: "stroke-tertiary/20",
  error: "stroke-error/20",
  warning: "stroke-warning/20",
  "four-color": "stroke-primary/20",
  current: "stroke-current/20",
};

export const strokeIndicatorColors: Record<ProgressColor, string> = {
  primary: "stroke-primary",
  secondary: "stroke-secondary",
  tertiary: "stroke-tertiary",
  error: "stroke-error",
  warning: "stroke-warning",
  "four-color": "stroke-primary",
  current: "stroke-current",
};

/* ── size maps ── */

export const linearBarHeights: Record<ProgressSize, string> = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-2",
};

export const waveContainerHeights: Record<ProgressSize, string> = {
  sm: "h-2.5",
  md: "h-3.5",
  lg: "h-5",
};

export const circularSizes: Record<ProgressSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

export const defaultSvgStroke: Record<ProgressSize, number> = {
  sm: 5,
  md: 4,
  lg: 5,
};

/* ── helpers ── */

export function clamp(v: number) {
  return Math.min(100, Math.max(0, v));
}

export const isFourColor = (c: ProgressColor) => c === "four-color";
