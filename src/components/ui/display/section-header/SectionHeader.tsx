import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SectionHeader",
  description:
    "Bare section header — title with optional description and right-aligned action slot, rendered above a content area with no card chrome.",
};

export interface SectionHeaderProps {
  /** Primary heading for the section, rendered as an h2. */
  title: string;
  /** Optional supporting copy, rendered below the title. */
  description?: string;
  /** Right-aligned action — typically a Button or IconButton. */
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4",
        className,
      )}
    >
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-on-surface">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-on-surface-variant">
            {description}
          </p>
        )}
      </div>
      {action}
    </header>
  );
}
