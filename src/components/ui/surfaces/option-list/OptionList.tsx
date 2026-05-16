import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "OptionList",
  description:
    "Floating popover that lists named options with optional descriptions. Used as a wide query-suggestion dropdown beside narrow inputs. Consumer owns positioning, open state, and click-outside.",
};

export interface OptionListItem {
  /** The string value passed back to `onSelect`. */
  value: string;
  /** Display label. Falls back to `value` if absent. */
  label?: ReactNode;
  /** Muted text rendered to the right of `label`. */
  description?: string;
}

export interface OptionListProps {
  items: OptionListItem[];
  onSelect: (item: OptionListItem) => void;
  /** Optional header text above the list. */
  title?: string;
  /** Optional info icon shown next to the title (decorative; no click handler). */
  showInfo?: boolean;
  /**
   * Index of the highlighted item (for keyboard navigation by the consumer).
   * Pass `-1` for none. Defaults to `-1`.
   */
  activeIndex?: number;
  className?: string;
}

export function OptionList({
  items,
  onSelect,
  title,
  showInfo = false,
  activeIndex = -1,
  className,
}: OptionListProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-outline-variant bg-surface-container-low shadow-lg overflow-hidden",
        className,
      )}
      role="listbox"
    >
      {title && (
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-outline-variant">
          <span className="text-sm font-medium text-on-surface">{title}</span>
          {showInfo && (
            <Icon
              name="info"
              size={16}
              className="text-on-surface-variant"
              aria-hidden
            />
          )}
        </div>
      )}
      <ul className="py-1">
        {items.length === 0 ? (
          <li
            role="option"
            aria-selected={false}
            className="px-3 py-1.5 text-sm text-on-surface-variant italic"
          >
            No matches
          </li>
        ) : (
          items.map((item, i) => {
            const highlighted = i === activeIndex;
            return (
              <li
                key={item.value}
                role="option"
                aria-selected={highlighted}
                onMouseDown={(e) => {
                  // Prevent the trigger input from losing focus before we
                  // can fire onSelect.
                  e.preventDefault();
                  onSelect(item);
                }}
                className={cn(
                  "flex items-baseline gap-2 px-3 py-1.5 text-sm cursor-pointer",
                  highlighted
                    ? "bg-on-surface/8 text-on-surface"
                    : "text-on-surface hover:bg-on-surface/8",
                )}
              >
                <span className="font-medium shrink-0">
                  {item.label ?? item.value}
                </span>
                {item.description && (
                  <span className="text-xs text-on-surface-variant truncate">
                    {item.description}
                  </span>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
