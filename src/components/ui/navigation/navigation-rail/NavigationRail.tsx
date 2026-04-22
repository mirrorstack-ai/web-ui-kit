import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "NavigationRail",
  description:
    "Vertical icon-based navigation rail with logo, header, main content, and footer slots",
};

export interface NavigationRailProps {
  logo?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
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
          <div className="h-px rounded-full w-full bg-outline" />
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
