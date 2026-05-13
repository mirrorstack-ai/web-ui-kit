import { useMemo, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { paletteColor, roundedDonutSegmentPath } from "@/utils/chart-arc";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "DonutChart",
  description:
    "A ring / pie chart — segments sized by value with rounded ends and a small gap between them, an optional centre label, an optional legend, and a hover chip that follows the cursor. Segment colours come from a theme palette unless given per datum.",
};

export interface DonutChartDatum {
  label: string;
  value: number;
  /** CSS colour for the segment. Defaults to a cycling theme-palette colour. */
  color?: string;
}

export interface DonutChartProps {
  data: ReadonlyArray<DonutChartDatum>;
  /** Diameter in px. Default 180. */
  size?: number;
  /** Ring thickness in px. Default `size * 0.18` (clamped to always leave a hole). */
  thickness?: number;
  /** Large text shown in the centre (e.g. the total). */
  centerLabel?: ReactNode;
  /** Small text under {@link centerLabel}. */
  centerSub?: ReactNode;
  /** Show a colour / label / value / % legend beside the ring. Default true. */
  legend?: boolean;
  /** Format a value for the legend + hover chip. Default `value.toLocaleString()`. */
  formatValue?: (value: number, datum: DonutChartDatum) => ReactNode;
  /** Classes for the floating hover chip. Default `"bg-on-surface text-surface"`. */
  chipClassName?: string;
  className?: string;
}

const pct = (n: number) => `${n.toFixed(n > 0 && n < 10 ? 1 : 0)}%`;

export function DonutChart({
  data,
  size = 180,
  thickness,
  centerLabel,
  centerSub,
  legend = true,
  formatValue,
  chipClassName,
  className,
}: DonutChartProps) {
  // The chip is portaled to <body> so a clipping ancestor can't cut it off; it
  // tracks the cursor since a segment's bounding box overstates its extent.
  const [hover, setHover] = useState<{ index: number; x: number; y: number } | null>(null);
  const fmt = (v: number, d: DonutChartDatum): ReactNode => (formatValue ? formatValue(v, d) : v.toLocaleString());

  const { segments, c, rInner, rOuter, ring } = useMemo(() => {
    const c = size / 2;
    const rOuter = c;
    const ring = Math.min(thickness ?? size * 0.18, rOuter * 0.9); // always leave a hole
    const rInner = rOuter - ring;
    const cornerR = ring * 0.22; // softening of the segment corners
    const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1;
    const gapDeg = data.length > 1 ? 3 : 0;
    let acc = 0; // running fraction of the total
    const segments = data.map((d, i) => {
      const frac = Math.max(0, d.value) / total;
      const start = acc * 360 + gapDeg / 2;
      const end = (acc + frac) * 360 - gapDeg / 2;
      acc += frac;
      return {
        d,
        i,
        color: d.color ?? paletteColor(i),
        pct: frac * 100,
        path: roundedDonutSegmentPath(c, c, rInner, rOuter, start, end, cornerR),
      };
    });
    return { segments, c, rInner, rOuter, ring };
  }, [data, size, thickness]);

  const hovered = hover != null ? segments[hover.index] : undefined;
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
            {hovered.d.label} · {fmt(hovered.d.value, hovered.d)} · {pct(hovered.pct)}
          </span>,
          document.body,
        )
      : null;

  const track = (i: number) => (e: ReactPointerEvent) => setHover({ index: i, x: e.clientX, y: e.clientY });

  const ringEl = (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} onPointerLeave={() => setHover(null)}>
        <circle cx={c} cy={c} r={(rInner + rOuter) / 2} fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth={ring} />
        {segments.map((s) => (
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
      {(centerLabel != null || centerSub != null) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
          {centerLabel != null && <span className="text-lg font-semibold text-on-surface">{centerLabel}</span>}
          {centerSub != null && <span className="text-[11px] text-on-surface-variant">{centerSub}</span>}
        </div>
      )}
    </div>
  );

  if (!legend)
    return (
      <div className={cn("inline-flex", className)}>
        {ringEl}
        {chip}
      </div>
    );

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {ringEl}
      <ul className="flex min-w-0 flex-col gap-1.5 text-xs">
        {segments.map((s) => (
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
            <span className="shrink-0 tabular-nums text-on-surface-variant/70">{pct(s.pct)}</span>
          </li>
        ))}
      </ul>
      {chip}
    </div>
  );
}
