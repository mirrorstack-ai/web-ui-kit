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
import type { ComponentMeta } from "@/types/component-meta";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Notch } from "@/components/ui/surfaces/notch/Notch";

const DD_NOTCH_W = 52;
const DD_NOTCH_H = 46;
const DD_R = 12;
const DD_IR = 10;

export const meta: ComponentMeta = {
  name: "DropdownMenu",
  description:
    "Action dropdown menu with keyboard navigation, icon support, and danger variant.",
};

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: string;
  variant?: "default" | "danger";
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
  className,
}: DropdownMenuProps) {
  const fromEnd = offset < 0 || Object.is(offset, -0);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);
  const [menuW, setMenuW] = useState(0);
  const menuId = useId();

  const actionableIndices = items
    .map((entry, i) => (isActionable(entry) ? i : -1))
    .filter((i) => i !== -1);

  const findNext = useCallback(
    (current: number) => {
      const pos = actionableIndices.indexOf(current);
      if (pos === -1) return actionableIndices[0] ?? -1;
      return actionableIndices[(pos + 1) % actionableIndices.length] ?? -1;
    },
    [actionableIndices],
  );

  const findPrev = useCallback(
    (current: number) => {
      const pos = actionableIndices.indexOf(current);
      if (pos === -1)
        return actionableIndices[actionableIndices.length - 1] ?? -1;
      return (
        actionableIndices[
          (pos - 1 + actionableIndices.length) % actionableIndices.length
        ] ?? -1
      );
    },
    [actionableIndices],
  );

  const openMenu = useCallback(() => {
    setOpen(true);
    setActiveIndex(actionableIndices[0] ?? -1);
  }, [actionableIndices]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setActiveIndex((prev) => findNext(prev));
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setActiveIndex((prev) => findPrev(prev));
          break;
        }
        case "Home": {
          e.preventDefault();
          setActiveIndex(actionableIndices[0] ?? -1);
          break;
        }
        case "End": {
          e.preventDefault();
          setActiveIndex(
            actionableIndices[actionableIndices.length - 1] ?? -1,
          );
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (activeIndex >= 0) {
            const entry = items[activeIndex];
            if (entry && isActionable(entry)) {
              onSelect(entry);
              closeMenu();
            }
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          closeMenu();
          break;
        }
        case "Tab": {
          closeMenu();
          break;
        }
      }
    },
    [findNext, findPrev, actionableIndices, activeIndex, items, onSelect, closeMenu],
  );

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <div
        className="relative z-[51]"
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
          className="absolute z-50 overflow-visible outline-none"
          style={{
            top: -7,
            [fromEnd ? "right" : "left"]: (fromEnd? -5 : -7) - Math.abs(offset),
            filter: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))",
          }}
        >
          {contentH > 0 && menuW > 0 && (
            <Notch
              width={menuW}
              height={contentH}
              notchWidth={DD_NOTCH_W}
              notchHeight={DD_NOTCH_H}
              notchSide="bottom"
              notchOffset={offset}
              radius={DD_R}
              inverseRadius={DD_IR}
              stroke="var(--color-primary)"
              strokeWidth={1.5}
              className="absolute top-0 left-0"
            />
          )}
          <div
            ref={contentRef}
            className="relative z-10 min-w-[180px] py-1.5 px-1"
            style={{ marginTop: DD_NOTCH_H }}
          >
            {items.map((entry, index) => {
              if (isSeparator(entry)) {
                return (
                  <div
                    key={`sep-${index}`}
                    role="separator"
                    className="my-1 h-px bg-outline-variant mx-1.5"
                  />
                );
              }

              const item = entry;
              const isActive = index === activeIndex;
              const isDanger = item.variant === "danger";

              return (
                <div
                  key={item.id}
                  role="menuitem"
                  aria-disabled={item.disabled || undefined}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition-colors rounded-md",
                    item.disabled && "pointer-events-none opacity-38",
                    isDanger ? "text-error" : "text-on-surface",
                    isActive &&
                      (isDanger
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
                      size={20}
                      className={isDanger ? "text-error" : "text-on-surface-variant"}
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
