"use client";

import { type ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

type ButtonVariant = "filled" | "tonal" | "outline" | "text";
type ButtonColor = "primary" | "secondary" | "tertiary" | "error" | "warning";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  /** Icon name rendered before children */
  leftIcon?: string;
  /** Icon name rendered after children */
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

const gapStyles: Record<ButtonSize, string> = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-3",
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
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
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </span>
      )}
      <span
        className={cn(
          "inline-flex items-center",
          gapStyles[size],
          loading && "opacity-0",
        )}
      >
        {leftIcon && (
          <span
            className="material-symbols-rounded"
            style={{ fontSize: iconSizes[size] }}
          >
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span
            className="material-symbols-rounded"
            style={{ fontSize: iconSizes[size] }}
          >
            {rightIcon}
          </span>
        )}
      </span>
    </button>
  );
}
