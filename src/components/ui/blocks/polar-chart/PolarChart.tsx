import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import {
  defaultFormat,
  normalizeSeries,
  seriesAriaLabel,
  seriesColor,
  seriesOpacity,
  type ChartDatum,
} from "@/types/chart";
import { ringSegmentPath } from "@/utils/chartGeometry";

export const meta: ComponentMeta = {
  name: "PolarChart",
  description:
    "Radial bars: one wedge per category, length proportional to its value against a shared maximum. For comparing many like-for-like categories — per-question correct rates, per-placement CTR — where a ring would be wrong because the parts are not a whole.",
};

export interface PolarChartProps {
  /** The categories. One wedge each, clockwise from twelve o'clock. */
  data: ChartDatum[];
  /**
   * The value a full-length wedge represents. Defaults to the largest value in
   * the data.
   *
   * 🔴 PASS IT FOR A RATE. With the default, the best category always reaches
   * the rim — so a quiz where every question is answered correctly 30% of the
   * time looks identical to one where every question is at 100%. `max={100}`
   * is what makes a percentage chart mean a percentage.
   */
  max?: number;
  /** Renders each value in the legend and the aria label. Default: integers bare, otherwise one decimal. */
  formatValue?: (value: number) => string;
  /** Show the legend beside (or under) the wedges. Default `true`. */
  legend?: boolean;
  /** What to say when there is nothing to draw. Default `"No data"`. */
  emptyLabel?: string;
  /** Names the chart for assistive technology. */
  title?: string;
  className?: string;
}

const VIEWBOX = 100;
const CENTER = VIEWBOX / 2;
const MAX_RADIUS = 43;
const HUB_RADIUS = 9;
const PAD_DEG = 1.5;

/**
 * The rings a reader measures against. Without them a radial bar carries no
 * scale at all: the eye can order the wedges but cannot say whether the longest
 * is 40% or 95%, which is exactly the question a rate chart exists to answer.
 */
const GUIDE_FRACTIONS = [0.25, 0.5, 0.75, 1];

export function PolarChart({
  data,
  max,
  formatValue = defaultFormat,
  legend = true,
  emptyLabel = "No data",
  title,
  className,
}: PolarChartProps) {
  const { data: series } = normalizeSeries(data);
  const largest = series.reduce((peak, datum) => Math.max(peak, datum.value), 0);

  if (isDev && max !== undefined && max < largest) {
    console.warn(
      `[PolarChart] max ${max} is below the largest value ${largest}; those wedges are clamped to the rim and no longer comparable.`,
    );
  }

  // A zero ceiling would divide every wedge by zero. Falling back to 1 draws
  // every category at nothing, which is the truth about an all-zero series.
  const ceiling = Math.max(max ?? largest, Number.EPSILON);
  const empty = series.length === 0 || largest <= 0;
  const step = series.length > 0 ? 360 / series.length : 360;

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center",
        className,
      )}
    >
      <svg
        className="aspect-square w-full max-w-[200px] shrink-0"
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        role="img"
        aria-label={
          empty
            ? [title, emptyLabel].filter(Boolean).join(" — ")
            : seriesAriaLabel(title, series, formatValue)
        }
      >
        {GUIDE_FRACTIONS.map((fraction) => (
          <circle
            key={fraction}
            cx={CENTER}
            cy={CENTER}
            r={HUB_RADIUS + (MAX_RADIUS - HUB_RADIUS) * fraction}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity={fraction === 1 ? 0.2 : 0.1}
          />
        ))}

        {!empty &&
          series.map((datum, index) => {
            const reach = HUB_RADIUS + (MAX_RADIUS - HUB_RADIUS) * Math.min(datum.value / ceiling, 1);
            const start = index * step;
            // A single category would otherwise sweep the full circle and
            // degenerate the same way a whole-ring donut slice does; the pad
            // keeps every wedge a real arc.
            const end = start + Math.max(step - PAD_DEG, step * 0.5);
            if (datum.value <= 0) return null;
            return (
              <path
                key={datum.key}
                d={ringSegmentPath(CENTER, CENTER, reach, HUB_RADIUS, start, Math.min(end, start + 359))}
                fill={seriesColor(index, datum.tone)}
                fillOpacity={seriesOpacity(index, datum.tone)}
              />
            );
          })}

        {/* The hub covers the wedge roots so they meet a clean circle rather
            than a pinwheel of points at the centre. */}
        <circle cx={CENTER} cy={CENTER} r={HUB_RADIUS} fill="currentColor" opacity="0.06" />

        {empty && (
          <text
            x={CENTER}
            y={CENTER}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="7"
            fill="currentColor"
            opacity="0.6"
          >
            —
          </text>
        )}

        {/* The value the rim stands for, centred ABOVE it.
            🔴 Anchored to the rim's own coordinate it read as a label on the
            first wedge rather than on the scale — the wedge starts at exactly
            twelve o'clock, so the two touched — and at the old radius the text
            clipped against the top of the viewBox. The radius gives it room and
            the centre anchor puts it over the ring it describes. */}
        {!empty && (
          <text
            x={CENTER}
            y={CENTER - MAX_RADIUS - 3.5}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="5"
            fill="currentColor"
            opacity="0.5"
          >
            {formatValue(ceiling)}
          </text>
        )}
      </svg>

      {legend && (
        <ul className="flex w-full min-w-0 flex-col gap-1.5 text-sm sm:w-auto sm:min-w-[9rem]">
          {empty ? (
            <li className="text-on-surface-variant">{emptyLabel}</li>
          ) : (
            series.map((datum, index) => (
              <li key={datum.key} className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: seriesColor(index, datum.tone),
                    opacity: seriesOpacity(index, datum.tone),
                  }}
                />
                <span className="min-w-0 flex-1 truncate text-on-surface-variant">{datum.label}</span>
                <span className="shrink-0 tabular-nums text-on-surface">{formatValue(datum.value)}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
