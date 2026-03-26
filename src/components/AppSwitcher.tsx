"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

export interface AppLink {
  id: string;
  label: string;
  description?: string;
  icon: string;
  href: string;
}

export interface AppSwitcherProps {
  /** Display name shown next to logo */
  currentApp: string;
  /** Logo element */
  logo: ReactNode;
  /** List of available apps */
  apps?: AppLink[];
  /** Currently active app id — must match one of the ids in `apps` */
  activeAppId?: string;
  className?: string;
}

const R = 16; // border-radius matching rounded-2xl

/** Builds the SVG path for the tab+panel outline with inverse corner. */
function buildOutline(tw: number, th: number, cw: number, ch: number) {
  // Guard: if trigger is wider than container (minus inverse corner), skip inverse corner
  if (tw + R + R >= cw) {
    return [
      `M ${R},0`,
      `H ${cw - R}`,
      `A ${R},${R} 0 0,1 ${cw},${R}`,
      `V ${ch - R}`,
      `A ${R},${R} 0 0,1 ${cw - R},${ch}`,
      `H ${R}`,
      `A ${R},${R} 0 0,1 0,${ch - R}`,
      `V ${R}`,
      `A ${R},${R} 0 0,1 ${R},0`,
      `Z`,
    ].join(" ");
  }

  // prettier-ignore
  return [
    `M ${R},0`,
    `H ${tw - R}`,                               // trigger top edge
    `A ${R},${R} 0 0,1 ${tw},${R}`,              // trigger top-right corner
    `V ${th - R}`,                                // trigger right edge down
    `A ${R},${R} 0 0,0 ${tw + R},${th}`,         // inverse corner (concave)
    `H ${cw - R}`,                                // panel top edge
    `A ${R},${R} 0 0,1 ${cw},${th + R}`,         // panel top-right corner
    `V ${ch - R}`,                                // panel right edge
    `A ${R},${R} 0 0,1 ${cw - R},${ch}`,         // panel bottom-right corner
    `H ${R}`,                                     // panel bottom edge
    `A ${R},${R} 0 0,1 0,${ch - R}`,             // panel bottom-left corner
    `V ${R}`,                                     // left edge up
    `A ${R},${R} 0 0,1 ${R},0`,                  // trigger top-left corner
    `Z`,
  ].join(" ");
}

export function AppSwitcher({
  currentApp,
  logo,
  apps = [],
  activeAppId,
  className,
}: AppSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [outline, setOutline] = useState("");
  const menuId = useId();

  const updateOutline = useCallback(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;
    setOutline(
      buildOutline(
        trigger.offsetWidth,
        trigger.offsetHeight,
        container.offsetWidth,
        container.offsetHeight,
      ),
    );
  }, []);

  useEffect(() => {
    if (!open) {
      setOutline("");
      return;
    }

    // Measure after layout
    const rafId = requestAnimationFrame(updateOutline);

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, updateOutline]);

  const filteredApps = apps.filter((app) => app.id !== activeAppId);

  return (
    <div ref={containerRef} className={cn("relative w-fit", className)}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className={cn(
          "relative z-10 flex items-center gap-2 cursor-pointer px-4 py-3",
          open
            ? "w-fit pr-6 rounded-t-2xl"
            : "rounded-xl bg-surface hover:bg-surface-container transition-colors",
        )}
      >
        {logo}
        <span className="text-sm font-semibold text-on-surface">
          {currentApp}
        </span>
        <span
          className={cn(
            "material-symbols-rounded text-on-surface-variant text-base transition-transform",
            open && "rotate-180",
          )}
        >
          expand_more
        </span>
      </button>

      {/* App list panel */}
      {open && filteredApps.length > 0 && (
        <div className="relative z-10 rounded-b-2xl rounded-tr-2xl shadow-lg">
          <div
            id={menuId}
            role="menu"
            aria-label="Switch application"
            className="px-2 pb-2"
          >
            {filteredApps.map((app) => (
              <a
                key={app.id}
                href={app.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors hover:bg-surface-container"
              >
                <span className="material-symbols-rounded text-xl shrink-0 text-on-surface-variant">
                  {app.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate text-on-surface">
                    {app.label}
                  </p>
                  {app.description && (
                    <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                      {app.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Unified outline — single SVG draws the full tab+panel shape + border */}
      {open && outline && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <path
            d={outline}
            stroke="var(--color-outline-variant)"
            fill="var(--color-surface-container-low)"
            strokeWidth="1"
          />
        </svg>
      )}
    </div>
  );
}
