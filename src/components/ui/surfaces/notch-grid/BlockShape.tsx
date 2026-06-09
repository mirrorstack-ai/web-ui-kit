import { useId, useMemo, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import {
  gridOutlinePath,
  maskCols,
  maskFromShape,
} from "@/utils/grid-outline";

export const meta: ComponentMeta = {
  name: "BlockShape",
  description:
    "A notched surface whose outline follows a grid of 96px blocks, with content layered on top",
};

/** Default block edge in px — matches Tailwind's `w-24` / `h-24` (6rem). */
export const BLOCK_SIZE = 96;

export interface BlockShapeProps {
  /**
   * Footprint matrix. Cell values:
   *  - `0`  — always empty (a notch / hole)
   *  - `1`  — part of the shape at every size tier
   *  - `2+` — joins the shape only once that tier is reached (responsive growth)
   *
   * e.g. `[[0,1,1,1],[1,1,1,1],[1,1,1,0]]` — a base shape with two corners cut.
   */
  shape: ReadonlyArray<ReadonlyArray<number>>;
  /** Active size tier (>= 1). Cells whose value exceeds `tier` render as empty. */
  tier?: number;
  /** Block edge length in px. Default {@link BLOCK_SIZE}. */
  block?: number;
  /** Erode the outline by `gap / 2` px (outer edges in, notch holes out) so
   *  neighbours / nested items leave a `gap`-px space. Footprint size is
   *  unchanged. Normally set by the parent `NotchGrid`; default 0. */
  gap?: number;
  /** Expand the outline OUTWARD by `bleed` px (inverse of `gap`) so the frame
   *  can sit beyond the cells. The SVG grows to avoid clipping; content stays
   *  in the cell box. Default 0. */
  bleed?: number;
  /** Convex corner radius (px). Default 24. */
  radius?: number;
  /** Concave / notch corner radius (px). Default 32. */
  inverseRadius?: number;
  /** Outline fill — a CSS color, or `"none"` to disable. */
  fill?: string;
  /** Outline stroke — a CSS color, or `"none"` to disable. */
  stroke?: string;
  strokeWidth?: number;
  /** Content rendered on top of the shape (clipped to the shape's outline). */
  children?: ReactNode;
  /** Padding on the content layer. Default 16px top/bottom, 8px sides. */
  pad?: number | string;
  /** Skip clipping the content layer to the outline. */
  noClip?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function BlockShape({
  shape,
  tier = 1,
  block = BLOCK_SIZE,
  gap = 0,
  bleed = 0,
  radius = 24,
  inverseRadius = 32,
  fill = "var(--color-surface-container-low)",
  stroke = "var(--color-outline-variant)",
  strokeWidth = 1,
  children,
  pad = "16px 8px",
  noClip = false,
  className,
  style,
}: BlockShapeProps) {
  const reactId = useId();
  const clipId = `block-shape-clip-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const rows = shape.length;
  const cols = maskCols(shape);
  if (isDev && (rows === 0 || cols === 0)) {
    console.warn("[BlockShape] empty shape matrix — nothing to render");
  }

  const mask = useMemo(() => maskFromShape(shape, tier), [shape, tier]);
  const w = cols * block;
  const h = rows * block;
  const pathD = useMemo(
    () => gridOutlinePath(mask, { cell: block, gap, bleed, radius, inverseRadius }),
    [mask, block, gap, bleed, radius, inverseRadius],
  );
  const inset = strokeWidth / 2;
  // When the outline bleeds outward, the SVG must extend past the w×h box so
  // the dilated path isn't clipped — grow it by `bleed` on every side and offset
  // it back. The content layer (children) stays at the cell box (0..w).
  const m = bleed + inset;

  return (
    <div
      className={cn("relative", className)}
      style={{ width: w, height: h, ...style }}
    >
      <svg
        width={w + 2 * bleed}
        height={h + 2 * bleed}
        viewBox={`${-m} ${-m} ${w + 2 * m} ${h + 2 * m}`}
        className="pointer-events-none absolute"
        style={{ left: -bleed, top: -bleed }}
        aria-hidden="true"
      >
        {!noClip && (
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path d={pathD} />
            </clipPath>
          </defs>
        )}
        <path
          d={pathD}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          fillRule="evenodd"
        />
      </svg>
      <div
        className={cn("absolute inset-0", !noClip && "overflow-hidden")}
        style={{
          padding: pad,
          clipPath: noClip ? undefined : `url(#${clipId})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
