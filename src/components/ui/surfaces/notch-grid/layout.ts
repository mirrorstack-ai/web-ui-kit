// Block-aligned packing for the notch grid.
//
// Items declare a footprint as a boolean mask (the `1` cells of their shape).
// `packItems` drops them into a column-bounded grid: explicitly-positioned
// items first, then the rest flow top-to-bottom / left-to-right into the first
// free spot where none of their filled cells collide with an occupied cell.
// Because collision uses the *actual* filled cells (not the bounding box), a
// complementary shape can nestle into another item's notch.

import { maskCols } from "@/utils/grid-outline";

export type Mask = ReadonlyArray<ReadonlyArray<boolean>>;

export interface LayoutInput<T> {
  item: T;
  /** Resolved boolean footprint (the shape's `1` cells) for the active size. */
  mask: Mask;
  /** Explicit position in block units; auto-flowed when omitted. */
  col?: number;
  row?: number;
}

export interface PlacedItem<T> {
  item: T;
  /** Position in block units. */
  col: number;
  row: number;
  /** Bounding-box size in blocks. */
  cols: number;
  rows: number;
}

export interface LayoutResult<T> {
  placed: PlacedItem<T>[];
  /** Total grid size in blocks (>= the requested column count). */
  cols: number;
  rows: number;
  /** Items whose footprint is wider than the column count (placed at col 0,
   *  overflowing). Lets callers warn in dev. */
  overflowed: T[];
}

const MAX_ROWS = 100_000; // hard stop — guards against a pathological loop

function dims(mask: Mask): { w: number; h: number } {
  return { w: maskCols(mask), h: mask.length };
}

/** All-true `cols × rows` mask — the footprint of a rectangular (sub-)item. */
export function rectMask(cols: number, rows: number): boolean[][] {
  const c = Math.max(1, Math.floor(cols));
  const r = Math.max(1, Math.floor(rows));
  return Array.from({ length: r }, () => Array<boolean>(c).fill(true));
}

/** A positioned block rectangle — the structural subset `placementToMask`
 *  needs. Both `PlacedItem` (from `packItems`) and `Placement` (from
 *  `solveLayout`) satisfy it. */
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

export interface PackOptions {
  /** Flow placement strategy for non-explicit items. Default `"first-fit"` —
   *  top-to-bottom / left-to-right scan. `"farthest-fit"` instead picks the
   *  position that is **farthest** from any already-occupied (explicit) cell;
   *  with no explicit items present this falls back to first-fit. Used by the
   *  sub-item pack so the un-dragged sub-items arrange diagonally around the
   *  dragged one instead of collapsing into its column. */
  flowOrder?: "first-fit" | "farthest-fit";
}

/** First-fit packing into `cols` columns (or {@link PackOptions.flowOrder} for
 *  alternative flow placement). Positions are in block units. */
export function packItems<T>(
  inputs: ReadonlyArray<LayoutInput<T>>,
  cols: number,
  options?: PackOptions,
): LayoutResult<T> {
  const C = Math.max(1, Math.floor(cols));
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

  const placed: PlacedItem<T>[] = [];
  const overflowed: T[] = [];
  const isExplicit = (i: LayoutInput<T>) => i.col != null && i.row != null;

  // Explicit items first — at their requested cell when it's free; if it
  // collides with something already placed, they fall back to flowing (so
  // dropped / pinned items can't end up overlapping each other).
  const flowQueue: LayoutInput<T>[] = [];
  for (const i of inputs) {
    if (!isExplicit(i)) {
      flowQueue.push(i);
      continue;
    }
    const { w, h } = dims(i.mask);
    const ec = i.col!;
    const er = i.row!;
    if (ec >= 0 && ec + w <= C && !collides(i.mask, ec, er)) {
      occupy(i.mask, ec, er);
      placed.push({ item: i.item, col: ec, row: er, cols: w, rows: h });
    } else {
      flowQueue.unshift(i); // re-flow it (with priority over plain flow items)
    }
  }

  /** First row index after every currently-occupied row. */
  const nextFreeRow = (): number => {
    let row = 0;
    for (let r = 0; r < occ.length; r++) {
      if (occ[r].some(Boolean)) row = r + 1;
    }
    return row;
  };

  /** Cells that are off-limits as "neighbours" for the farthest-fit scan —
   *  i.e. the cells occupied by *anchor* items (explicit drops). Grown as flow
   *  items land too so successive flow items also spread away from each other. */
  const anchorCells: Array<readonly [number, number]> = [];
  let maxAnchorRow = 0;
  const pushAnchor = (x: number, y: number) => {
    anchorCells.push([x, y]);
    if (y > maxAnchorRow) maxAnchorRow = y;
  };
  const recordAnchor = (mask: Mask, atCol: number, atRow: number) => {
    for (let r = 0; r < mask.length; r++)
      for (let c = 0; c < mask[r].length; c++)
        if (mask[r][c]) pushAnchor(atCol + c, atRow + r);
  };
  if (options?.flowOrder === "farthest-fit") {
    for (const p of placed) {
      for (let r = 0; r < p.rows; r++)
        for (let c = 0; c < p.cols; c++) pushAnchor(p.col + c, p.row + r);
    }
  }

  /** Minimum *squared* Euclidean distance from any of `mask`'s cells (at the
   *  given position) to any anchor cell. Squared is fine because callers only
   *  compare with `>` / `<` — preserves order, drops one `Math.sqrt` per cell
   *  pair. Euclidean (vs Chebyshev) breaks the tie between an orthogonal
   *  neighbour and a diagonal one in favour of the diagonal — what we want
   *  for a 1×1 in one corner and a 2×2 in the diagonally opposite corner. */
  const minDistTo = (mask: Mask, atCol: number, atRow: number): number => {
    let best = Number.POSITIVE_INFINITY;
    for (let r = 0; r < mask.length; r++) {
      for (let c = 0; c < mask[r].length; c++) {
        if (!mask[r][c]) continue;
        const gx = atCol + c;
        const gy = atRow + r;
        for (const [ex, ey] of anchorCells) {
          const dx = gx - ex;
          const dy = gy - ey;
          const d2 = dx * dx + dy * dy;
          if (d2 < best) best = d2;
        }
      }
    }
    return best;
  };

  for (const i of flowQueue) {
    const { w, h } = dims(i.mask);
    if (w > C) {
      // Footprint can't fit the column count — drop it below everything else
      // and reserve its full row band so nothing else collides with it.
      const row = nextFreeRow();
      for (let r = 0; r < h; r++) {
        ensureRow(row + r);
        for (let c = 0; c < C; c++) occ[row + r][c] = true;
      }
      placed.push({ item: i.item, col: 0, row, cols: w, rows: h });
      overflowed.push(i.item);
      continue;
    }
    let found = false;
    // Farthest-fit: pick the position that maximises distance to any anchor
    // cell. The scan is bounded to a roughly C × C box (anchor rows + the
    // column count, whichever is taller) — otherwise the packer would happily
    // place the item arbitrarily far below the anchor instead of at the
    // diagonally opposite corner of a compact panel. Falls back to first-fit
    // when no anchor cells exist.
    if (options?.flowOrder === "farthest-fit" && anchorCells.length > 0) {
      const scanRows = Math.max(maxAnchorRow + 1, C);
      let bestCol = -1;
      let bestRow = -1;
      let bestDist = -1;
      for (let row = 0; row + h <= scanRows; row++) {
        for (let col = 0; col + w <= C; col++) {
          if (collides(i.mask, col, row)) continue;
          const d = minDistTo(i.mask, col, row);
          if (d > bestDist) {
            bestDist = d;
            bestCol = col;
            bestRow = row;
          }
        }
      }
      if (bestCol >= 0) {
        occupy(i.mask, bestCol, bestRow);
        placed.push({ item: i.item, col: bestCol, row: bestRow, cols: w, rows: h });
        recordAnchor(i.mask, bestCol, bestRow);
        found = true;
      }
    }
    if (!found) {
      for (let row = 0; row < MAX_ROWS && !found; row++) {
        for (let col = 0; col + w <= C; col++) {
          if (!collides(i.mask, col, row)) {
            occupy(i.mask, col, row);
            placed.push({ item: i.item, col, row, cols: w, rows: h });
            if (options?.flowOrder === "farthest-fit") recordAnchor(i.mask, col, row);
            found = true;
            break;
          }
        }
      }
    }
  }

  let maxRow = 0;
  let maxCol = C;
  for (const p of placed) {
    maxRow = Math.max(maxRow, p.row + p.rows);
    maxCol = Math.max(maxCol, p.col + p.cols);
  }
  return { placed, cols: maxCol, rows: maxRow, overflowed };
}

// --- Best-arrangement search ------------------------------------------------

function maskArea(mask: Mask): number {
  let n = 0;
  for (const row of mask) for (const cell of row) if (cell) n++;
  return n;
}

/** All orderings of `arr` (only call for small N). */
function permutations<T>(arr: readonly T[]): T[][] {
  if (arr.length <= 1) return [[...arr]];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of permutations(rest)) out.push([arr[i], ...p]);
  }
  return out;
}

/** Lexicographic `<` on numeric tuples (lower wins). */
function lexLess(a: readonly number[], b: readonly number[]): boolean {
  for (let i = 0; i < a.length; i++) {
    if (a[i] < b[i]) return true;
    if (a[i] > b[i]) return false;
  }
  return false;
}

export interface OptimalOptions {
  /** Largest column count to consider. */
  maxCols: number;
  /** Smallest column count to consider. Default: the widest item's width. */
  minCols?: number;
  /** Preferred width ÷ height of the packed bounding box, used as the
   *  tie-breaker between equally-compact layouts. Default 1.6 (gently landscape). */
  targetAspect?: number;
  /** Try every item ordering (exhaustive) when there are at most this many
   *  items; above it only a few heuristic orderings are tried. Default 4
   *  (4! = 24 packings × column counts per call — kept modest since this runs
   *  in render). */
  exhaustiveUpTo?: number;
}

/**
 * Search column counts × item orderings for the arrangement with the smallest
 * bounding-box **area**, tie-broken toward `targetAspect`, then toward fewer
 * empty (notch) cells. For ≤ `exhaustiveUpTo` items this is an exhaustive
 * search (genuinely optimal for the chosen objective); above it, a few good
 * orderings are tried. Items with explicit `{ col, row }` skip the search
 * (their layout is fixed) — packed once at `maxCols` in input order.
 *
 * `item` references pass through untouched, so callers map results back as with
 * {@link packItems}.
 */
export function optimalPlacement<T>(
  inputs: ReadonlyArray<LayoutInput<T>>,
  { maxCols, minCols, targetAspect = 1.6, exhaustiveUpTo = 4 }: OptimalOptions,
): LayoutResult<T> {
  const C = Math.max(1, Math.floor(maxCols));
  if (inputs.length === 0) return { placed: [], cols: C, rows: 0, overflowed: [] };

  const widest = Math.max(1, ...inputs.map((i) => maskCols(i.mask)));
  const lo = Math.max(1, Math.floor(minCols ?? widest));
  const totalArea = inputs.reduce((a, i) => a + maskArea(i.mask), 0);
  const hi = Math.max(lo, Math.min(C, Math.max(widest, totalArea)));

  // An explicit position is absolute — don't second-guess it with a column /
  // ordering search; just pack once at the requested width.
  if (inputs.some((i) => i.col != null && i.row != null)) return packItems(inputs, C);

  const byAreaDesc = [...inputs].sort((a, b) => maskArea(b.mask) - maskArea(a.mask));
  const byAreaAsc = [...inputs].sort((a, b) => maskArea(a.mask) - maskArea(b.mask));
  const orderings: ReadonlyArray<ReadonlyArray<LayoutInput<T>>> =
    inputs.length <= exhaustiveUpTo
      ? permutations([...inputs])
      : [inputs, byAreaDesc, byAreaAsc];

  let best: LayoutResult<T> | undefined;
  let bestScore: readonly number[] = [Infinity, Infinity, Infinity];
  for (let cols = lo; cols <= hi; cols++) {
    for (const order of orderings) {
      const res = packItems(order, cols);
      const area = res.cols * res.rows;
      const score = [area, Math.abs(res.cols / res.rows - targetAspect), area - totalArea];
      if (lexLess(score, bestScore)) {
        best = res;
        bestScore = score;
      }
    }
  }
  return best ?? packItems(inputs, C);
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

  const tryPlace = (item: SolverItem<T>, cand: Candidate): Placement<T> | null => {
    const w = maskCols(cand.mask);
    const h = cand.mask.length;
    if (w > C) return null;

    const commit = (col: number, row: number): Placement<T> => {
      occupy(cand.mask, col, row);
      return {
        key: item.key,
        item: item.item,
        col,
        row,
        mask: cand.mask,
        cols: w,
        rows: h,
        priorityUsed: { position: cand.posKey, shape: cand.shapeKey },
        scale: cand.scale,
        cost: cand.cost,
      };
    };

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
        // Demote: try again with position dropped so the item flows freely.
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
