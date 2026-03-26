import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Progress } from "@/components/ui/feedback/progress/Progress";

export const meta: ComponentMeta = {
  name: "Button",
  description: "Multi-variant button with icons and loading state",
};

type ButtonVariant = "filled" | "tonal" | "outline" | "text";
type ButtonColor = "primary" | "secondary" | "tertiary" | "error" | "warning";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

const filledStyles: Record<ButtonColor, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container",
  secondary:
    "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container",
  tertiary:
    "bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container",
  error:
    "bg-error text-on-error hover:bg-error-container hover:text-on-error-container",
  warning:
    "bg-warning text-on-warning hover:bg-warning-container hover:text-on-warning-container",
};

const tonalStyles: Record<ButtonColor, string> = {
  primary:
    "bg-primary-container text-on-primary-container hover:bg-primary/20",
  secondary:
    "bg-secondary-container text-on-secondary-container hover:bg-secondary/20",
  tertiary:
    "bg-tertiary-container text-on-tertiary-container hover:bg-tertiary/20",
  error: "bg-error-container text-on-error-container hover:bg-error/20",
  warning:
    "bg-warning-container text-on-warning-container hover:bg-warning/20",
};

const outlineStyles: Record<ButtonColor, string> = {
  primary: "border border-outline-variant text-primary hover:bg-primary/8",
  secondary:
    "border border-outline-variant text-secondary hover:bg-secondary/8",
  tertiary:
    "border border-outline-variant text-tertiary hover:bg-tertiary/8",
  error: "border border-error/50 text-error hover:bg-error/8",
  warning: "border border-warning/50 text-warning hover:bg-warning/8",
};

const textStyles: Record<ButtonColor, string> = {
  primary: "text-primary hover:bg-primary/8",
  secondary: "text-secondary hover:bg-secondary/8",
  tertiary: "text-tertiary hover:bg-tertiary/8",
  error: "text-error hover:bg-error/8",
  warning: "text-warning hover:bg-warning/8",
};

const variantMap: Record<ButtonVariant, Record<ButtonColor, string>> = {
  filled: filledStyles,
  tonal: tonalStyles,
  outline: outlineStyles,
  text: textStyles,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-3 text-sm",
  md: "px-4 py-3",
  lg: "px-6 py-4 text-lg",
};

const iconStyleMap: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: 16 },
  md: { fontSize: 20 },
  lg: { fontSize: 24 },
};

const spinnerStyles: Record<ButtonSize, string> = {
  sm: "!h-4 !w-4",
  md: "!h-6 !w-6",
  lg: "!h-8 !w-8",
};

const gapStyles: Record<ButtonSize, string> = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-3",
};

function MaterialIcon({ name, size }: { name: string; size: ButtonSize }) {
  return (
    <span className="material-symbols-rounded" style={iconStyleMap[size]}>
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
          <Progress type="circular" variant="wave" size="sm" color="current" className={spinnerStyles[size]} />
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
