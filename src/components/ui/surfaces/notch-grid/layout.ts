// Block-aligned packing for the notch grid.
//
// Items declare a footprint as a boolean mask (the `1` cells of their shape).
// The desire-based `solveLayout` drops them into a column-bounded grid:
// fixed-position items first, then the rest flow top-to-bottom /
// left-to-right into the first free spot where none of their filled cells
// collide with an occupied cell. Because collision uses the *actual* filled
// cells (not the bounding box), a complementary shape can nestle into another
// item's notch.

import { maskCols } from "@/utils/grid-outline";

export type Mask = ReadonlyArray<ReadonlyArray<boolean>>;

const MAX_ROWS = 100_000; // hard stop — guards against a pathological loop

/** All-true `cols × rows` mask — the footprint of a rectangular (sub-)item. */
export function rectMask(cols: number, rows: number): boolean[][] {
  const c = Math.max(1, Math.floor(cols));
  const r = Math.max(1, Math.floor(rows));
  return Array.from({ length: r }, () => Array<boolean>(c).fill(true));
}

/** A positioned block rectangle — the structural subset `placementToMask`
 *  needs. `Placement` (from `solveLayout`) satisfies it. */
export interface CellRect {
  col: number;
  row: number;
  cols: number;
  rows: number;
}

/** Union of placed rectangular items into one boolean mask — the derived
 *  footprint of a panel built from sub-items. Empty cells become notches. */
export function placementToMask(placed: ReadonlyArray<CellRect>): boolean[][] {
  let maxRow = 1;
  let maxCol = 1;
  for (const p of placed) {
    maxRow = Math.max(maxRow, p.row + p.rows);
    maxCol = Math.max(maxCol, p.col + p.cols);
  }
  const mask = Array.from({ length: maxRow }, () => Array<boolean>(maxCol).fill(false));
  for (const p of placed) {
    for (let r = 0; r < p.rows; r++) {
      for (let c = 0; c < p.cols; c++) mask[p.row + r][p.col + c] = true;
    }
  }
  return mask;
}

// --- Desire-based solver ---------------------------------------------------
//
// Consumes items with priority-mapped position / shape desires and produces
// placements that minimize a weighted cost: lower priority keys ("0" > "1" >
// "2"), smaller scale factors, win. Greedy commit-first per item; no
// backtracking — well under one frame at typical N. See
// `mirrorstack-docs/architecture/notch-grid-v2/01-solver.md`.

export type Pos = readonly [col: number, row: number];

/** Single value or a priority-keyed map. Numeric string keys; lower wins. */
export type Priority<T> = T | { readonly [k: string]: T };

export interface Desire {
  /** Single `[col, row]` OR priority-keyed map. Omitted = pure flow. */
  position?: Priority<Pos>;
  /** Single mask OR priority-keyed map of alternative footprints. */
  shape: Priority<Mask>;
  /** If `true` (and there's room), the solver tries scales 2 and 3 of each
   *  candidate shape; the largest non-colliding fit wins at each shape
   *  priority. Default `false` (rigid). */
  scale?: boolean;
}

export interface SolverItem<T = unknown> {
  key: string;
  desire: Desire;
  /** Adjacency auto-link key — rendering concern only, ignored by the solver. */
  groupKey?: string;
  /** Carried through to `Placement.item` unchanged. */
  item?: T;
}

export interface SolverInput<T = unknown> {
  items: ReadonlyArray<SolverItem<T>>;
  /** Outer column count. */
  cols: number;
  /** Nesting — small items into other items' notches. Default `true`. */
  nest?: boolean;
}

export interface Placement<T = unknown> {
  key: string;
  item?: T;
  /** Top-left position in block units. */
  col: number;
  row: number;
  /** The chosen mask, possibly scaled. */
  mask: Mask;
  /** Bounding-box size in blocks. */
  cols: number;
  rows: number;
  /** Which priorities the solver landed on. `"0"` = best. */
  priorityUsed: { position: string; shape: string };
  /** Scale factor applied (>= 1). Varies only when `desire.scale = true`. */
  scale: number;
  /** Cost contribution. */
  cost: number;
}

export interface SolverOutput<T = unknown> {
  placements: Placement<T>[];
  rowsUsed: number;
  /** Items whose mask width exceeds `cols`. The surface always extends
   *  vertically (per the design's "no item is rejected for layout reasons");
   *  this is reserved for the pathological horizontal-overflow case. */
  unfit: string[];
  /** Total cost normalized to `[0, 1]`; `1` = every placed item at priority 0. */
  satisfaction: number;
}

export interface SolverConfig {
  /** Weight on position priority key. Default 3. */
  W_pos?: number;
  /** Weight on shape priority key. Default 2. */
  W_shape?: number;
  /** Weight on scale offset (scale - 1). Default 1. */
  W_scale?: number;
  /** Cap on scale factor when `desire.scale = true`. Default 3. */
  maxScale?: number;
}

const DEFAULT_SOLVER_CONFIG: Required<SolverConfig> = {
  W_pos: 3,
  W_shape: 2,
  W_scale: 1,
  maxScale: 3,
};

/** A priority map is a plain object with stringified-number keys and at least
 *  one entry. Tuples (positions) and matrices (shapes) are arrays, so the
 *  Array.isArray check disambiguates. */
function isPriorityMap(v: unknown): v is Record<string, unknown> {
  if (v === null || typeof v !== "object" || Array.isArray(v)) return false;
  const keys = Object.keys(v as object);
  return keys.length > 0 && keys.every((k) => /^\d+$/.test(k));
}

/** Yield `[key, value]` pairs from a `Priority<T>` in priority order
 *  (ascending numeric key — `"0"` first). Single values pose as priority 0. */
function priorityEntries<T>(value: Priority<T>): Array<[string, T]> {
  if (!isPriorityMap(value)) return [["0", value as T]];
  return Object.keys(value as Record<string, T>)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => [k, (value as Record<string, T>)[k]]);
}

/** Uniform integer scale-up: each cell becomes a `factor × factor` block.
 *  Factor `<= 1` returns the mask unchanged. */
function scaleMask(mask: Mask, factor: number): Mask {
  if (factor <= 1) return mask;
  const f = Math.floor(factor);
  const out: boolean[][] = [];
  for (let r = 0; r < mask.length; r++) {
    for (let rr = 0; rr < f; rr++) {
      const newRow: boolean[] = [];
      for (let c = 0; c < mask[r].length; c++) {
        for (let cc = 0; cc < f; cc++) newRow.push(mask[r][c]);
      }
      out.push(newRow);
    }
  }
  return out;
}

interface Candidate {
  posKey: string;
  shapeKey: string;
  /** Resolved single position when `posKey` came from a single value or map
   *  entry; `undefined` when the desire had no `position` at all (flow). */
  pos?: Pos;
  mask: Mask;
  scale: number;
  cost: number;
}

/**
 * Greedy desire-based solver. Two-pass:
 *
 * 1. **Fixed-position pass.** Items whose `desire.position` is a single
 *    `[col, row]` (not a priority map) claim their best-cost candidate at that
 *    cell, in input order. Collisions among fixed items demote to flow.
 * 2. **Desire-flow pass.** Remaining items, in input order, each try their
 *    `(positionKey, shapeKey, scaleFactor)` candidates in ascending cost
 *    order; the first non-colliding candidate is committed.
 *
 * Cost per candidate: `W_pos*pos_key + W_shape*shape_key + W_scale*(scale-1)`.
 * Default weights `(3, 2, 1)` mean position priority dominates shape priority
 * dominates scale, matching the schema's intent that AI position preferences
 * are stronger signals than shape preferences.
 *
 * `nest` is reserved for the design's small-into-notch behavior; collision
 * already uses each candidate's actual filled cells (not bounding box), so
 * "nesting" works by construction at the cell level.
 *
 * @see mirrorstack-docs/architecture/notch-grid-v2/01-solver.md
 */
export function solveLayout<T = unknown>(
  input: SolverInput<T>,
  config?: SolverConfig,
): SolverOutput<T> {
  const cfg = { ...DEFAULT_SOLVER_CONFIG, ...config };
  const C = Math.max(1, Math.floor(input.cols));

  const occ: boolean[][] = [];
  const ensureRow = (r: number) => {
    while (occ.length <= r) occ.push(new Array<boolean>(C).fill(false));
  };
  const collides = (mask: Mask, atCol: number, atRow: number): boolean => {
    for (let r = 0; r < mask.length; r++) {
      const row = mask[r];
      for (let c = 0; c < row.length; c++) {
        if (!row[c]) continue;
        const gc = atCol + c;
        if (gc < 0 || gc >= C) return true;
        const gr = atRow + r;
        ensureRow(gr);
        if (occ[gr][gc]) return true;
      }
    }
    return false;
  };
  const occupy = (mask: Mask, atCol: number, atRow: number) => {
    for (let r = 0; r < mask.length; r++) {
      const row = mask[r];
      for (let c = 0; c < row.length; c++) {
        if (!row[c]) continue;
        ensureRow(atRow + r);
        occ[atRow + r][atCol + c] = true;
      }
    }
  };

  const itemCost = (posKey: string, shapeKey: string, scale: number): number =>
    cfg.W_pos * Number(posKey) +
    cfg.W_shape * Number(shapeKey) +
    cfg.W_scale * (scale - 1);

  const candidatesFor = (item: SolverItem<T>): Candidate[] => {
    const posEntries: Array<[string, Pos | undefined]> =
      item.desire.position === undefined
        ? [["0", undefined]]
        : priorityEntries(item.desire.position as Priority<Pos>);
    const shapeEntries = priorityEntries(item.desire.shape);
    const scaleSteps = item.desire.scale
      ? Array.from({ length: cfg.maxScale }, (_, i) => i + 1)
      : [1];

    const out: Candidate[] = [];
    for (const [pk, pos] of posEntries) {
      for (const [sk, shape] of shapeEntries) {
        for (const sc of scaleSteps) {
          const mask = sc === 1 ? shape : scaleMask(shape, sc);
          out.push({
            posKey: pk,
            shapeKey: sk,
            pos,
            mask,
            scale: sc,
            cost: itemCost(pk, sk, sc),
          });
        }
      }
    }
    out.sort((a, b) => a.cost - b.cost);
    return out;
  };

  /** Mark a candidate's cells occupied and build its `Placement`. Shared by the
   *  exact/flow placement in `tryPlace` and the nearest-free drop fallback so
   *  the placement shape is built in one place. */
  const commitPlacement = (
    item: SolverItem<T>,
    cand: Candidate,
    col: number,
    row: number,
  ): Placement<T> => {
    occupy(cand.mask, col, row);
    return {
      key: item.key,
      item: item.item,
      col,
      row,
      mask: cand.mask,
      cols: maskCols(cand.mask),
      rows: cand.mask.length,
      priorityUsed: { position: cand.posKey, shape: cand.shapeKey },
      scale: cand.scale,
      cost: cand.cost,
    };
  };

  const tryPlace = (item: SolverItem<T>, cand: Candidate): Placement<T> | null => {
    const w = maskCols(cand.mask);
    if (w > C) return null;

    const commit = (col: number, row: number) =>
      commitPlacement(item, cand, col, row);

    if (cand.pos) {
      const [col, row] = cand.pos;
      if (col >= 0 && col + w <= C && row >= 0 && !collides(cand.mask, col, row)) {
        return commit(col, row);
      }
      return null;
    }
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col + w <= C; col++) {
        if (!collides(cand.mask, col, row)) return commit(col, row);
      }
    }
    return null;
  };

  const place = (item: SolverItem<T>): Placement<T> | null => {
    for (const cand of candidatesFor(item)) {
      const result = tryPlace(item, cand);
      if (result) return result;
    }
    return null;
  };

  /** A fixed-position item whose exact cell is taken: instead of re-flowing it
   *  from the top-left (which lands it far from the drop), search outward in
   *  expanding Chebyshev rings from the desired cell and take the NEAREST free
   *  fit — so a dropped tile lands where the user aimed. */
  const placeNearestFree = (item: SolverItem<T>): Placement<T> | null => {
    const p = item.desire.position;
    if (p === undefined || isPriorityMap(p)) return null;
    const [dCol, dRow] = p as Pos;
    const cand = candidatesFor(item)[0];
    if (!cand) return null;
    const w = maskCols(cand.mask);
    if (w > C) return null;
    for (let radius = 0; radius < MAX_ROWS; radius++) {
      for (let row = Math.max(0, dRow - radius); row <= dRow + radius; row++) {
        for (let col = Math.max(0, dCol - radius); col + w <= C; col++) {
          const ring = Math.max(Math.abs(row - dRow), Math.abs(col - dCol));
          if (ring !== radius) continue; // only the new outer ring each pass
          if (!collides(cand.mask, col, row)) {
            return commitPlacement(item, cand, col, row);
          }
        }
      }
    }
    return null;
  };

  const isFixedPos = (item: SolverItem<T>): boolean => {
    const p = item.desire.position;
    return p !== undefined && !isPriorityMap(p);
  };

  const placements: Placement<T>[] = [];
  const unfit: string[] = [];
  const flowQueue: SolverItem<T>[] = [];
  for (const item of input.items) {
    if (isFixedPos(item)) {
      const placed = place(item);
      if (placed) placements.push(placed);
      else {
        // Exact cell taken — land at the nearest free cell to the drop before
        // falling back to a free flow.
        const near = placeNearestFree(item);
        if (near) placements.push(near);
        else
          flowQueue.push({
            ...item,
            desire: { ...item.desire, position: undefined },
          });
      }
    } else {
      flowQueue.push(item);
    }
  }
  for (const item of flowQueue) {
    const placed = place(item);
    if (placed) placements.push(placed);
    else unfit.push(item.key);
  }

  let totalCost = 0;
  let maxCost = 0;
  for (const p of placements) {
    const all = candidatesFor(input.items.find((i) => i.key === p.key)!);
    totalCost += p.cost;
    maxCost += all[all.length - 1]?.cost ?? 0;
  }
  const satisfaction = maxCost === 0 ? 1 : 1 - totalCost / maxCost;

  let rowsUsed = 0;
  for (const p of placements) rowsUsed = Math.max(rowsUsed, p.row + p.rows);

  return { placements, rowsUsed, unfit, satisfaction };
}
