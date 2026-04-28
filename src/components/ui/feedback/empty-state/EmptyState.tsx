import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "EmptyState",
  description:
    "Centered empty state display with icon, title, description, and action slot",
};

export interface EmptyStateProps {
  /** Material Symbols Rounded icon name (e.g. "folder_open", "search_off") */
  icon: string;
  /** Primary heading text */
  title: string;
  /** Optional supporting text below the title */
  description?: string;
  /** Optional action slot (e.g. a Button) */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className,
      )}
    >
      <Icon
        name={icon}
        size={48}
        className="text-on-surface-variant mb-4"
      />
      <h3 className="text-lg font-medium text-on-surface mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-on-surface-variant max-w-sm mb-4">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
