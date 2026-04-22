import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Button } from "@/components/ui/actions/button/Button";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Progress } from "@/components/ui/feedback/progress/Progress";

export const meta: ComponentMeta = {
  name: "ActivityList",
  description:
    "Vertical list of activity/event items with loading, empty, and load-more states",
};

export interface ActivityItem {
  id: string;
  icon: string;
  label: string;
  timestamp: string;
}

export interface ActivityListProps {
  items: ActivityItem[];
  loading?: boolean;
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  emptyMessage?: string;
  className?: string;
}

export function ActivityList({
  items,
  loading = false,
  hasMore = false,
  loadingMore = false,
  onLoadMore,
  emptyMessage = "No activity recorded yet.",
  className,
}: ActivityListProps) {
  if (loading) {
    return (
      <div className={cn("py-8 text-center", className)}>
        <Progress type="circular" size="sm" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p
        className={cn(
          "text-sm text-on-surface-variant text-center py-8",
          className,
        )}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-container"
          >
            <Icon
              name={item.icon}
              size={20}
              className="text-on-surface-variant shrink-0"
            />
            <span className="text-sm font-medium text-on-surface">
              {item.label}
            </span>
            <span className="text-xs text-on-surface-variant ml-auto shrink-0">
              {item.timestamp}
            </span>
          </div>
      ))}

      {hasMore && onLoadMore && (
        <div className="mt-3 text-center">
          <Button variant="text" size="sm" onClick={onLoadMore} loading={loadingMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
