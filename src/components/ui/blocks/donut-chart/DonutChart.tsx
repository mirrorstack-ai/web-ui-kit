import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import {
  datumLabel,
  formatterFor,
  normalizeSeries,
  seriesAriaLabel,
  seriesColor,
  type ChartDatum,
  type ChartMeasure,
} from "@/types/chart";
import { isFullSweep } from "@/utils/chartGeometry";

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
   * Pass it when the whole is larger than what is drawn — "3 of 47 placements",
   * or a report the server truncated — so the ring shows a share of the real
   * denominator instead of implying the drawn slices are everything. A total
   * BELOW the sum is ignored: the drawing stays a whole.
   */
  total?: number;
  /** Word under the centre figure, e.g. "attempts". Omit for a bare ring. */
  centerLabel?: string;
  /**
   * What the values are. `"count"` groups thousands; `"rate"` takes the ratio
   * the server computed (0.0234) and writes what an operator reads (2.3%).
   * Setting it is how two pages agree on what a number looks like.
   */
  measure?: ChartMeasure;
  /**
   * Full control of the value text, for what no measure covers — a currency, a
   * duration, a locale the kit does not know. It WINS over `measure`; reaching
   * for it when `measure` would do is choosing to drift from the other pages.
   */
  formatValue?: (value: number) => string;
  /** Show the legend beside (or under) the ring. Default `true`. */
  legend?: boolean;
  /**
   * Ring thickness as a share of its radius, 0-1. Default `0.3`.
   *
   * Thinner than it was: with round caps a slice is as wide as the ring, so a
   * fat ring turns a small share into something that reads as a dot rather
   * than as a short arc.
   */
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
 * The seam between two slices, in viewBox units of arc.
 *
 * 🔴 A GAP IS NOT A SEPARATOR WHEN THE SLICE IS SMALLER THAN THE GAP. It is
 * drawn by shortening each slice, so a slice worth less than the gap would
 * invert and wrap the wrong way round the circle. Every length below is floored
 * at zero instead: a slice too thin to separate keeps its round cap and reads
 * as a dot, which is what it is.
 */
const GAP = 2;

export function DonutChart({
  data,
  total,
  centerLabel,
  measure,
  formatValue,
  legend = true,
  thickness = 0.3,
  emptyLabel = "No data",
  title,
  className,
}: DonutChartProps) {
  const format = formatterFor(measure, formatValue);
  const { data: series, total: sum } = normalizeSeries(data);
  // The denominator the ring divides. An explicit total below the sum would
  // draw more than a full circle, so the sum wins — the drawing stays a whole.
  const whole = Math.max(total ?? sum, sum);
  const innerRadius = OUTER_RADIUS * (1 - Math.min(Math.max(thickness, 0.05), 0.9));
  const drawable = series.filter((datum) => datum.value > 0);

  // 🔴 THE RING IS STROKED, NOT FILLED (owner, 2026-09-16: "too sharp, our
  // style guide is rounded"). A filled ring segment has four hard corners where
  // its arcs meet its radial edges, and four of those per slice is what read as
  // angular against a kit whose every surface is rounded. Stroking a dashed
  // circle with `strokeLinecap="round"` is the same idiom Gauge already uses
  // for its value arc, and it rounds both ends of every slice for free.
  const strokeWidth = OUTER_RADIUS - innerRadius;
  const midRadius = (OUTER_RADIUS + innerRadius) / 2;
  const circumference = 2 * Math.PI * midRadius;

  let cursor = 0;
  const segments = drawable.map((datum, index) => {
    const arc = (datum.value / whole) * circumference;
    const start = cursor;
    cursor += arc;
    const paletteIndex = series.indexOf(datum);
    // A round cap adds half the stroke width beyond each end of the dash, so
    // the DRAWN length is `dash + width`. Subtracting it keeps the seam the
    // width it says it is instead of letting neighbours grow into it.
    //
    // 🔴 And a slice shorter than the ring is thick cannot be drawn at full
    // thickness without painting more arc than it owns — the caps alone are
    // `strokeWidth` long. Such a slice is drawn THINNER, so its painted arc
    // still matches its share; it reads as a small bead on the ring, which is
    // what a small share is.
    const width = Math.max(1.5, Math.min(strokeWidth, arc - GAP));
    const dash = Math.max(0, arc - GAP - width);
    return {
      datum,
      paletteIndex,
      // The palette index follows the ORIGINAL position, so dropping a
      // zero-valued category does not recolour the ones after it — a legend
      // that changes colour when a number reaches zero is a legend nobody can
      // read across two page loads.
      color: seriesColor(paletteIndex, datum.tone),
      // Half the cap sits before the dash, so the slice starts there to keep
      // its painted edge on its own boundary.
      offset: start + width / 2,
      dash,
      width,
      arc,
      index,
    };
  });

  const empty = drawable.length === 0 || whole <= 0;
  const centerValue = format(total ?? sum);
  // 🔴 A GROUPED COUNT OUTGROWS THE HOLE. "43,680" at the fixed size ran under
  // the ring on both sides — seen on the contact sheet with ad-core's real
  // impression totals, where five digits and a separator are ordinary. The hole
  // is a fixed fraction of the viewBox, so the type has to answer to the string
  // rather than the other way round.
  const centerFontSize = centerValue.length > 8 ? 9 : centerValue.length > 5 ? 12 : 16;

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
            : seriesAriaLabel(title, drawable, format)
        }
      >
        {/* No track behind the slices (owner, 2026-09-16). A grey ring under
            coloured ones reads as a fifth category, and the data already says
            where the whole ends. An empty series therefore has nothing to draw
            at all, which is why the centre keeps its dash and the legend keeps
            its emptyLabel — those carry the empty state on their own now. */}
        {segments.map(({ datum, color, paletteIndex, offset, dash, arc, width }) => {
          // One category holding everything: a plain circle. A dash the length
          // of the whole circumference would have its two round caps meet and
          // overlap, and the seam would show on a ring that has no seam.
          const whole360 = isFullSweep((arc / circumference) * 360);
          return (
            <circle
              key={datum.key}
              cx={CENTER}
              cy={CENTER}
              r={midRadius}
              fill="none"
              stroke={color}
              strokeWidth={width}
              strokeLinecap="round"
              {...(whole360
                ? {}
                : {
                    strokeDasharray: `${dash.toFixed(2)} ${(circumference - dash).toFixed(2)}`,
                    strokeDashoffset: (-offset).toFixed(2),
                  })}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
            />
          );
        })}

        {(centerLabel || !empty) && (
          <>
            <text
              x={CENTER}
              y={centerLabel ? CENTER - 4 : CENTER}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={centerFontSize}
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
                  style={{ backgroundColor: seriesColor(index, datum.tone) }}
                />
                <span className="min-w-0 flex-1 truncate text-on-surface-variant">
                  {datumLabel(datum)}
                </span>
                <span className="shrink-0 tabular-nums text-on-surface">{format(datum.value)}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
