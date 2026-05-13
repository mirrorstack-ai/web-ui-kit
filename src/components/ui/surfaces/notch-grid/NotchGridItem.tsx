import type { CSSProperties, Key, ReactNode } from "react";
import type { ComponentMeta } from "@/types/component-meta";
import { maxTier } from "@/utils/grid-outline";
import { BlockShape } from "./BlockShape";
import { resolveShapeMatrix, type NotchShape } from "./breakpoints";

export const meta: ComponentMeta = {
  name: "NotchGridItem",
  description:
    "One cell of a NotchGrid — a (responsive) block-shape footprint, or a panel of sub-items each with a block cost, plus content; the grid positions it",
};

export type { NotchShape };

/** A widget inside a {@link NotchGridItem} panel. Costs `[cols, rows]` blocks;
 *  the parent's notched footprint is the union of its sub-items' positions. A
 *  bare `[cols, rows]` tuple is shorthand for `{ cost: [cols, rows] }`. */
export interface NotchSubItem {
  key?: Key;
  /** Block cost `[cols, rows]`. */
  cost: readonly [number, number];
  /** Explicit position within the panel (block units). Auto-flowed when omitted. */
  col?: number;
  row?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
  inverseRadius?: number;
  pad?: number;
  noClip?: boolean;
  className?: string;
  style?: CSSProperties;
  content?: ReactNode;
}

export type NotchSubItemInput = NotchSubItem | readonly [number, number];

export interface NotchGridItemProps {
  /** React key when supplied via the `items` prop array. */
  key?: Key;
  /** Group items so the grid renders adjacent same-`groupKey` tiles as one
   *  unioned panel (their chromes merge into a single rounded outline with
   *  the inverse-radius bridge where two cells meet at a corner). Items in
   *  the same group dragged *away* from their group render as separate
   *  same-themed tiles. Implicit for sub-items packed via {@link subItems} —
   *  every sub gets `groupKey = panel-key` automatically. */
  groupKey?: Key;
  /**
   * The block footprint — one of:
   *  - a matrix `[[0,1],[1,1]]` (`0` notch/empty, `1` filled, `2+` tier-encoded);
   *  - a breakpoint map of matrices, `{ base: …, md: … }` or px keys `{ 0: …, 900: … }`;
   *  - candidate `[cols, rows]` block costs `{ sizes: [[1,1],[2,2]] }` — the grid
   *    picks the largest that fits, so the component grows when there's room;
   *  - preferred matrices in priority order `{ prefer: [bigShape, smallerShape, …] }`
   *    — the grid uses the first that fits the column count, else the narrowest.
   *
   * Ignored when {@link subItems} is given (the footprint is derived from those).
   */
  shape?: NotchShape;
  /**
   * Build this item as a panel of sub-widgets, each with a `[cols, rows]` block
   * cost — `[[1,1],[2,2]]` is a 1×1 sub-item beside a 2×2 one. The grid packs
   * them (into {@link subCols} columns) and the panel's notched footprint is the
   * union of their positions.
   */
  subItems?: ReadonlyArray<NotchSubItemInput>;
  /** Pin the column count the sub-items pack into. Omit to let the grid search
   *  column counts × orderings for the most compact arrangement. */
  subCols?: number;
  /** Preferred width ÷ height for the auto-arranged sub-item layout — the
   *  tie-breaker between equally-compact options. Default 1.6 (gently landscape).
   *  Ignored when `subCols` is set. */
  subAspect?: number;
  /** Explicit grid position in block units. Auto-flowed when omitted. */
  col?: number;
  row?: number;
  /** Tier selector for a tier-encoded matrix. Default: every tier (`maxTier`). */
  tier?: number;
  /** Block edge in px (normally inherited from the parent `NotchGrid`). */
  block?: number;
  radius?: number;
  inverseRadius?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  pad?: number;
  noClip?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** Normalise a {@link NotchSubItemInput} to a {@link NotchSubItem}. */
export function asSubItem(input: NotchSubItemInput): NotchSubItem {
  return Array.isArray(input) ? { cost: input as readonly [number, number] } : (input as NotchSubItem);
}

/**
 * Inside a {@link NotchGrid} this component is *not* rendered directly — the
 * grid reads these props, packs sub-items / resolves the responsive shape, and
 * renders the positioned `BlockShape`s itself.
 *
 * Rendered standalone, it falls back to its largest defined shape variant (or,
 * with `subItems`, just renders its `children`) so it still shows something
 * useful in isolation / tests.
 */
export function NotchGridItem({
  shape,
  subItems,
  tier,
  block,
  radius,
  inverseRadius,
  fill,
  stroke,
  strokeWidth,
  pad,
  noClip,
  className,
  style,
  children,
}: NotchGridItemProps) {
  if (subItems && subItems.length > 0) {
    // Standalone: the sub-item packing happens inside a NotchGrid; here we just
    // surface the content.
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  const matrix = resolveShapeMatrix(shape ?? [[1]], {
    width: Number.POSITIVE_INFINITY,
    columns: Number.MAX_SAFE_INTEGER,
  });
  const resolvedTier = tier ?? maxTier(matrix);
  return (
    <BlockShape
      shape={matrix}
      tier={resolvedTier}
      block={block}
      radius={radius}
      inverseRadius={inverseRadius}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      pad={pad}
      noClip={noClip}
      className={className}
      style={style}
    >
      {children}
    </BlockShape>
  );
}
