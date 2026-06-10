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
  icon?: string;
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
  useNotch = true,
  placement = "bottom",
  size = "md",
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
  const [contentH, setContentH] = useState(0);
  const [menuW, setMenuW] = useState(0);
  const menuId = useId();

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
    setOpen(true);
    setActiveIndex(actionableIndices[0] ?? -1);
  }, [actionableIndices, setActiveIndex]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, [setActiveIndex]);

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
    };
  }, [open, closeMenu]);

  useLayoutEffect(() => {
    if (!open || !contentRef.current) return;
    setContentH(contentRef.current.offsetHeight);
    setMenuW(contentRef.current.offsetWidth);
  }, [open, items.length]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <div
        className={cn("relative", open && "z-[51]")}
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
              ? (fromEnd ? -5 : -7) - Math.abs(offset)
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
              radius={DD_R}
              inverseRadius={DD_IR}
              stroke="var(--color-primary)"
              strokeWidth={1.5}
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
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      size={sz.icon}
                      className={cn(
                        "shrink-0",
                        isError ? "text-error" : "text-on-surface-variant",
                      )}
                    />
                  )}
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
