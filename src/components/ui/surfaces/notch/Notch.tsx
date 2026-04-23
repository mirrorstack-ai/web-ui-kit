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
  /** Positive = from top/left, negative = from bottom/right */
  notchOffset?: number;
  radius?: number;
  inverseRadius?: number;
  /** Set "none" to disable */
  fill?: string;
  /** Set "none" to disable */
  stroke?: string;
  strokeWidth?: number;
  /** Render only the notch tab, no body */
  headOnly?: boolean;
  className?: string;
  style?: CSSProperties;
}

// --- Path builders (always draw notch on RIGHT edge, transform for others) ---

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

  d.push(`M ${r},0`);

  if (atStart) {
    d.push(`H ${tw - r}`);
    d.push(`A ${r},${r} 0 0,1 ${tw},${r}`);
  } else {
    d.push(`H ${w - r}`);
    d.push(`A ${r},${r} 0 0,1 ${w},${r}`);
    d.push(`V ${ny - ir}`);
    d.push(`A ${ir},${ir} 0 0,0 ${w + ir},${ny}`);
    d.push(`H ${tw - r}`);
    d.push(`A ${r},${r} 0 0,1 ${tw},${ny + r}`);
  }

  if (atEnd) {
    d.push(`V ${h - r}`);
    d.push(`A ${r},${r} 0 0,1 ${tw - r},${h}`);
  } else {
    d.push(`V ${nb - r}`);
    d.push(`A ${r},${r} 0 0,1 ${tw - r},${nb}`);
    d.push(`H ${w + ir}`);
    d.push(`A ${ir},${ir} 0 0,0 ${w},${nb + ir}`);
    d.push(`V ${h - r}`);
    d.push(`A ${r},${r} 0 0,1 ${w - r},${h}`);
  }

  d.push(`H ${r}`);
  d.push(`A ${r},${r} 0 0,1 0,${h - r}`);
  d.push(`V ${r}`);
  d.push(`A ${r},${r} 0 0,1 ${r},0`);
  d.push(`Z`);

  return d.join(" ");
}

function buildHeadPath(nw: number, nh: number, r: number, ir: number, atStart: boolean, atEnd: boolean) {
  const w = nw + ir;
  const topIr = atStart ? 0 : ir;
  const botIr = atEnd ? 0 : ir;
  const d: string[] = [];

  if (!atStart) {
    d.push(`M 0,0`);
    d.push(`A ${ir},${ir} 0 0,0 ${ir},${topIr}`);
  } else {
    d.push(`M 0,${topIr}`);
  }

  d.push(`H ${w - r}`);
  d.push(`A ${r},${r} 0 0,1 ${w},${topIr + r}`);
  d.push(`V ${topIr + nh - r}`);
  d.push(`A ${r},${r} 0 0,1 ${w - r},${topIr + nh}`);
  d.push(`H ${ir}`);

  if (!atEnd) {
    d.push(`A ${ir},${ir} 0 0,0 0,${topIr + nh + botIr}`);
  }

  d.push(`V 0`);
  d.push(`Z`);

  return d.join(" ");
}

// --- Shared helpers ---

function resolveOffset(offset: number, edge: number, notch: number) {
  return offset >= 0 ? offset : edge - notch + offset;
}

function resolveEdgeParams(side: NotchSide, width: number, height: number, nw: number, nh: number) {
  const horiz = side === "right" || side === "left";
  return {
    horiz,
    edge: horiz ? height : width,
    notchLen: horiz ? nh : nw,
  };
}

function clampOffset(ny: number, edge: number, notchLen: number, minGap: number, notchOffset: number) {
  let clamped = ny;
  if (clamped > 0 && clamped < minGap) {
    if (isDev) {
      console.warn(`[Notch] notchOffset ${notchOffset} too small — must be 0 or >= ${minGap}. Clamping to 0.`);
    }
    clamped = 0;
  }
  const endGap = edge - notchLen - clamped;
  if (endGap > 0 && endGap < minGap) {
    if (isDev) {
      console.warn(`[Notch] notch too close to far edge — gap ${endGap} < ${minGap}. Clamping to edge.`);
    }
    clamped = edge - notchLen;
  }
  return clamped;
}

function getTransform(side: NotchSide, pw: number, ph: number): string | undefined {
  switch (side) {
    case "right": return undefined;
    case "left": return `translate(${pw}, 0) scale(-1, 1)`;
    case "bottom": return `translate(0, ${pw}) rotate(-90)`;
    case "top": return `translate(${ph}, 0) rotate(90)`;
  }
}

// --- Component ---

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
  const { horiz, edge, notchLen } = resolveEdgeParams(notchSide, width, height, notchWidth, notchHeight);
  const ir = inverseRadius;
  const minGap = radius + ir;

  if (headOnly) {
    const resolvedOff = resolveOffset(notchOffset, edge, notchLen);
    const atStart = resolvedOff < minGap;
    const atEnd = (edge - notchLen - resolvedOff) < minGap;

    const topIr = atStart ? 0 : ir;
    const botIr = atEnd ? 0 : ir;
    const pathW = notchWidth + ir;
    const pathH = notchHeight + topIr + botIr;
    const headPath = buildHeadPath(notchWidth, notchHeight, radius, ir, atStart, atEnd);

    let svgW: number, svgH: number;
    if (horiz) { svgW = pathW; svgH = pathH; }
    else { svgW = pathH; svgH = pathW; }

    const transform = getTransform(notchSide, pathW, pathH);

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

  const bw = horiz ? width : height;
  const bh = horiz ? height : width;
  const bnw = horiz ? notchWidth : notchHeight;
  const bnh = horiz ? notchHeight : notchWidth;
  const rawNy = resolveOffset(notchOffset, edge, notchLen);
  const ny = clampOffset(rawNy, edge, notchLen, minGap, notchOffset);

  const path = buildPath(bw, bh, bnw, bnh, ny, radius, ir);

  const svgW = horiz ? width + notchWidth : width;
  const svgH = horiz ? height : height + notchHeight;
  const pw = bw + bnw;
  const ph = bh;
  const transform = getTransform(notchSide, pw, ph);

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
