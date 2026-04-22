import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "NavItem",
  description: "Navigation item button with icon, label, active state, and danger variant",
};

export type NavItemVariant = "default" | "danger";

export interface NavItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: string;
  label: string;
  active?: boolean;
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
      <Icon
        name={icon}
        size={20}
        className={active && variant === "default" ? "text-primary" : iconVariantStyles[variant]}
      />
      <span>{label}</span>
    </button>
  );
}
