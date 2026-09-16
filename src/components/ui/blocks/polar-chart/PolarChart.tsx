import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import {
  datumLabel,
  formatterFor,
  normalizeSeries,
  seriesAriaLabel,
  seriesColor,
  seriesOpacity,
  RATE_WHOLE,
  type ChartDatum,
  type ChartMeasure,
} from "@/types/chart";
import { roundedSector } from "@/utils/chartGeometry";

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
   * the data — except under `measure="rate"`, where it defaults to 1, because a
   * ratio's whole is always 1.
   *
   * 🔴 IT IS IN THE VALUES' OWN UNITS, and `formatValue` does not change that:
   * a ctr series of ratios wants `max={0.05}`, not `max={5}`. Only the text
   * goes through the formatter; the wedge is drawn from the raw number.
   *
   * 🔴 AND WITHOUT IT A RATE FLATTERS ITSELF. With the largest-value default
   * the best category always reaches the rim, so a quiz where nothing exceeds
   * 30% looks exactly like one where everything is at 100%. Declaring
   * `measure="rate"` is usually better than declaring a max: it gets the right
   * ceiling and the right text together.
   */
  max?: number;
  /**
   * What the values are. `"count"` groups thousands; `"rate"` takes the ratio
   * the server computed (0.0234), writes what an operator reads (2.3%), and
   * scales the wedges against a whole of 1 rather than against the leader.
   */
  measure?: ChartMeasure;
  /**
   * Full control of the value text, for what no measure covers — a currency, a
   * duration, a locale the kit does not know. It WINS over `measure` for the
   * text, and changes nothing about the geometry.
   */
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

/**
 * The seam between two bars, in degrees. Angular rather than in units, so the
 * separation reads the same at the hub and at the rim; capped per-bar so a
 * chart with few categories does not spend a third of each bar on its gap.
 */
const GAP_DEG = 4;

/**
 * How much of each corner is rounded, in viewBox units.
 *
 * Small on purpose (owner, 2026-09-16): at 5 the bars stopped reading as
 * wedges and became pills with seams too wide between them. A bar should look
 * like a bar whose corners happen to be soft.
 */
const CORNER = 2;

/**
 * The widest a single bar may be, in degrees.
 *
 * 🔴 WITHOUT THIS, ONE CATEGORY IS A 356° BAR. The circle is divided by the
 * number of categories, so a series of one asked for the whole of it and drew a
 * disc with a notch where its own two ends almost met — seen on the
 * SingleCategory story, and not a bar by any reading. A bar keeps a bar's
 * proportions however few there are; the slot still moves with the count, so
 * six categories are unchanged and two sit opposite each other.
 */
const MAX_BAR_DEG = 60;

/**
 * The rings a reader measures against. Without them a radial bar carries no
 * scale at all: the eye can order the wedges but cannot say whether the longest
 * is 40% or 95%, which is exactly the question a rate chart exists to answer.
 */
const GUIDE_FRACTIONS = [0.25, 0.5, 0.75, 1];

export function PolarChart({
  data,
  max,
  measure,
  formatValue,
  legend = true,
  emptyLabel = "No data",
  title,
  className,
}: PolarChartProps) {
  const format = formatterFor(measure, formatValue);
  const { data: series } = normalizeSeries(data);
  const largest = series.reduce((peak, datum) => Math.max(peak, datum.value), 0);

  if (isDev && max !== undefined && max < largest) {
    console.warn(
      `[PolarChart] max ${max} is below the largest value ${largest}; those wedges are clamped to the rim and no longer comparable.`,
    );
  }

  // The declared ceiling, then a rate's inherent one, then the leader. A zero
  // ceiling would divide every wedge by zero; EPSILON draws every category at
  // nothing, which is the truth about an all-zero series — ad-core's day one,
  // where no placement has an impression yet.
  const ceiling = Math.max(max ?? (measure === "rate" ? RATE_WHOLE : largest), Number.EPSILON);
  const empty = series.length === 0 || largest <= 0;
  const step = series.length > 0 ? 360 / series.length : 360;
  // 🔴 A RADIAL BAR IS A SECTOR WITH ROUNDED CORNERS, not a stroke with round
  // caps (owner, 2026-09-16: "looks like flower petals, not a chart"). A capped
  // stroke has one constant width and two semicircular ends; a bar has to start
  // narrow at the hub and widen as it goes out, which is what lets the eye
  // compare lengths around the circle. So each bar keeps its angular share and
  // rounds only its corners.
  //
  // The seam is angular now rather than a width in units: a fixed gap in
  // DEGREES holds the same visual separation at every radius, which a fixed
  // stroke width could not.
  const gapDeg = Math.min(GAP_DEG, step * 0.3);
  // The bar's own width. Each bar is centred ON its slot's ray rather than
  // inside the slot, so the first one points straight up whatever the count —
  // centring inside the slot put a lone bar at six o'clock, which reads as a
  // chart that has slipped rather than as one bar.
  const barDeg = Math.min(step - gapDeg, MAX_BAR_DEG);

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
            : seriesAriaLabel(title, series, format)
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
            if (datum.value <= 0) return null;
            const reach = HUB_RADIUS + (MAX_RADIUS - HUB_RADIUS) * Math.min(datum.value / ceiling, 1);
            // A sector's outer edge sits exactly on its value — no cap paints
            // past it, so nothing has to be narrowed to stay honest, and a bar
            // worth almost nothing is a sliver rather than a dot.
            const { d, strokeWidth } = roundedSector(
              CENTER,
              CENTER,
              HUB_RADIUS,
              Math.max(reach, HUB_RADIUS + 0.5),
              index * step - barDeg / 2,
              index * step + barDeg / 2,
              CORNER,
            );
            const color = seriesColor(index, datum.tone);
            const opacity = seriesOpacity(index, datum.tone);
            return (
              // Fill AND stroke in the same colour: the stroke is what rounds
              // the corners, so it is part of the shape rather than an outline
              // around it.
              <path
                key={datum.key}
                d={d}
                fill={color}
                fillOpacity={opacity}
                stroke={color}
                strokeOpacity={opacity}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
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
            {format(ceiling)}
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
