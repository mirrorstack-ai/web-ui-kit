import { useCallback, useRef, useState } from "react";
import type { ReactNode, DragEvent, ChangeEvent } from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "DropZone",
  description:
    "A drag-and-drop file upload zone that accepts files via drop or click-to-browse.",
};

export interface DropZoneProps {
  /** Called with accepted files after drop or browse */
  onFiles: (files: File[]) => void;
  /** MIME types to accept, e.g. "image/*" */
  accept?: string;
  /** Allow multiple files (default true) */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Custom content to render inside the zone */
  children?: ReactNode;
  /** Material Symbols icon name (default "upload") */
  icon?: string;
  /** Title text (default "Drag and drop files here") */
  title?: string;
  /** Description text (default "or click to browse") */
  description?: string;
  /** Disable the drop zone */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

function matchesMime(file: File, accept: string): boolean {
  return accept.split(",").some((pattern) => {
    const trimmed = pattern.trim();
    if (trimmed.endsWith("/*")) {
      const prefix = trimmed.slice(0, -1);
      return file.type.startsWith(prefix);
    }
    return file.type === trimmed;
  });
}

function filterFiles(
  files: File[],
  accept?: string,
  maxSize?: number,
): File[] {
  return files.filter((file) => {
    if (accept && !matchesMime(file, accept)) {
      if (isDev) {
        console.warn(
          `[DropZone] Rejected "${file.name}": type "${file.type}" does not match "${accept}"`,
        );
      }
      return false;
    }
    if (maxSize != null && file.size > maxSize) {
      if (isDev) {
        console.warn(
          `[DropZone] Rejected "${file.name}": size ${file.size} exceeds max ${maxSize}`,
        );
      }
      return false;
    }
    return true;
  });
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
  const [dragOver, setDragOver] = useState(false);
  const dragCounter = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const files = Array.from(fileList);
      const accepted = filterFiles(
        multiple ? files : [files[0]],
        accept,
        maxSize,
      );
      if (accepted.length > 0) {
        onFiles(accepted);
      }
    },
    [onFiles, accept, multiple, maxSize],
  );

  const handleDragEnter = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      dragCounter.current += 1;
      if (dragCounter.current === 1) {
        setDragOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      dragCounter.current -= 1;
      if (dragCounter.current === 0) {
        setDragOver(false);
      }
    },
    [disabled],
  );

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    [],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setDragOver(false);
      if (disabled) return;
      handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset so the same file can be re-selected
      e.target.value = "";
    },
    [handleFiles],
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled],
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-label={title}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
        "border-outline-variant text-on-surface-variant",
        "cursor-pointer",
        dragOver && !disabled && "border-primary bg-primary/5",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        tabIndex={-1}
        aria-hidden
        data-testid="drop-zone-input"
      />

      {children ?? (
        <>
          <Icon name={icon} size={40} className="text-on-surface-variant" />
          <p className="text-sm font-medium text-on-surface">{title}</p>
          <p className="text-xs text-on-surface-variant">{description}</p>
        </>
      )}
    </div>
  );
}
