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
 * A ring sector with ROUNDED CORNERS: narrow at the inner radius, wider at the
 * outer one, with a fillet at each of its four corners.
 *
 * 🔴 THIS IS NOT A STROKE WITH ROUND CAPS (owner, 2026-09-16, on the first
 * rounded render: "looks like flower petals, not a chart"). A capped stroke has
 * a constant width and two semicircular ends, so a radial bar became a petal
 * and lost the thing that makes it a bar — that it grows as it goes outward,
 * which is what lets the eye compare lengths at a glance. A sector keeps the
 * shape and rounds only the corners, which is what the kit's own surfaces do.
 *
 * The fillet is clamped three ways, because a corner radius larger than the
 * shape it is cutting inverts the path: never more than half the bar's radial
 * length, and never more than half the arc it sits on — the inner arc is the
 * shorter of the two, so a thin bar near the hub rounds less than its outer
 * end, exactly as it should.
 */
export function roundedRingSectorPath(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  corner: number,
): string {
  const sweepDeg = endAngle - startAngle;
  if (sweepDeg <= 0 || outerRadius <= innerRadius) return "";

  const radial = outerRadius - innerRadius;
  const innerArc = (sweepDeg / 360) * 2 * Math.PI * innerRadius;
  const outerArc = (sweepDeg / 360) * 2 * Math.PI * outerRadius;
  // 🔴 A FILLET MAY NOT EAT ITS OWN EDGE. Half the arc is the geometric limit,
  // but at that size the two fillets on one edge meet, the straight part
  // between them disappears, and a narrow bar renders as a notched, pinched
  // shape — seen at twelve categories, where each 26° bar spent more than a
  // third of each end on a corner. A fifth of the edge keeps the corner
  // recognisably a corner.
  const cIn = Math.max(0, Math.min(corner, radial / 2, innerArc / 5));
  const cOut = Math.max(0, Math.min(corner, radial / 2, outerArc / 5));

  // How much angle each fillet eats at its own radius.
  const dIn = innerRadius > 0 ? (cIn / innerRadius) * (180 / Math.PI) : 0;
  const dOut = (cOut / outerRadius) * (180 / Math.PI);
  // A fillet pair wider than the sector itself would cross over; fall back to
  // square corners there rather than drawing a knot.
  if (dIn * 2 > sweepDeg || dOut * 2 > sweepDeg) {
    return ringSegmentPath(cx, cy, outerRadius, innerRadius, startAngle, endAngle);
  }

  const p = (radius: number, angle: number) => polarPoint(cx, cy, radius, angle);
  const xy = (point: { x: number; y: number }) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
  const largeInner = sweepDeg - dIn * 2 > 180 ? 1 : 0;
  const largeOuter = sweepDeg - dOut * 2 > 180 ? 1 : 0;

  return [
    `M${xy(p(innerRadius, startAngle + dIn))}`,
    // Inner edge, clockwise.
    `A${innerRadius},${innerRadius} 0 ${largeInner} 1 ${xy(p(innerRadius, endAngle - dIn))}`,
    `A${cIn},${cIn} 0 0 1 ${xy(p(innerRadius + cIn, endAngle))}`,
    `L${xy(p(outerRadius - cOut, endAngle))}`,
    `A${cOut},${cOut} 0 0 1 ${xy(p(outerRadius, endAngle - dOut))}`,
    // Outer edge, back anticlockwise.
    `A${outerRadius},${outerRadius} 0 ${largeOuter} 0 ${xy(p(outerRadius, startAngle + dOut))}`,
    `A${cOut},${cOut} 0 0 1 ${xy(p(outerRadius - cOut, startAngle))}`,
    `L${xy(p(innerRadius + cIn, startAngle))}`,
    `A${cIn},${cIn} 0 0 1 ${xy(p(innerRadius, startAngle + dIn))}`,
    "Z",
  ].join(" ");
}
