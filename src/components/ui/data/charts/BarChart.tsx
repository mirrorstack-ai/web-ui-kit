import { useId } from "react";
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
import { ChartTooltip } from "./ChartTooltip";
import {
  AXIS_PROPS,
  AXIS_TICK,
  CHART_MARGIN,
  GRID_PROPS,
  formatChartValue,
} from "./chart-defaults";

export const meta: ComponentMeta = {
  name: "BarChart",
  description:
    "Vertical bar chart with optional highlighted last bar (gradient + 1.0 opacity, others 0.35). Used for trend visualizations.",
};

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartDatum[];
  /** Bar color. Defaults to the primary theme token. */
  color?: string;
  /** Pixel height of the chart. Defaults to 100. */
  height?: number;
  /** Highlight the last bar with full opacity + gradient; others fade to 0.35. Defaults to false. */
  highlightLast?: boolean;
  /** Optional prefix used in Y axis + tooltip labels (e.g. "$"). */
  unitPrefix?: string;
  className?: string;
}

const DEFAULT_COLOR = "var(--color-primary)";

export function BarChart({
  data,
  color = DEFAULT_COLOR,
  height = 100,
  highlightLast = false,
  unitPrefix = "",
  className,
}: BarChartProps) {
  const reactId = useId();
  const gradientId = `bar-grad-${reactId}`;
  const lastIndex = data.length - 1;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={CHART_MARGIN}
          barCategoryGap="50%"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.9} />
              <stop offset="100%" stopColor={color} stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid {...GRID_PROPS} />
          <XAxis
            dataKey="label"
            tick={AXIS_TICK}
            interval="preserveStartEnd"
            {...AXIS_PROPS}
          />
          <YAxis
            tick={AXIS_TICK}
            width={36}
            tickFormatter={(v: number) => formatChartValue(v, unitPrefix)}
            {...AXIS_PROPS}
          />
          <Tooltip
            cursor={{ fill: "currentColor", fillOpacity: 0.05 }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const v = payload[0].value as number;
              return (
                <ChartTooltip
                  active
                  title={label}
                  rows={[
                    {
                      label: "Value",
                      value: formatChartValue(v, unitPrefix),
                      color,
                    },
                  ]}
                />
              );
            }}
          />
          <Bar dataKey="value" radius={[3, 3, 0, 0]} isAnimationActive={false}>
            {data.map((entry, i) => {
              const isLast = highlightLast && i === lastIndex;
              return (
                <Cell
                  key={entry.label}
                  fill={isLast ? `url(#${gradientId})` : color}
                  fillOpacity={highlightLast ? (isLast ? 1 : 0.35) : 1}
                />
              );
            })}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
