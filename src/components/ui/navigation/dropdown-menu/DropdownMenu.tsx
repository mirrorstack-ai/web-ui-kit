import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  useId,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Notch } from "@/components/ui/surfaces/notch/Notch";
import { useMenuKeyNav } from "@/hooks/useMenuKeyNav";

const DD_NOTCH_W = 52;
const DD_NOTCH_H = 46;
const DD_R = 16;
const DD_IR = 10;
const DD_SW = 1.5;

// Grace before a hover-opened menu closes on pointer-leave. Outlasts a normal
// mouse traversal of the trigger->menu gap (8px no-notch / ~0 notch) so the
// menu doesn't dismiss mid-travel; short enough to feel responsive on an
// intentional leave. Private by design — no caller needs to tune it yet.
const HOVER_CLOSE_GRACE_MS = 150;

// Item density tokens per `size` — "lg" pads up to comfortable touch targets.
const SIZES = {
  md: { item: "gap-2 px-2 py-1.5", icon: 16, minW: "min-w-[180px]", sep: "mx-1.5" },
  lg: { item: "gap-2.5 px-3 py-2.5", icon: 18, minW: "min-w-[200px]", sep: "mx-2" },
} as const;

export const meta: ComponentMeta = {
  name: "DropdownMenu",
  description:
    "Action dropdown menu with keyboard navigation, icon support, and error variant.",
};

export interface DropdownMenuItem {
  id: string;
  label: string;
  /** Leading icon: a Material Symbols name, or a custom node (e.g. a brand-logo
   *  SVG that Material Symbols can't provide). A custom node should size itself
   *  to ~`size` and use `currentColor` so it inherits the muted icon colour. */
  icon?: string | ReactNode;
  /** Marks an item that opens externally (a new tab): renders a trailing
   *  open-in-new glyph as the affordance. Performing the navigation is still the
   *  caller's job in `onSelect`. */
  external?: boolean;
  /** `"danger"` is a deprecated alias for `"error"`. */
  variant?: "default" | "error" | "danger";
  disabled?: boolean;
}

export interface DropdownMenuSeparator {
  type: "separator";
}

export type DropdownMenuEntry = DropdownMenuItem | DropdownMenuSeparator;

export interface DropdownMenuProps {
  items: DropdownMenuEntry[];
  onSelect: (item: DropdownMenuItem) => void;
  trigger: ReactNode;
  /** Horizontal offset from trigger. Positive = from start (left), negative = from end (right) */
  offset?: number;
  /** Width of the notch tab (SVG units). Default `52`. */
  notchWidth?: number;
  /** Height of the notch tab (SVG units). Default `46`. */
  notchHeight?: number;
  /** Corner radius of the notch outline (SVG units). Default `16`. Lower it to
   *  match a small trigger's own radius for a less-rounded head (e.g. an icon
   *  button with an 8px radius). */
  notchRadius?: number;
  /** Radius of the notch's inverse (concave) corners, where the tab curves back
   *  into the card (SVG units). Default `10`. Usually scaled down alongside
   *  `notchRadius` for a tighter head. */
  notchInverseRadius?: number;
  /** Stroke (border) width of the notch outline, in px. Default `1.5`. */
  notchStrokeWidth?: number;
  /** Render the kit's signature notch wrapping the trigger. Default `true`. Set
   *  to `false` for a plain floating menu (e.g. selects, period pickers). */
  useNotch?: boolean;
  /** Which side of the trigger the menu opens toward. `"top"` opens upward —
   *  use it for triggers anchored to the bottom of the viewport (e.g. a mobile
   *  bottom nav), where a downward menu would fall off-screen. Default `"bottom"`. */
  placement?: "top" | "bottom";
  /** Item density. `"lg"` enlarges padding, text, and icons to comfortable
   *  touch targets — use it for menus opened on touch surfaces (e.g. a mobile
   *  bottom nav). `"md"` is the default desktop density. */
  size?: "md" | "lg";
  /** Open the menu on mouse hover of the trigger, in addition to click.
   *  The menu stays open while the pointer is over the trigger OR the floating
   *  menu, and closes after a short grace on leave so trigger->menu travel does
   *  not dismiss it. Mouse-only: no-op on touch/pen (which keep tap-to-toggle)
   *  and for keyboard. Default `false` — hover menus hurt touch and keyboard
   *  discoverability, so opt in deliberately (e.g. a desktop toolbar overflow
   *  menu, not a mobile bottom-nav menu).
   *
   *  COUPLING NOTE: relies on the menu rendering INLINE inside `containerRef`
   *  (no portal). If DropdownMenu ever moves to a portal, hover-leave detection
   *  must be reworked (the menu would no longer be a container descendant). */
  openOnHover?: boolean;
  /** Class applied to the floating menu element (the notched card) — use it to
   *  fine-tune the menu's position relative to the trigger, e.g. a translate
   *  to nudge the whole notched card off the auto-aligned anchor. */
  menuClassName?: string;
  className?: string;
}

function isSeparator(entry: DropdownMenuEntry): entry is DropdownMenuSeparator {
  return "type" in entry && entry.type === "separator";
}

function isActionable(entry: DropdownMenuEntry): entry is DropdownMenuItem {
  return !isSeparator(entry) && !entry.disabled;
}

export function DropdownMenu({
  items,
  onSelect,
  trigger,
  offset = 0,
  notchWidth = DD_NOTCH_W,
  notchHeight = DD_NOTCH_H,
  notchRadius = DD_R,
  notchInverseRadius = DD_IR,
  notchStrokeWidth = DD_SW,
  useNotch = true,
  placement = "bottom",
  size = "md",
  openOnHover = false,
  menuClassName,
  className,
}: DropdownMenuProps) {
  const fromEnd = offset < 0 || Object.is(offset, -0);
  const openUp = placement === "top";
  const sz = SIZES[size];
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [contentH, setContentH] = useState(0);
  const [menuW, setMenuW] = useState(0);
  const menuId = useId();

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current != null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const actionableIndices = items
    .map((entry, i) => (isActionable(entry) ? i : -1))
    .filter((i) => i !== -1);

  const { activeIndex, setActiveIndex, handleKeyDown } = useMenuKeyNav({
    itemCount: items.length,
    traversableIndices: actionableIndices,
    canActivate: (index) => {
      const entry = items[index];
      return !!entry && isActionable(entry);
    },
    onActivate: (index) => {
      const entry = items[index];
      if (entry && isActionable(entry)) {
        onSelect(entry);
        closeMenu();
      }
    },
    // DropdownMenu never moves focus on close (the trigger node is
    // caller-owned), so `returnFocus` is ignored.
    onClose: () => closeMenu(),
  });

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
    setActiveIndex(actionableIndices[0] ?? -1);
  }, [actionableIndices, setActiveIndex, clearCloseTimer]);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(false);
    setActiveIndex(-1);
  }, [setActiveIndex, clearCloseTimer]);

  useEffect(() => {
    if (!open) return;

    const raf = requestAnimationFrame(() => {
      menuRef.current?.focus();
    });

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousedown", handleClickOutside);
      // A pending hover-close must not setState after the menu closes.
      clearCloseTimer();
    };
  }, [open, closeMenu, clearCloseTimer]);

  // Guaranteed unmount kill: the open-effect only runs while open, so it alone
  // does not cover unmount-while-closed.
  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useLayoutEffect(() => {
    if (!open || !contentRef.current) return;
    setContentH(contentRef.current.offsetHeight);
    setMenuW(contentRef.current.offsetWidth);
  }, [open, items.length]);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      onPointerEnter={
        openOnHover
          ? (e) => {
              if (e.pointerType !== "mouse") return; // touch/pen -> tap-to-toggle only
              clearCloseTimer();
              if (!open) openMenu();
            }
          : undefined
      }
      onPointerLeave={
        openOnHover
          ? (e) => {
              if (e.pointerType !== "mouse") return;
              clearCloseTimer();
              closeTimer.current = window.setTimeout(() => {
                closeTimer.current = null;
                closeMenu();
              }, HOVER_CLOSE_GRACE_MS);
            }
          : undefined
      }
    >
      <div
        className={cn("relative", open && "z-[51]")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => {
          if (open) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
      >
        {trigger}
      </div>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={cn("absolute z-50 overflow-visible outline-none", menuClassName)}
          style={{
            // Notch mode adds extra -5/-7 to compensate for the curve
            // overlapping the trigger; no-notch mode anchors flush to
            // the trigger edge. `openUp` anchors to the trigger's bottom
            // so the menu grows upward instead of down.
            [openUp ? "bottom" : "top"]: useNotch ? -7 : "calc(100% + 8px)",
            [fromEnd ? "right" : "left"]: useNotch
              ? (fromEnd ? -6 : -7) - Math.abs(offset)
              : -Math.abs(offset),
            filter: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))",
          }}
        >
          {useNotch && contentH > 0 && menuW > 0 && (
            <Notch
              width={menuW}
              height={contentH}
              notchWidth={notchWidth}
              notchHeight={notchHeight}
              notchSide={openUp ? "top" : "bottom"}
              notchOffset={offset}
              radius={notchRadius}
              inverseRadius={notchInverseRadius}
              stroke="var(--color-primary)"
              strokeWidth={notchStrokeWidth}
              className={cn("absolute left-0", openUp ? "bottom-0" : "top-0")}
            />
          )}
          <div
            ref={contentRef}
            className={cn(
              "relative z-10 flex flex-col gap-1 p-2",
              sz.minW,
              !useNotch &&
                "rounded-lg border border-outline-variant bg-surface-container-low",
            )}
            style={{ [openUp ? "marginBottom" : "marginTop"]: useNotch ? notchHeight : 0 }}
          >
            {items.map((entry, index) => {
              if (isSeparator(entry)) {
                return (
                  <div
                    key={`sep-${index}`}
                    role="separator"
                    className={cn("my-1 h-px bg-outline-variant", sz.sep)}
                  />
                );
              }

              const item = entry;
              const isActive = index === activeIndex;
              if (isDev && item.variant === "danger") {
                console.warn(
                  '[DropdownMenu] variant="danger" is deprecated; use "error".',
                );
              }
              const isError =
                item.variant === "error" || item.variant === "danger";

              return (
                <div
                  key={item.id}
                  role="menuitem"
                  aria-disabled={item.disabled || undefined}
                  className={cn(
                    "flex cursor-pointer items-center rounded-lg text-left text-sm transition-colors",
                    sz.item,
                    item.disabled && "pointer-events-none opacity-50",
                    isError ? "text-error" : "text-on-surface",
                    isActive &&
                      (isError
                        ? "bg-error/8"
                        : "bg-on-surface/8"),
                  )}
                  onClick={() => {
                    if (item.disabled) return;
                    onSelect(item);
                    closeMenu();
                  }}
                  onMouseEnter={() => {
                    if (!item.disabled) setActiveIndex(index);
                  }}
                >
                  {item.icon != null &&
                    (typeof item.icon === "string" ? (
                      <Icon
                        name={item.icon}
                        size={sz.icon}
                        className={cn(
                          "shrink-0",
                          isError ? "text-error" : "text-on-surface-variant",
                        )}
                      />
                    ) : (
                      <span
                        className={cn(
                          "flex shrink-0 items-center",
                          isError ? "text-error" : "text-on-surface-variant",
                        )}
                      >
                        {item.icon}
                      </span>
                    ))}
                  {item.label}
                  {item.external && (
                    <Icon
                      name="open_in_new"
                      size={sz.icon - 3}
                      className="ml-auto shrink-0 text-on-surface-variant/60"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
