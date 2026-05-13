// Tailwind-style responsive resolution for the notch grid.
//
// A "responsive" value can be a single value, or a map keyed by breakpoint name
// (`base`, `sm`, `md`, …) or a raw min-width in px (`0`, `560`, `900`, …). At a
// given container width, the entry with the largest threshold `<= width` wins —
// exactly the mobile-first cascade Tailwind uses.

import { maskCols } from "@/utils/grid-outline";

/** Default breakpoint thresholds (min container width, px). Mirrors Tailwind.
 *  Override per-grid via `<NotchGrid breakpoints={…}>`. */
export const NOTCH_BREAKPOINTS = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type NotchBreakpointName = keyof typeof NOTCH_BREAKPOINTS;

/** Breakpoint name → min container width (px). */
export type NotchBreakpoints = Record<string, number>;

/** A value that may vary by breakpoint. Map keys are breakpoint names or raw
 *  px thresholds (as numbers or numeric strings). `base` / `0` = no minimum. */
export type Responsive<T> = T | { [key: string]: T };

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v != null && typeof v === "object" && !Array.isArray(v);
}

function thresholdPx(key: string, breakpoints: NotchBreakpoints): number {
  if (key in breakpoints) return breakpoints[key];
  const n = Number(key);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Resolve a {@link Responsive} value for `width`. Returns `value` itself when it
 * is not a breakpoint map. For a map, picks the entry whose threshold is the
 * largest one `<= width`, falling back to the entry with the smallest threshold.
 */
export function resolveResponsive<T>(
  value: Responsive<T>,
  width: number,
  breakpoints: NotchBreakpoints = NOTCH_BREAKPOINTS,
): T {
  if (!isPlainObject(value)) return value as T;
  const entries = Object.entries(value)
    .map(([key, val]) => [thresholdPx(key, breakpoints), val] as const)
    .sort((a, b) => a[0] - b[0]);
  if (entries.length === 0) return value as unknown as T; // degenerate empty map
  let chosen = entries[0][1];
  for (const [px, val] of entries) {
    if (width >= px) chosen = val;
    else break;
  }
  return chosen;
}

// --- Shape resolution -------------------------------------------------------

/** A shape's block footprint matrix. `0` = empty/notch, `1` = filled, `2+` =
 *  tier-encoded (joins via `tier`). */
export type ShapeMatrix = number[][];

/** Candidate `[cols, rows]` block costs — the grid picks the largest whose
 *  `cols` still fits the available column count, so the component grows when
 *  there's room. e.g. `{ sizes: [[1, 1], [2, 2]] }`. Order doesn't matter. */
export type ShapeSizes = { readonly sizes: ReadonlyArray<readonly number[]> };

/** Candidate footprint matrices in **priority order** (most-preferred first) —
 *  the grid uses the first one whose width fits the column count, falling back
 *  to the narrowest. e.g. `{ prefer: [[[1,1,1],[1,1,0]], [[1,1],[1,1]], [[1]]] }`. */
export type ShapePreferences = { readonly prefer: ReadonlyArray<ShapeMatrix> };

/** Every form a {@link NotchGridItem} `shape` can take. */
export type NotchShape = Responsive<ShapeMatrix> | ShapeSizes | ShapePreferences;

export function isShapeSizes(v: NotchShape): v is ShapeSizes {
  return isPlainObject(v) && Array.isArray((v as ShapeSizes).sizes);
}

export function isShapePreferences(v: NotchShape): v is ShapePreferences {
  return isPlainObject(v) && Array.isArray((v as ShapePreferences).prefer);
}

/** Solid `cols × rows` matrix (all `1`s). */
export function rectMatrix(cols: number, rows: number): ShapeMatrix {
  const c = Math.max(1, Math.floor(cols));
  const r = Math.max(1, Math.floor(rows));
  return Array.from({ length: r }, () => Array<number>(c).fill(1));
}

/**
 * Collapse any {@link NotchShape} to a plain matrix for the current container
 * `width` and column `columns` count:
 *  - `{ prefer: [m0, m1, …] }` — the first matrix that fits `columns`, else the narrowest;
 *  - `{ sizes: [[c,r], …] }` — the biggest `[cols,rows]` that fits `columns`, else the smallest;
 *  - `{ base: …, md: … }` — the Tailwind-style cascade against `width`;
 *  - a bare matrix — passes through.
 */
export function resolveShapeMatrix(
  shape: NotchShape,
  ctx: { width: number; columns: number; breakpoints?: NotchBreakpoints },
): ShapeMatrix {
  if (isShapePreferences(shape)) {
    const cands = shape.prefer.filter((m) => m.length > 0 && maskCols(m) > 0);
    if (cands.length === 0) return [[1]];
    const fits = cands.find((m) => maskCols(m) <= ctx.columns);
    return fits ?? cands.reduce((best, m) => (maskCols(m) < maskCols(best) ? m : best));
  }
  if (isShapeSizes(shape)) {
    const dims = shape.sizes.map((s) => [s[0] ?? 1, s[1] ?? s[0] ?? 1] as const);
    const sorted = [...dims].sort((a, b) => a[0] - b[0]);
    let chosen = sorted[0] ?? ([1, 1] as const);
    for (const size of sorted) if (size[0] <= ctx.columns) chosen = size;
    return rectMatrix(chosen[0], chosen[1]);
  }
  return resolveResponsive(shape, ctx.width, ctx.breakpoints);
}
