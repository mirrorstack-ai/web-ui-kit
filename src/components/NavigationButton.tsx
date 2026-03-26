"use client";

import { type ButtonHTMLAttributes, type ReactNode, useState, useEffect } from "react";
import { cn } from "../utils/cn";

type NavigationButtonVariant = "primary" | "secondary" | "tertiary";

export interface NavigationButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Material Symbols icon name */
  icon?: string;
  /** Custom icon element (overrides icon prop) */
  customIcon?: ReactNode;
  /** Label shown on hover expand — required for accessibility */
  label: string;
  /** Whether this button is currently selected */
  selected?: boolean;
  /** Visual variant */
  variant?: NavigationButtonVariant;
  /** Disable the hover expand animation */
  disableHoverExpand?: boolean;
  /** Show a loading spinner instead of the icon */
  loading?: boolean;
}

/* ---- Record-based style maps ---- */

const buttonStyles: Record<NavigationButtonVariant, Record<"selected" | "unselected", string>> = {
  primary: {
    selected: "bg-primary-container rounded-full cursor-default",
    unselected: "cursor-pointer",
  },
  secondary: {
    selected: "bg-primary-container rounded-full cursor-default",
    unselected: "rounded-xl cursor-pointer",
  },
  tertiary: {
    selected: "bg-tertiary-container rounded-xl cursor-default",
    unselected: "border border-tertiary rounded-xl cursor-pointer",
  },
};

const hoverBgStyles: Record<NavigationButtonVariant, Record<"selected" | "unselected", string>> = {
  primary: {
    selected: "rounded-full pl-12 pr-4 py-2 -left-1 bg-primary-container",
    unselected: "rounded-full pl-12 pr-4 py-2 -left-1 bg-secondary-container",
  },
  secondary: {
    selected: "rounded-full pl-12 pr-4 py-2 -left-1 bg-primary-container",
    unselected: "rounded-full pl-12 pr-4 py-2 -left-1 bg-secondary-container",
  },
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

const hoverTextColors: Record<NavigationButtonVariant, Record<"selected" | "unselected", string>> = {
  primary: {
    selected: "var(--color-on-primary-container)",
    unselected: "var(--color-on-secondary-container)",
  },
  secondary: {
    selected: "var(--color-on-primary-container)",
    unselected: "var(--color-on-secondary-container)",
  },
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
  loading = false,
  className,
  disabled,
  ...props
}: NavigationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isHovered) {
      timer = window.setTimeout(() => setShowLabel(true), 100);
    } else {
      setShowLabel(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
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
            isHovered ? "duration-300 ease-out opacity-100 translate-x-0" : "duration-200 ease-in opacity-0 -translate-x-full",
          )}
        >
          <span
            className={cn(
              "label transition-opacity duration-200 whitespace-nowrap",
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
          buttonStyles[variant][selKey],
          isHovered && "!bg-transparent",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        {...props}
      >
        {loading ? (
          <div className={cn("flex items-end justify-center gap-[3px] h-5 w-5 shrink-0", iconColor)}>
            <span className="w-[3px] h-full rounded-full bg-current origin-bottom animate-wave-bar" />
            <span className="w-[3px] h-full rounded-full bg-current origin-bottom animate-wave-bar [animation-delay:0.15s]" />
            <span className="w-[3px] h-full rounded-full bg-current origin-bottom animate-wave-bar [animation-delay:0.3s]" />
          </div>
        ) : icon && !customIcon ? (
          <span className={cn("material-symbols-rounded text-2xl shrink-0", iconColor)}>
            {icon}
          </span>
        ) : customIcon ? (
          <div className="w-full h-full shrink-0">
            {customIcon}
          </div>
        ) : null}
      </button>
    </div>
  );
}
