// Pure SVG geometry for the kit's radial charts. No React, no tokens — just
// the arithmetic both DonutChart and PolarChart need, kept in one place so the
// two cannot disagree about where a wedge starts.

/** A point on a circle, with 0° at twelve o'clock and angles running clockwise. */
export function polarPoint(cx: number, cy: number, radius: number, angleDeg: number) {
  const radians = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

/**
 * The `d` of one ring segment between two angles.
 *
 * 🔴 A FULL SWEEP CANNOT BE AN ARC. At 360° the start and end points are the
 * same coordinate, and SVG resolves `A` between two identical points by drawing
 * nothing at all — so a single-category series, the most ordinary case there
 * is (one ad, one quiz everybody passed), renders as an empty ring that looks
 * like missing data. Callers must send a full sweep to {@link isFullSweep} and
 * draw two circles instead; this function refuses to fake it.
 */
export function ringSegmentPath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const outerStart = polarPoint(cx, cy, outerRadius, startAngle);
  const outerEnd = polarPoint(cx, cy, outerRadius, endAngle);
  const innerEnd = polarPoint(cx, cy, innerRadius, endAngle);
  const innerStart = polarPoint(cx, cy, innerRadius, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M${outerStart.x.toFixed(2)},${outerStart.y.toFixed(2)}`,
    `A${outerRadius},${outerRadius} 0 ${largeArc} 1 ${outerEnd.x.toFixed(2)},${outerEnd.y.toFixed(2)}`,
    `L${innerEnd.x.toFixed(2)},${innerEnd.y.toFixed(2)}`,
    `A${innerRadius},${innerRadius} 0 ${largeArc} 0 ${innerStart.x.toFixed(2)},${innerStart.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

/** Does this sweep close the circle (to within floating-point noise)? */
export function isFullSweep(sweepDeg: number): boolean {
  return sweepDeg >= 360 - 1e-6;
}

/**
 * A radial bar: a ring sector whose four corners are rounded.
 *
 * Returns the path to draw and the stroke width to draw it with, because the
 * rounding is done by SVG's own round line JOIN rather than by fillets computed
 * here. The path is the sector INSET by the corner radius on every side, and
 * stroking it with `2 × corner` and `strokeLinejoin="round"` grows it back to
 * the requested radii and angles with every corner rounded exactly.
 *
 * 🔴 THE FILLET VERSION OF THIS WAS WRONG AND SHIPPED (owner, 2026-09-16, and
 * they were right to be angry). Each corner was drawn as an arc between two
 * points whose angular inset was approximated as `corner / radius` — the true
 * tangency angle is `asin(corner / (radius + corner))`. The two differ by a
 * fraction of a degree, so the arc met the edge at a slight angle instead of
 * tangentially, and every corner grew a little spike. Twelve of those per
 * six-bar chart read exactly as what it was: broken.
 *
 * There is no corner arithmetic here at all now. The renderer owns the joins,
 * and a join cannot be off-tangent.
 */
export function roundedSector(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  corner: number,
): { d: string; strokeWidth: number } {
  const sweep = endAngle - startAngle;
  if (sweep <= 0 || outerRadius <= innerRadius) return { d: "", strokeWidth: 0 };

  // The inset must leave a real shape behind: half the radial span at most, and
  // never so much angle that the sector closes up. Both are checked against the
  // inset's own inner radius, where the angular cost of an inset is highest.
  let c = Math.min(corner, (outerRadius - innerRadius) / 2);
  for (let i = 0; i < 8 && c > 0.1; i += 1) {
    const insetInner = innerRadius + c;
    const angularCost = (Math.asin(Math.min(1, c / insetInner)) * 180) / Math.PI;
    if (sweep - 2 * angularCost > 1) break;
    c /= 2;
  }
  if (c <= 0.1) {
    // No room to round: a sliver of a bar is drawn square rather than as a
    // shape that has been pushed inside out.
    return {
      d: ringSegmentPath(cx, cy, outerRadius, innerRadius, startAngle, endAngle),
      strokeWidth: 0,
    };
  }

  const insetInner = innerRadius + c;
  const angularCost = (Math.asin(Math.min(1, c / insetInner)) * 180) / Math.PI;
  return {
    d: ringSegmentPath(
      cx,
      cy,
      outerRadius - c,
      insetInner,
      startAngle + angularCost,
      endAngle - angularCost,
    ),
    strokeWidth: c * 2,
  };
}
