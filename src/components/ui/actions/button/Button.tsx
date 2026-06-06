import { type ButtonHTMLAttributes, type CSSProperties } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Progress } from "@/components/ui/feedback/progress/Progress";
import { Icon } from "@/components/ui/media/icon/Icon";
import { isDev } from "@/utils/env";
import {
  type ButtonVariant,
  type ButtonColor,
  type ButtonSize,
  variantMap,
  iconSizes,
  buttonBaseClass,
} from "@/components/ui/actions/shared/button-styles";

export const meta: ComponentMeta = {
  name: "Button",
  description: "Multi-variant button with icons and loading state",
};

export type { ButtonVariant, ButtonColor, ButtonSize } from "@/components/ui/actions/shared/button-styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: "h-8 px-2.5 text-xs",
  sm: "h-10 px-3 text-sm",
  md: "px-4 py-3",
  lg: "px-6 py-4 text-lg",
};

const spinnerSizes: Record<ButtonSize, CSSProperties> = {
  xs: { width: 12, height: 12 },
  sm: { width: 16, height: 16 },
  md: { width: 24, height: 24 },
  lg: { width: 32, height: 32 },
};

const gapStyles: Record<ButtonSize, string> = {
  xs: "gap-1",
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-3",
};


export function Button({
  variant = "filled",
  color = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  // Default to "button" — prevents implicit submit inside <form>.
  type = "button",
  ...props
}: ButtonProps) {
  if (isDev) {
    if (loading && !props["aria-label"] && !children) {
      console.warn("[Button] loading button should have accessible label");
    }
    if ((leftIcon || rightIcon) && !children) {
      console.warn("[Button] icon-only button should use IconButton instead");
    }
  }

  return (
    <button
      className={cn(
        buttonBaseClass,
        "font-medium",
        variantMap[variant][color],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
      type={type}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Progress type="circular" variant="wave" size="sm" color="current" style={spinnerSizes[size]} />
        </span>
      )}
      <span
        className={cn(
          "inline-flex items-center",
          gapStyles[size],
          loading && "opacity-0",
        )}
      >
        {leftIcon && <Icon name={leftIcon} size={iconSizes[size]} />}
        {children}
        {rightIcon && <Icon name={rightIcon} size={iconSizes[size]} />}
      </span>
    </button>
  );
}
