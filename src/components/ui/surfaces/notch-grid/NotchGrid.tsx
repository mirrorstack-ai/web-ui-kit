import {
  Children,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import { maskCols, maskFromShape, maxTier } from "@/utils/grid-outline";
import { Icon } from "@/components/ui/media/icon/Icon";
import { BlockShape, BLOCK_SIZE } from "./BlockShape";
import {
  NOTCH_BREAKPOINTS,
  rectMatrix,
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
  /** Let the user drag items onto a different block cell. Dropped items become
   *  pinned and the rest re-flow around them. */
  draggable?: boolean;
  /** Called after a drag drops an item, with its new block position. */
  onItemMove?: (key: Key, col: number, row: number) => void;
  /** Called after a sub-item drag drops on a new sub-grid cell. The panel
   *  re-packs around the new position; if the move would change the panel's
   *  notched footprint, neighbouring items in the outer grid re-flow too. */
  onSubItemMove?: (parentKey: Key, subKey: Key, col: number, row: number) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Clamp a value to a whole block count `>= 1`. */
const blocks = (n: number) => Math.max(1, Math.floor(n));

interface DragState {
  key: Key;
  pointerId: number;
  startX: number;
  startY: number;
  originCol: number;
  originRow: number;
  /** The dragged item's footprint width in blocks (to clamp the drop column). */
  originCols: number;
  dx: number;
  dy: number;
}

interface SubDragState {
  parentKey: Key;
  subKey: Key;
  pointerId: number;
  startX: number;
  startY: number;
  originCol: number;
  originRow: number;
  /** The sub-item's footprint in sub-grid cells. */
  cost: readonly [number, number];
  /** The parent panel's sub-grid extent (cols × rows), captured at drag start. */
  parentSubCols: number;
  parentSubRows: number;
  /** Sub-grid block size in px (so we can convert pointer-px to cells). */
  itemBlock: number;
  dx: number;
  dy: number;
}

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
  draggable = false,
  onItemMove,
  onSubItemMove,
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

  // Drag-to-place: positions the user has dropped items at (pinned), plus the
  // live drag offset for visual feedback.
  const [overrides, setOverrides] = useState<Map<Key, { col: number; row: number }>>(new Map());
  const [drag, setDrag] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  dragRef.current = drag;

  const handlePointerMove = useCallback((e: ReactPointerEvent) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    setDrag({ ...d, dx: e.clientX - d.startX, dy: e.clientY - d.startY });
  }, []);

  const endDrag = useCallback(
    (e: ReactPointerEvent) => {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer may already be released */
      }
      const maxCol = Math.max(0, colCount - d.originCols);
      const nextCol = Math.min(maxCol, Math.max(0, d.originCol + Math.round(d.dx / block)));
      const nextRow = Math.max(0, d.originRow + Math.round(d.dy / block));
      setDrag(null);
      setOverrides((prev) => new Map(prev).set(d.key, { col: nextCol, row: nextRow }));
      onItemMove?.(d.key, nextCol, nextRow);
    },
    [block, colCount, onItemMove],
  );

  // Sub-item drag — same shape as panel drag, but inside one panel's sub-grid.
  const [subOverrides, setSubOverrides] = useState<Map<Key, Map<Key, { col: number; row: number }>>>(new Map());
  const [subDrag, setSubDrag] = useState<SubDragState | null>(null);
  const subDragRef = useRef<SubDragState | null>(null);
  subDragRef.current = subDrag;
  const [hoveredSub, setHoveredSub] = useState<{ parentKey: Key; subKey: Key } | null>(null);

  const handleSubPointerMove = useCallback((e: ReactPointerEvent) => {
    const s = subDragRef.current;
    if (!s || e.pointerId !== s.pointerId) return;
    setSubDrag({ ...s, dx: e.clientX - s.startX, dy: e.clientY - s.startY });
  }, []);

  const endSubDrag = useCallback(
    (e: ReactPointerEvent) => {
      const s = subDragRef.current;
      if (!s || e.pointerId !== s.pointerId) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer may already be released */
      }
      const maxCol = Math.max(0, s.parentSubCols - s.cost[0]);
      const maxRow = Math.max(0, s.parentSubRows - s.cost[1]);
      const nextCol = Math.min(maxCol, Math.max(0, s.originCol + Math.round(s.dx / s.itemBlock)));
      const nextRow = Math.min(maxRow, Math.max(0, s.originRow + Math.round(s.dy / s.itemBlock)));
      setSubDrag(null);
      setSubOverrides((prev) => {
        const next = new Map(prev);
        const inner = new Map(next.get(s.parentKey) ?? new Map());
        inner.set(s.subKey, { col: nextCol, row: nextRow });
        next.set(s.parentKey, inner);
        return next;
      });
      onSubItemMove?.(s.parentKey, s.subKey, nextCol, nextRow);
    },
    [onSubItemMove],
  );

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
        const subOver = subOverrides.get(key);
        const subInputs: LayoutInput<{ sub: NotchSubItem; key: Key }>[] = subs.map((sub) => {
          const subKey = sub.key ?? `s${sub._i}`;
          const pinned = subOver?.get(subKey);
          return {
            item: { sub, key: subKey },
            mask: rectMask(sub.cost[0], sub.cost[1]),
            col: pinned?.col ?? sub.col,
            row: pinned?.row ?? sub.row,
          };
        });
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

    const toInput = (r: ResolvedItem): LayoutInput<ResolvedItem> => {
      const pinned = overrides.get(r.key);
      return {
        item: r,
        // `nest`: reserve only the shape's filled cells (lets others sit in the
        // notches); otherwise reserve the whole bounding box (no overlaps).
        mask: nest
          ? maskFromShape(r.matrix, r.tier)
          : rectMask(Math.max(1, maskCols(r.matrix)), Math.max(1, r.matrix.length)),
        col: pinned?.col ?? r.props.col,
        row: pinned?.row ?? r.props.row,
      };
    };
    // Drag-dropped (overridden) items are packed first so they win their cell;
    // anything they'd overlap re-flows around them.
    const inputs: LayoutInput<ResolvedItem>[] = [
      ...resolved.filter((r) => overrides.has(r.key)).map(toInput),
      ...resolved.filter((r) => !overrides.has(r.key)).map(toInput),
    ];
    const packed = packItems(inputs, colCount);
    if (isDev && packed.overflowed.length > 0) {
      console.warn(
        `[NotchGrid] ${packed.overflowed.length} item(s) have a footprint wider than ${colCount} column(s) — overflowing`,
      );
    }
    return { placed: packed.placed, gridCols: packed.cols, gridRows: packed.rows };
  }, [children, items, width, colCount, bps, nest, overrides, subOverrides]);

  return (
    <div ref={ref} className={cn("w-full", className)} style={style}>
      <div
        className="relative"
        style={{ width: gridCols * block, height: gridRows * block }}
      >
        {placed.map(({ item, col, row, cols: itemCols }) => {
          const { props, key, matrix, tier, subPlaced } = item;
          const itemBlock = props.block ?? block;
          const dragging = drag?.key === key;
          const isPanel = !!subPlaced;
          // Panel sub-grid extent — used to clamp sub-item drops.
          const parentSubCols = isPanel
            ? Math.max(1, ...subPlaced.map((p) => p.col + Math.max(1, p.sub.cost[0])))
            : 0;
          const parentSubRows = isPanel
            ? Math.max(1, ...subPlaced.map((p) => p.row + Math.max(1, p.sub.cost[1])))
            : 0;

          // A panel's content is its sub-item regions positioned at their cells
          // (the panel's BlockShape outline is the union of those footprints);
          // a plain item just renders its own children.
          const content = subPlaced
            ? subPlaced.map(({ sub, key: subKey, col: sc, row: sr }) => {
                const subBeingDragged = subDrag?.parentKey === key && subDrag.subKey === subKey;
                const subHovered = hoveredSub?.parentKey === key && hoveredSub.subKey === subKey;
                const subHandlers = draggable
                  ? {
                      onPointerEnter: () => setHoveredSub({ parentKey: key, subKey }),
                      onPointerLeave: () =>
                        setHoveredSub((prev) =>
                          prev?.parentKey === key && prev.subKey === subKey ? null : prev,
                        ),
                      onPointerDown: (e: ReactPointerEvent) => {
                        if (e.button !== 0) return;
                        e.stopPropagation();
                        e.currentTarget.setPointerCapture(e.pointerId);
                        setSubDrag({
                          parentKey: key,
                          subKey,
                          pointerId: e.pointerId,
                          startX: e.clientX,
                          startY: e.clientY,
                          originCol: sc,
                          originRow: sr,
                          cost: sub.cost,
                          parentSubCols,
                          parentSubRows,
                          itemBlock,
                          dx: 0,
                          dy: 0,
                        });
                      },
                      onPointerMove: handleSubPointerMove,
                      onPointerUp: endSubDrag,
                      onPointerCancel: endSubDrag,
                    }
                  : undefined;
                return (
                  <div
                    key={subKey}
                    {...subHandlers}
                    className={cn(
                      "absolute overflow-hidden transition-colors",
                      draggable && "cursor-grab select-none touch-none",
                      subBeingDragged && "cursor-grabbing",
                      // Slight tonal lift on hover — sub-item reads as interactive.
                      subHovered && !subBeingDragged && "bg-on-surface/10",
                      sub.className,
                    )}
                    style={{
                      left: sc * itemBlock,
                      top: sr * itemBlock,
                      width: blocks(sub.cost[0]) * itemBlock,
                      height: blocks(sub.cost[1]) * itemBlock,
                      padding: sub.pad ?? props.pad ?? pad ?? 16,
                      borderRadius: (sub.radius ?? props.radius ?? radius ?? 24) * 0.75,
                      background: sub.fill && sub.fill !== "none" ? sub.fill : undefined,
                      transform: subBeingDragged ? `translate(${subDrag.dx}px, ${subDrag.dy}px)` : undefined,
                      zIndex: subBeingDragged ? 30 : undefined,
                      ...sub.style,
                    }}
                  >
                    {sub.content}
                  </div>
                );
              })
            : props.children;

          // Whole-item drag handlers — applied to the outer div only when the
          // item has no sub-items. Panel items get a dedicated handle (below)
          // so that pointer-down on a sub-item moves the sub-item, not the
          // panel.
          const dragHandlers =
            draggable && !isPanel
              ? {
                  onPointerDown: (e: ReactPointerEvent) => {
                    if (e.button !== 0) return;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setDrag({
                      key,
                      pointerId: e.pointerId,
                      startX: e.clientX,
                      startY: e.clientY,
                      originCol: col,
                      originRow: row,
                      originCols: itemCols,
                      dx: 0,
                      dy: 0,
                    });
                  },
                  onPointerMove: handlePointerMove,
                  onPointerUp: endDrag,
                  onPointerCancel: endDrag,
                }
              : undefined;

          // Panel-only handle: dedicated drag target so the panel can be moved
          // even when its sub-items fill it.
          const panelHandleProps =
            draggable && isPanel
              ? {
                  onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => {
                    if (e.button !== 0) return;
                    e.stopPropagation();
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setDrag({
                      key,
                      pointerId: e.pointerId,
                      startX: e.clientX,
                      startY: e.clientY,
                      originCol: col,
                      originRow: row,
                      originCols: itemCols,
                      dx: 0,
                      dy: 0,
                    });
                  },
                  onPointerMove: handlePointerMove,
                  onPointerUp: endDrag,
                  onPointerCancel: endDrag,
                }
              : null;

          return (
            <div
              key={key}
              {...dragHandlers}
              className={cn(
                "absolute",
                draggable && !isPanel && "select-none touch-none",
                draggable && !isPanel && (dragging ? "cursor-grabbing" : "cursor-grab"),
              )}
              style={{
                left: col * block,
                top: row * block,
                transform: dragging ? `translate(${drag.dx}px, ${drag.dy}px)` : undefined,
                zIndex: dragging ? 20 : overrides.has(key) ? 10 : undefined,
              }}
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
              {panelHandleProps && (
                <button
                  type="button"
                  aria-label="Drag panel"
                  {...panelHandleProps}
                  className={cn(
                    "absolute top-1.5 right-1.5 z-10 flex size-6 cursor-grab touch-none items-center justify-center rounded-md bg-surface-container-low/70 text-on-surface-variant opacity-70 transition-opacity hover:bg-surface-container-high hover:opacity-100",
                    dragging && "cursor-grabbing opacity-100",
                  )}
                >
                  <Icon name="drag_indicator" size={16} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
