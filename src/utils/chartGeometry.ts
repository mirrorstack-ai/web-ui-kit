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
 * 🔴 THE FILLET VERSION OF THIS WAS WRONG AND SHIPPED (owner, 2026-09-16). Each
 * corner was drawn as an arc between two points whose angular inset was
 * approximated as `corner / radius`; the true tangency angle is
 * `asin(corner / (radius + corner))`. The two differ by a fraction of a degree,
 * so the arc met the edge off-tangent and every corner grew a spike. There is
 * no corner arithmetic here now: a join cannot be off-tangent.
 *
 * 🔴 AND THE INSET IS ANGULARLY DIFFERENT AT THE TWO RADII, which the first
 * join version missed by insetting both edges by the inner edge's angle. An
 * inset is a constant distance, and the same distance is a much bigger angle
 * near the hub than out at the rim — so the outer end came back narrower than
 * it should and every seam read as far too wide (owner again: "the gaps between
 * wedges look oversized … wedges read as separate rounded blobs"). Each edge
 * now carries its own inset angle, so the bar is the width it was asked for at
 * both ends.
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

  const degrees = (radians: number) => (radians * 180) / Math.PI;
  const insetAngle = (radius: number, c: number) =>
    radius <= c ? 90 : degrees(Math.asin(Math.min(1, c / radius)));

  // The inset has to leave a real shape behind at BOTH radii: half the radial
  // span at most, and never so much angle that an edge closes up.
  let c = Math.min(corner, (outerRadius - innerRadius) / 2);
  for (let i = 0; i < 10 && c > 0.05; i += 1) {
    if (sweep - 2 * insetAngle(innerRadius + c, c) > 0.5) break;
    c /= 2;
  }
  if (c <= 0.05) {
    return {
      d: ringSegmentPath(cx, cy, outerRadius, innerRadius, startAngle, endAngle),
      strokeWidth: 0,
    };
  }

  const inner = innerRadius + c;
  const outer = outerRadius - c;
  const dIn = insetAngle(inner, c);
  const dOut = insetAngle(outer, c);
  const p = (radius: number, angle: number) => polarPoint(cx, cy, radius, angle);
  const xy = (point: { x: number; y: number }) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`;

  return {
    d: [
      `M${xy(p(inner, startAngle + dIn))}`,
      `A${inner.toFixed(2)},${inner.toFixed(2)} 0 ${sweep - 2 * dIn > 180 ? 1 : 0} 1 ${xy(p(inner, endAngle - dIn))}`,
      `L${xy(p(outer, endAngle - dOut))}`,
      `A${outer.toFixed(2)},${outer.toFixed(2)} 0 ${sweep - 2 * dOut > 180 ? 1 : 0} 0 ${xy(p(outer, startAngle + dOut))}`,
      "Z",
    ].join(" "),
    strokeWidth: c * 2,
  };
}
