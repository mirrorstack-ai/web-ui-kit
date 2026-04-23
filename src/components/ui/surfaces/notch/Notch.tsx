import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { isDev } from "@/utils/env";

export const meta: ComponentMeta = {
  name: "Notch",
  description: "SVG shape with a notch tab on any edge",
};

export type NotchSide = "top" | "bottom" | "left" | "right";

export interface NotchProps {
  width: number;
  height: number;
  notchWidth: number;
  notchHeight: number;
  notchSide?: NotchSide;
  /** Offset from start of edge. Positive = from top/left, negative = from bottom/right */
  notchOffset?: number;
  radius?: number;
  inverseRadius?: number;
  /** SVG fill color. Defaults to surface-container-low. Set "none" to disable. */
  fill?: string;
  /** SVG stroke color. Defaults to primary. Set "none" to disable. */
  stroke?: string;
  strokeWidth?: number;
  /** Render only the notch tab, no body */
  headOnly?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Builds path for body + notch on the RIGHT edge.
 * Other sides use SVG transform.
 */
function buildPath(
  w: number, h: number,
  nw: number, nh: number,
  ny: number,
  r: number, ir: number,
) {
  const tw = w + nw;
  const nb = ny + nh;
  const atStart = ny === 0;
  const atEnd = nb >= h;
  const d: string[] = [];

  // Top-left corner
  d.push(`M ${r},0`);

  if (atStart) {
    // Notch starts at top — no body corner on top-right, notch IS the top-right
    d.push(`H ${tw - r}`);
    d.push(`A ${r},${r} 0 0,1 ${tw},${r}`);
  } else {
    // Body top-right corner, then inverse corner down to notch
    d.push(`H ${w - r}`);
    d.push(`A ${r},${r} 0 0,1 ${w},${r}`);
    d.push(`V ${ny - ir}`);
    d.push(`A ${ir},${ir} 0 0,0 ${w + ir},${ny}`);
    d.push(`H ${tw - r}`);
    d.push(`A ${r},${r} 0 0,1 ${tw},${ny + r}`);
  }

  if (atEnd) {
    // Notch ends at bottom — notch IS the bottom-right
    d.push(`V ${h - r}`);
    d.push(`A ${r},${r} 0 0,1 ${tw - r},${h}`);
  } else {
    // Notch bottom-right corner, inverse corner, then body bottom-right
    d.push(`V ${nb - r}`);
    d.push(`A ${r},${r} 0 0,1 ${tw - r},${nb}`);
    d.push(`H ${w + ir}`);
    d.push(`A ${ir},${ir} 0 0,0 ${w},${nb + ir}`);
    d.push(`V ${h - r}`);
    d.push(`A ${r},${r} 0 0,1 ${w - r},${h}`);
  }

  // Bottom-left and left edge
  d.push(`H ${r}`);
  d.push(`A ${r},${r} 0 0,1 0,${h - r}`);
  d.push(`V ${r}`);
  d.push(`A ${r},${r} 0 0,1 ${r},0`);
  d.push(`Z`);

  return d.join(" ");
}

// Head only: the notch tab cut from the full shape at offset=0.
// For a right-edge notch at offset=0:
//   - Top edge is shared with body top → normal rounded corner on top-left and top-right
//   - Bottom has inverse corner on left (where body would continue down)
//   - Right side has normal rounded corners
//   - Left side: straight down, then inverse corner, then sharp cut
// Size: (nw + ir) wide, (nh + ir) tall
function buildHeadPath(nw: number, nh: number, r: number, ir: number) {
  const w = nw + ir; // total width (notch + inverse corner extends left)
  const h = nh + ir; // total height (notch + inverse corner extends down)

  return [
    // Top-left corner (shared with body)
    `M 0,0`,
    // Top edge
    `H ${w - r}`,
    // Top-right rounded corner
    `A ${r},${r} 0 0,1 ${w},${r}`,
    // Right edge down
    `V ${nh - r}`,
    // Bottom-right rounded corner
    `A ${r},${r} 0 0,1 ${w - r},${nh}`,
    // Bottom edge to inverse corner
    `H ${ir}`,
    // Inverse corner (same as in full shape: concave, body continues down-left)
    `A ${ir},${ir} 0 0,0 0,${h}`,
    // Sharp cut at left edge
    `V 0`,
    `Z`,
  ].join(" ");
}

function resolveOffset(offset: number, edge: number, notch: number) {
  return offset >= 0 ? offset : edge - notch + offset;
}

export function Notch({
  width,
  height,
  notchWidth,
  notchHeight,
  notchSide = "right",
  notchOffset = 0,
  radius = 8,
  inverseRadius = 6,
  fill = "var(--color-surface-container-low)",
  stroke = "var(--color-primary)",
  strokeWidth = 1,
  headOnly = false,
  className,
  style,
}: NotchProps) {
  const pad = strokeWidth / 2;

  if (headOnly) {
    const ir = inverseRadius;
    // Path is always drawn as a right-edge tab
    const pathW = notchWidth + ir;
    const pathH = notchHeight + ir;
    const headPath = buildHeadPath(notchWidth, notchHeight, radius, ir);

    // For other sides, transform the right-edge tab
    let svgW: number, svgH: number;
    let transform: string | undefined;

    switch (notchSide) {
      case "right":
        svgW = pathW; svgH = pathH;
        break;
      case "left":
        svgW = pathW; svgH = pathH;
        transform = `translate(${pathW}, 0) scale(-1, 1)`;
        break;
      case "bottom":
        svgW = pathH; svgH = pathW;
        transform = `translate(0, ${pathW}) rotate(-90)`;
        break;
      case "top":
        svgW = pathH; svgH = pathW;
        transform = `translate(${pathH}, 0) rotate(90)`;
        break;
    }

    return (
      <svg
        width={svgW + strokeWidth}
        height={svgH + strokeWidth}
        viewBox={`${-pad} ${-pad} ${svgW + strokeWidth} ${svgH + strokeWidth}`}
        className={cn("pointer-events-none", className)}
        style={style}
      >
        <path d={headPath} fill={fill} stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" transform={transform} />
      </svg>
    );
  }

  const horiz = notchSide === "right" || notchSide === "left";

  // Always build path as "notch on right edge"
  // For top/bottom: swap axes — treat width as height and vice versa
  const bw = horiz ? width : height;
  const bh = horiz ? height : width;
  const bnw = horiz ? notchWidth : notchHeight;
  const bnh = horiz ? notchHeight : notchWidth;
  const edge = horiz ? height : width;
  const notchLen = horiz ? notchHeight : notchWidth;
  const rawNy = resolveOffset(notchOffset, edge, notchLen);
  const minGap = radius + inverseRadius;

  // Offset must be 0 or >= minGap from either edge
  let ny = rawNy;
  if (ny > 0 && ny < minGap) {
    if (isDev) {
      console.warn(
        `[Notch] notchOffset ${notchOffset} is too small — must be 0 or >= ${minGap} (radius + inverseRadius). Clamping to 0.`,
      );
    }
    ny = 0;
  }
  const endGap = edge - notchLen - ny;
  if (endGap > 0 && endGap < minGap) {
    if (isDev) {
      console.warn(
        `[Notch] notch is too close to the far edge — gap ${endGap} < ${minGap}. Clamping to edge.`,
      );
    }
    ny = edge - notchLen;
  }

  const path = buildPath(bw, bh, bnw, bnh, ny, radius, inverseRadius);

  const svgW = horiz ? width + notchWidth : width;
  const svgH = horiz ? height : height + notchHeight;

  // Transform to target side
  let transform: string | undefined;
  const pw = bw + bnw; // path total width
  const ph = bh; // path total height

  switch (notchSide) {
    case "right":
      break;
    case "left":
      transform = `translate(${pw}, 0) scale(-1, 1)`;
      break;
    case "bottom":
      // path is drawn horizontally (notch on right), rotate -90° to put notch on bottom
      transform = `translate(0, ${pw}) rotate(-90)`;
      break;
    case "top":
      // rotate -90° then flip vertically
      transform = `translate(${ph}, 0) rotate(90)`;
      break;
  }

  return (
    <svg
      width={svgW + strokeWidth}
      height={svgH + strokeWidth}
      viewBox={`${-pad} ${-pad} ${svgW + strokeWidth} ${svgH + strokeWidth}`}
      className={cn("pointer-events-none", className)}
      style={style}
    >
      <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} transform={transform} />
    </svg>
  );
}
