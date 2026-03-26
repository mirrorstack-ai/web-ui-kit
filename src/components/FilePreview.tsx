"use client";

import { cn } from "../utils/cn";
import { formatBytes } from "../utils/formatBytes";

export type FilePreviewType = "image" | "video" | "audio" | "document" | "unknown";

export interface FilePreviewProps {
  /** File name */
  name: string;
  /** File size in bytes */
  size?: number;
  /** MIME type (used to determine preview type) */
  mimeType?: string;
  /** Preview URL (for images and videos) */
  previewUrl?: string;
  /** Explicit preview type (overrides MIME type detection) */
  type?: FilePreviewType;
  /** Show a remove/close button */
  onRemove?: () => void;
  className?: string;
}

function detectType(mimeType?: string): FilePreviewType {
  if (!mimeType) return "unknown";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (
    mimeType.startsWith("application/pdf") ||
    mimeType.startsWith("text/") ||
    mimeType.includes("document") ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("presentation")
  ) {
    return "document";
  }
  return "unknown";
}

const typeIcons: Record<FilePreviewType, string> = {
  image: "image",
  video: "movie",
  audio: "audio_file",
  document: "description",
  unknown: "insert_drive_file",
};

export function FilePreview({
  name,
  size,
  mimeType,
  previewUrl,
  type: explicitType,
  onRemove,
  className,
}: FilePreviewProps) {
  const fileType = explicitType ?? detectType(mimeType);
  const iconName = typeIcons[fileType];
  const showImagePreview = fileType === "image" && previewUrl;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 bg-surface-container rounded-lg",
        className,
      )}
    >
      {showImagePreview ? (
        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-surface-container-high">
          <img
            src={previewUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <span className="material-symbols-rounded text-2xl text-on-surface-variant shrink-0">
          {iconName}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-on-surface text-sm truncate">
          {name}
        </p>
        {size != null && (
          <p className="text-xs text-on-surface-variant">
            {formatBytes(size)}
          </p>
        )}
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="h-8 w-8 rounded-lg inline-flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/8 transition-colors shrink-0 cursor-pointer"
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 20 }}
          >
            close
          </span>
        </button>
      )}
    </div>
  );
}
