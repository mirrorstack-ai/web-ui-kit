import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "NavigationRail",
  description:
    'Icon-based navigation rail with logo, header, main content, and footer slots. Vertical by default; pass orientation="horizontal" for a bottom-nav pill.',
};

export type NavigationRailOrientation = "vertical" | "horizontal";

export interface NavigationRailProps {
  logo?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Layout axis. "horizontal" lays the rail out as a row — used for the mobile bottom nav. */
  orientation?: NavigationRailOrientation;
  className?: string;
  containerClassName?: string;
}

export function NavigationRail({
  logo,
  header,
  children,
  footer,
  orientation = "vertical",
  className,
  containerClassName,
}: NavigationRailProps) {
  const horizontal = orientation === "horizontal";
  return (
    <div
      className={cn(
        // relative + z-30: the hover label pill overflows the rail, and without a
        // stacking context of its own it paints UNDER main content. Stays below
        // the z-50 overlay tier so dialogs and snackbars still win.
        "relative z-30 overflow-visible",
        horizontal ? "px-2 pb-2" : "pl-2 py-4",
        className,
      )}
    >
      <div
        className={cn(
          "gap-6 flex items-center rounded-2xl shadow-2xl bg-surface-bright overflow-visible",
          horizontal ? "flex-row px-6 py-4" : "ml-2 flex-col px-4 py-6",
          containerClassName,
        )}
      >
        {logo}
        {header}
        {(logo || header) && (
          <div
            className={cn(
              "rounded-full bg-outline",
              horizontal ? "w-px self-stretch" : "h-px w-full",
            )}
          />
        )}
        {children}
        {footer && (
          <>
            <div className="flex-1" />
            {footer}
          </>
        )}
      </div>
    </div>
  );
}
