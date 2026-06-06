import { useLayoutEffect, type RefObject } from "react";

export interface AutoGrowTextareaBounds {
  /** Minimum height (px). Omit to let the textarea collapse to its content. */
  min?: number;
  /** Maximum height (px). Beyond this the textarea scrolls internally. */
  max?: number;
}

/**
 * Auto-sizes a textarea to its content on every `value` change: reset to `auto`
 * to measure the natural `scrollHeight`, then clamp into the `[min, max]` range.
 *
 * Runs in a layout effect so the height is committed before paint (no flicker).
 */
export function useAutoGrowTextarea(
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string,
  { min, max }: AutoGrowTextareaBounds = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    let next = el.scrollHeight;
    if (min !== undefined) next = Math.max(next, min);
    if (max !== undefined) next = Math.min(next, max);
    el.style.height = `${next}px`;
  }, [ref, value, min, max]);
}
