import { useState, useEffect, useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { NavDrawer, type NavDrawerItem, type NavDrawerSection } from "./NavDrawer";
import { NavItem } from "./NavItem";
import { MobileNavItem } from "./MobileNavItem";
import { SnackbarOutlet } from "../context/SnackbarContext";

export type AuthNavItem = NavDrawerItem;
export type AuthNavSection = NavDrawerSection;

interface AuthLayoutProps {
  children: ReactNode;

  /** Logo/app-switcher, pinned top of sidebar */
  branding?: ReactNode;

  /** Sidebar top slot — context switcher, user info, etc. */
  contextSwitcher?: ReactNode;

  /** Nav sections rendered in the desktop sidebar */
  navSections: AuthNavSection[];
  /** Currently active nav item id */
  activeItemId?: string;
  /** Called when a nav item is clicked */
  onNavItemClick?: (item: AuthNavItem) => void;

  /** Extra sidebar sections below nav — e.g. "Organizations" link, "Sign Out" */
  sidebarFooter?: ReactNode;

  /** Items shown in the mobile bottom nav bar (max 3-4 recommended) */
  mobileNavItems?: AuthNavItem[];
  /** Items shown in the mobile "More" sheet */
  mobileMoreItems?: AuthNavItem[];
  /** Extra content at bottom of "More" sheet — e.g. sign out button */
  mobileMoreFooter?: ReactNode;
  /** Extra classes on the inner content wrapper (e.g. "justify-center" for vertical centering) */
  contentClassName?: string;
}

export function AuthLayout({
  children,
  branding,
  contextSwitcher,
  navSections,
  activeItemId,
  onNavItemClick,
  sidebarFooter,
  mobileNavItems,
  mobileMoreItems,
  mobileMoreFooter,
  contentClassName,
}: AuthLayoutProps) {
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const moreTriggerRef = useRef<HTMLElement | null>(null);

  // Focus trap + Escape for mobile sheet
  useEffect(() => {
    if (!moreSheetOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreSheetOpen(false);
        return;
      }

      if (e.key !== "Tab" || !sheetRef.current) return;

      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [moreSheetOpen]);

  // Focus sheet on open, restore focus on close
  useEffect(() => {
    if (moreSheetOpen && sheetRef.current) {
      const first = sheetRef.current.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      first?.focus();
    } else if (!moreSheetOpen && moreTriggerRef.current) {
      moreTriggerRef.current.focus();
      moreTriggerRef.current = null;
    }
  }, [moreSheetOpen]);

  return (
    <div className="h-dvh overflow-hidden text-on-background relative">
      {branding && (
        <div className="max-w-7xl mx-auto hidden lg:block absolute top-0 left-0 right-0 z-10">
          <div className="pt-2 pb-3 absolute top-0 left-24 2xl:left-0 mt-2">
            {branding}
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto flex h-full">
        <NavDrawer
          contextSwitcher={contextSwitcher}
          sections={navSections}
          activeItemId={activeItemId}
          onItemClick={onNavItemClick}
          footer={sidebarFooter}
          className="hidden lg:flex"
        />

        {/* Main content */}
        <div className="relative flex-1 min-w-0">
          <main className="absolute inset-0 overflow-y-auto overscroll-none">
            <div className={cn(
              "px-4 pt-8 pb-8 min-h-full flex flex-col",
              branding && "lg:pt-20",
              mobileNavItems && mobileNavItems.length > 0 && "lg:pb-8 pb-20",
            )}>
              <div className={cn("max-w-6xl mx-auto w-full flex-1 flex flex-col", contentClassName)}>
                {children}
              </div>
            </div>
          </main>
          <SnackbarOutlet />
        </div>
      </div>

      {/* Mobile bottom nav */}
      {mobileNavItems && mobileNavItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container border-t border-outline-variant">
          <nav className="flex justify-around py-2">
            {mobileNavItems.map((item) => (
              <MobileNavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={item.id === activeItemId}
                onClick={() => onNavItemClick?.(item)}
              />
            ))}

            {mobileMoreItems && mobileMoreItems.length > 0 && (
              <MobileNavItem
                icon="more_horiz"
                label="More"
                onClick={(e) => {
                  moreTriggerRef.current = e.currentTarget as HTMLElement;
                  setMoreSheetOpen(true);
                }}
              />
            )}
          </nav>
        </div>
      )}

      {/* Mobile "More" bottom sheet */}
      {moreSheetOpen && (
        <>
          <div
            aria-hidden="true"
            className="lg:hidden fixed inset-0 z-50 bg-black/40"
            onClick={() => setMoreSheetOpen(false)}
          />
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="More navigation options"
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-low rounded-t-2xl border-t border-outline-variant"
          >
            <div className="w-12 h-1 bg-outline-variant rounded-full mx-auto mt-3 mb-2" />
            <div className="p-4 space-y-1">
              {mobileMoreItems?.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={item.id === activeItemId}
                  onClick={() => {
                    onNavItemClick?.(item);
                    setMoreSheetOpen(false);
                  }}
                />
              ))}

              {mobileMoreFooter && (
                <>
                  <div className="border-t border-outline-variant my-2" />
                  {mobileMoreFooter}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
