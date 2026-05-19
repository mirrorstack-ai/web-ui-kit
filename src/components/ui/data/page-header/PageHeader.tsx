import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "PageHeader",
  description:
    "Top-of-page header — h1 title with optional description, an optional leading marker (avatar/icon), an optional path navigator above (back link/breadcrumb), and an optional trailing slot (picker/button/status).",
};

export interface PageHeaderProps {
  /** Page title, rendered as an h1. */
  title: string;
  /** Optional supporting copy, rendered below the title. */
  description?: string;
  /**
   * Optional path navigator rendered above the title — back link,
   * breadcrumb, or any element that indicates where this page sits in
   * a larger navigation hierarchy.
   */
  path?: ReactNode;
  /**
   * Optional leading element rendered to the left of the title block —
   * typically an Avatar, Icon container, or other visual marker.
   */
  leading?: ReactNode;
  /**
   * Optional trailing slot rendered to the right of the title block —
   * picker, button, breadcrumb, status pill, or other element. Wraps
   * below on narrow viewports.
   */
  tail?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  path,
  leading,
  tail,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-2", className)}>
      {path}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          {leading}
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-on-surface">{title}</h1>
            {description && (
              <p className="mt-1 text-on-surface-variant">{description}</p>
            )}
          </div>
        </div>
        {tail}
      </div>
    </header>
  );
}
