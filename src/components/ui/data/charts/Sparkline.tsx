import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Sparkline",
  description:
    "Compact inline trend line with a soft gradient fill — used in dense tables where a single number wants context.",
};

export interface SparklineProps {
  values: number[];
  /** Stroke color. Defaults to the primary theme token. */
  color?: string;
  /** Pixel width. Defaults to 80. */
  width?: number;
  /** Pixel height. Defaults to 32. */
  height?: number;
  className?: string;
}

const DEFAULT_COLOR = "var(--color-primary)";

export function Sparkline({
  values,
  color = DEFAULT_COLOR,
  width = 80,
  height = 32,
  className,
}: SparklineProps) {
  const reactId = useId();
  const fillId = `spark-fill-${reactId}`;

  if (values.length < 2) {
    return (
      <div
        className={cn("inline-block shrink-0", className)}
        style={{ width, height }}
        aria-hidden
      />
    );
  }

  const data = values.map((value, i) => ({ i, value }));

  return (
    <div
      className={cn("inline-block shrink-0", className)}
      style={{ width, height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 2, right: 0, bottom: 2, left: 0 }}
        >
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={`url(#${fillId})`}
            isAnimationActive={false}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
