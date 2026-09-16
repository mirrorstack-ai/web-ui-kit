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
