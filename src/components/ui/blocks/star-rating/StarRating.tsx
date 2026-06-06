import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "StarRating",
  description:
    "A star-rating display sized for a NotchGrid cell — 0-5 stars with half-star precision, optional label and review count.",
};

export interface StarRatingProps {
  /** Rating value from 0 to 5, supports 0.5 steps. */
  value: number;
  /** Number of reviews / ratings. */
  count?: number;
  /** Small label shown above the stars. */
  label?: string;
  className?: string;
}

/** Clamp to 0-5 and round to nearest 0.5. */
function normalise(raw: number): number {
  const clamped = Math.min(5, Math.max(0, raw));
  return Math.round(clamped * 2) / 2;
}

function Stars({ value }: { value: number }) {
  return (
    <span aria-hidden className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const threshold = i + 1;
        if (value >= threshold) {
          return (
            <Icon key={i} name="star" size={16} fill className="text-warning" />
          );
        }
        if (value >= threshold - 0.5) {
          return (
            <Icon
              key={i}
              name="star_half"
              size={16}
              fill
              className="text-warning"
            />
          );
        }
        return <Icon key={i} name="star" size={16} className="opacity-20" />;
      })}
    </span>
  );
}

export function StarRating({
  value: rawValue,
  count,
  label,
  className,
}: StarRatingProps) {
  if (isDev && (rawValue < 0 || rawValue > 5)) {
    console.warn(
      `[StarRating] value ${rawValue} is outside the 0-5 range and will be clamped`,
    );
  }

  const value = normalise(rawValue);

  return (
    <div
      className={cn("flex h-full w-full flex-col justify-between p-1", className)}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {label != null && (
        <span className="truncate text-xs opacity-60">{label}</span>
      )}

      <Stars value={value} />

      <span className="flex items-baseline gap-1">
        <span className="text-sm font-semibold">{value.toFixed(1)}</span>
        {count != null && (
          <span className="text-[10px] opacity-40">
            ({count.toLocaleString()} {count === 1 ? "review" : "reviews"})
          </span>
        )}
      </span>
    </div>
  );
}
