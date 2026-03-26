"use client";

import { type ReactNode } from "react";
import { cn } from "../utils/cn";

export interface SettingsNavItem {
  id: string;
  label: string;
  /** Material Symbols icon name */
  icon: string;
  /** Visual variant */
  variant?: "default" | "danger";
}

export interface SettingsNavSection {
  label?: string;
  items: SettingsNavItem[];
}

export interface SettingsLayoutProps {
  children: ReactNode;
  /** Navigation sections for the sidebar */
  navSections: SettingsNavSection[];
  /** Currently active nav item id */
  activeItemId?: string;
  /** Called when a nav item is clicked */
  onNavItemClick?: (item: SettingsNavItem) => void;
  /** Content shown at the top of the sidebar (e.g. context switcher) */
  header?: ReactNode;
  /** Content shown at the bottom of the sidebar */
  footer?: ReactNode;
  /** Extra classes on the content area */
  contentClassName?: string;
  className?: string;
}

const navItemVariantStyles: Record<"default" | "danger", string> = {
  default:
    "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
  danger: "text-error hover:bg-error-container/30",
};

const navItemActiveStyle = "bg-primary/10 text-primary font-medium";

const navItemIconVariantStyles: Record<"default" | "danger", string> = {
  default: "text-on-surface-variant",
  danger: "text-error",
};

export function SettingsLayout({
  children,
  navSections,
  activeItemId,
  onNavItemClick,
  header,
  footer,
  contentClassName,
  className,
}: SettingsLayoutProps) {
  return (
    <div className={cn("flex h-full", className)}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 h-full flex-col px-4 pt-4 pb-4 overflow-hidden">
        {header && <div className="pb-4 px-2 shrink-0">{header}</div>}

        <div className="flex-1 min-h-0 flex flex-col justify-center space-y-3 overflow-y-auto overscroll-none">
          {navSections.map((section) => (
            <div
              key={section.label ?? section.items[0]?.id}
              className="rounded-2xl bg-surface-container-low border border-outline-variant p-3"
            >
              {section.label && (
                <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant px-4 mb-2">
                  {section.label}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const variant = item.variant ?? "default";
                  const active =
                    item.id === activeItemId && variant === "default";
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                          active
                            ? navItemActiveStyle
                            : navItemVariantStyles[variant],
                        )}
                        onClick={() => onNavItemClick?.(item)}
                      >
                        <span
                          className={cn(
                            "material-symbols-rounded text-[20px]",
                            active
                              ? "text-primary"
                              : navItemIconVariantStyles[variant],
                          )}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {footer && <div className="shrink-0 pt-3">{footer}</div>}
      </aside>

      {/* Main content */}
      <div className="relative flex-1 min-w-0">
        <main className="absolute inset-0 overflow-y-auto overscroll-none">
          <div
            className={cn(
              "px-4 pt-8 pb-8 min-h-full flex flex-col",
              contentClassName,
            )}
          >
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
