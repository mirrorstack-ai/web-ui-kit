import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface ChartTooltipRow {
  label: string;
  value: ReactNode;
  color?: string;
}

export interface ChartTooltipProps {
  active?: boolean;
  title?: ReactNode;
  rows: ChartTooltipRow[];
  className?: string;
}

/**
 * Shared tooltip surface used by every chart in the kit. Matches
 * the surface-container + outline-variant card treatment from the
 * web-applications hand-rolled charts.
 */
export function ChartTooltip({
  active,
  title,
  rows,
  className,
}: ChartTooltipProps) {
  if (!active || rows.length === 0) return null;
  return (
    <div
      className={cn(
        "pointer-events-none rounded-lg border border-outline-variant/40 bg-surface-container px-2.5 py-1.5 text-xs shadow-md",
        className,
      )}
    >
      {title != null && (
        <p className="text-on-surface-variant mb-0.5">{title}</p>
      )}
      {rows.map((row, i) => (
        <p
          key={`${row.label}-${i}`}
          className={cn(
            "flex items-center gap-1.5",
            i === 0 ? "font-medium text-on-surface" : "text-on-surface-variant/80",
          )}
        >
          {row.color && (
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full shrink-0"
              style={{ background: row.color }}
            />
          )}
          <span>{row.label}</span>
          <span className="ml-auto tabular-nums">{row.value}</span>
        </p>
      ))}
    </div>
  );
}
