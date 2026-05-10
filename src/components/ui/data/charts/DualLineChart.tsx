import { useId } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
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
  name: "DualLineChart",
  description:
    "Two smooth lines on the same axes (e.g. cost vs income) with an optional gradient fill underneath the second line.",
};

export interface DualLineChartDatum {
  label: string;
  a: number;
  b: number;
}

export interface DualLineChartProps {
  data: DualLineChartDatum[];
  /** Color of line A. Defaults to error theme token (cost). */
  colorA?: string;
  /** Color of line B. Defaults to success theme token (income). */
  colorB?: string;
  /** Render a gradient fill underneath line B only. Defaults to true. */
  fillUnderB?: boolean;
  /** Pixel height of the chart. Defaults to 120. */
  height?: number;
  /** Tooltip label for line A. Defaults to "A". */
  labelA?: string;
  /** Tooltip label for line B. Defaults to "B". */
  labelB?: string;
  className?: string;
}

const DEFAULT_COLOR_A = "var(--color-error)";
const DEFAULT_COLOR_B = "var(--color-success)";

function formatTick(v: number) {
  return `$${Math.round(v)}`;
}

export function DualLineChart({
  data,
  colorA = DEFAULT_COLOR_A,
  colorB = DEFAULT_COLOR_B,
  fillUnderB = true,
  height = 120,
  labelA = "A",
  labelB = "B",
  className,
}: DualLineChartProps) {
  const reactId = useId();
  const fillId = `dual-fill-${reactId}`;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={CHART_MARGIN}>
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorB} stopOpacity={0.12} />
              <stop offset="100%" stopColor={colorB} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid {...GRID_PROPS} />
          <XAxis
            dataKey="label"
            tick={AXIS_TICK}
            interval="preserveStartEnd"
            minTickGap={24}
            {...AXIS_PROPS}
          />
          <YAxis
            tick={AXIS_TICK}
            width={40}
            tickFormatter={formatTick}
            {...AXIS_PROPS}
          />
          <Tooltip
            cursor={{
              stroke: "currentColor",
              strokeOpacity: 0.15,
              strokeWidth: 1,
            }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const a = payload.find((p) => p.dataKey === "a");
              const b = payload.find((p) => p.dataKey === "b");
              const rows: ChartTooltipRow[] = [];
              if (a && typeof a.value === "number") {
                rows.push({
                  label: labelA,
                  value: `$${Math.round(a.value)}`,
                  color: colorA,
                });
              }
              if (b && typeof b.value === "number") {
                rows.push({
                  label: labelB,
                  value: `$${Math.round(b.value)}`,
                  color: colorB,
                });
              }
              return <ChartTooltip active title={label} rows={rows} />;
            }}
          />

          {fillUnderB && (
            <Area
              type="monotone"
              dataKey="b"
              stroke="none"
              fill={`url(#${fillId})`}
              isAnimationActive={false}
            />
          )}

          <Line
            type="monotone"
            dataKey="a"
            stroke={colorA}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            dot={false}
            activeDot={{ r: 3.5, fill: colorA }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="b"
            stroke={colorB}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            dot={false}
            activeDot={{ r: 3.5, fill: colorB }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
