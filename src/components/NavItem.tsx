import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

type NavItemVariant = "default" | "danger";

export interface NavItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Material Symbols icon name */
  icon: string;
  /** Label text */
  label: string;
  /** Whether this item is currently active */
  active?: boolean;
  /** Visual variant */
  variant?: NavItemVariant;
}

const variantStyles: Record<NavItemVariant, string> = {
  default: "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
  danger: "text-error hover:bg-error-container/30",
};

const activeStyle = "bg-primary/10 text-primary font-medium";

const iconVariantStyles: Record<NavItemVariant, string> = {
  default: "text-on-surface-variant",
  danger: "text-error",
};

export function NavItem({
  icon,
  label,
  active = false,
  variant = "default",
  className,
  disabled,
  ...props
}: NavItemProps) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        active && variant === "default" ? activeStyle : variantStyles[variant],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <span
        className={cn(
          "material-symbols-rounded text-[20px]",
          active && variant === "default" ? "text-primary" : iconVariantStyles[variant],
        )}
      >
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
