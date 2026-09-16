import { isDev } from "@/utils/env";

/**
 * The one data shape every categorical chart in this kit takes.
 *
 * Both consumers already hold their data in exactly this shape and were
 * rendering it with the wrong component for want of a right one: quiz-core put
 * per-question correct rates through TrendChart — a smooth curve over question
 * index, which draws a trend through categories that have no order — and
 * ad-core printed per-placement impressions as a table with no share of the
 * whole anywhere. One shape for both is what keeps a single API honest; a chart
 * that needs its own bespoke input is a chart that will drift from its sibling.
 */
export interface ChartDatum {
  /** Stable identity — a React key and the thing a consumer maps back to a row. */
  key: string;
  /** What a person reads. Never the key: a uuid is not a label. */
  label: string;
  /** The magnitude. Must be finite and >= 0; see {@link normalizeSeries}. */
  value: number;
  /**
   * Pin this datum to a semantic colour instead of its position in the
   * palette. Use it when a value MEANS something — passed vs failed, over vs
   * under budget — and leave it unset when the categories are merely different
   * from each other.
   */
  tone?: ChartTone;
}

/** The semantic colours a datum may pin. Mirrors the kit's DataStatus vocabulary. */
export type ChartTone = "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";

export const chartToneVarColor: Record<ChartTone, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  tertiary: "var(--color-tertiary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
};

/**
 * The categorical palette, in the order a series consumes it.
 *
 * Six theme tokens rather than six hex values, so a chart follows light/dark
 * and any org accent exactly as the rest of the kit does — the same reason
 * TrendChart draws with `currentColor`. It cycles past six: a seventh category
 * repeats the first colour rather than inventing a token that no theme defines,
 * and a series that large wants a table, not a ring.
 */
const SERIES_TONES: readonly ChartTone[] = [
  "primary",
  "tertiary",
  "success",
  "warning",
  "secondary",
  "error",
];

/** The colour for slice `index`, honouring an explicit tone when the datum pins one. */
export function seriesColor(index: number, tone?: ChartTone): string {
  return chartToneVarColor[tone ?? SERIES_TONES[index % SERIES_TONES.length]];
}

/**
 * How opaque slice `index` is drawn.
 *
 * 🔴 THE SEVENTH CATEGORY REPEATS THE FIRST, AND IN A RING THE TWO ARE
 * ADJACENT. Cycling the palette is the right answer — inventing a seventh
 * colour no theme defines is not — but a seven-slice donut drew 版位 7 in the
 * same teal as 版位 1, touching it, which reads as one slice with a gap in it
 * (seen on the contact sheet, not reasoned about). Each further lap is drawn
 * lighter, so a repeat is still recognisably its own category. A datum that
 * pins a tone keeps full weight: it was given that colour to MEAN something.
 */
export function seriesOpacity(index: number, tone?: ChartTone): number {
  if (tone) return 1;
  const lap = Math.floor(index / SERIES_TONES.length);
  return lap === 0 ? 1 : Math.max(0.35, 1 - lap * 0.4);
}

export interface NormalizedSeries {
  data: ChartDatum[];
  /** Sum of every value. 0 when the series is empty or every value is 0. */
  total: number;
}

/**
 * Drop what cannot be drawn and report why, once, in dev.
 *
 * 🔴 A NEGATIVE OR NON-FINITE VALUE IS NOT A SMALL SLICE — it is a slice that
 * eats its neighbours. A negative share subtracts from the sweep, so the ring
 * silently stops matching its own legend and every remaining slice is drawn in
 * the wrong place; NaN propagates into the path `d` and the browser drops the
 * whole shape with no error anywhere. Clamping to 0 keeps the picture honest
 * about the rest of the data, and the dev warning is what tells the consumer
 * their number was wrong rather than their chart.
 */
export function normalizeSeries(data: ChartDatum[]): NormalizedSeries {
  const clean = data.map((datum) => {
    if (Number.isFinite(datum.value) && datum.value >= 0) return datum;
    if (isDev) {
      console.warn(
        `[chart] datum "${datum.key}" has value ${datum.value}; only finite values >= 0 can be drawn, so it is treated as 0.`,
      );
    }
    return { ...datum, value: 0 };
  });
  return { data: clean, total: clean.reduce((sum, datum) => sum + datum.value, 0) };
}

/** `42` → `"42"`, `41.5` → `"41.5"`: a count reads as a count, a rate keeps one decimal. */
export function defaultFormat(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

/**
 * The sentence a screen reader gets in place of the drawing.
 *
 * The kit's existing charts mark their SVG `aria-hidden` and rely on a
 * neighbouring label, which means the numbers themselves reach nobody who
 * cannot see the picture. A chart IS its numbers, so they are read out.
 */
export function seriesAriaLabel(
  title: string | undefined,
  data: ChartDatum[],
  format: (value: number) => string,
): string {
  const parts = data.map((datum) => `${datum.label}: ${format(datum.value)}`);
  return [title, parts.join(", ")].filter(Boolean).join(" — ");
}
