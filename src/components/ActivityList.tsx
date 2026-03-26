import { cn } from "../utils/cn";
import { Button } from "./Button";
import { Progress } from "./Progress";

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
        <Progress type="circular" size="lg" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className={cn("text-sm text-on-surface-variant text-center py-8", className)}>
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
            <span className="material-symbols-rounded text-on-surface-variant !text-lg">
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
          <Button
            variant="text"
            onClick={onLoadMore}
            loading={loadingMore}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
