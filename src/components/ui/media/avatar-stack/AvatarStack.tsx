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
  /** Stable identity for list reconciliation; falls back to the index. */
  id?: string;
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
  /**
   * Total items the stack represents when `items` is a server-capped
   * preview — the overflow chip then shows `total - visible` instead of
   * `items.length - visible`. Defaults to `items.length`; values below it
   * are clamped up.
   */
  total?: number;
  className?: string;
}

/** ~30% of the avatar diameter, so the overlap ratio holds across sizes. */
const overlapMap: Record<AvatarSize, string> = {
  sm: "-ml-2",
  md: "-ml-3",
  lg: "-ml-5",
  xl: "-ml-6",
};

export function AvatarStack({
  items,
  max = 4,
  size = "sm",
  trailing,
  total,
  className,
}: AvatarStackProps) {
  if (isDev && max < 2) {
    console.warn(
      "[AvatarStack] max must be at least 2 (one avatar + the overflow chip); clamping to 2.",
    );
  }
  const cap = Math.max(max, 2);
  const represented = Math.max(total ?? 0, items.length);
  const overflowing = represented > cap;
  const visible = overflowing ? items.slice(0, cap - 1) : items;
  const hidden = represented - visible.length;
  const overlap = overlapMap[size];

  const rendered: AvatarStackItem[] = [
    ...visible,
    ...(overflowing ? [{ fallback: hidden > 99 ? "99+" : `+${hidden}` }] : []),
    ...(trailing ? [trailing] : []),
  ];

  if (rendered.length === 0) return null;

  // `opaque` makes each avatar occlude its left neighbor (the initials
  // fallback is translucent). Later siblings paint on top, so the stack
  // reads left-under-right and the trailing avatar sits on top at the edge.
  return (
    <div className={cn("flex items-center", className)}>
      {rendered.map((item, i) => (
        <Avatar
          key={item.id ?? i}
          src={item.src}
          fallback={item.fallback}
          square={item.square}
          size={size}
          opaque
          className={cn(i > 0 && overlap)}
        />
      ))}
    </div>
  );
}
