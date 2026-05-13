import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "BarChart",
  description:
    "A responsive vertical bar chart with a Y scale and x-axis labels; one bar (the last by default) is highlighted. Hovering a bar shows its label + value in a chip portaled to the body so it isn't clipped. Fills its container's width.",
};

const PAD = { top: 8, right: 4, bottom: 20, left: 36 } as const;

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: ReadonlyArray<BarChartDatum>;
  /** CSS colour for the bars. Default `var(--color-primary)`. */
  color?: string;
  /** SVG height in px (width fills the container). Default 120. */
  height?: number;
  /** Index of the bar to highlight (full colour + gradient). Default: the last
   *  bar. Pass `-1` for none. */
  highlightIndex?: number;
  /** Prefix on the Y-axis tick labels and the hover chip (e.g. `"$"`). */
  unitPrefix?: string;
  /** Decimal places on the Y-axis ticks. Default 0. */
  precision?: number;
  /** Classes for the floating hover chip. Default `"bg-on-surface text-surface"`. */
  chipClassName?: string;
  className?: string;
}

export function BarChart({
  data,
  color = "var(--color-primary)",
  height = 120,
  highlightIndex,
  unitPrefix = "",
  precision = 0,
  chipClassName,
  className,
}: BarChartProps) {
  const reactId = useId();
  const fillId = `bar-chart-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(400);
  // The chip is portaled to <body> so a clipping/overflow-hidden ancestor can't
  // cut it off — it floats above the bar.
  const [hover, setHover] = useState<{ index: number; rect: DOMRect } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setW(el.getBoundingClientRect().width || 400);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      if (next > 0) setW((prev) => (prev === next ? prev : next));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const max = Math.max(0, ...data.map((d) => d.value)) * 1.2 || 1;
  const chartW = w - PAD.left - PAD.right;
  const chartH = height - PAD.top - PAD.bottom;
  const slot = data.length > 0 ? chartW / data.length : chartW;
  const barW = Math.max(4, slot * 0.5);
  const hi = highlightIndex ?? data.length - 1;
  const yTicks = [0, 0.5, 1].map((t) => ({ v: max * t, y: PAD.top + (1 - t) * chartH }));

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
            {hovered.label} · {unitPrefix}
            {hovered.value}
          </span>,
          document.body,
        )
      : null;

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${w} ${height}`} width={w} height={height} onPointerLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {yTicks.map((t) => (
          <g key={t.v}>
            <line x1={PAD.left} y1={t.y} x2={w - PAD.right} y2={t.y} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
            <text x={PAD.left - 4} y={t.y + 4} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.45">
              {unitPrefix}
              {t.v.toFixed(precision)}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = PAD.left + slot * i + slot / 2 - barW / 2;
          const barH = Math.max(0, (d.value / max) * chartH);
          const highlighted = i === hi;
          const onEnter = (e: ReactPointerEvent<SVGRectElement>) =>
            setHover({ index: i, rect: e.currentTarget.getBoundingClientRect() });
          return (
            <g key={`${d.label}-${i}`}>
              <rect
                x={x}
                y={PAD.top + chartH - barH}
                width={barW}
                height={barH}
                rx={Math.min(6, barW * 0.35)}
                className="cursor-default"
                fill={highlighted ? `url(#${fillId})` : color}
                fillOpacity={highlighted ? 1 : hover?.index === i ? 0.6 : 0.35}
                onPointerEnter={onEnter}
              >
                <title>{`${d.label}: ${unitPrefix}${d.value}`}</title>
              </rect>
              <text x={x + barW / 2} y={height - 4} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.45">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {chip}
    </div>
  );
}
