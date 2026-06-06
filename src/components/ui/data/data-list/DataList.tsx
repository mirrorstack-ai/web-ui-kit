import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "DataList",
  description:
    "Compact scrollable list for NotchGrid tiles, denser than ActivityList.",
};

export interface DataListItem {
  /** Material Symbols icon name */
  icon?: string;
  /** URL for a circular avatar image (used instead of icon) */
  avatar?: string;
  title: string;
  description?: string;
  /** Trailing text such as "2d ago" or "#42" */
  trailing?: string;
  status?: "default" | "success" | "warning" | "error";
}

export interface DataListProps {
  items: DataListItem[];
  emptyIcon?: string;
  emptyLabel?: string;
  className?: string;
}

const STATUS_COLORS: Record<string, string> = {
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
};

export function DataList({
  items,
  emptyIcon,
  emptyLabel = "No items",
  className,
}: DataListProps) {
  if (isDev && items.length > 50) {
    console.warn(
      `[DataList] Received ${items.length} items. Consider paginating lists over 50 items.`,
    );
  }

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "h-full w-full flex flex-col items-center justify-center gap-1",
          className,
        )}
      >
        {emptyIcon && <Icon name={emptyIcon} size={32} className="opacity-30" />}
        <span className="text-xs opacity-40">{emptyLabel}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-full w-full overflow-y-auto [scrollbar-width:thin] [scrollbar-color:currentColor_transparent]",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-2 px-1 py-1.5 border-b border-current/5",
            index === items.length - 1 && "border-b-0",
          )}
        >
          {/* Leading: avatar or icon */}
          {item.avatar ? (
            <img
              src={item.avatar}
              alt=""
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
          ) : item.icon ? (
            <Icon name={item.icon} size={16} className="opacity-60" />
          ) : null}

          {/* Middle: title + description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              {item.status && item.status !== "default" && (
                <span
                  className="shrink-0 inline-block w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[item.status] }}
                />
              )}
              <span className="text-xs font-medium truncate">{item.title}</span>
            </div>
            {item.description && (
              <span className="block text-[10px] opacity-40 truncate">
                {item.description}
              </span>
            )}
          </div>

          {/* Trailing */}
          {item.trailing && (
            <span className="text-[10px] opacity-40 whitespace-nowrap shrink-0">
              {item.trailing}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
