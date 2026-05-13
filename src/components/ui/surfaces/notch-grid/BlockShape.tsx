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
  /** Padding (px) on the content layer. Default 16. */
  pad?: number;
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
  radius = 24,
  inverseRadius = 32,
  fill = "var(--color-surface-container-low)",
  stroke = "var(--color-outline-variant)",
  strokeWidth = 1,
  children,
  pad = 16,
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
    () => gridOutlinePath(mask, { cell: block, gap, radius, inverseRadius }),
    [mask, block, gap, radius, inverseRadius],
  );
  const inset = strokeWidth / 2;

  return (
    <div
      className={cn("relative", className)}
      style={{ width: w, height: h, ...style }}
    >
      <svg
        width={w}
        height={h}
        viewBox={`${-inset} ${-inset} ${w + strokeWidth} ${h + strokeWidth}`}
        className="pointer-events-none absolute inset-0"
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
        className="absolute inset-0 overflow-hidden"
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
