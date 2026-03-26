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

export interface DropdownMenuItem {
  /** Unique key for the item */
  id: string;
  /** Display label */
  label: string;
  /** Material Symbols icon name */
  icon?: string;
  /** Visual variant */
  variant?: "default" | "danger";
  /** Disable the item */
  disabled?: boolean;
}

export interface DropdownMenuSeparator {
  type: "separator";
}

export type DropdownMenuEntry = DropdownMenuItem | DropdownMenuSeparator;

export interface DropdownMenuProps {
  /** Menu items and separators */
  items: DropdownMenuEntry[];
  /** Called when an item is selected */
  onSelect: (item: DropdownMenuItem) => void;
  /** Trigger element (the button that opens the menu) */
  trigger: ReactNode;
  /** Alignment of the dropdown relative to the trigger */
  align?: "start" | "end";
  className?: string;
}

function isSeparator(
  entry: DropdownMenuEntry,
): entry is DropdownMenuSeparator {
  return "type" in entry && entry.type === "separator";
}

/**
 * Dropdown action menu with keyboard navigation.
 *
 * @example
 * ```tsx
 * <DropdownMenu
 *   trigger={<IconButton icon="more_vert" aria-label="Actions" />}
 *   items={[
 *     { id: "edit", label: "Edit", icon: "edit" },
 *     { id: "duplicate", label: "Duplicate", icon: "content_copy" },
 *     { type: "separator" },
 *     { id: "delete", label: "Delete", icon: "delete", variant: "danger" },
 *   ]}
 *   onSelect={(item) => handleAction(item.id)}
 * />
 * ```
 */
export function DropdownMenu({
  items,
  onSelect,
  trigger,
  align = "end",
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const actionableItems = items.filter(
    (entry): entry is DropdownMenuItem =>
      !isSeparator(entry) && !entry.disabled,
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Focus menu when it opens
  useEffect(() => {
    if (open && menuRef.current) {
      menuRef.current.focus();
    }
  }, [open]);

  const handleSelect = useCallback(
    (item: DropdownMenuItem) => {
      if (item.disabled) return;
      onSelect(item);
      setOpen(false);
      setActiveIndex(-1);
    },
    [onSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (
          e.key === "ArrowDown" ||
          e.key === "Enter" ||
          e.key === " "
        ) {
          e.preventDefault();
          setOpen(true);
          setActiveIndex(0);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setActiveIndex(-1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < actionableItems.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : actionableItems.length - 1,
          );
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(actionableItems.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (
            activeIndex >= 0 &&
            activeIndex < actionableItems.length
          ) {
            handleSelect(actionableItems[activeIndex]);
          }
          break;
        case "Tab":
          setOpen(false);
          setActiveIndex(-1);
          break;
      }
    },
    [open, activeIndex, actionableItems, handleSelect],
  );

  const activeItemId =
    activeIndex >= 0 && actionableItems[activeIndex]
      ? `${menuId}-item-${actionableItems[activeIndex].id}`
      : undefined;

  // Build a flat index for actionable items within the full items list
  let actionableIdx = -1;

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={triggerRef}
        onClick={() => {
          setOpen((prev) => !prev);
          if (!open) setActiveIndex(-1);
        }}
      >
        {trigger}
      </div>

      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          role="menu"
          tabIndex={-1}
          aria-activedescendant={activeItemId}
          className={cn(
            "absolute z-30 mt-1 min-w-[180px] rounded-xl border border-outline-variant bg-surface-container-low shadow-lg py-1 outline-none",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {items.map((entry, i) => {
            if (isSeparator(entry)) {
              return (
                <li
                  key={`sep-${i}`}
                  role="separator"
                  className="my-1 border-t border-outline-variant"
                />
              );
            }

            const item = entry;
            const variant = item.variant ?? "default";

            // Track actionable index for highlight matching
            if (!item.disabled) {
              actionableIdx++;
            }
            const isHighlighted =
              !item.disabled && actionableIdx === activeIndex;
            const itemId = `${menuId}-item-${item.id}`;

            return (
              <li
                key={item.id}
                id={itemId}
                role="menuitem"
                aria-disabled={item.disabled || undefined}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => {
                  if (!item.disabled) {
                    // Find this item's actionable index
                    let idx = 0;
                    for (const ai of actionableItems) {
                      if (ai.id === item.id) break;
                      idx++;
                    }
                    setActiveIndex(idx);
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors mx-1 rounded-lg",
                  variant === "danger"
                    ? "text-error hover:bg-error/8"
                    : "text-on-surface hover:bg-surface-container",
                  isHighlighted &&
                    (variant === "danger"
                      ? "bg-error/8"
                      : "bg-surface-container"),
                  item.disabled &&
                    "opacity-50 cursor-not-allowed hover:bg-transparent",
                )}
              >
                {item.icon && (
                  <span
                    className={cn(
                      "material-symbols-rounded",
                      variant === "danger"
                        ? "text-error"
                        : "text-on-surface-variant",
                    )}
                    style={{ fontSize: 20 }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
