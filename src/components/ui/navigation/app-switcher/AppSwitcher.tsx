import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
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

/**
 * The floor on how wide the open panel is, independent of the trigger.
 *
 * 🔴 THE TRIGGER USED TO SET THE MENU'S WIDTH, and the trigger is a product
 * name. The container is `w-fit`, so a switcher labelled 帳號 opened a menu
 * about that wide: every row's label hit `truncate` and every description hit
 * `line-clamp-1`, so a menu whose entire job is to describe the places you can
 * go described none of them. The narrower the current app's name, the less
 * legible the menu — exactly backwards.
 *
 * A floor rather than a fixed width: a long app name still widens the tab, and
 * the panel follows it rather than wrapping under it. 16rem fits an icon, a
 * label and a one-line description at the padding these rows already use.
 *
 * 16rem = 256px, the design system's standard menu width. It was 17rem (272px);
 * the extra rem bought nothing at the row padding in use and made the panel sit
 * wider than every other dropdown on the surface. Kept as a FLOOR, not a fixed
 * width, so the original defect this constant exists to prevent — the trigger's
 * app name deciding how legible the menu is — stays fixed.
 */
const MENU_MIN_W = "16rem";

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
        trigger.offsetHeight - 7,
        container.offsetWidth,
        container.offsetHeight,
      ),
    );
  }, []);

  /**
   * 🔴 A LAYOUT EFFECT, BECAUSE THE POINT IS TO BEAT THE PAINT. The outline
   * used to be measured only inside `requestAnimationFrame`, which left ONE
   * PAINTED FRAME with `outline` still empty: the card was open, the trigger
   * had swapped to its open styling, and nothing was drawn behind either. The
   * control blinked transparent over the page on every open, and consumers
   * papered over it by painting their own backgrounds.
   *
   * `useEffect` does NOT fix that — it is passive and runs AFTER paint, so
   * moving the call there would only have made the blank frame shorter, not
   * absent. `useLayoutEffect` runs before the browser paints, so the first
   * frame of the open state already has its shape.
   *
   * `open &&` rather than an early return: the hook must be called on every
   * render, and the closed case has nothing to measure — the effect below
   * clears the outline.
   */
  useLayoutEffect(() => {
    if (open) updateOutline();
  }, [open, updateOutline]);

  useEffect(() => {
    if (!open) {
      setOutline("");
      return;
    }

    // The rAF stays as a CORRECTION, not the primary measurement: a font or an
    // image landing in this frame changes the trigger's width after the layout
    // effect above has already read it.
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
        aria-label={`Current app: ${currentApp}`}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className={cn(
          "relative z-10 flex items-center gap-2 cursor-pointer pl-4 pr-6 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          // 🔴 THE CLOSED TRIGGER IS OPAQUE. It floats in a band its host
          // renders `absolute … pointer-events-none` with no fill, so a page
          // scrolling underneath used to show THROUGH the control. `background`
          // rather than a surface token: the job is to occlude what passes
          // under, and the page's own colour does that without drawing a second
          // card on top of the notch the trigger already sits in — and it
          // follows a themed host, which a fixed surface token cannot.
          //
          // 🔴 OPEN, IT MUST NOT PAINT AT ALL. The notch is one path with a 1px
          // stroke CENTRED on it, so half the stroke falls inside the shape and
          // the open trigger's box sits exactly on that boundary: any fill
          // there covers the inner half and the border reads as cut away. No
          // colour fixes it — matching the card's own fill still eats it.
          //
          // The transition carries the RADIUS as well as the colour, because
          // the class swap below is instant: fading the fill while the corners
          // snapped square showed a frame of hard corners.
          "transition-[background-color,border-radius] duration-150",
          open
            ? "w-fit pr-6 rounded-t-2xl"
            : "rounded-2xl bg-background hover:bg-surface-container",
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
        <div
          className="relative z-10 rounded-b-2xl rounded-tr-2xl shadow-lg"
          style={{ minWidth: MENU_MIN_W }}
        >
          <nav id={menuId} aria-label="Switch application" className="px-2 pb-2">
            <ul>
              {filteredApps.map((app) => (
                <li key={app.id}>
                  <a
                    href={app.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                </li>
              ))}
            </ul>
          </nav>
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
