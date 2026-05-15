import { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";
import { SIDE_CARD_CLS } from "./styles";

export const meta: ComponentMeta = {
  name: "GraphSideContent",
  description:
    "Stack of collapsible sections for a GraphSide panel. The first item stays open and is not collapsible; subsequent items toggle with a chevron.",
};

export interface GraphSideContentItem {
  id: string;
  title: string;
  body: ReactNode;
}

export interface GraphSideContentProps {
  items: GraphSideContentItem[];
  className?: string;
}

export function GraphSideContent({ items, className }: GraphSideContentProps) {
  // Items after the first start collapsed; the first is always open and
  // has no toggle, so its id never appears in this set.
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {items.map((item, idx) => {
        const isFirst = idx === 0;
        const isOpen = isFirst || openIds.has(item.id);
        return (
          <div key={item.id} className={cn(SIDE_CARD_CLS, "overflow-hidden")}>
            {isFirst ? (
              <div className="px-3 pt-3 text-sm font-medium text-on-surface">
                {item.title}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-3 py-3 cursor-pointer hover:bg-on-surface/4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              >
                <span className="text-sm font-medium text-on-surface">
                  {item.title}
                </span>
                <Icon
                  name="chevron_right"
                  size={20}
                  className={cn(
                    "text-on-surface-variant transition-transform",
                    isOpen && "rotate-90",
                  )}
                />
              </button>
            )}
            {isOpen && (
              <div className="px-3 pb-3 pt-2 text-sm text-on-surface-variant">
                {item.body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
