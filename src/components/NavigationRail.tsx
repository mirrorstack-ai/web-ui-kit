import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export interface NavigationRailProps {
  /** App logo / identity at the very top of the rail */
  logo?: ReactNode;
  /** Content below logo — e.g. profile button, org avatar */
  header?: ReactNode;
  /** Main navigation content */
  children: ReactNode;
  /** Content at the bottom — e.g. back button, settings */
  footer?: ReactNode;
  /** Additional class for the outer wrapper */
  className?: string;
  /** Additional class for the inner card container */
  containerClassName?: string;
}

export function NavigationRail({
  logo,
  header,
  children,
  footer,
  className,
  containerClassName,
}: NavigationRailProps) {
  return (
    <div className={cn("pl-2 py-4 overflow-visible", className)}>
      <div
        className={cn(
          "ml-2 px-4 py-6 gap-6 flex flex-col items-center rounded-2xl shadow-2xl bg-surface-bright overflow-visible",
          containerClassName,
        )}
      >
        {logo}
        {header}
        {(logo || header) && (
          <div className="h-[1px] rounded-full w-full bg-outline" />
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
