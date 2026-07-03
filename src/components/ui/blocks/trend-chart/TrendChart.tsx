import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "TrendChart",
  description:
    "A real-pixel-plotted trend chart with a smooth curve, optional area fill, 0..N dashed overlay series, an optional threshold line, and a hover tooltip. Colors follow the currentColor convention (Tailwind text-* classes), matching Sparkline.",
};

/* ── layout + smoothing (private port of web-applications' src/lib/charts.ts —
   the kit can't import from a consuming app, so these live here instead). ── */

type ChartPadding = { top: number; right: number; bottom: number; left: number };
const CHART_PADDING: ChartPadding = { top: 8, right: 4, bottom: 20, left: 36 };

const EMPTY_PATH = { pts: [] as [number, number][], line: "", area: "" };

// Catmull-Rom → cubic Bezier so series render as smooth curves rather than
// polylines. Callers must guarantee `values.length >= 2` — indexes `pts[0]`
// unconditionally.
function buildSmoothPath(
  values: number[],
  width: number,
  height: number,
  min: number,
  max: number,
  pad: ChartPadding,
) {
  const range = max - min || 1;
  const { top, right, bottom, left } = pad;
  const pts = values.map((v, i): [number, number] => [
    left + (i / (values.length - 1)) * (width - left - right),
    top + (1 - (v - min) / range) * (height - top - bottom),
  ]);

  let line = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    line += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }

  const area =
    line +
    ` L${pts.at(-1)![0].toFixed(1)},${(height - bottom).toFixed(1)}` +
    ` L${pts[0][0].toFixed(1)},${(height - bottom).toFixed(1)} Z`;

  return { pts, line, area };
}

// Tracks the rendered width of a container so the SVG can size its viewBox to
// whatever column it lands in. Bails on no-op resizes so the plotting useMemo
// doesn't churn during sub-pixel layout shimmies.
function useContainerWidth<T extends HTMLElement>(initial: number) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => {
      const next = entry.contentRect.width;
      setWidth((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [width, ref] as const;
}

/* ── Component ────────────────────────────────────────────────────── */

export interface TrendChartOverlay {
  /** Series values, same length/index alignment as the main `values` array. */
  values: number[];
  /** Tailwind text-color utility class (e.g. "text-tertiary") applied via
   *  `currentColor` to this overlay's dashed stroke + hover dot — same
   *  color convention as `color` below. Never a raw hex/CSS color. */
  color: string;
  /** Legend/tooltip label for this overlay (e.g. "p50", "4xx"). */
  label: string;
  /** Pin this overlay's own y-axis ceiling instead of sharing the main
   *  series' auto-computed max (`Math.max(values) * 1.15`). Required when
   *  the overlay is a different unit than the main series (e.g. a % rate
   *  overlaid on a request-count chart) — auto-scaling would exaggerate a
   *  small, stable value into a dramatic-looking wave. Omit when the
   *  overlay shares the main series' unit (e.g. p99 over p50, both ms), so
   *  sharing the main axis stays the honest read. */
  fixedMax?: number;
  /** Unit suffix for THIS overlay's tooltip value. Defaults to the chart's
   *  own `unit` prop. Deliberately independent of `fixedMax` — a fixed
   *  ceiling does not imply "percent"; each overlay declares its own unit
   *  explicitly. */
  unit?: string;
}

export interface TrendChartProps {
  /** Main series values — plotted as the solid line (+ area fill if `showArea`). */
  values: number[];
  /** One label per value. Used for x-axis ticks (when `showXAxisLabels`) and
   *  as the hover-tooltip heading. */
  labels: string[];
  /** Tailwind text-color utility class for the main series (e.g.
   *  "text-primary"), applied via `currentColor` — matches Sparkline's
   *  color convention. Never a raw hex/CSS color, so the chart follows the
   *  design system's light/dark tokens automatically. */
  color: string;
  /** Unique id for this chart's SVG gradient `<defs>`. Auto-generated via
   *  `useId()` when omitted — pass explicitly only if you need a stable,
   *  predictable id (e.g. snapshot tests). */
  fillId?: string;
  /** SVG viewBox height in px. Default `140`. */
  height?: number;
  /** Unit suffix appended to the main series' y-axis tick labels and
   *  tooltip value. Default `""`. */
  unit?: string;
  /** Render the gradient area fill beneath the main line. Default `true`. */
  showArea?: boolean;
  /** Render x-axis time labels below the chart (every `labelEvery`-th
   *  label). Default `true`. Set `false` for compact tiles where axis
   *  labels add noise without adding information — the chart reclaims the
   *  bottom margin those labels would otherwise occupy. */
  showXAxisLabels?: boolean;
  /** When `showXAxisLabels` is true, render only every Nth label. Default `4`. */
  labelEvery?: number;
  /** Draw a dashed threshold line at this y-value, with red-tinted shading
   *  above it (the shading only renders when `showArea` is also true; the
   *  dashed line itself always renders). Omit for no threshold. */
  thresholdY?: number;
  /** Zero or more additional dashed series drawn over the main line, each
   *  with its own hover dot and tooltip row. */
  overlays?: TrendChartOverlay[];
  /** Extra classes on the chart's outer wrapper `div`. */
  className?: string;
}

export function TrendChart({
  values,
  labels,
  color,
  fillId,
  height = 140,
  unit = "",
  showArea = true,
  showXAxisLabels = true,
  labelEvery = 4,
  thresholdY,
  overlays,
  className,
}: TrendChartProps) {
  const autoId = useId();
  const gradientId = fillId ?? `trend-chart-${autoId}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const [W, containerRef] = useContainerWidth<HTMLDivElement>(400);
  const [hover, setHover] = useState<number | null>(null);
  const H = height;
  // Axis labels own CHART_PADDING's default bottom margin; without them,
  // reclaim it instead of leaving it empty (matches the compact-tile look).
  const PAD = useMemo<ChartPadding>(
    () => ({ ...CHART_PADDING, bottom: showXAxisLabels ? 20 : 4 }),
    [showXAxisLabels],
  );

  const { main, subs, threshY, yTicks } = useMemo(() => {
    // Guard the brief window before async data resolves, where every series
    // is still `[]` — buildSmoothPath indexes pts[0] unconditionally and
    // throws on fewer than 2 points.
    if (values.length < 2) {
      return {
        main: EMPTY_PATH,
        subs: [] as (typeof EMPTY_PATH | null)[],
        threshY: null as number | null,
        yTicks: [] as { v: number; y: number }[],
      };
    }
    const shared = overlays?.filter((o) => o.fixedMax == null).flatMap((o) => o.values) ?? [];
    const min = 0;
    const max = Math.max(...values, ...shared) * 1.15 || 1;
    const range = max - min || 1;
    return {
      main: buildSmoothPath(values, W, H, min, max, PAD),
      subs: (overlays ?? []).map((o) =>
        o.values.length < 2 ? null : buildSmoothPath(o.values, W, H, min, o.fixedMax ?? max, PAD),
      ),
      threshY:
        thresholdY != null
          ? PAD.top + (1 - (thresholdY - min) / range) * (H - PAD.top - PAD.bottom)
          : null,
      yTicks: [0, 0.25, 0.5, 0.75, 1].map((t) => ({
        v: min + t * range,
        y: PAD.top + (1 - t) * (H - PAD.top - PAD.bottom),
      })),
    };
  }, [values, overlays, W, H, PAD, thresholdY]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect || values.length < 2) return;
      const idx = Math.round(
        ((((e.clientX - rect.left) / rect.width) * W - PAD.left) / (W - PAD.left - PAD.right)) *
          (values.length - 1),
      );
      setHover(Math.max(0, Math.min(values.length - 1, idx)));
    },
    [values.length, W, PAD.left, PAD.right],
  );

  const hoverPt = hover != null ? main.pts[hover] : null;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className={color} stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" className={color} stopColor="currentColor" stopOpacity="0.01" />
          </linearGradient>
          {thresholdY != null && (
            <linearGradient id={`${gradientId}-threshold`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className="text-error" stopColor="currentColor" stopOpacity="0.20" />
              <stop offset="100%" className="text-error" stopColor="currentColor" stopOpacity="0.02" />
            </linearGradient>
          )}
        </defs>

        {yTicks.slice(1, -1).map((t) => (
          <line
            key={t.v}
            x1={PAD.left}
            y1={t.y}
            x2={W - PAD.right}
            y2={t.y}
            stroke="currentColor"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        ))}

        {yTicks
          .filter((_, i) => i % 2 === 0)
          .map((t) => (
            <text
              key={t.v}
              x={PAD.left - 4}
              y={t.y + 4}
              textAnchor="end"
              fontSize="9"
              fill="currentColor"
              fillOpacity="0.4"
            >
              {t.v < 1 ? t.v.toFixed(1) : Math.round(t.v)}
              {unit}
            </text>
          ))}

        {threshY != null && showArea && (
          <rect
            x={PAD.left}
            y={PAD.top}
            width={W - PAD.left - PAD.right}
            height={threshY - PAD.top}
            fill={`url(#${gradientId}-threshold)`}
          />
        )}
        {threshY != null && (
          <line
            x1={PAD.left}
            y1={threshY}
            x2={W - PAD.right}
            y2={threshY}
            className="text-error"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
        )}

        {showArea && <path d={main.area} fill={`url(#${gradientId})`} />}

        {(overlays ?? []).map((o, i) => {
          const sub = subs[i];
          return sub ? (
            <path
              key={o.label}
              className={o.color}
              d={sub.line}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.85"
              strokeDasharray="4 3"
            />
          ) : null;
        })}

        <path
          className={color}
          d={main.line}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {showXAxisLabels &&
          labels.map((l, i) => {
            if (i % labelEvery !== 0) return null;
            const x = PAD.left + (i / (values.length - 1)) * (W - PAD.left - PAD.right);
            return (
              <text
                key={l}
                x={x}
                y={H - 4}
                textAnchor="middle"
                fontSize="9"
                fill="currentColor"
                fillOpacity="0.4"
              >
                {l}
              </text>
            );
          })}

        {hoverPt && (
          <>
            <line
              x1={hoverPt[0]}
              y1={PAD.top}
              x2={hoverPt[0]}
              y2={H - PAD.bottom}
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
            <circle className={color} cx={hoverPt[0]} cy={hoverPt[1]} r="3.5" fill="currentColor" />
            {(overlays ?? []).map((o, i) => {
              const sub = subs[i];
              return sub && hover != null ? (
                <circle
                  key={o.label}
                  className={o.color}
                  cx={sub.pts[hover][0]}
                  cy={sub.pts[hover][1]}
                  r="3"
                  fill="currentColor"
                  fillOpacity="0.85"
                />
              ) : null;
            })}
          </>
        )}
      </svg>

      {hover != null && hoverPt && (
        <div
          className="pointer-events-none absolute top-1 z-10 rounded-lg border border-outline-variant/40 bg-surface-container px-2.5 py-1.5 text-xs shadow-md"
          style={{
            left: `${(hoverPt[0] / W) * 100}%`,
            transform: hoverPt[0] > W * 0.7 ? "translateX(-110%)" : "translateX(8px)",
          }}
        >
          <p className="mb-0.5 text-on-surface-variant">{labels[hover]}</p>
          <p className="font-medium text-on-surface">
            {values[hover] < 1 ? values[hover].toFixed(2) : Math.round(values[hover])}
            {unit}
          </p>
          {(overlays ?? []).map((o) => (
            <p key={o.label} className="text-on-surface-variant/70">
              {o.label}: {o.values[hover] < 1 ? o.values[hover].toFixed(2) : Math.round(o.values[hover])}
              {o.unit ?? unit}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
