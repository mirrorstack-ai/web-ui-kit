import { useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Sparkline",
  description:
    "A tiny bar chart that fills its container — give it a height (a flex parent, `h-full`, etc.) and bars grow from the bottom. Hovering a bar shows its (labelled) value in a chip portaled to the body so it isn't clipped.",
};

/** A bar: a height as a percentage (0–100), optionally with a `label` for the
 *  hover chip (defaults to the value). */
export type SparklinePoint = number | { value: number; label?: string };

const pointValue = (p: SparklinePoint) => (typeof p === "number" ? p : p.value);
const pointLabel = (p: SparklinePoint) =>
  typeof p === "number" ? String(p) : (p.label ?? String(p.value));
const clampPct = (n: number) => Math.max(0, Math.min(100, n));

export interface SparklineProps {
  /** Bars, as heights `0–100` (or `{ value, label }` for a labelled hover chip). */
  data: ReadonlyArray<SparklinePoint>;
  /** Tailwind classes for the bars. Default `"bg-primary/30"`. */
  barClassName?: string;
  /** Classes for the bar under the pointer. Defaults to {@link barClassName}. */
  barActiveClassName?: string;
  /** Classes for the floating hover chip. Default `"bg-on-surface text-surface"`. */
  chipClassName?: string;
  className?: string;
}

export function Sparkline({
  data,
  barClassName = "bg-primary/30",
  barActiveClassName,
  chipClassName,
  className,
}: SparklineProps) {
  // The chip is portaled to <body> so a clipping/overflow-hidden ancestor
  // (e.g. a NotchGrid cell) can't cut it off — it floats above the bar.
  const [hover, setHover] = useState<{ index: number; rect: DOMRect } | null>(null);
  if (data.length === 0) return null;
  const hovered = hover != null ? data[hover.index] : undefined;
  const chip =
    hovered !== undefined && typeof document !== "undefined"
      ? createPortal(
          <span
            className={cn(
              "pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium shadow-md",
              chipClassName ?? "bg-on-surface text-surface",
            )}
            style={{ left: hover!.rect.left + hover!.rect.width / 2, top: hover!.rect.top - 4 }}
          >
            {pointLabel(hovered)}
          </span>,
          document.body,
        )
      : null;

  return (
    <div
      className={cn("flex items-end gap-0.5", className)}
      aria-hidden="true"
      onPointerLeave={() => setHover(null)}
    >
      {data.map((point, i) => (
        <div
          key={i}
          title={pointLabel(point)}
          onPointerEnter={(e) =>
            setHover({ index: i, rect: e.currentTarget.getBoundingClientRect() })
          }
          className={cn(
            "min-h-px flex-1 cursor-default rounded transition-colors",
            i === hover?.index ? (barActiveClassName ?? barClassName) : barClassName,
          )}
          style={{ height: `${clampPct(pointValue(point))}%` }}
        />
      ))}
      {chip}
    </div>
  );
}
