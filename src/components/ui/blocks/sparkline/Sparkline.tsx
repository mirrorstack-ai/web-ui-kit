import { useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Sparkline",
  description:
    "A tiny chart that fills its container — bar (default), line, or area variant. Bar: div-based bars with hover chips. Line/area: smooth SVG curves using currentColor.",
};

/** A bar: a height as a percentage (0–100), optionally with a `label` for the
 *  hover chip (defaults to the value). */
export type SparklinePoint = number | { value: number; label?: string };

const pointValue = (p: SparklinePoint) => (typeof p === "number" ? p : p.value);
const pointLabel = (p: SparklinePoint) =>
  typeof p === "number" ? String(p) : (p.label ?? String(p.value));
const clampPct = (n: number) => Math.max(0, Math.min(100, n));

export interface SparklineProps {
  /** Bars, as heights `0–100` (or `{ value, label }` for a labelled hover chip). */
  data: ReadonlyArray<SparklinePoint>;
  /** Chart style. `"bar"` (default) renders div-based bars with hover chips.
   *  `"line"` renders a smooth SVG stroke. `"area"` adds a filled region beneath the line. */
  variant?: "bar" | "line" | "area";
  /** Tailwind classes for the bars. Default `"bg-primary/30"`. Only used by `"bar"` variant. */
  barClassName?: string;
  /** Classes for the bar under the pointer. Defaults to {@link barClassName}. Only used by `"bar"` variant. */
  barActiveClassName?: string;
  /** Classes for the floating hover chip. Default `"bg-on-surface text-surface"`. Only used by `"bar"` variant. */
  chipClassName?: string;
  /** Stroke width of the line, in px (non-scaling). Default `1.5`. Only used by `"line"` / `"area"` variants. */
  strokeWidth?: number;
  /** Opacity of the line stroke, `0–1`. Defaults to `0.6` for `"line"`, `0.5` for `"area"`.
   *  The area fill keeps its fixed `0.15` opacity. Only used by `"line"` / `"area"` variants. */
  opacity?: number;
  className?: string;
}

/* ── SVG helpers (line & area variants) ────────────────────────────── */

function normalizePoints(data: ReadonlyArray<SparklinePoint>): { x: number; y: number }[] {
  const max = Math.max(...data.map(pointValue), 1);
  const lastIdx = data.length - 1 || 1;
  return data.map((p, i) => ({ x: (i / lastIdx) * 100, y: 100 - (pointValue(p) / max) * 100 }));
}

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  const d = [`M ${pts[0].x},${pts[0].y}`];
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx = (prev.x + curr.x) / 2;
    d.push(`C ${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`);
  }
  return d.join(" ");
}

/* ── Component ────────────────────────────────────────────────────── */

export function Sparkline({
  data,
  variant = "bar",
  barClassName = "bg-primary/30",
  barActiveClassName,
  chipClassName,
  strokeWidth = 1.5,
  opacity,
  className,
}: SparklineProps) {
  // The chip is portaled to <body> so a clipping/overflow-hidden ancestor
  // (e.g. a NotchGrid cell) can't cut it off — it floats above the bar.
  const [hover, setHover] = useState<{ index: number; rect: DOMRect } | null>(null);
  if (data.length === 0) return null;

  /* ── Line / Area variant ─────────────────────────────────────────── */
  if (variant === "line" || variant === "area") {
    const pts = normalizePoints(data);
    const linePath = smoothPath(pts);
    const areaPath =
      variant === "area" && pts.length >= 2
        ? `${linePath} L ${pts[pts.length - 1].x},100 L ${pts[0].x},100 Z`
        : undefined;

    return (
      <svg
        className={cn("block", className)}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {areaPath && <path d={areaPath} fill="currentColor" opacity="0.15" />}
        <path
          d={linePath}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          opacity={opacity ?? (variant === "area" ? 0.5 : 0.6)}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  /* ── Bar variant (default) ───────────────────────────────────────── */
  const hovered = hover != null ? data[hover.index] : undefined;
  const chip =
    hovered !== undefined && typeof document !== "undefined"
      ? createPortal(
          <span
            className={cn(
              "pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium shadow-md",
              chipClassName ?? "bg-on-surface text-surface",
            )}
            style={{ left: hover!.rect.left + hover!.rect.width / 2, top: hover!.rect.top - 4 }}
          >
            {pointLabel(hovered)}
          </span>,
          document.body,
        )
      : null;

  return (
    <div
      className={cn("flex items-end gap-0.5", className)}
      aria-hidden="true"
      onPointerLeave={() => setHover(null)}
    >
      {data.map((point, i) => (
        <div
          key={i}
          title={pointLabel(point)}
          onPointerEnter={(e) =>
            setHover({ index: i, rect: e.currentTarget.getBoundingClientRect() })
          }
          className={cn(
            "min-h-px flex-1 cursor-default rounded transition-colors",
            i === hover?.index ? (barActiveClassName ?? barClassName) : barClassName,
          )}
          style={{ height: `${clampPct(pointValue(point))}%` }}
        />
      ))}
      {chip}
    </div>
  );
}
