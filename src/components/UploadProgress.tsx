"use client";

import { cn } from "../utils/cn";
import { formatBytes } from "../utils/formatBytes";

export type UploadItemStatus =
  | "pending"
  | "uploading"
  | "confirming"
  | "ready"
  | "failed";

export interface UploadItem {
  /** Unique identifier for this upload */
  id: string;
  /** File name */
  name: string;
  /** File size in bytes */
  size?: number;
  /** Current status */
  status: UploadItemStatus;
  /** Upload progress 0-100 (for uploading status) */
  progress: number;
  /** Error message (for failed status) */
  error?: string;
}

export interface UploadProgressProps {
  /** List of upload items */
  items: UploadItem[];
  /** Called when user cancels a specific upload */
  onCancel?: (id: string) => void;
  /** Called when user retries a failed upload */
  onRetry?: (id: string) => void;
  /** Called when user dismisses the entire panel */
  onDismiss?: () => void;
  /** Title text */
  title?: string;
  className?: string;
}

const statusIcons: Record<UploadItemStatus, string> = {
  pending: "schedule",
  uploading: "upload",
  confirming: "sync",
  ready: "check_circle",
  failed: "error",
};

const statusColors: Record<UploadItemStatus, string> = {
  pending: "text-on-surface-variant",
  uploading: "text-primary",
  confirming: "text-primary",
  ready: "text-success",
  failed: "text-error",
};

const statusLabels: Record<UploadItemStatus, string> = {
  pending: "Waiting...",
  uploading: "Uploading",
  confirming: "Processing...",
  ready: "Complete",
  failed: "Failed",
};

export function UploadProgress({
  items,
  onCancel,
  onRetry,
  onDismiss,
  title,
  className,
}: UploadProgressProps) {
  if (items.length === 0) return null;

  const doneCount = items.filter(
    (i) => i.status === "ready" || i.status === "failed",
  ).length;
  const allDone = doneCount === items.length;
  const readyCount = items.filter((i) => i.status === "ready").length;
  const failedCount = items.filter((i) => i.status === "failed").length;

  const defaultTitle = allDone
    ? failedCount > 0
      ? `${readyCount}/${items.length} uploaded, ${failedCount} failed`
      : `${readyCount} uploaded successfully`
    : `Uploading ${doneCount}/${items.length} files`;

  return (
    <div
      className={cn(
        "rounded-2xl bg-surface-container-low border border-outline-variant p-4 space-y-3",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-on-surface">
          {title ?? defaultTitle}
        </p>
        {allDone && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-sm text-primary hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        )}
      </div>

      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <span
            className={cn(
              "material-symbols-rounded text-lg shrink-0",
              statusColors[item.status],
            )}
          >
            {statusIcons[item.status]}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-on-surface truncate">{item.name}</p>
              {item.size != null && (
                <span className="text-xs text-on-surface-variant shrink-0">
                  {formatBytes(item.size)}
                </span>
              )}
            </div>
            <div className="mt-1">
              {item.status === "uploading" ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full bg-primary/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-200 ease-out"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-on-surface-variant tabular-nums">
                    {item.progress}%
                  </span>
                </div>
              ) : item.status === "confirming" ? (
                <div className="h-1 rounded-full bg-primary/20 overflow-hidden">
                  <div className="h-full rounded-full bg-primary animate-pulse w-full" />
                </div>
              ) : item.status === "failed" ? (
                <p className="text-xs text-error">
                  {item.error ?? "Upload failed"}
                </p>
              ) : (
                <p
                  className={cn(
                    "text-xs",
                    statusColors[item.status],
                  )}
                >
                  {statusLabels[item.status]}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {item.status === "uploading" && onCancel && (
              <button
                type="button"
                onClick={() => onCancel(item.id)}
                aria-label={`Cancel upload of ${item.name}`}
                className="h-7 w-7 rounded-md inline-flex items-center justify-center text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: 18 }}
                >
                  close
                </span>
              </button>
            )}
            {item.status === "failed" && onRetry && (
              <button
                type="button"
                onClick={() => onRetry(item.id)}
                aria-label={`Retry upload of ${item.name}`}
                className="h-7 w-7 rounded-md inline-flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: 18 }}
                >
                  refresh
                </span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
