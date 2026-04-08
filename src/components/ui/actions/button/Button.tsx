import { type ButtonHTMLAttributes, type CSSProperties } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Progress } from "@/components/ui/feedback/progress/Progress";
import { isDev } from "@/utils/env";
import {
  type ButtonVariant,
  type ButtonColor,
  type ButtonSize,
  variantMap,
  iconSizes,
} from "@/components/ui/actions/shared/button-styles";

export const meta: ComponentMeta = {
  name: "Button",
  description: "Multi-variant button with icons and loading state",
};

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
  sm: "h-10 px-3 text-sm",
  md: "px-4 py-3",
  lg: "px-6 py-4 text-lg",
};

const spinnerSizes: Record<ButtonSize, CSSProperties> = {
  sm: { width: 16, height: 16 },
  md: { width: 24, height: 24 },
  lg: { width: 32, height: 32 },
};

const gapStyles: Record<ButtonSize, string> = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-3",
};

function MaterialIcon({ name, size }: { name: string; size: ButtonSize }) {
  return (
    <span className="material-symbols-rounded" style={{ fontSize: iconSizes[size] }}>
      {name}
    </span>
  );
}

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
        "relative inline-flex items-center justify-center font-medium rounded-lg transition-all cursor-pointer active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        variantMap[variant][color],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
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
        {leftIcon && <MaterialIcon name={leftIcon} size={size} />}
        {children}
        {rightIcon && <MaterialIcon name={rightIcon} size={size} />}
      </span>
    </button>
  );
}
