import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

export const meta: ComponentMeta = {
  name: "Alert",
  description:
    "Dismissible inline alert banner with error/success/warning/info variants",
};

export type AlertVariant = "error" | "success" | "warning" | "info";

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, string> = {
  error: "bg-error/10 border-error/30 text-error",
  success: "bg-success/10 border-success/30 text-success",
  warning: "bg-warning/10 border-warning/30 text-warning",
  info: "bg-info/10 border-info/30 text-info",
};

const variantIcons: Record<AlertVariant, string> = {
  error: "error",
  success: "check_circle",
  warning: "warning",
  info: "info",
};

export function Alert({
  variant,
  title,
  children,
  className,
  onDismiss,
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
        <Icon
          name={variantIcons[variant]}
          size={20}
          className="shrink-0"
        />
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={cn("text-sm", title && "mt-1")}>{children}</div>
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
