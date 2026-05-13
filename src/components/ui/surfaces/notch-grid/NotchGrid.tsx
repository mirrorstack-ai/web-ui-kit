import {
  Children,
  isValidElement,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type ReactNode,
  type RefObject,
} from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import { maskCols, maskFromShape, maxTier } from "@/utils/grid-outline";
import { BlockShape, BLOCK_SIZE } from "./BlockShape";
import {
  NOTCH_BREAKPOINTS,
  resolveShapeMatrix,
  type NotchBreakpoints,
} from "./breakpoints";
import {
  optimalPlacement,
  packItems,
  placementToMask,
  rectMask,
  type LayoutInput,
} from "./layout";
import {
  asSubItem,
  NotchGridItem,
  type NotchGridItemProps,
  type NotchSubItem,
} from "./NotchGridItem";

export const meta: ComponentMeta = {
  name: "NotchGrid",
  description:
    "Responsive block-aligned layout of notched BlockShapes — measures its width, picks each item's breakpoint shape (or packs its sub-items), and lays them out",
};

export interface NotchGridProps {
  /** Fixed column count. Omit to auto-fit `floor(width / block)`. */
  cols?: number;
  /** Block edge in px. Default {@link BLOCK_SIZE} (96). */
  block?: number;
  /** Gap (px) between items — each item's outline is eroded by `gap / 2`, so
   *  the spacing is the same whether items sit edge-to-edge or one nestles into
   *  another's notch. Default 8. */
  gap?: number;
  /** Override / extend the Tailwind-style breakpoint thresholds (min container
   *  width in px) used to resolve each item's responsive `shape`. */
  breakpoints?: NotchBreakpoints;
  /** Default corner radius forwarded to every item. */
  radius?: number;
  /** Default notch corner radius forwarded to every item. */
  inverseRadius?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  pad?: number;
  /** When `true` (default), an item reserves only its *filled* cells, so a
   *  complementary shape can nestle into another's notch (interlocking layout).
   *  Set `false` to reserve each item's whole bounding box — boxes never
   *  overlap, at the cost of notches staying empty. */
  nest?: boolean;
  /** Items as data (in addition to / instead of `<NotchGridItem>` children). */
  items?: NotchGridItemProps[];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Clamp a value to a whole block count `>= 1`. */
const blocks = (n: number) => Math.max(1, Math.floor(n));

/** Measure an element's content-box width (whole px), re-measuring on resize.
 *  Returns 0 until first layout (and stays 0 where `ResizeObserver` is
 *  unavailable, e.g. jsdom / SSR — pass `cols` there for a deterministic
 *  layout). Rounds to an integer and skips no-op updates so sub-pixel layout
 *  churn doesn't trigger re-renders. */
function useMeasuredWidth(ref: RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const w = Math.round(el.getBoundingClientRect().width);
      setWidth((prev) => (prev === w ? prev : w));
    };
    read();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

interface PlacedSub {
  sub: NotchSubItem;
  key: Key;
  col: number;
  row: number;
}

interface ResolvedItem {
  props: NotchGridItemProps;
  key: Key;
  matrix: number[][];
  tier: number;
  /** Packed sub-items when this item is a panel; otherwise undefined. */
  subPlaced?: PlacedSub[];
}

export function NotchGrid({
  cols,
  block = BLOCK_SIZE,
  gap = 8,
  breakpoints,
  radius,
  inverseRadius,
  fill,
  stroke,
  strokeWidth,
  pad,
  nest = true,
  items,
  children,
  className,
  style,
}: NotchGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const width = useMeasuredWidth(ref);
  const bps = useMemo(
    () => (breakpoints ? { ...NOTCH_BREAKPOINTS, ...breakpoints } : NOTCH_BREAKPOINTS),
    [breakpoints],
  );
  // Items sit on a plain `block` lattice; `gap` is applied by eroding each
  // item's outline, so the column count is just `floor(width / block)`.
  const colCount = cols ?? Math.max(1, Math.floor(width / block));

  const { placed, gridCols, gridRows } = useMemo(() => {
    // Gather item configs: `<NotchGridItem>` children, then the `items` prop.
    const configs: { props: NotchGridItemProps; key: Key }[] = [];
    Children.forEach(children, (child, i) => {
      if (isValidElement(child) && child.type === NotchGridItem) {
        configs.push({ props: child.props as NotchGridItemProps, key: child.key ?? `c${i}` });
      } else if (isDev && child != null && child !== false) {
        console.warn("[NotchGrid] children must be <NotchGridItem> — other nodes are ignored");
      }
    });
    (items ?? []).forEach((p, i) => configs.push({ props: p, key: p.key ?? `i${i}` }));

    const resolved: ResolvedItem[] = configs.map(({ props, key }) => {
      if (props.subItems && props.subItems.length > 0) {
        const subs = props.subItems.map((s, i) => ({ ...asSubItem(s), _i: i }));
        const cw = (s: { cost: readonly [number, number] }) => Math.max(1, Math.floor(s.cost[0]));
        const maxSubW = Math.max(1, ...subs.map(cw));
        const subInputs: LayoutInput<{ sub: NotchSubItem; key: Key }>[] = subs.map((sub) => ({
          item: { sub, key: sub.key ?? `s${sub._i}` },
          mask: rectMask(sub.cost[0], sub.cost[1]),
          col: sub.col,
          row: sub.row,
        }));
        // When `subCols` is pinned, pack at exactly that width; otherwise search
        // column counts × orderings for the most compact arrangement.
        const subPlaced = (
          props.subCols != null
            ? packItems(subInputs, props.subCols)
            : optimalPlacement(subInputs, {
                maxCols: Math.max(maxSubW, colCount),
                minCols: maxSubW,
                targetAspect: props.subAspect,
              })
        ).placed;
        const matrix = placementToMask(subPlaced).map((row) => row.map((b) => (b ? 1 : 0)));
        return {
          props,
          key,
          matrix,
          tier: 1,
          subPlaced: subPlaced.map((p) => ({ sub: p.item.sub, key: p.item.key, col: p.col, row: p.row })),
        };
      }
      const matrix = resolveShapeMatrix(props.shape ?? [[1]], {
        width,
        columns: colCount,
        breakpoints: bps,
      });
      return { props, key, matrix, tier: props.tier ?? maxTier(matrix) };
    });

    const toInput = (r: ResolvedItem): LayoutInput<ResolvedItem> => ({
      item: r,
      // `nest`: reserve only the shape's filled cells (lets others sit in the
      // notches); otherwise reserve the whole bounding box (no overlaps).
      mask: nest
        ? maskFromShape(r.matrix, r.tier)
        : rectMask(Math.max(1, maskCols(r.matrix)), Math.max(1, r.matrix.length)),
      col: r.props.col,
      row: r.props.row,
    });
    const packed = packItems(resolved.map(toInput), colCount);
    if (isDev && packed.overflowed.length > 0) {
      console.warn(
        `[NotchGrid] ${packed.overflowed.length} item(s) have a footprint wider than ${colCount} column(s) — overflowing`,
      );
    }
    return { placed: packed.placed, gridCols: packed.cols, gridRows: packed.rows };
  }, [children, items, width, colCount, bps, nest]);

  return (
    <div ref={ref} className={cn("w-full", className)} style={style}>
      <div
        className="relative"
        style={{ width: gridCols * block, height: gridRows * block }}
      >
        {placed.map(({ item, col, row }) => {
          const { props, key, matrix, tier, subPlaced } = item;
          const itemBlock = props.block ?? block;

          // A panel's content is its sub-item regions positioned at their cells
          // (the panel's BlockShape outline is the union of those footprints);
          // a plain item just renders its own children.
          const content = subPlaced
            ? subPlaced.map(({ sub, key: subKey, col: sc, row: sr }) => (
                <div
                  key={subKey}
                  className={cn("absolute overflow-hidden", sub.className)}
                  style={{
                    left: sc * itemBlock,
                    top: sr * itemBlock,
                    width: blocks(sub.cost[0]) * itemBlock,
                    height: blocks(sub.cost[1]) * itemBlock,
                    padding: sub.pad ?? props.pad ?? pad ?? 16,
                    borderRadius: (sub.radius ?? props.radius ?? radius ?? 24) * 0.75,
                    background: sub.fill && sub.fill !== "none" ? sub.fill : undefined,
                    ...sub.style,
                  }}
                >
                  {sub.content}
                </div>
              ))
            : props.children;

          return (
            <div
              key={key}
              className="absolute"
              style={{ left: col * block, top: row * block }}
            >
              <BlockShape
                shape={matrix}
                tier={tier}
                block={itemBlock}
                gap={gap}
                radius={props.radius ?? radius}
                inverseRadius={props.inverseRadius ?? inverseRadius}
                fill={props.fill ?? fill}
                stroke={props.stroke ?? stroke}
                strokeWidth={props.strokeWidth ?? strokeWidth}
                pad={subPlaced ? 0 : props.pad ?? pad}
                noClip={subPlaced ? undefined : props.noClip}
                className={props.className}
                style={props.style}
              >
                {content}
              </BlockShape>
            </div>
          );
        })}
      </div>
    </div>
  );
}
