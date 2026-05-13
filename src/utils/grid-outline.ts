// Turns a boolean block-grid into a rounded SVG outline path.
//
// A "notched surface" is a grid of square blocks. A `true` cell is part of the
// shape; a `false` cell is a hole / notch cut-out. This walks the rectilinear
// boundary of the `true` region(s) and emits an SVG path `d` string with
// rounded corners — convex corners use `radius`, concave (notch) corners use
// `inverseRadius` — mirroring the look of the rectangle-with-one-notch `Notch`
// component but for an arbitrary shape.
//
// A `gap` *erodes* the shape by `gap / 2` on every boundary: the outer edges
// pull inward (so neighbouring items leave a gap between them) and notch holes
// grow outward by the same amount (so an item nestled into a notch keeps that
// gap). One uniform offset everywhere ⇒ a consistent visual gap regardless of
// where the boundary is.
//
// Limitations: regions must be edge-connected. Two blocks touching only at a
// corner (e.g. `[[1,0],[0,1]]`) is ambiguous and not supported — interior
// holes and edge notches are. Render the result with `fillRule="evenodd"` so
// interior holes carve out correctly.

export interface GridOutlineOptions {
  /** Pixels per grid cell. */
  cell: number;
  /** Convex corner radius (px). Default 24. */
  radius?: number;
  /** Concave / notch corner radius (px). Default 32 — rounder than the outer
   *  corners so notch curves read openly. */
  inverseRadius?: number;
  /** Erode the whole boundary by `gap / 2` px, opening a `gap`-px space between
   *  this shape and anything flush against it (incl. items in its notches).
   *  Clamped below `cell` so the shape can't collapse. Default 0. */
  gap?: number;
}

type Pt = readonly [number, number];

const ptKey = (x: number, y: number) => `${x},${y}`;

/** Largest column count across all rows of a matrix. */
export function maskCols(matrix: readonly { readonly length: number }[]): number {
  let cols = 0;
  for (const row of matrix) cols = Math.max(cols, row.length);
  return cols;
}

/** Build a `boolean[][]` from a tiered shape matrix: a cell is filled at `tier`
 *  iff `1 <= value <= tier`. Higher values appear only as more space unlocks. */
export function maskFromShape(
  shape: readonly (readonly number[])[],
  tier: number,
): boolean[][] {
  return shape.map((row) => row.map((v) => v >= 1 && v <= tier));
}

/** Max tier referenced by a shape matrix (so callers know how many breakpoints
 *  it defines). Returns 1 for a plain 0/1 matrix. */
export function maxTier(shape: readonly (readonly number[])[]): number {
  let m = 1;
  for (const row of shape) for (const v of row) if (v > m) m = v;
  return m;
}

export function gridOutlinePath(
  mask: readonly (readonly boolean[])[],
  { cell, radius = 24, inverseRadius = 32, gap = 0 }: GridOutlineOptions,
): string {
  const rows = mask.length;
  const filled = (r: number, c: number): boolean =>
    r >= 0 && r < rows && c >= 0 && c < mask[r].length && !!mask[r][c];
  // Keep at least a sliver of shape even when gap is set absurdly high.
  const erosion = Math.max(0, Math.min(gap, cell - 2)) / 2;

  // Directed boundary edges, oriented so the filled cell sits on the *right*
  // of the direction of travel — which makes every cell contribute its edges
  // clockwise (y points down). Keyed by start point so a loop is just
  // `next = edges.get(end)`.
  const edges = new Map<string, Pt>();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < mask[r].length; c++) {
      if (!mask[r][c]) continue;
      const tl: Pt = [c, r];
      const tr: Pt = [c + 1, r];
      const br: Pt = [c + 1, r + 1];
      const bl: Pt = [c, r + 1];
      if (!filled(r - 1, c)) edges.set(ptKey(tl[0], tl[1]), tr); // top
      if (!filled(r, c + 1)) edges.set(ptKey(tr[0], tr[1]), br); // right
      if (!filled(r + 1, c)) edges.set(ptKey(br[0], br[1]), bl); // bottom
      if (!filled(r, c - 1)) edges.set(ptKey(bl[0], bl[1]), tl); // left
    }
  }

  // Walk each loop, then drop collinear midpoints so only true corners remain.
  const visited = new Set<string>();
  const subpaths: string[] = [];
  for (const startKey of edges.keys()) {
    if (visited.has(startKey)) continue;
    const loop: Pt[] = [];
    let cur: string | undefined = startKey;
    while (cur && !visited.has(cur)) {
      visited.add(cur);
      const [x, y] = cur.split(",").map(Number);
      loop.push([x, y]);
      const next = edges.get(cur);
      cur = next ? ptKey(next[0], next[1]) : undefined;
    }
    const corners = collinearStripped(loop).map(
      ([x, y]) => [x * cell, y * cell] as Pt,
    );
    if (corners.length >= 3) {
      const offset = erosion > 0 ? erodeRectilinear(corners, erosion) : corners;
      subpaths.push(roundedRectilinearPath(offset, radius, inverseRadius));
    }
  }
  return subpaths.join(" ");
}

function collinearStripped(loop: readonly Pt[]): Pt[] {
  const n = loop.length;
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const prev = loop[(i - 1 + n) % n];
    const p = loop[i];
    const next = loop[(i + 1) % n];
    const d1x = p[0] - prev[0];
    const d1y = p[1] - prev[1];
    const d2x = next[0] - p[0];
    const d2y = next[1] - p[1];
    if (d1x * d2y - d1y * d2x !== 0) out.push(p); // cross != 0 ⇒ a corner
  }
  return out;
}

/**
 * Offset a closed rectilinear polygon (corners alternating H/V edges, built
 * clockwise with the filled region on the right of each directed edge) inward
 * by `e` px: every edge's supporting line shifts toward the filled side, then
 * corners are recomputed as the intersection of the two adjacent shifted lines.
 * Convex corners move inward; concave (notch) corners move outward — exactly
 * the "shrink the shape, grow the notches" behaviour we want for gaps.
 */
function erodeRectilinear(corners: readonly Pt[], e: number): Pt[] {
  const n = corners.length;
  // Per edge i (corners[i] → corners[i+1]): which axis it's fixed in, and the
  // shifted value of that fixed coordinate. Inward normal of a clockwise edge
  // in y-down screen space is (−dy, dx) with dx,dy ∈ {−1,0,1}.
  const shifted = corners.map((p, i) => {
    const q = corners[(i + 1) % n];
    const dx = Math.sign(q[0] - p[0]);
    const dy = Math.sign(q[1] - p[1]);
    const horizontal = dy === 0; // dx === 0 ⇒ vertical
    return horizontal
      ? { axis: "y" as const, value: p[1] + dx * e } // inward.y = dx
      : { axis: "x" as const, value: p[0] + -dy * e }; // inward.x = -dy
  });
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const incoming = shifted[(i - 1 + n) % n];
    const outgoing = shifted[i];
    // The two edges meeting at corner i are perpendicular: one fixes x, the
    // other y. Take each coordinate from whichever edge fixes it.
    const x = incoming.axis === "x" ? incoming.value : outgoing.value;
    const y = incoming.axis === "y" ? incoming.value : outgoing.value;
    out.push([x, y]);
  }
  return out;
}

function roundedRectilinearPath(
  px: readonly Pt[],
  radius: number,
  inverseRadius: number,
): string {
  const n = px.length;
  const parts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = px[(i - 1 + n) % n];
    const v = px[i];
    const b = px[(i + 1) % n];
    const inLen = dist(a, v);
    const outLen = dist(v, b);
    const inDir = unit(a, v);
    const outDir = unit(v, b);
    // y-down: cross > 0 is a clockwise turn ⇒ convex corner of the filled
    // region; cross < 0 is a notch (concave) corner.
    const cross = inDir[0] * outDir[1] - inDir[1] * outDir[0];
    const convex = cross > 0;
    const rho = Math.min(convex ? radius : inverseRadius, inLen / 2, outLen / 2);
    const p1 = [v[0] - inDir[0] * rho, v[1] - inDir[1] * rho] as const;
    const p2 = [v[0] + outDir[0] * rho, v[1] + outDir[1] * rho] as const;
    parts.push(`${i === 0 ? "M" : "L"} ${fmt(p1)}`);
    if (rho > 0) parts.push(`A ${num(rho)} ${num(rho)} 0 0 ${convex ? 1 : 0} ${fmt(p2)}`);
  }
  parts.push("Z");
  return parts.join(" ");
}

function dist(a: Pt, b: Pt): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function unit(a: Pt, b: Pt): Pt {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
}

function num(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function fmt(p: Pt): string {
  return `${num(p[0])},${num(p[1])}`;
}
