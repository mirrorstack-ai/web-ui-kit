import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import { Button } from "@/components/ui/actions/button/Button";
import { Progress } from "@/components/ui/feedback/progress/Progress";

export const meta: ComponentMeta = {
  name: "ActivityList",
  description:
    "Vertical list of activity/event items with loading, empty, and load-more states",
};

export interface ActivityItem {
  readonly id: string;
  readonly icon: string;
  readonly label: string;
  readonly timestamp: string;
}

export interface ActivityListProps {
  readonly items: readonly ActivityItem[];
  readonly loading?: boolean;
  readonly hasMore?: boolean;
  readonly loadingMore?: boolean;
  readonly onLoadMore?: () => void;
  readonly emptyMessage?: string;
  readonly className?: string;
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
  if (isDev) {
    if (hasMore && !onLoadMore) {
      console.warn(
        "[ActivityList] hasMore is true but onLoadMore is not provided",
      );
    }
  }

  if (loading) {
    return (
      <div className={cn("py-8 text-center", className)}>
        <Progress type="circular" size="lg" />
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
    <div className={className}>
      <div className="space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-container"
          >
            <span
              className="material-symbols-rounded text-on-surface-variant shrink-0"
              aria-hidden="true"
              style={{ fontSize: 18 }}
            >
              {item.icon}
            </span>
            <span className="text-sm font-medium text-on-surface">
              {item.label}
            </span>
            <span className="text-xs text-on-surface-variant ml-auto shrink-0">
              {item.timestamp}
            </span>
          </div>
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="mt-3 text-center">
          <Button variant="text" onClick={onLoadMore} loading={loadingMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
