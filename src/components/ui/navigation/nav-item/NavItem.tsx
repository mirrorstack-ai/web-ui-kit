import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "NavItem",
  description: "Navigation item button with icon, label, active state, and error variant",
};

/** `"danger"` is a deprecated alias for `"error"`. */
export type NavItemVariant = "default" | "error" | "danger";

type ResolvedNavItemVariant = "default" | "error";

export interface NavItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: string;
  label: string;
  active?: boolean;
  variant?: NavItemVariant;
}

const variantStyles: Record<ResolvedNavItemVariant, string> = {
  default: "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
  error: "text-error hover:bg-error-container/30",
};

const activeStyle = "bg-primary/10 text-primary font-medium";

const iconVariantStyles: Record<ResolvedNavItemVariant, string> = {
  default: "text-on-surface-variant",
  error: "text-error",
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
  if (isDev && variant === "danger") {
    console.warn('[NavItem] variant="danger" is deprecated; use "error".');
  }
  const resolvedVariant: ResolvedNavItemVariant =
    variant === "danger" ? "error" : variant;

  return (
    <button
      aria-current={active ? "page" : undefined}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        active && resolvedVariant === "default"
          ? activeStyle
          : variantStyles[resolvedVariant],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <Icon
        name={icon}
        size={20}
        className={
          active && resolvedVariant === "default"
            ? "text-primary"
            : iconVariantStyles[resolvedVariant]
        }
      />
      <span>{label}</span>
    </button>
  );
}
