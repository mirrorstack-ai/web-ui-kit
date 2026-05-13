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

/** Union of placed rectangular items into one boolean mask — the derived
 *  footprint of a panel built from sub-items. Empty cells become notches. */
export function placementToMask<T>(placed: ReadonlyArray<PlacedItem<T>>): boolean[][] {
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
