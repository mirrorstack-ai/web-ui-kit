import { type ButtonHTMLAttributes } from "react";
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
  name: "IconButton",
  description: "Material Symbols icon button with variants, colors, sizes, and loading spinner",
};

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  "aria-label": string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  tooltip?: string;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function IconButton({
  icon,
  variant = "text",
  color = "primary",
  size = "md",
  loading = false,
  tooltip,
  className,
  disabled,
  "aria-label": ariaLabel,
  ...props
}: IconButtonProps) {
  if (isDev && !ariaLabel) {
    console.warn("[IconButton] aria-label is required for accessibility.");
  }

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed",
        variantMap[variant][color],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      title={tooltip ?? ariaLabel}
      {...props}
    >
      {loading ? (
        <Progress
          type="circular"
          variant="wave"
          size="sm"
          color="current"
          style={{ width: iconSizes[size], height: iconSizes[size] }}
        />
      ) : (
        <span
          className="material-symbols-rounded"
          style={{ fontSize: iconSizes[size] }}
        >
          {icon}
        </span>
      )}
    </button>
  );
}
