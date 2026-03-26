"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";

type AvatarSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<AvatarSize, { container: string; text: string; badge: string; badgeIcon: string }> = {
  sm: { container: "w-8 h-8", text: "text-xs", badge: "w-5 h-5", badgeIcon: "!text-xs" },
  md: { container: "w-10 h-10", text: "text-sm", badge: "w-6 h-6", badgeIcon: "!text-xs" },
  lg: { container: "w-16 h-16", text: "text-xl", badge: "w-6 h-6", badgeIcon: "!text-sm" },
  xl: { container: "w-20 h-20", text: "text-2xl", badge: "w-7 h-7", badgeIcon: "!text-sm" },
};

export interface AvatarProps {
  /** Image source URL */
  src?: string | null;
  /** Fallback text — first character is used as initials */
  fallback?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Show edit badge and enable file upload on click */
  editable?: boolean;
  /** Called with the selected File when the user picks an image */
  onFileSelect?: (file: File) => void;
  /** Accepted file types */
  accept?: string;
  /** Use square shape with rounded corners instead of circle */
  square?: boolean;
  /** Overlay content shown over the avatar (e.g. loading spinner) */
  overlay?: ReactNode;
  className?: string;
}

export function Avatar({
  src,
  fallback = "U",
  size = "md",
  editable = false,
  onFileSelect,
  accept = "image/jpeg,image/png,image/gif,image/webp",
  square = false,
  overlay,
  className,
}: AvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const s = sizeMap[size];
  const initial = fallback.charAt(0).toUpperCase();
  const radius = square ? "rounded-2xl rounded-br-3xl" : "rounded-full";

  const handleClick = () => {
    if (editable) fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect?.(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const avatarContent = src ? (
    <img
      src={src}
      alt=""
      className={cn(s.container, radius, "object-cover border-2 border-primary")}
    />
  ) : (
    <div
      className={cn(
        s.container,
        radius,
        "bg-primary/20 flex items-center justify-center border-2 border-primary",
      )}
    >
      <span className={cn("font-bold text-primary", s.text)}>{initial}</span>
    </div>
  );

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      {editable ? (
        <button
          type="button"
          onClick={handleClick}
          className={cn("relative cursor-pointer p-1 -m-1 hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", radius)}
        >
          {avatarContent}
          {overlay ? (
            <div className={cn("absolute inset-1 bg-black/40 flex items-center justify-center", radius)}>
              {overlay}
            </div>
          ) : (
            <div
              className={cn(
                s.badge,
                "absolute bottom-0.5 right-0.5 rounded-full bg-primary flex items-center justify-center shadow-md border-2 border-surface-container-low",
              )}
            >
              <span
                className={cn(
                  "material-symbols-rounded text-on-primary",
                  s.badgeIcon,
                )}
              >
                edit
              </span>
            </div>
          )}
        </button>
      ) : (
        avatarContent
      )}

      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      )}
    </div>
  );
}
