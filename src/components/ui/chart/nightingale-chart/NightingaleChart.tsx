import { useMemo, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { paletteColor, roundedDonutSegmentPath, wedgePath } from "@/utils/chart-arc";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "NightingaleChart",
  description:
    "A Nightingale rose (polar-area / coxcomb) chart — equal-angle rounded sectors, around a small centre hole, whose radius encodes the value (by sector area, the default, or linearly). An optional legend and a hover chip that follows the cursor. Colours come from a theme palette unless given per datum.",
};

export interface NightingaleChartDatum {
  label: string;
  value: number;
  /** CSS colour for the sector. Defaults to a cycling theme-palette colour. */
  color?: string;
}

export interface NightingaleChartProps {
  data: ReadonlyArray<NightingaleChartDatum>;
  /** Width / height in px. Default 200. */
  size?: number;
  /** `"area"` (default) — radius ∝ √value, so a sector's *area* tracks the value.
   *  `"radius"` — radius ∝ value (exaggerates differences). */
  scale?: "area" | "radius";
  /** Show a colour / label / value legend beside the chart. Default true. */
  legend?: boolean;
  /** Format a value for the legend + hover chip. Default `value.toLocaleString()`. */
  formatValue?: (value: number, datum: NightingaleChartDatum) => ReactNode;
  /** Classes for the floating hover chip. Default `"bg-on-surface text-surface"`. */
  chipClassName?: string;
  className?: string;
}

export function NightingaleChart({
  data,
  size = 200,
  scale = "area",
  legend = true,
  formatValue,
  chipClassName,
  className,
}: NightingaleChartProps) {
  // The chip is portaled to <body> so a clipping ancestor can't cut it off; it
  // tracks the cursor since a sector's bounding box overstates its extent.
  const [hover, setHover] = useState<{ index: number; x: number; y: number } | null>(null);
  const fmt = (v: number, d: NightingaleChartDatum): ReactNode => (formatValue ? formatValue(v, d) : v.toLocaleString());

  const sectors = useMemo(() => {
    const c = size / 2;
    const rMax = c - 2;
    const rInner = rMax * 0.14; // a small centre hole
    const single = data.length === 1;
    const sliceDeg = data.length > 0 ? 360 / data.length : 360;
    const maxV = Math.max(0, ...data.map((d) => d.value)) || 1;
    // An angular gap between sectors, matching the kit's spacing aesthetic.
    const padDeg = data.length > 1 ? 4 : 0;
    return data.map((d, i) => {
      const frac = Math.max(0, d.value) / maxV;
      const rOuter = rInner + (rMax - rInner) * (scale === "radius" ? frac : Math.sqrt(frac));
      return {
        d,
        i,
        color: d.color ?? paletteColor(i),
        path: single
          ? wedgePath(c, c, rOuter, 0, 360)
          : roundedDonutSegmentPath(c, c, rInner, rOuter, i * sliceDeg + padDeg / 2, (i + 1) * sliceDeg - padDeg / 2, rOuter * 0.09),
      };
    });
  }, [data, size, scale]);

  const hovered = hover != null ? sectors[hover.index] : undefined;
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
            {hovered.d.label} · {fmt(hovered.d.value, hovered.d)}
          </span>,
          document.body,
        )
      : null;

  const track = (i: number) => (e: ReactPointerEvent) => setHover({ index: i, x: e.clientX, y: e.clientY });

  const chartEl = (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} onPointerLeave={() => setHover(null)} className="shrink-0">
      {sectors.map((s) => (
        <path
          key={s.i}
          d={s.path}
          fill={s.color}
          fillOpacity={hover != null && hover.index !== s.i ? 0.4 : 1}
          className="cursor-default transition-[fill-opacity]"
          onPointerEnter={track(s.i)}
          onPointerMove={track(s.i)}
        >
          <title>{`${s.d.label}: ${s.d.value}`}</title>
        </path>
      ))}
    </svg>
  );

  if (!legend)
    return (
      <div className={cn("inline-flex", className)}>
        {chartEl}
        {chip}
      </div>
    );

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {chartEl}
      <ul className="flex min-w-0 flex-col gap-1.5 text-xs">
        {sectors.map((s) => (
          <li
            key={s.i}
            className="flex items-center gap-2"
            onPointerEnter={(e) => setHover({ index: s.i, x: e.clientX, y: e.clientY })}
            onPointerMove={(e) => setHover({ index: s.i, x: e.clientX, y: e.clientY })}
            onPointerLeave={() => setHover(null)}
          >
            <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="min-w-0 flex-1 truncate text-on-surface-variant">{s.d.label}</span>
            <span className="shrink-0 font-medium tabular-nums text-on-surface">{fmt(s.d.value, s.d)}</span>
          </li>
        ))}
      </ul>
      {chip}
    </div>
  );
}
