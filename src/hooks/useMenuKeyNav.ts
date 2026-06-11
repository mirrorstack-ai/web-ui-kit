import { useState, type KeyboardEvent } from "react";

export interface UseMenuKeyNavOptions {
  /** Total number of entries rendered in the menu. */
  itemCount: number;
  /** Indices reachable by Arrow/Home/End traversal. Defaults to every index —
   *  pass a subset to skip entries (e.g. separators, disabled items) entirely. */
  traversableIndices?: number[];
  /** Whether Enter/Space may activate the entry at `index`. */
  canActivate: (index: number) => boolean;
  /** Activate the entry at `index` (select + close, as the caller sees fit). */
  onActivate: (index: number) => void;
  /** Close the menu. `returnFocus` is true for Escape, false for Tab; callers
   *  without a focus-return story may ignore it. */
  onClose: (returnFocus: boolean) => void;
}

/**
 * Roving-active-index keyboard navigation shared by the kit's menus
 * (DropdownMenu, AgentSidebarInput's model listbox): ArrowDown/ArrowUp wrap
 * through the traversable entries, Home/End jump to the extremes, Enter/Space
 * activates (when allowed), Escape closes asking for focus return, Tab closes
 * without. The caller owns open state and seeds/clears `activeIndex` via the
 * returned setter.
 */
export function useMenuKeyNav({
  itemCount,
  traversableIndices,
  canActivate,
  onActivate,
  onClose,
}: UseMenuKeyNavOptions) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const indices =
    traversableIndices ?? Array.from({ length: itemCount }, (_, i) => i);

  const findNext = (current: number) => {
    const pos = indices.indexOf(current);
    if (pos === -1) return indices[0] ?? -1;
    return indices[(pos + 1) % indices.length] ?? -1;
  };

  const findPrev = (current: number) => {
    const pos = indices.indexOf(current);
    if (pos === -1) return indices[indices.length - 1] ?? -1;
    return indices[(pos - 1 + indices.length) % indices.length] ?? -1;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
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
        setActiveIndex(indices[0] ?? -1);
        break;
      }
      case "End": {
        e.preventDefault();
        setActiveIndex(indices[indices.length - 1] ?? -1);
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        if (canActivate(activeIndex)) onActivate(activeIndex);
        break;
      }
      case "Escape": {
        e.preventDefault();
        onClose(true);
        break;
      }
      case "Tab": {
        onClose(false);
        break;
      }
    }
  };

  return { activeIndex, setActiveIndex, handleKeyDown };
}
