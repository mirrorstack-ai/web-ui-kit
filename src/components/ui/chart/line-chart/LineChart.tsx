import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "LineChart",
  description:
    "A responsive line / area chart with smooth (Catmull-Rom) curves, grid + axis labels, a hover crosshair + tooltip, an optional dashed overlay line, and an optional threshold band. Fills its container's width.",
};

const PAD = { top: 8, right: 4, bottom: 20, left: 36 } as const;

type Pt = readonly [number, number];

/** Smooth Catmull-Rom → cubic-bezier path for `values` scaled into the chart box. */
function buildPath(values: readonly number[], w: number, h: number, min: number, max: number) {
  const n = values.length;
  const range = max - min || 1;
  const innerW = w - PAD.left - PAD.right;
  const innerH = h - PAD.top - PAD.bottom;
  const pts: Pt[] = values.map((v, i) => [
    PAD.left + (n <= 1 ? 0 : i / (n - 1)) * innerW,
    PAD.top + (1 - (v - min) / range) * innerH,
  ]);
  const f = (x: number) => x.toFixed(1);
  let line = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    line += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(
      p2[0] - (p3[0] - p1[0]) / 6,
    )},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  const baseline = h - PAD.bottom;
  const area = `${line} L${f(pts.at(-1)![0])},${f(baseline)} L${f(pts[0][0])},${f(baseline)} Z`;
  return { pts, line, area };
}

export interface LineChartOverlay {
  values: readonly number[];
  /** CSS colour for the dashed overlay line. */
  color: string;
  /** Shown in the hover tooltip. */
  label: string;
}

export interface LineChartProps {
  values: readonly number[];
  /** X-axis labels, one per value. */
  labels: readonly string[];
  /** CSS colour for the line + area. Default `var(--color-primary)`. */
  color?: string;
  /** SVG height in px (width fills the container). Default 120. */
  height?: number;
  /** Appended to values in the axis labels / tooltip (e.g. `"ms"`, `"%"`). */
  unit?: string;
  /** Fill the area under the line. Default true. */
  showArea?: boolean;
  /** A second, dashed line drawn behind the main one. */
  overlay?: LineChartOverlay;
  /** Draw a dashed threshold line (and a tinted band above it) at this value. */
  thresholdY?: number;
  /** Show every Nth x-label. Default 4. */
  labelEvery?: number;
  className?: string;
}

export function LineChart({
  values,
  labels,
  color = "var(--color-primary)",
  height = 120,
  unit = "",
  showArea = true,
  overlay,
  thresholdY,
  labelEvery = 4,
  className,
}: LineChartProps) {
  const reactId = useId();
  const fillId = `line-chart-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [w, setW] = useState(600);
  const h = height;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setW(el.getBoundingClientRect().width || 600);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      if (next > 0) setW((prev) => (prev === next ? prev : next));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const allVals = overlay ? [...values, ...overlay.values] : values;
  const min = 0;
  const max = Math.max(0, ...allVals) * 1.15 || 1;

  const main = useMemo(() => buildPath(values, w, h, min, max), [values, w, h, min, max]);
  const sub = useMemo(
    () => (overlay ? buildPath(overlay.values, w, h, min, max) : null),
    [overlay, w, h, min, max],
  );

  const innerH = h - PAD.top - PAD.bottom;
  const yAt = (v: number) => PAD.top + (1 - (v - min) / (max - min || 1)) * innerH;
  const threshY = thresholdY != null ? yAt(thresholdY) : null;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({ v: min + t * (max - min), y: yAt(min + t * (max - min)) }));

  const onMove = useCallback(
    (e: ReactMouseEvent<SVGSVGElement>) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect || values.length === 0) return;
      const xInBox = ((e.clientX - rect.left) / rect.width) * w - PAD.left;
      const idx = Math.round((xInBox / (w - PAD.left - PAD.right)) * (values.length - 1));
      const clamped = Math.max(0, Math.min(values.length - 1, idx));
      setHover((prev) => (prev === clamped ? prev : clamped));
    },
    [values.length, w],
  );

  const fmt = (v: number) => (v < 1 ? v.toFixed(v === 0 ? 0 : 2) : Math.round(v).toString());
  const hoverPt = hover != null ? main.pts[hover] : null;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
          {thresholdY != null && (
            <linearGradient id={`${fillId}-t`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-error)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-error)" stopOpacity="0.02" />
            </linearGradient>
          )}
        </defs>

        {yTicks.slice(1, -1).map((t) => (
          <line
            key={t.v}
            x1={PAD.left}
            y1={t.y}
            x2={w - PAD.right}
            y2={t.y}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        ))}
        {yTicks
          .filter((_, i) => i % 2 === 0)
          .map((t) => (
            <text key={t.v} x={PAD.left - 4} y={t.y + 4} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.45">
              {fmt(t.v)}
              {unit}
            </text>
          ))}

        {threshY != null && showArea && (
          <rect x={PAD.left} y={PAD.top} width={w - PAD.left - PAD.right} height={Math.max(0, threshY - PAD.top)} fill={`url(#${fillId}-t)`} />
        )}
        {threshY != null && (
          <line x1={PAD.left} y1={threshY} x2={w - PAD.right} y2={threshY} stroke="var(--color-error)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="4 3" />
        )}

        {showArea && <path d={main.area} fill={`url(#${fillId})`} />}
        {sub && (
          <path d={sub.line} fill="none" stroke={overlay!.color} strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 3" />
        )}
        <path d={main.line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {labels.map((l, i) => {
          if (i % labelEvery !== 0) return null;
          const x = PAD.left + (values.length <= 1 ? 0 : i / (values.length - 1)) * (w - PAD.left - PAD.right);
          return (
            <text key={i} x={x} y={h - 4} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.45">
              {l}
            </text>
          );
        })}

        {hoverPt && (
          <>
            <line x1={hoverPt[0]} y1={PAD.top} x2={hoverPt[0]} y2={h - PAD.bottom} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
            <circle cx={hoverPt[0]} cy={hoverPt[1]} r="3.5" fill={color} />
            {sub && hover != null && (
              <circle cx={sub.pts[hover][0]} cy={sub.pts[hover][1]} r="3" fill={overlay!.color} fillOpacity="0.85" />
            )}
          </>
        )}
      </svg>

      {hover != null && hoverPt && (
        <div
          className="pointer-events-none absolute top-1 z-10 rounded-lg border border-outline-variant/40 bg-surface-container px-2.5 py-1.5 text-xs shadow-md"
          style={{
            left: `${(hoverPt[0] / w) * 100}%`,
            transform: hoverPt[0] > w * 0.7 ? "translateX(-110%)" : "translateX(8px)",
          }}
        >
          <p className="mb-0.5 text-on-surface-variant">{labels[hover]}</p>
          <p className="font-medium text-on-surface">
            {fmt(values[hover])}
            {unit}
          </p>
          {overlay && (
            <p className="text-on-surface-variant/70">
              {overlay.label}: {fmt(overlay.values[hover])}
              {unit}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
