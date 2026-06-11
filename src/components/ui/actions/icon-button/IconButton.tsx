import { type ButtonHTMLAttributes } from "react";
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
  /** Render the filled variant of the icon (Material Symbols `FILL` axis). */
  fill?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: "h-6 w-6",
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
  fill,
  className,
  disabled,
  // Default to "button" — prevents implicit submit inside <form>.
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: IconButtonProps) {
  if (isDev && !ariaLabel) {
    console.warn("[IconButton] aria-label is required for accessibility.");
  }

  return (
    <button
      className={cn(
        buttonBaseClass,
        variantMap[variant][color],
        sizeStyles[size],
        className,
      )}
      type={type}
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
        <Icon name={icon} size={iconSizes[size]} fill={fill} />
      )}
    </button>
  );
}
