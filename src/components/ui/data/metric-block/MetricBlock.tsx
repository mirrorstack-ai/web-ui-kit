import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Sparkline, type SparklinePoint } from "@/components/ui/chart/sparkline/Sparkline";

export const meta: ComponentMeta = {
  name: "MetricBlock",
  description:
    "A metric tile sized for a NotchGrid cell — icon, trend chip, label, value, optional sparkline + sub-stats. Pick a `layout` for the cell shape: stacked (1×1/1×2), wide (2×1/3×1), card (2×2), bigcard (3×2), chart (3×3+ — chart-led, no big value).",
};

/** Text-colour tone — must match the surface the block sits on. */
export type MetricBlockTone = "surface" | "primary";

/** Direction of the trend chip — `up` reads green, `down` reads as an error. */
export type MetricTrend = "up" | "down";

/** `stacked` = 1×1 / 1×2; `wide` = 2×1 / 3×1; `card` = 2×2; `bigcard` = 3×2;
 *  `chart` = 3×3 and up (chart-led — full-width sparkline, no big value). */
export type MetricBlockLayout = "stacked" | "wide" | "card" | "bigcard" | "chart";

const TONE: Record<
  MetricBlockTone,
  { icon: string; label: string; value: string; bar: string; barActive: string; divider: string }
> = {
  surface: {
    icon: "text-primary",
    label: "text-on-surface-variant",
    value: "text-on-surface",
    bar: "bg-primary/30 hover:bg-primary/60",
    barActive: "bg-primary/60",
    divider: "border-outline-variant",
  },
  primary: {
    icon: "text-on-primary-container",
    label: "text-on-primary-container/70",
    value: "text-on-primary-container",
    bar: "bg-on-primary-container/25 hover:bg-on-primary-container/55",
    barActive: "bg-on-primary-container/55",
    divider: "border-on-primary-container/20",
  },
};

// Semantic accent tokens — they flip with the theme, so the chip stays legible
// in light and dark mode on any tone.
const TREND_TEXT: Record<MetricTrend, string> = {
  up: "text-success",
  down: "text-error",
};

const inferTrend = (delta: ReactNode, explicit?: MetricTrend): MetricTrend =>
  explicit ?? (typeof delta === "string" && /^[-−]/.test(delta.trim()) ? "down" : "up");

export interface MetricStat {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  deltaTrend?: MetricTrend;
}

export interface MetricBlockProps {
  /** Material Symbols Rounded icon name (e.g. `"apps"`). Omit for no icon. */
  icon?: string;
  label: ReactNode;
  /** The headline value. Not shown in `layout="chart"` (the chart + stats carry it). */
  value?: ReactNode;
  /** A trend / delta chip (e.g. `"+18%"`). Top-right when stacked, in the header
   *  when card, beside the label when wide. Coloured by {@link deltaTrend}. */
  delta?: ReactNode;
  /** `up` ⇒ green, `down` ⇒ error red. When omitted and `delta` is a string,
   *  inferred from a leading `-` / `−`. */
  deltaTrend?: MetricTrend;
  /** Optional neutral line under the value — a unit, count, timestamp, etc.
   *  Hidden when {@link stats} is shown (bigcard). */
  hint?: ReactNode;
  /** Sparkline points (heights 0–100, optional per-bar `label` for the hover
   *  chip — see {@link SparklinePoint}). Fills the spare height (stacked / card
   *  / bigcard / chart) or sits on the right (wide). A 2×1 hasn't the room. */
  chart?: ReadonlyArray<SparklinePoint>;
  /** A row of mini sub-stats below the chart — rendered in `layout="bigcard"`
   *  and `layout="chart"`. */
  stats?: ReadonlyArray<MetricStat>;
  /** Pick a layout for the cell shape (see {@link MetricBlockLayout}). Default `"stacked"`. */
  layout?: MetricBlockLayout;
  /** Pick the tone that contrasts with the block's background. Default `"surface"`. */
  tone?: MetricBlockTone;
  className?: string;
}

export function MetricBlock({
  icon,
  label,
  value,
  delta,
  deltaTrend,
  hint,
  chart,
  stats,
  layout = "stacked",
  tone = "surface",
  className,
}: MetricBlockProps) {
  if (isDev && label == null && value == null) {
    console.warn("[MetricBlock] both `label` and `value` are empty — nothing to show");
  }
  const c = TONE[tone];
  const trend = inferTrend(delta, deltaTrend);
  const hasChart = !!chart && chart.length > 0;
  const deltaChip = delta != null && (
    <span className={cn("shrink-0 text-xs font-medium", TREND_TEXT[trend])}>{delta}</span>
  );
  const sparkline = (cls: string) =>
    hasChart ? (
      <Sparkline data={chart!} barClassName={c.bar} barActiveClassName={c.barActive} className={cls} />
    ) : null;
  const hintLine = (extra?: string) =>
    hint != null ? <p className={cn("truncate text-xs", c.label, extra)}>{hint}</p> : null;
  const hasStats = !!stats && stats.length > 0;
  const statsRow = hasStats ? (
    <div className={cn("flex gap-3 border-t pt-2", c.divider)}>
      {stats!.map((s, i) => {
        const t = inferTrend(s.delta, s.deltaTrend);
        return (
          <div key={i} className="min-w-0 flex-1">
            <p className={cn("truncate text-[10px]", c.label)}>{s.label}</p>
            <p className={cn("truncate text-sm font-medium", c.value)}>
              {s.value}
              {s.delta != null && (
                <span className={cn("ml-1 text-[10px] font-medium", TREND_TEXT[t])}>{s.delta}</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  ) : null;

  const valueLine = (cls: string) =>
    value != null ? <p className={cn(cls, c.value)}>{value}</p> : null;

  let body: ReactNode;
  if (layout === "wide") {
    body = (
      <div className={cn("flex h-full items-center gap-3", className)}>
        {icon ? <Icon name={icon} size={24} className={c.icon} /> : null}
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <p className={cn("truncate text-xs", c.label)}>{label}</p>
            {!hasChart && deltaChip}
          </div>
          {valueLine("text-2xl font-semibold leading-tight")}
          {hintLine()}
        </div>
        {sparkline("ml-auto h-2/3 w-[42%] self-center")}
      </div>
    );
  } else if (layout === "chart") {
    body = (
      <div className={cn("flex h-full flex-col gap-2", className)}>
        <div className="flex items-center gap-2">
          {icon ? <Icon name={icon} size={20} className={c.icon} /> : null}
          <p className={cn("min-w-0 flex-1 truncate text-sm font-medium", c.label)}>{label}</p>
          {deltaChip}
        </div>
        {sparkline("flex-1")}
        {hasStats ? statsRow : hintLine("mt-auto")}
      </div>
    );
  } else if (layout === "bigcard") {
    body = (
      <div className={cn("flex h-full flex-col gap-2", className)}>
        <div className="flex items-center gap-2">
          {icon ? <Icon name={icon} size={20} className={c.icon} /> : null}
          <p className={cn("min-w-0 flex-1 truncate text-sm font-medium", c.label)}>{label}</p>
          {deltaChip}
        </div>
        {/* big value beside the sparkline — uses the horizontal room a 3×2+ has */}
        <div className="flex flex-1 items-end gap-3">
          {valueLine("shrink-0 text-3xl font-semibold leading-none")}
          {sparkline("h-full flex-1")}
        </div>
        {hasStats ? statsRow : hintLine("mt-auto")}
      </div>
    );
  } else if (layout === "card") {
    body = (
      <div className={cn("flex h-full flex-col gap-2", className)}>
        <div className="flex items-center gap-2">
          {icon ? <Icon name={icon} size={20} className={c.icon} /> : null}
          <p className={cn("min-w-0 flex-1 truncate text-sm font-medium", c.label)}>{label}</p>
          {deltaChip}
        </div>
        {valueLine("text-3xl font-semibold leading-none")}
        {sparkline("mt-1 flex-1")}
        {hintLine(hasChart ? undefined : "mt-auto")}
      </div>
    );
  } else {
    body = (
      <div className={cn("flex h-full flex-col gap-2", className)}>
        <div className="flex items-center justify-between gap-2">
          {icon ? <Icon name={icon} size={18} className={c.icon} /> : <span aria-hidden="true" />}
          {deltaChip}
        </div>
        {sparkline("flex-1")}
        <div className={hasChart ? undefined : "mt-auto"}>
          <p className={cn("text-xs", c.label)}>{label}</p>
          {valueLine("text-lg font-medium leading-tight")}
          {hintLine("mt-0.5")}
        </div>
      </div>
    );
  }

  return body;
}
