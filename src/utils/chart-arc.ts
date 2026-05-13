/** A categorical palette of theme colour tokens for multi-series charts;
 *  {@link paletteColor} cycles through it for longer series. */
export const CHART_PALETTE = [
  "var(--color-primary)",
  "var(--color-tertiary)",
  "var(--color-secondary)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-info)",
  "var(--color-error)",
] as const;

/** A palette colour for series index `i` (wraps for `i >= CHART_PALETTE.length`). */
export const paletteColor = (i: number) =>
  CHART_PALETTE[((i % CHART_PALETTE.length) + CHART_PALETTE.length) % CHART_PALETTE.length];

/** A point on a circle. Angle in degrees, `0°` = 12 o'clock, increasing clockwise. */
export function polarPoint(cx: number, cy: number, r: number, angleDeg: number): readonly [number, number] {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

/** SVG path for a pie wedge from `startDeg` to `endDeg` (clockwise) centred at
 *  `(cx, cy)`. A sweep of ≥ 360° draws a full disc. */
export function wedgePath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const sweep = endDeg - startDeg;
  if (sweep <= 0 || r <= 0) return "";
  const f = (n: number) => n.toFixed(2);
  if (sweep >= 360) {
    const [tx, ty] = polarPoint(cx, cy, r, 0);
    const [bx, by] = polarPoint(cx, cy, r, 180);
    return `M${f(tx)},${f(ty)} A${f(r)},${f(r)} 0 1 1 ${f(bx)},${f(by)} A${f(r)},${f(r)} 0 1 1 ${f(tx)},${f(ty)} Z`;
  }
  const [x1, y1] = polarPoint(cx, cy, r, startDeg);
  const [x2, y2] = polarPoint(cx, cy, r, endDeg);
  return `M${f(cx)},${f(cy)} L${f(x1)},${f(y1)} A${f(r)},${f(r)} 0 ${sweep > 180 ? 1 : 0} 1 ${f(x2)},${f(y2)} Z`;
}

/** SVG path for a donut segment — an annular sector from `startDeg` to `endDeg`
 *  (clockwise) between radii `rInner` and `rOuter` — with all four corners
 *  rounded by up to `cornerR` px (clamped so they never self-intersect, so a
 *  short segment degrades to a stubby pill rather than a blob). */
export function roundedDonutSegmentPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number,
  cornerR: number,
): string {
  if (endDeg - startDeg <= 0 || rOuter <= 0 || rInner < 0 || rOuter <= rInner) return "";
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const t0 = toRad(startDeg);
  const t1 = toRad(endDeg);
  const dt = t1 - t0;
  const f = (n: number) => n.toFixed(2);
  const P = (radius: number, t: number) => `${f(cx + radius * Math.cos(t))},${f(cy + radius * Math.sin(t))}`;

  // Largest corner that fits: ≤ half the ring, and small enough that the two
  // corners on the (shorter) inner arc don't overlap.
  const halfSin = Math.sin(dt / 2);
  const innerLimit = halfSin >= 1 || rInner === 0 ? Number.POSITIVE_INFINITY : (rInner * halfSin) / (1 - halfSin);
  const rc = Math.max(0, Math.min(cornerR, (rOuter - rInner) / 2, innerLimit));

  if (rc < 0.5) {
    const large = dt > Math.PI ? 1 : 0;
    return `M${P(rOuter, t0)} A${f(rOuter)},${f(rOuter)} 0 ${large} 1 ${P(rOuter, t1)} L${P(rInner, t1)} A${f(rInner)},${f(rInner)} 0 ${large} 0 ${P(rInner, t0)} Z`;
  }

  const phiO = Math.asin(rc / (rOuter - rc));
  const phiI = Math.asin(rc / (rInner + rc));
  const aO0 = t0 + phiO;
  const aO1 = t1 - phiO;
  const aI0 = t0 + phiI;
  const aI1 = t1 - phiI;
  const dO = (rOuter - rc) * Math.cos(phiO); // radius of the tangent point on a radial edge (outer side)
  const dI = (rInner + rc) * Math.cos(phiI); // ...and the inner side
  const largeO = aO1 - aO0 > Math.PI ? 1 : 0;
  const largeI = aI1 - aI0 > Math.PI ? 1 : 0;

  return [
    `M${P(rOuter, aO0)}`,
    `A${f(rOuter)},${f(rOuter)} 0 ${largeO} 1 ${P(rOuter, aO1)}`, // outer arc
    `A${f(rc)},${f(rc)} 0 0 1 ${P(dO, t1)}`, // outer corner at the end
    `L${P(dI, t1)}`, // down the end radial edge
    `A${f(rc)},${f(rc)} 0 0 1 ${P(rInner, aI1)}`, // inner corner at the end
    `A${f(rInner)},${f(rInner)} 0 ${largeI} 0 ${P(rInner, aI0)}`, // inner arc (back toward the start)
    `A${f(rc)},${f(rc)} 0 0 1 ${P(dI, t0)}`, // inner corner at the start
    `L${P(dO, t0)}`, // up the start radial edge
    `A${f(rc)},${f(rc)} 0 0 1 ${P(rOuter, aO0)}`, // outer corner at the start
    "Z",
  ].join(" ");
}
