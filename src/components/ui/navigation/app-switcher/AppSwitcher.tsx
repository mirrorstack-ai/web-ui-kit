import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";

export const meta: ComponentMeta = {
  name: "AppSwitcher",
  description:
    "Dropdown app switcher with tab-shaped trigger and SVG-drawn unified outline",
};

export interface AppLink {
  id: string;
  label: string;
  description?: string;
  icon: string;
  href: string;
}

export interface AppSwitcherProps {
  currentApp: string;
  logo: ReactNode;
  apps?: AppLink[];
  activeAppId?: string;
  className?: string;
}

const R = 16;

function buildOutline(tw: number, th: number, cw: number, ch: number) {
  if (tw + R + R >= cw) {
    return [
      `M ${R},0`, `H ${cw - R}`,
      `A ${R},${R} 0 0,1 ${cw},${R}`, `V ${ch - R}`,
      `A ${R},${R} 0 0,1 ${cw - R},${ch}`, `H ${R}`,
      `A ${R},${R} 0 0,1 0,${ch - R}`, `V ${R}`,
      `A ${R},${R} 0 0,1 ${R},0`, `Z`,
    ].join(" ");
  }

  return [
    `M ${R},0`, `H ${tw - R}`,
    `A ${R},${R} 0 0,1 ${tw},${R}`, `V ${th - R}`,
    `A ${R},${R} 0 0,0 ${tw + R},${th}`,
    `H ${cw - R}`, `A ${R},${R} 0 0,1 ${cw},${th + R}`,
    `V ${ch - R}`, `A ${R},${R} 0 0,1 ${cw - R},${ch}`,
    `H ${R}`, `A ${R},${R} 0 0,1 0,${ch - R}`,
    `V ${R}`, `A ${R},${R} 0 0,1 ${R},0`, `Z`,
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
        <Icon
          name="expand_more"
          size={16}
          className={cn(
            "text-on-surface-variant transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && filteredApps.length > 0 && (
        <div className="relative z-10 rounded-b-2xl rounded-tr-2xl shadow-lg">
          <div id={menuId} role="menu" aria-label="Switch application" className="px-2 pb-2">
            {filteredApps.map((app) => (
              <a
                key={app.id}
                href={app.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors hover:bg-surface-container"
              >
                <Icon name={app.icon} size={20} className="shrink-0 text-on-surface-variant" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate text-on-surface">{app.label}</p>
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
