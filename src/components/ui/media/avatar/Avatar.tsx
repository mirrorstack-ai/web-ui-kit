import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "Avatar",
  description:
    "User avatar with image, initials fallback, optional edit badge, and file-upload support",
};

export type AvatarSize = "sm" | "md" | "lg" | "xl";

interface SizeSpec {
  container: string;
  /** [1-char, 2-char, 3-char] text size class — narrower as char count grows. */
  text: [string, string, string];
  badge: string;
  badgeIcon: number;
  squareRadius: string;
  squareBadgeRadius: string;
}

const sizeMap: Record<AvatarSize, SizeSpec> = {
  sm: {
    container: "w-8 h-8",
    text: ["text-xs", "text-[10px]", "text-[9px]"],
    badge: "w-5 h-5",
    badgeIcon: 12,
    squareRadius: "rounded-lg",
    squareBadgeRadius: "rounded-lg rounded-br-xl",
  },
  md: {
    container: "w-10 h-10",
    text: ["text-sm", "text-xs", "text-[11px]"],
    badge: "w-6 h-6",
    badgeIcon: 12,
    squareRadius: "rounded-xl",
    squareBadgeRadius: "rounded-xl rounded-br-2xl",
  },
  lg: {
    container: "w-16 h-16",
    text: ["text-xl", "text-base", "text-sm"],
    badge: "w-6 h-6",
    badgeIcon: 14,
    squareRadius: "rounded-2xl",
    squareBadgeRadius: "rounded-2xl rounded-br-3xl",
  },
  xl: {
    container: "w-20 h-20",
    text: ["text-2xl", "text-xl", "text-lg"],
    badge: "w-7 h-7",
    badgeIcon: 14,
    squareRadius: "rounded-3xl",
    squareBadgeRadius: "rounded-3xl rounded-br-[2rem]",
  },
};

export interface AvatarProps {
  src?: string | null;
  fallback?: string;
  size?: AvatarSize;
  editable?: boolean;
  onFileSelect?: (file: File) => void;
  accept?: string;
  square?: boolean;
  /**
   * Paint an opaque surface backdrop behind the avatar. The initials
   * fallback is a translucent primary tint, so overlapped avatars (e.g. in
   * an AvatarStack) need this to fully occlude what's beneath them.
   */
  opaque?: boolean;
  /**
   * Drop the decorative frame — the primary tint background and the primary
   * border — leaving only the normalized fixed-size box. For using the avatar
   * as a bare, consistently-sized slot for a brand logo (`src`) or a centered
   * icon (`overlay`), e.g. a leading glyph beside a page heading. Images fit
   * with object-contain (not cropped) in this mode.
   */
  plain?: boolean;
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
  opaque = false,
  plain = false,
  overlay,
  className,
}: AvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgFailed, setImgFailed] = useState(false);
  useEffect(() => setImgFailed(false), [src]);
  const s = sizeMap[size];
  // Show up to 3 chars of the fallback, uppercased. Empty string falls back
  // to the prop default "U" via destructuring, so initials is always at
  // least length 1 unless the consumer explicitly passed "".
  const initials = fallback.slice(0, 3).toUpperCase();
  const textSize = s.text[Math.min(Math.max(initials.length, 1), 3) - 1];
  // Larger bottom-right radius only when editable+square (to accommodate the edit badge)
  const radius = square
    ? editable
      ? s.squareBadgeRadius
      : s.squareRadius
    : "rounded-full";

  const handleClick = () => {
    if (editable) fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect?.(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const showInitial = !overlay;

  const avatarContent = src && !imgFailed ? (
    <img
      src={src}
      alt=""
      onError={() => setImgFailed(true)}
      className={cn(
        s.container,
        radius,
        plain ? "object-contain" : "object-cover border-2 border-primary",
      )}
    />
  ) : (
    <div
      className={cn(
        s.container,
        radius,
        "flex items-center justify-center",
        !plain && "bg-primary/20 border-2 border-primary",
      )}
    >
      {showInitial && initials && (
        <span className={cn("font-bold text-primary", textSize)}>{initials}</span>
      )}
    </div>
  );

  const overlayNode = overlay ? (
    <div
      className={cn(
        "absolute inset-1 flex items-center justify-center pointer-events-none",
        radius,
      )}
    >
      {overlay}
    </div>
  ) : null;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0",
        opaque && cn("bg-surface", radius),
        className,
      )}
    >
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
          {overlayNode ?? (
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
        <div className="relative">
          {avatarContent}
          {overlayNode}
        </div>
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
