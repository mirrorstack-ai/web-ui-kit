import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "PageHeader",
  description:
    "Top-of-page header — h1 title with optional description and an optional trailing slot for a picker, button, breadcrumb, or other tail element.",
};

export interface PageHeaderProps {
  /** Page title, rendered as an h1. */
  title: string;
  /** Optional supporting copy, rendered below the title. */
  description?: string;
  /**
   * Optional trailing slot — picker, button, breadcrumb, or other
   * element rendered to the right of the title block. Wraps below on
   * narrow viewports.
   */
  tail?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  tail,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-end justify-between gap-4 flex-wrap",
        className,
      )}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-on-surface">{title}</h1>
        {description && (
          <p className="mt-1 text-on-surface-variant">{description}</p>
        )}
      </div>
      {tail}
    </header>
  );
}
