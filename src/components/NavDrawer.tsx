import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { NavItem } from "./NavItem";
import { Surface } from "./Surface";
import { SectionLabel } from "./SectionLabel";

export interface NavDrawerItem {
  id: string;
  label: string;
  icon: string;
  variant?: "default" | "danger";
}

export interface NavDrawerSection {
  label?: string;
  items: NavDrawerItem[];
}

export interface NavDrawerProps {
  /** Logo/app-switcher, pinned top of drawer */
  branding?: ReactNode;
  /** Context switcher, user info, etc. */
  contextSwitcher?: ReactNode;
  /** Nav sections */
  sections: NavDrawerSection[];
  /** Currently active nav item id */
  activeItemId?: string;
  /** Called when a nav item is clicked */
  onItemClick?: (item: NavDrawerItem) => void;
  /** Extra content below nav — e.g. "Organizations" link, "Sign Out" */
  footer?: ReactNode;
  className?: string;
}

export function NavDrawer({
  branding,
  contextSwitcher,
  sections,
  activeItemId,
  onItemClick,
  footer,
  className,
}: NavDrawerProps) {
  return (
    <aside className={cn("w-72 shrink-0 h-full flex flex-col px-4 pt-4 pb-4 overflow-hidden", className)}>
      {branding && (
        <div className="pb-4 px-2 shrink-0">
          {branding}
        </div>
      )}

      <div className="flex-1 min-h-0 flex flex-col justify-center space-y-3 overflow-y-auto overscroll-none">
        {contextSwitcher && (
          <Surface className="p-2">
            {contextSwitcher}
          </Surface>
        )}

        {sections.map((section) => (
          <Surface key={section.label ?? section.items[0]?.id} className="p-3">
            {section.label && (
              <SectionLabel className="px-4 mb-2">
                {section.label}
              </SectionLabel>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <NavItem
                    icon={item.icon}
                    label={item.label}
                    active={item.id === activeItemId}
                    variant={item.variant}
                    onClick={() => onItemClick?.(item)}
                  />
                </li>
              ))}
            </ul>
          </Surface>
        ))}
      </div>

      {footer && (
        <div className="shrink-0 pt-3">
          {footer}
        </div>
      )}
    </aside>
  );
}
