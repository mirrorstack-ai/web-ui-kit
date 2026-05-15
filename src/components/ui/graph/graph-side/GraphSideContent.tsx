import { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";
import { SIDE_CARD_CLS } from "./styles";

export const meta: ComponentMeta = {
  name: "GraphSideContent",
  description:
    "Body card for a GraphSide panel — a single scrollable card containing a list of collapsible sections. Each section header dims with rounded corners on hover. The first section starts open; all sections can be toggled.",
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
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(items[0] ? [items[0].id] : []),
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
        "h-full overflow-y-auto px-1.5 pb-1.5 divide-y divide-outline-variant",
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center mt-1.5 gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-on-surface/8 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
            {isOpen && <div className="px-2 pb-2 pt-1">{item.body}</div>}
          </div>
        );
      })}
    </div>
  );
}
