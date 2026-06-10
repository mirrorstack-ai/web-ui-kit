import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "BottomNavItem",
  description:
    "Bottom-navigation destination: an icon with a stadium active-indicator, stacked over a label shown only while selected. Compose inside a horizontal NavigationRail.",
};

export interface BottomNavItemProps {
  /** Material symbol name for the glyph variant. */
  icon?: string;
  /** Custom 1:1 icon (app logo, avatar) rendered in a framed box instead of a
   *  glyph. The frame gets a primary border while selected. */
  customIcon?: ReactNode;
  /** Frame shape for customIcon — "square" for an app icon, "circle" for an
   *  avatar. Default `"square"`. */
  iconShape?: "square" | "circle";
  /** Accessible name; rendered under the icon while selected (see showTitle). */
  label: string;
  selected?: boolean;
  /** Whether the label may appear (only ever shown when also selected). Pass
   *  false for icon-only entries like a branding shortcut or a menu trigger. */
  showTitle?: boolean;
  onClick?: () => void;
}

export function BottomNavItem({
  icon,
  customIcon,
  iconShape = "square",
  label,
  selected = false,
  showTitle = true,
  onClick,
}: BottomNavItemProps) {
  if (isDev && !icon && !customIcon) {
    console.warn("[BottomNavItem] pass either icon or customIcon.");
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={selected ? "page" : undefined}
      // Fixed height so items don't grow/shrink (and the pill doesn't jump)
      // when a label appears. Width is a floor (min-w-16) that grows only for
      // the selected item's title — pack items with no gap so the expanding
      // label borrows the freed space instead of truncating early.
      className="flex h-14 min-w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-xl px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {customIcon ? (
        <span
          className={cn(
            // 1:1 frame (slightly larger than the glyph indicators).
            "flex h-10 w-10 items-center justify-center overflow-hidden",
            iconShape === "circle" ? "rounded-full" : "rounded-xl",
            selected && "border border-primary",
          )}
        >
          {customIcon}
        </span>
      ) : (
        <span
          className={cn(
            "flex h-8 w-12 items-center justify-center rounded-full transition-colors",
            selected && "bg-primary-container",
          )}
        >
          <Icon
            name={icon ?? ""}
            size={22}
            className={cn(
              "shrink-0",
              selected ? "text-on-primary-container" : "text-on-surface",
            )}
          />
        </span>
      )}
      {showTitle && selected && (
        <span className="max-w-20 truncate text-center text-[10px] font-medium leading-none text-on-surface">
          {label}
        </span>
      )}
    </button>
  );
}
