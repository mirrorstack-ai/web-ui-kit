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
  // of travel — every cell contributes its 4 boundary edges clockwise in
  // y-down screen coords. Keyed by edge-start, with a *list* of out-points
  // so a single junction (two diagonally-touching cells meeting at a corner)
  // doesn't have one cell's edge silently overwrite the other's. The walker
  // then naturally turns *into* the other cell's edge at the junction, so the
  // two regions read as one shape with two concave inverse-radius arcs facing
  // each other at the shared corner — the same path style `<Notch>` uses for
  // its body↔tab transition.
  const edges = new Map<string, Pt[]>();
  const pushEdge = (from: Pt, to: Pt) => {
    const k = ptKey(from[0], from[1]);
    const list = edges.get(k);
    if (list) list.push(to);
    else edges.set(k, [to]);
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < mask[r].length; c++) {
      if (!mask[r][c]) continue;
      const tl: Pt = [c, r];
      const tr: Pt = [c + 1, r];
      const br: Pt = [c + 1, r + 1];
      const bl: Pt = [c, r + 1];
      if (!filled(r - 1, c)) pushEdge(tl, tr); // top
      if (!filled(r, c + 1)) pushEdge(tr, br); // right
      if (!filled(r + 1, c)) pushEdge(br, bl); // bottom
      if (!filled(r, c - 1)) pushEdge(bl, tl); // left
    }
  }

  // Walk each loop. At a junction (multiple out-edges share a start point) we
  // pick the *most-CCW* turn from the incoming direction — i.e. we turn *into*
  // the other cell's boundary. That keeps the merged loop closed with two
  // concave corners at the shared point (the "double-back" the renderer wants),
  // instead of arbitrarily picking one cell's edge and orphaning the other.
  const visitedEdges = new Set<string>();
  const subpaths: string[] = [];
  const edgeKey = (from: string, to: Pt) => `${from}>${to[0]},${to[1]}`;
  for (const [startKey, outs] of edges) {
    const [sx0, sy0] = startKey.split(",").map(Number);
    for (const startTo of outs) {
      if (visitedEdges.has(edgeKey(startKey, startTo))) continue;
      const loop: Pt[] = [];
      let cur: Pt = [sx0, sy0];
      let curKey = startKey;
      let to: Pt | null = startTo;
      let inDir: [number, number] = [0, 0];
      while (to) {
        const k = edgeKey(curKey, to);
        if (visitedEdges.has(k)) break;
        visitedEdges.add(k);
        loop.push(cur);
        inDir = [to[0] - cur[0], to[1] - cur[1]];
        cur = to;
        curKey = ptKey(to[0], to[1]);
        // Pick the most-CCW unvisited out-edge from `cur`. y-down: cross > 0
        // is CW, cross < 0 is CCW; we want the smallest (most-negative) cross.
        const candidates = edges.get(curKey) ?? [];
        let best: Pt | null = null;
        let bestCross = Number.POSITIVE_INFINITY;
        for (const cand of candidates) {
          if (visitedEdges.has(edgeKey(curKey, cand))) continue;
          const odx = cand[0] - cur[0];
          const ody = cand[1] - cur[1];
          const cross = inDir[0] * ody - inDir[1] * odx;
          if (cross < bestCross) {
            bestCross = cross;
            best = cand;
          }
        }
        to = best;
      }
      const corners = collinearStripped(loop).map(
        ([x, y]) => [x * cell, y * cell] as Pt,
      );
      if (corners.length >= 3) {
        const offset = erosion > 0 ? erodeRectilinear(corners, erosion) : corners;
        subpaths.push(roundedRectilinearPath(offset, radius, inverseRadius));
      }
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

// The input polygon to `roundedRectilinearPath` is axis-aligned (corners
// alternate H/V edges), so one of dx, dy is always zero — `|dx| + |dy|`
// is exact and `Math.sign` gives the unit vector with no `Math.hypot`
// in the corner loop's hot path.
function dist(a: Pt, b: Pt): number {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
}

function unit(a: Pt, b: Pt): Pt {
  return [Math.sign(b[0] - a[0]), Math.sign(b[1] - a[1])];
}

function num(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function fmt(p: Pt): string {
  return `${num(p[0])},${num(p[1])}`;
}
