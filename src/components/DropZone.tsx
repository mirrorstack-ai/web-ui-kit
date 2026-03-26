"use client";

import {
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type DragEvent,
} from "react";
import { cn } from "../utils/cn";

export interface DropZoneProps {
  /** Called with the dropped/selected files */
  onFiles: (files: File[]) => void;
  /** Accepted MIME types (e.g. "image/*", "video/*") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Custom content inside the drop zone */
  children?: ReactNode;
  /** Icon name shown when no children provided */
  icon?: string;
  /** Title text shown when no children provided */
  title?: string;
  /** Description shown when no children provided */
  description?: string;
  /** Disable the drop zone */
  disabled?: boolean;
  className?: string;
}

export function DropZone({
  onFiles,
  accept,
  multiple = true,
  maxSize,
  children,
  icon = "upload",
  title = "Drag and drop files here",
  description = "or click to browse",
  disabled = false,
  className,
}: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const filterFiles = useCallback(
    (files: File[]): File[] => {
      let filtered = files;

      if (accept) {
        const acceptedTypes = accept.split(",").map((t) => t.trim());
        filtered = filtered.filter((file) =>
          acceptedTypes.some((type) => {
            if (type.endsWith("/*")) {
              return file.type.startsWith(type.replace("/*", "/"));
            }
            return file.type === type;
          }),
        );
      }

      if (maxSize) {
        filtered = filtered.filter((file) => file.size <= maxSize);
      }

      if (!multiple && filtered.length > 1) {
        filtered = [filtered[0]];
      }

      return filtered;
    },
    [accept, maxSize, multiple],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setDragging(false);

      if (disabled) return;

      const files = filterFiles(Array.from(e.dataTransfer.files));
      if (files.length > 0) {
        onFiles(files);
      }
    },
    [disabled, filterFiles, onFiles],
  );

  const handleDragEnter = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      dragCounterRef.current++;
      setDragging(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setDragging(false);
    }
  }, []);

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        e.dataTransfer.dropEffect = "copy";
      }
    },
    [disabled],
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = filterFiles(Array.from(e.target.files ?? []));
      if (files.length > 0) {
        onFiles(files);
      }
      // Reset input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [filterFiles, onFiles],
  );

  return (
    <>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={title}
        aria-disabled={disabled}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
          dragging
            ? "border-primary bg-primary/5"
            : "border-outline-variant hover:border-primary hover:bg-primary/5",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          className,
        )}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        {children ?? (
          <>
            <span
              className={cn(
                "material-symbols-rounded text-5xl mb-3 block transition-colors",
                dragging
                  ? "text-primary"
                  : "text-on-surface-variant/40",
              )}
            >
              {icon}
            </span>
            <p className="font-medium text-on-surface mb-1">{title}</p>
            <p className="text-sm text-on-surface-variant">{description}</p>
          </>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleFileInput}
      />
    </>
  );
}
