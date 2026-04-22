import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "Avatar",
  description:
    "User avatar with image, initials fallback, optional edit badge, and file-upload support",
};

export type AvatarSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<
  AvatarSize,
  { container: string; text: string; badge: string; badgeIcon: number }
> = {
  sm: { container: "w-8 h-8", text: "text-xs", badge: "w-5 h-5", badgeIcon: 12 },
  md: { container: "w-10 h-10", text: "text-sm", badge: "w-6 h-6", badgeIcon: 12 },
  lg: { container: "w-16 h-16", text: "text-xl", badge: "w-6 h-6", badgeIcon: 14 },
  xl: { container: "w-20 h-20", text: "text-2xl", badge: "w-7 h-7", badgeIcon: 14 },
};

export interface AvatarProps {
  src?: string | null;
  fallback?: string;
  size?: AvatarSize;
  editable?: boolean;
  onFileSelect?: (file: File) => void;
  accept?: string;
  square?: boolean;
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
          className={cn(
            "relative cursor-pointer p-1 -m-1 hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            radius,
          )}
        >
          {avatarContent}
          {overlay ? (
            <div
              className={cn(
                "absolute inset-1 bg-black/40 flex items-center justify-center",
                radius,
              )}
            >
              {overlay}
            </div>
          ) : (
            <div
              className={cn(
                s.badge,
                "absolute bottom-0.5 right-0.5 rounded-full bg-primary flex items-center justify-center shadow-md border-2 border-surface-container-low",
              )}
            >
              <Icon name="edit" size={s.badgeIcon} className="text-on-primary" />
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
