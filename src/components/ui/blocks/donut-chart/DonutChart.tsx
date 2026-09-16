import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import {
  defaultFormat,
  normalizeSeries,
  seriesAriaLabel,
  seriesColor,
  seriesOpacity,
  type ChartDatum,
} from "@/types/chart";
import { isFullSweep, ringSegmentPath } from "@/utils/chartGeometry";

export const meta: ComponentMeta = {
  name: "DonutChart",
  description:
    "A part-to-whole ring for labelled categories, with an optional centre figure and legend. Hand-drawn SVG on theme tokens, like Gauge and TrendChart — no charting dependency.",
};

export interface DonutChartProps {
  /** The categories. Order is drawing order, clockwise from twelve o'clock. */
  data: ChartDatum[];
  /**
   * The number under the centre label. Defaults to the sum of the data.
   *
   * Pass it when the whole is larger than what is drawn — "3 of 47 placements"
   * — so the ring shows a share of the real denominator instead of implying
   * the slices are everything.
   */
  total?: number;
  /** Word under the centre figure, e.g. "attempts". Omit for a bare ring. */
  centerLabel?: string;
  /** Renders each value in the legend and the aria label. Default: integers bare, otherwise one decimal. */
  formatValue?: (value: number) => string;
  /** Show the legend beside (or under) the ring. Default `true`. */
  legend?: boolean;
  /** Ring thickness as a share of its radius, 0-1. Default `0.38`. */
  thickness?: number;
  /** What to say when there is nothing to draw. Default `"No data"`. */
  emptyLabel?: string;
  /** Names the chart for assistive technology, and titles the legend region. */
  title?: string;
  className?: string;
}

const VIEWBOX = 100;
const CENTER = VIEWBOX / 2;
const OUTER_RADIUS = 46;

/**
 * 🔴 A GAP IS NOT A SEPARATOR WHEN THE SLICE IS SMALLER THAN THE GAP. Padding
 * between segments is drawn by shortening each sweep, so a slice worth less
 * than the padding would invert and wrap the wrong way round the circle. The
 * sweep is floored at zero instead: a slice too thin to separate simply has no
 * gap, which reads as a hairline rather than as a slice drawn backwards.
 */
const PAD_DEG = 1.2;

export function DonutChart({
  data,
  total,
  centerLabel,
  formatValue = defaultFormat,
  legend = true,
  thickness = 0.38,
  emptyLabel = "No data",
  title,
  className,
}: DonutChartProps) {
  const { data: series, total: sum } = normalizeSeries(data);
  // The denominator the ring divides. An explicit total below the sum would
  // draw more than a full circle, so the sum wins — the drawing stays a whole.
  const whole = Math.max(total ?? sum, sum);
  const innerRadius = OUTER_RADIUS * (1 - Math.min(Math.max(thickness, 0.05), 0.9));
  const drawable = series.filter((datum) => datum.value > 0);

  let cursor = 0;
  const segments = drawable.map((datum, index) => {
    const sweep = (datum.value / whole) * 360;
    const start = cursor;
    cursor += sweep;
    const paletteIndex = series.indexOf(datum);
    return {
      datum,
      paletteIndex,
      // The palette index follows the ORIGINAL position, so dropping a
      // zero-valued category does not recolour the ones after it — a legend
      // that changes colour when a number reaches zero is a legend nobody can
      // read across two page loads.
      color: seriesColor(paletteIndex, datum.tone),
      start,
      end: start + sweep,
      sweep,
      index,
    };
  });

  const empty = drawable.length === 0 || whole <= 0;
  const centerValue = formatValue(total ?? sum);

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
            : seriesAriaLabel(title, drawable, formatValue)
        }
      >
        {/* The track. Always drawn, so an empty series is a ring with nothing
            in it rather than a blank square that reads as a failed render. */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={(OUTER_RADIUS + innerRadius) / 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={OUTER_RADIUS - innerRadius}
          opacity="0.1"
        />

        {segments.map(({ datum, color, paletteIndex, start, end, sweep }) =>
          isFullSweep(sweep) ? (
            // One category holding the whole: a stroked circle, because an arc
            // between two identical points draws nothing.
            <circle
              key={datum.key}
              cx={CENTER}
              cy={CENTER}
              r={(OUTER_RADIUS + innerRadius) / 2}
              fill="none"
              stroke={color}
              strokeOpacity={seriesOpacity(paletteIndex, datum.tone)}
              strokeWidth={OUTER_RADIUS - innerRadius}
            />
          ) : (
            <path
              key={datum.key}
              d={ringSegmentPath(
                CENTER,
                CENTER,
                OUTER_RADIUS,
                innerRadius,
                start,
                Math.max(start, end - PAD_DEG),
              )}
              fill={color}
              fillOpacity={seriesOpacity(paletteIndex, datum.tone)}
            />
          ),
        )}

        {(centerLabel || !empty) && (
          <>
            <text
              x={CENTER}
              y={centerLabel ? CENTER - 4 : CENTER}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="16"
              fontWeight="bold"
              fill="currentColor"
            >
              {empty ? "—" : centerValue}
            </text>
            {centerLabel && (
              <text
                x={CENTER}
                y={CENTER + 11}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="7"
                fill="currentColor"
                opacity="0.6"
              >
                {centerLabel}
              </text>
            )}
          </>
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
