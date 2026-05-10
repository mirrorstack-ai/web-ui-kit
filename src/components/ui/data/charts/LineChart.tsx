import { useId } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceLine,
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
  formatChartValue,
} from "./chart-defaults";

export const meta: ComponentMeta = {
  name: "LineChart",
  description:
    "Smooth line chart with optional gradient area, secondary dashed overlay line, threshold band, and themed hover tooltip.",
};

export interface LineChartDatum {
  label: string;
  value: number;
  overlay?: number;
}

export interface LineChartProps {
  data: LineChartDatum[];
  /** Stroke color of the main line. Defaults to the primary theme token. */
  color?: string;
  /** Stroke color of the optional dashed overlay line. */
  overlayColor?: string;
  /** Tooltip label for the overlay series. Defaults to "Overlay". */
  overlayLabel?: string;
  /** Pixel height of the chart. Defaults to 120. */
  height?: number;
  /** Suffix appended in tooltip + Y axis labels (e.g. "ms", "%"). */
  unit?: string;
  /** Render the gradient fill underneath the main line. Defaults to true. */
  showArea?: boolean;
  /** Y-value for the dashed warning threshold line + tinted band above it. */
  thresholdY?: number;
  /** Use Recharts monotone curve interpolation. Defaults to true. */
  smooth?: boolean;
  className?: string;
}

const DEFAULT_COLOR = "var(--color-primary)";
const DEFAULT_OVERLAY_COLOR = "var(--color-on-surface-variant)";
const THRESHOLD_COLOR = "var(--color-error)";

export function LineChart({
  data,
  color = DEFAULT_COLOR,
  overlayColor = DEFAULT_OVERLAY_COLOR,
  overlayLabel = "Overlay",
  height = 120,
  unit = "",
  showArea = true,
  thresholdY,
  smooth = true,
  className,
}: LineChartProps) {
  const reactId = useId();
  const fillId = `line-fill-${reactId}`;
  const thresholdFillId = `line-threshold-${reactId}`;
  const hasOverlay = data.some((d) => typeof d.overlay === "number");
  const curveType = smooth ? "monotone" : "linear";

  const allValues = data.flatMap((d) =>
    typeof d.overlay === "number" ? [d.value, d.overlay] : [d.value],
  );
  const dataMax = allValues.length ? Math.max(...allValues) : 1;
  const yMax = dataMax * 1.15 || 1;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={CHART_MARGIN}>
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.18} />
              <stop offset="100%" stopColor={color} stopOpacity={0.01} />
            </linearGradient>
            {thresholdY != null && (
              <linearGradient id={thresholdFillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={THRESHOLD_COLOR} stopOpacity={0.2} />
                <stop offset="100%" stopColor={THRESHOLD_COLOR} stopOpacity={0.02} />
              </linearGradient>
            )}
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
            domain={[0, yMax]}
            width={36}
            tickFormatter={(v: number) => formatChartValue(v, "", unit)}
            {...AXIS_PROPS}
          />

          {thresholdY != null && showArea && (
            <ReferenceArea
              y1={thresholdY}
              y2={yMax}
              fill={`url(#${thresholdFillId})`}
              ifOverflow="extendDomain"
            />
          )}
          {thresholdY != null && (
            <ReferenceLine
              y={thresholdY}
              stroke={THRESHOLD_COLOR}
              strokeOpacity={0.4}
              strokeDasharray="4 3"
            />
          )}

          {showArea && (
            <Area
              type={curveType}
              dataKey="value"
              stroke="none"
              fill={`url(#${fillId})`}
              isAnimationActive={false}
            />
          )}

          {hasOverlay && (
            <Line
              type={curveType}
              dataKey="overlay"
              stroke={overlayColor}
              strokeOpacity={0.6}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={false}
              activeDot={{ r: 3, fill: overlayColor, fillOpacity: 0.85 }}
              isAnimationActive={false}
              connectNulls
            />
          )}

          <Line
            type={curveType}
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            dot={false}
            activeDot={{ r: 3.5, fill: color }}
            isAnimationActive={false}
          />

          <Tooltip
            cursor={{
              stroke: "currentColor",
              strokeOpacity: 0.15,
              strokeWidth: 1,
            }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const main = payload.find((p) => p.dataKey === "value");
              const overlay = payload.find((p) => p.dataKey === "overlay");
              const rows: ChartTooltipRow[] = [];
              if (main && typeof main.value === "number") {
                rows.push({
                  label: "Value",
                  value: formatChartValue(main.value, "", unit),
                  color,
                });
              }
              if (overlay && typeof overlay.value === "number") {
                rows.push({
                  label: overlayLabel,
                  value: formatChartValue(overlay.value, "", unit),
                  color: overlayColor,
                });
              }
              return <ChartTooltip active title={label} rows={rows} />;
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
