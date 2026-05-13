import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SparklineLine",
  description:
    "A tiny line / area sparkline that fills its container — values are auto-scaled to the available height; the line + end-dot + hover-dot share the wrapper's text colour (`text-…`). Hovering shows the nearest point's value in a chip portaled to <body> so it isn't clipped. Sibling of <Sparkline>.",
};

/** One point: a raw value (auto-scaled to the container's height), optionally
 *  with a `label` for the hover chip (defaults to the value). */
export type SparklineLinePoint = number | { value: number; label?: string };

const pointValue = (p: SparklineLinePoint) => (typeof p === "number" ? p : p.value);
const pointLabel = (p: SparklineLinePoint) =>
  typeof p === "number" ? String(p) : (p.label ?? String(p.value));

export interface SparklineLineProps {
  data: ReadonlyArray<SparklineLinePoint>;
  /** Optional area-fill class painted under the line (e.g. `"fill-primary/15"`).
   *  Omit for a bare line. */
  areaClassName?: string;
  /** Show a static dot at the latest value. Default true. */
  endDot?: boolean;
  /** Classes for the floating hover chip. Default `"bg-on-surface text-surface"`. */
  chipClassName?: string;
  /** Wrapper classes — use `text-…` to set the line / dot colour.
   *  Default `"text-primary"`. */
  className?: string;
}

export function SparklineLine({
  data,
  areaClassName,
  endDot = true,
  chipClassName,
  className,
}: SparklineLineProps) {
  // The chip is portaled to <body> so a clipping/overflow-hidden ancestor
  // (e.g. a MetricBlock cell or a NotchGrid notch) can't cut it off.
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<{ index: number; x: number; y: number } | null>(null);
  if (data.length === 0) return null;

  // Project values into a 0–100 viewBox; `preserveAspectRatio="none"` stretches
  // it to fill the container, and `vector-effect="non-scaling-stroke"` keeps
  // the stroke a uniform width regardless of aspect.
  const values = data.map(pointValue);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const n = values.length;
  const pts = values.map((v, i): readonly [number, number] => [
    n === 1 ? 50 : (i / (n - 1)) * 100,
    (1 - (v - min) / range) * 100,
  ]);
  // Smooth Catmull-Rom → cubic-bezier, matching LineChart's curve.
  const f = (x: number) => x.toFixed(2);
  let linePath = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    linePath += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  const areaPath = areaClassName
    ? `${linePath} L${f(pts.at(-1)![0])},100 L${f(pts[0][0])},100 Z`
    : null;

  const onMove = (e: ReactMouseEvent<SVGSVGElement>) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const xPct = (e.clientX - r.left) / r.width;
    const idx = Math.max(0, Math.min(n - 1, Math.round(xPct * (n - 1))));
    setHover((prev) =>
      prev?.index === idx && prev.x === e.clientX && prev.y === e.clientY
        ? prev
        : { index: idx, x: e.clientX, y: e.clientY },
    );
  };

  const hovered = hover != null ? data[hover.index] : undefined;
  const chip =
    hovered !== undefined && typeof document !== "undefined"
      ? createPortal(
          <span
            className={cn(
              "pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium shadow-md",
              chipClassName ?? "bg-on-surface text-surface",
            )}
            style={{ left: hover!.x || 0, top: (hover!.y || 0) - 10 }}
          >
            {pointLabel(hovered)}
          </span>,
          document.body,
        )
      : null;

  const last = pts.at(-1)!;
  const hoverPt = hover != null ? pts[hover.index] : null;

  return (
    <div className={cn("relative h-full w-full text-primary", className)}>
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="block h-full w-full cursor-default"
        aria-hidden="true"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        {areaPath && <path d={areaPath} className={areaClassName} />}
        <path
          d={linePath}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="stroke-current"
        />
      </svg>
      {/* Dots are HTML overlays — `preserveAspectRatio="none"` would squish SVG
       *  circles into ellipses. */}
      {endDot && (
        <span
          className="pointer-events-none absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
          style={{ left: `${last[0]}%`, top: `${last[1]}%` }}
        />
      )}
      {hoverPt && (
        <span
          className="pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
          style={{ left: `${hoverPt[0]}%`, top: `${hoverPt[1]}%` }}
        />
      )}
      {chip}
    </div>
  );
}
