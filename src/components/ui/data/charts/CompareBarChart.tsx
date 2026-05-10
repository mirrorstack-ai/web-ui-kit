import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { ChartTooltip, type ChartTooltipRow } from "./ChartTooltip";
import {
  AXIS_PROPS,
  AXIS_TICK,
  CHART_MARGIN,
  GRID_PROPS,
} from "./chart-defaults";

export const meta: ComponentMeta = {
  name: "CompareBarChart",
  description:
    "Grouped two-bar-per-category chart comparing cost vs charge. The charge bar tints green when profitable and orange when not.",
};

export interface CompareBarChartDatum {
  label: string;
  cost: number;
  charge: number;
}

export interface CompareBarChartProps {
  data: CompareBarChartDatum[];
  /** Color for the cost bar. Defaults to error theme token. */
  costColor?: string;
  /**
   * Function returning the charge bar color per row. Default: green when
   * `charge >= cost`, orange otherwise.
   */
  chargeColor?: (d: { cost: number; charge: number }) => string;
  /** Pixel height of the chart. Defaults to 110. */
  height?: number;
  className?: string;
}

const DEFAULT_COST_COLOR = "var(--color-error)";
const PROFITABLE_COLOR = "var(--color-success)";
const UNPROFITABLE_COLOR = "var(--color-warning)";

const defaultChargeColor = (d: { cost: number; charge: number }) =>
  d.charge >= d.cost ? PROFITABLE_COLOR : UNPROFITABLE_COLOR;

function formatTick(v: number) {
  return `$${v.toFixed(2)}`;
}

export function CompareBarChart({
  data,
  costColor = DEFAULT_COST_COLOR,
  chargeColor = defaultChargeColor,
  height = 110,
  className,
}: CompareBarChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={CHART_MARGIN}
          barCategoryGap="20%"
          barGap={2}
        >
          <CartesianGrid {...GRID_PROPS} />
          <XAxis
            dataKey="label"
            tick={AXIS_TICK}
            interval="preserveStartEnd"
            {...AXIS_PROPS}
          />
          <YAxis
            tick={AXIS_TICK}
            width={40}
            tickFormatter={formatTick}
            {...AXIS_PROPS}
          />
          <Tooltip
            cursor={{ fill: "currentColor", fillOpacity: 0.05 }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const cost = payload.find((p) => p.dataKey === "cost");
              const charge = payload.find((p) => p.dataKey === "charge");
              const datum =
                (charge?.payload as
                  | { cost: number; charge: number }
                  | undefined) ??
                (cost?.payload as
                  | { cost: number; charge: number }
                  | undefined);
              const computedChargeColor =
                datum != null ? chargeColor(datum) : PROFITABLE_COLOR;
              const rows: ChartTooltipRow[] = [];
              if (cost && typeof cost.value === "number") {
                rows.push({
                  label: "Cost",
                  value: `$${cost.value.toFixed(2)}`,
                  color: costColor,
                });
              }
              if (charge && typeof charge.value === "number") {
                rows.push({
                  label: "Charge",
                  value: `$${charge.value.toFixed(2)}`,
                  color: computedChargeColor,
                });
              }
              return <ChartTooltip active title={label} rows={rows} />;
            }}
          />
          <Bar
            dataKey="cost"
            fill={costColor}
            fillOpacity={0.5}
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          />
          <Bar
            dataKey="charge"
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell
                key={entry.label}
                fill={chargeColor(entry)}
                fillOpacity={0.7}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
