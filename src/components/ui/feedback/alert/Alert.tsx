import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

export const meta: ComponentMeta = {
  name: "Alert",
  description:
    "Dismissible inline alert banner with error/success/warning/primary/secondary/neutral variants",
};

export type AlertVariant =
  | "error"
  | "success"
  | "warning"
  | "primary"
  | "secondary"
  | "neutral";

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  onDismiss?: () => void;
  /** Override the default icon for this variant. */
  icon?: string;
  /** Override the default icon size (default: 20). */
  iconSize?: number;
  /** Hide the leading icon entirely. Useful when the alert sits inside a
   * dialog or section that already conveys severity. */
  hideIcon?: boolean;
}

const variantStyles: Record<AlertVariant, string> = {
  error: "bg-error/10 border-error/30 text-error",
  success: "bg-success/10 border-success/30 text-success",
  warning: "bg-warning/10 border-warning/30 text-warning",
  primary: "bg-primary/10 border-primary/30 text-primary",
  secondary: "bg-secondary/10 border-secondary/30 text-secondary",
  // Neutral resting-state box: no severity tint. Pairs with `hideIcon`
  // when used purely as an informational container.
  neutral: "bg-surface-container-low border-outline-variant text-on-surface",
};

const variantIcons: Record<AlertVariant, string> = {
  error: "error",
  success: "check_circle",
  warning: "warning",
  primary: "info",
  secondary: "info",
  neutral: "info",
};

export function Alert({
  variant,
  title,
  children,
  className,
  onDismiss,
  icon,
  iconSize,
  hideIcon,
}: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3",
        variantStyles[variant],
        className,
      )}
      role="alert"
    >
      <div className="flex items-center">
        {!hideIcon && (
          <Icon
            name={icon ?? variantIcons[variant]}
            size={iconSize ?? 20}
            className="shrink-0"
          />
        )}
        <div className={cn("flex-1", !hideIcon && "ml-3")}>
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={cn("text-sm", title && "mt-1.5")}>{children}</div>
        </div>
        {onDismiss && (
          <IconButton
            icon="close"
            variant="text"
            size="sm"
            className="-my-1 ml-auto text-current"
            onClick={onDismiss}
            aria-label="Dismiss"
          />
        )}
      </div>
    </div>
  );
}
