import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Alert",
  description:
    "Dismissible inline alert banner with error/success/warning/info variants, icon, optional title, and body content",
};

export type AlertVariant = "error" | "success" | "warning" | "info";

export interface AlertProps {
  readonly variant: AlertVariant;
  readonly title?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly onDismiss?: () => void;
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
  if (isDev) {
    if (!children) {
      console.warn("[Alert] children (body content) should not be empty");
    }
  }

  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border px-4 py-3",
        variantStyles[variant],
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="material-symbols-rounded shrink-0"
          aria-hidden="true"
          style={{ fontSize: 20 }}
        >
          {variantIcons[variant]}
        </span>
        <div className="flex-1 min-w-0">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={cn("text-sm", title && "mt-1")}>{children}</div>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className={cn(
              "shrink-0 -my-1 rounded-full p-1 transition-opacity",
              "text-current opacity-70 hover:opacity-100",
              "cursor-pointer",
            )}
          >
            <span
              className="material-symbols-rounded"
              aria-hidden="true"
              style={{ fontSize: 18 }}
            >
              close
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
