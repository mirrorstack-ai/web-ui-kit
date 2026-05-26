import { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";
import { SIDE_CARD_CLS } from "./styles";

export const meta: ComponentMeta = {
  name: "GraphSideContent",
  description:
    "Body card for a GraphSide panel — a single scrollable card containing a list of collapsible sections. Each section header dims with rounded corners on hover. All sections start open; each can be toggled.",
};

export interface GraphSideContentItem {
  id: string;
  title: string;
  body: ReactNode;
  /** Element rendered on the right of the title bar, sibling of the toggle. */
  trailing?: ReactNode;
}

export interface GraphSideContentProps {
  items: GraphSideContentItem[];
  /** Optional fixed content rendered above the collapsible items (no
      chevron, not toggleable). Use for a search input or other always-on
      controls. */
  prepend?: ReactNode;
  /** Class for the wrapper around `prepend`. Defaults to
      `"px-1 pt-1.5 pb-1"` (a tight inset that matches the items'
      header padding). Pass an empty string when the consumer wants
      the prepend to bleed edge-to-edge (e.g. a primary action button
      that should share the same width as the divider below it), or
      pass any other class to override entirely. The prepend slot
      itself is omitted when `prepend` is nullish, regardless. */
  prependClassName?: string;
  className?: string;
}

const DEFAULT_PREPEND_CLS = "px-1 pt-1.5 pb-1";

export function GraphSideContent({ items, prepend, prependClassName, className }: GraphSideContentProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(items.map((i) => i.id)),
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      className={cn(
        SIDE_CARD_CLS,
        "h-full overflow-y-auto [scrollbar-gutter:stable] pl-1.5 pr-0.5 pb-3 divide-y divide-outline-variant",
        className,
      )}
    >
      {prepend && (
        <div className={prependClassName ?? DEFAULT_PREPEND_CLS}>{prepend}</div>
      )}
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id}>
            <div
              className={cn(
                "flex items-center mt-1.5",
                !isOpen && "mb-1.5",
              )}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="flex-1 min-w-0 flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-on-surface/8 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon
                  name="chevron_right"
                  size={18}
                  className={cn(
                    "text-on-surface-variant transition-transform",
                    isOpen && "rotate-90",
                  )}
                />
                <span className="text-sm font-medium text-on-surface">
                  {item.title}
                </span>
              </button>
              {item.trailing && (
                <div className="shrink-0 pl-1">{item.trailing}</div>
              )}
            </div>
            {isOpen && <div className="px-2 pb-2 pt-1">{item.body}</div>}
          </div>
        );
      })}
    </div>
  );
}
