"use client";

import { type ReactNode } from "react";
import {
  SettingsLayout,
  type SettingsNavSection,
  type SettingsNavItem,
} from "./SettingsLayout";
import { cn } from "../utils/cn";

export interface ModuleSettingsLayoutProps {
  children: ReactNode;
  /** Module display name shown in the sidebar header */
  moduleName: string;
  /** Module icon (Material Symbols) */
  moduleIcon?: string;
  /** Module version or description line */
  moduleDescription?: string;
  /** Navigation sections for the sidebar */
  navSections: SettingsNavSection[];
  /** Currently active nav item id */
  activeItemId?: string;
  /** Called when a nav item is clicked */
  onNavItemClick?: (item: SettingsNavItem) => void;
  /** Optional action area in sidebar footer (e.g. save/publish buttons) */
  footerActions?: ReactNode;
  /** Extra classes on the content area */
  contentClassName?: string;
  className?: string;
}

/**
 * Layout wrapper for module settings pages.
 *
 * Extends SettingsLayout with a module-specific header (icon, name, description)
 * and an optional footer action area.
 *
 * @example
 * ```tsx
 * <ModuleSettingsLayout
 *   moduleName="Media Library"
 *   moduleIcon="perm_media"
 *   moduleDescription="v2.1.0"
 *   navSections={[
 *     {
 *       label: "Configuration",
 *       items: [
 *         { id: "general", label: "General", icon: "settings" },
 *         { id: "storage", label: "Storage", icon: "cloud" },
 *         { id: "permissions", label: "Permissions", icon: "lock" },
 *       ],
 *     },
 *     {
 *       label: "Danger zone",
 *       items: [
 *         { id: "delete", label: "Delete module", icon: "delete", variant: "danger" },
 *       ],
 *     },
 *   ]}
 *   activeItemId="general"
 *   onNavItemClick={(item) => setActiveSection(item.id)}
 * >
 *   <GeneralSettings />
 * </ModuleSettingsLayout>
 * ```
 */
export function ModuleSettingsLayout({
  children,
  moduleName,
  moduleIcon = "extension",
  moduleDescription,
  navSections,
  activeItemId,
  onNavItemClick,
  footerActions,
  contentClassName,
  className,
}: ModuleSettingsLayoutProps) {
  const header = (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <span className="material-symbols-rounded text-primary !text-xl">
          {moduleIcon}
        </span>
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-on-surface text-sm truncate">
          {moduleName}
        </p>
        {moduleDescription && (
          <p className="text-xs text-on-surface-variant truncate">
            {moduleDescription}
          </p>
        )}
      </div>
    </div>
  );

  const footer = footerActions ? (
    <div
      className={cn(
        "border-t border-outline-variant pt-3 flex flex-col gap-2",
      )}
    >
      {footerActions}
    </div>
  ) : undefined;

  return (
    <SettingsLayout
      navSections={navSections}
      activeItemId={activeItemId}
      onNavItemClick={onNavItemClick}
      header={header}
      footer={footer}
      contentClassName={contentClassName}
      className={className}
    >
      {children}
    </SettingsLayout>
  );
}
