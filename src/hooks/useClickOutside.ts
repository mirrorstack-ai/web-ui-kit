import { useEffect, useRef, type RefObject } from "react";

export interface UseClickOutsideOptions {
  /** Refs treated as "inside" — a mousedown within any of them is ignored. */
  refs: RefObject<HTMLElement | null>[];
  /** Called when a mousedown lands outside every ref (or on Escape). */
  onDismiss: () => void;
  /** Attach the listeners only while true (e.g. while a popover is open). */
  enabled: boolean;
  /** Also dismiss on the Escape key. Defaults to true. */
  closeOnEscape?: boolean;
}

/**
 * Dismiss-on-outside behavior shared by popovers, dropdowns, and inline
 * editors: a document `mousedown` outside every supplied ref fires `onDismiss`,
 * and (by default) so does Escape. Listeners attach only while `enabled`.
 *
 * `onDismiss` is read through a ref, so callers may pass an inline closure
 * without re-subscribing the listeners every render.
 */
export function useClickOutside({
  refs,
  onDismiss,
  enabled,
  closeOnEscape = true,
}: UseClickOutsideOptions) {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!enabled) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      for (const ref of refs) {
        if (ref.current?.contains(target)) return;
      }
      onDismissRef.current();
    };
    document.addEventListener("mousedown", onMouseDown);
    let onKey: ((e: KeyboardEvent) => void) | undefined;
    if (closeOnEscape) {
      onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onDismissRef.current();
      };
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      if (onKey) document.removeEventListener("keydown", onKey);
    };
    // Ref objects are stable; spreading them keeps the lint rule satisfied
    // without re-subscribing on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, closeOnEscape, ...refs]);
}
