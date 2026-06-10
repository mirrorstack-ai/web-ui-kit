import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { isDev } from "@/utils/env";
import { Avatar, type AvatarSize } from "@/components/ui/media/avatar/Avatar";

export const meta: ComponentMeta = {
  name: "AvatarStack",
  description:
    "Overlapping row of avatars with a +N overflow chip and an optional always-visible trailing avatar",
};

export interface AvatarStackItem {
  src?: string | null;
  fallback?: string;
  square?: boolean;
}

export interface AvatarStackProps {
  items: AvatarStackItem[];
  /**
   * Total visible slots including the overflow chip. When `items` exceeds
   * this, the first `max - 1` render and the rest collapse into a `+N` chip,
   * so the stack never grows past `max` elements (plus `trailing`).
   */
  max?: number;
  size?: AvatarSize;
  /**
   * Always rendered last and never collapsed — for a distinguished principal
   * that must stay visible, e.g. the owning org (square) at the end of a
   * member stack.
   */
  trailing?: AvatarStackItem;
  className?: string;
}

/** ~30% of the avatar diameter, so the overlap ratio holds across sizes. */
const overlapMap: Record<AvatarSize, string> = {
  sm: "-ml-2",
  md: "-ml-3",
  lg: "-ml-5",
  xl: "-ml-6",
};

/** Mirrors Avatar's square radius scale so the opaque backdrop hugs the tile. */
const squareRadiusMap: Record<AvatarSize, string> = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
};

export function AvatarStack({
  items,
  max = 4,
  size = "sm",
  trailing,
  className,
}: AvatarStackProps) {
  if (isDev && max < 2) {
    console.warn(
      "[AvatarStack] max must be at least 2 (one avatar + the overflow chip); clamping to 2.",
    );
  }
  const cap = Math.max(max, 2);
  const overflowing = items.length > cap;
  const visible = overflowing ? items.slice(0, cap - 1) : items;
  const hidden = items.length - visible.length;
  const overlap = overlapMap[size];

  if (visible.length === 0 && !trailing) return null;

  // Avatar's initials fallback is a translucent primary tint, so an
  // overlapped fallback would show the avatar beneath it; an opaque surface
  // backdrop makes every avatar occlude its left neighbor.
  const backdrop = (square?: boolean) =>
    cn("bg-surface", square ? squareRadiusMap[size] : "rounded-full");

  // Later siblings paint on top, so the stack reads left-under-right and the
  // trailing avatar always sits on top at the edge.
  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((item, i) => (
        <Avatar
          key={i}
          src={item.src}
          fallback={item.fallback}
          square={item.square}
          size={size}
          className={cn(backdrop(item.square), i > 0 && overlap)}
        />
      ))}
      {overflowing && (
        <Avatar
          fallback={hidden > 99 ? "99+" : `+${hidden}`}
          size={size}
          className={cn(backdrop(), visible.length > 0 && overlap)}
        />
      )}
      {trailing && (
        <Avatar
          src={trailing.src}
          fallback={trailing.fallback}
          square={trailing.square}
          size={size}
          className={cn(
            backdrop(trailing.square),
            (visible.length > 0 || overflowing) && overlap,
          )}
        />
      )}
    </div>
  );
}
