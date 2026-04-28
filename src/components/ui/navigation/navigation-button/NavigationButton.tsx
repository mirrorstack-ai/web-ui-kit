import { type ButtonHTMLAttributes, type ReactNode, useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "NavigationButton",
  description:
    "Navigation rail button with icon, hover-expand label animation, and selected state",
};

export type NavigationButtonVariant = "primary" | "secondary" | "tertiary";

export interface NavigationButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon?: string;
  customIcon?: ReactNode;
  label: string;
  selected?: boolean;
  variant?: NavigationButtonVariant;
  disableHoverExpand?: boolean;
}

/** Shape styles: resting shape, and a smaller radius on hover for the morph effect. */
const shapeStyles: Record<NavigationButtonVariant, Record<"selected" | "unselected", { rest: string; hover: string }>> = {
  primary: {
    selected: { rest: "rounded-full cursor-default", hover: "rounded-full cursor-default" },
    unselected: { rest: "cursor-pointer", hover: "rounded-lg cursor-pointer" },
  },
  secondary: {
    selected: { rest: "rounded-full cursor-default", hover: "rounded-full cursor-default" },
    unselected: { rest: "rounded-xl cursor-pointer", hover: "rounded-lg cursor-pointer" },
  },
  tertiary: {
    selected: { rest: "rounded-xl cursor-default", hover: "rounded-xl cursor-default" },
    unselected: { rest: "rounded-xl cursor-pointer", hover: "rounded-lg cursor-pointer" },
  },
};

/** Styles that only apply when NOT hovered (bg, border). */
const bgStyles: Record<NavigationButtonVariant, Record<"selected" | "unselected", string>> = {
  primary: {
    selected: "bg-primary-container",
    unselected: "",
  },
  secondary: {
    selected: "bg-primary-container",
    unselected: "",
  },
  tertiary: {
    selected: "bg-tertiary-container",
    unselected: "border border-tertiary",
  },
};

const defaultHoverBg = {
  selected: "rounded-full pl-12 pr-4 py-2 -left-1 bg-primary-container",
  unselected: "rounded-full pl-12 pr-4 py-2 -left-1 bg-secondary-container",
};
const hoverBgStyles: Record<NavigationButtonVariant, Record<"selected" | "unselected", string>> = {
  primary: defaultHoverBg,
  secondary: defaultHoverBg,
  tertiary: {
    selected: "rounded-xl pl-14 pr-4 py-2.5 left-0 bg-tertiary-container",
    unselected: "rounded-xl pl-14 pr-4 py-2.5 left-0 bg-tertiary-container",
  },
};

const iconStyles: Record<NavigationButtonVariant, { selected: string; hovered: string; idle: string }> = {
  primary: {
    selected: "text-on-primary-container",
    hovered: "text-on-surface",
    idle: "text-on-surface",
  },
  secondary: {
    selected: "text-on-primary-container",
    hovered: "text-on-secondary-container",
    idle: "text-on-surface",
  },
  tertiary: {
    selected: "text-on-tertiary-container",
    hovered: "text-on-tertiary-container",
    idle: "text-tertiary",
  },
};

const defaultHoverText = {
  selected: "var(--color-on-primary-container)",
  unselected: "var(--color-on-secondary-container)",
};
const hoverTextColors: Record<NavigationButtonVariant, Record<"selected" | "unselected", string>> = {
  primary: defaultHoverText,
  secondary: defaultHoverText,
  tertiary: {
    selected: "var(--color-on-tertiary-container)",
    unselected: "var(--color-on-tertiary-container)",
  },
};

export function NavigationButton({
  icon,
  customIcon,
  label,
  variant = "secondary",
  selected = false,
  disableHoverExpand = false,
  className,
  disabled,
  ...props
}: NavigationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const timer = window.setTimeout(() => setShowLabel(true), 100);
      return () => clearTimeout(timer);
    }
    setShowLabel(false);
  }, [isHovered]);

  const selKey = selected ? "selected" : "unselected";
  const iconColor = iconStyles[variant][selected ? "selected" : isHovered ? "hovered" : "idle"];

  return (
    <div className="relative flex justify-center">
      {!disableHoverExpand && (
        <div
          aria-hidden="true"
          className={cn(
            "h-10 absolute top-1/2 -translate-y-1/2 shadow-2xl flex items-center gap-2 z-0",
            hoverBgStyles[variant][selKey],
            "transition-all",
            isHovered
              ? "duration-300 ease-out opacity-100 translate-x-0"
              : "duration-200 ease-in opacity-0 -translate-x-full",
          )}
        >
          <span
            className={cn(
              "transition-opacity duration-200 whitespace-nowrap text-sm font-medium",
              showLabel ? "opacity-100" : "opacity-0",
            )}
            style={{ color: hoverTextColors[variant][selKey] }}
          >
            {label}
          </span>
        </div>
      )}

      <button
        aria-label={label}
        className={cn(
          "flex items-center justify-center transition-all duration-200 ease-in-out box-border relative z-10 w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed",
          customIcon ? "p-0 overflow-hidden" : "p-2.5",
          isHovered ? shapeStyles[variant][selKey].hover : shapeStyles[variant][selKey].rest,
          !isHovered && bgStyles[variant][selKey],
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        {...props}
      >
        {icon && !customIcon ? (
          <Icon name={icon} size={24} className={cn("shrink-0", iconColor)} />
        ) : customIcon ? (
          <div className="w-full h-full shrink-0">{customIcon}</div>
        ) : null}
      </button>
    </div>
  );
}
