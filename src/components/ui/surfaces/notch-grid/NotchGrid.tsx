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
import { BlockShape, BLOCK_SIZE } from "./BlockShape";
import {
  NOTCH_BREAKPOINTS,
  rectMatrix,
  resolveShapeMatrix,
  type NotchBreakpoints,
} from "./breakpoints";
import {
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
  /** The sub-item being dragged (cost, content, etc.) — kept so a drop outside
   *  the parent panel can promote it to a standalone outer-grid item without
   *  losing its config. */
  sub: NotchSubItem;
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
  /** The parent panel's outer-grid rect (col, row, cols, rows) captured at
   *  drag start — used to tell "drop is still inside this panel" from "drop
   *  went out of the panel ⇒ promote to its own outer-grid item". */
  parentOuterCol: number;
  parentOuterRow: number;
  parentOuterCols: number;
  parentOuterRows: number;
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
  // Sub-items the user has dragged *out* of their parent panel. Each entry
  // turns into a standalone top-level outer-grid item at the given cell, and
  // is filtered out of its parent's sub-pack.
  const [promotedSubs, setPromotedSubs] = useState<
    Map<string, { parentKey: Key; subKey: Key; sub: NotchSubItem; col: number; row: number }>
  >(new Map());
  const promoteKey = (parentKey: Key, subKey: Key) => `${String(parentKey)} ${String(subKey)}`;
  const [hoveredSub, setHoveredSub] = useState<{ parentKey: Key; subKey: Key } | null>(null);

  /** Snap a drag offset to a sub-grid cell, clamped to the panel's pre-drag
   *  bounds — the sub-item can't leave the panel. Going past an edge holds at
   *  the edge instead of jumping the sub-item to a far-away cell that would
   *  split the panel into two disjoint regions. */
  const snapDrag = (s: SubDragState): { col: number; row: number } => ({
    col: Math.max(
      0,
      Math.min(s.parentSubCols - s.cost[0], s.originCol + Math.round(s.dx / s.itemBlock)),
    ),
    row: Math.max(
      0,
      Math.min(s.parentSubRows - s.cost[1], s.originRow + Math.round(s.dy / s.itemBlock)),
    ),
  });

  // Live-preview snap: the cell the dragged sub-item would land in *right now*.
  // Fed into the layout pipeline so the other sub-items re-flow as the user
  // drags (instead of waiting for the drop), while the dragged sub-item's own
  // CSS transform keeps it under the cursor smoothly.
  const liveSnap = subDrag ? { parentKey: subDrag.parentKey, subKey: subDrag.subKey, ...snapDrag(subDrag) } : null;

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
      // Translate the drop point to an outer-grid cell. If it lands outside
      // the parent panel's rect, the user dragged the sub-item *out* — promote
      // it to a standalone outer-grid item there. Otherwise commit a normal
      // sub-drag (snap inside the panel, update subOverrides).
      const gridRect = ref.current?.getBoundingClientRect();
      const dropOuterCol = gridRect
        ? Math.max(0, Math.floor((e.clientX - gridRect.left) / block))
        : null;
      const dropOuterRow = gridRect
        ? Math.max(0, Math.floor((e.clientY - gridRect.top) / block))
        : null;
      const droppedInsidePanel =
        dropOuterCol != null &&
        dropOuterRow != null &&
        dropOuterCol >= s.parentOuterCol &&
        dropOuterCol < s.parentOuterCol + s.parentOuterCols &&
        dropOuterRow >= s.parentOuterRow &&
        dropOuterRow < s.parentOuterRow + s.parentOuterRows;
      setSubDrag(null);
      if (!droppedInsidePanel && dropOuterCol != null && dropOuterRow != null) {
        setPromotedSubs((prev) => {
          const next = new Map(prev);
          next.set(promoteKey(s.parentKey, s.subKey), {
            parentKey: s.parentKey,
            subKey: s.subKey,
            sub: s.sub,
            col: dropOuterCol,
            row: dropOuterRow,
          });
          return next;
        });
        return;
      }
      const { col: nextCol, row: nextRow } = snapDrag(s);
      setSubOverrides((prev) => {
        const next = new Map(prev);
        const inner = new Map(next.get(s.parentKey) ?? new Map());
        inner.set(s.subKey, { col: nextCol, row: nextRow });
        next.set(s.parentKey, inner);
        return next;
      });
      onSubItemMove?.(s.parentKey, s.subKey, nextCol, nextRow);
    },
    [block, onSubItemMove],
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

    const resolved: ResolvedItem[] = [];
    for (const { props, key } of configs) {
      // Hide sub-items the user dragged out of this panel — they're rendered
      // as their own outer-grid items further below instead.
      const raw = props.subItems?.filter((s, i) => {
        const k = s.key ?? `s${i}`;
        return !promotedSubs.has(promoteKey(key, k));
      });
      if (raw && raw.length > 0) {
        const subs = raw.map((s, i) => ({ ...asSubItem(s), _i: i }));
        const cw = (s: { cost: readonly [number, number] }) => Math.max(1, Math.floor(s.cost[0]));
        const maxSubW = Math.max(1, ...subs.map(cw));
        const subOver = subOverrides.get(key);
        // Pack the biggest sub-item first so it anchors the corner — combined
        // with `farthest-fit` flow below this puts the small tile at the
        // diagonally opposite cell instead of having the big tile collapse
        // next to it. `_packIdx` preserves the original index for stable React
        // keys (`subPlaced` may end up in pack order, not props order).
        const ordered = [...subs].sort(
          (a, b) => b.cost[0] * b.cost[1] - a.cost[0] * a.cost[1] || a._i - b._i,
        );
        const subInputs: LayoutInput<{ sub: NotchSubItem; key: Key }>[] = ordered.map((sub) => {
          const subKey = sub.key ?? `s${sub._i}`;
          // Live drag preview wins over the persistent pinned position so the
          // pack reshapes around the dragged sub-item *as* it moves.
          const isLive = liveSnap && liveSnap.parentKey === key && liveSnap.subKey === subKey;
          const pinned = isLive ? { col: liveSnap.col, row: liveSnap.row } : subOver?.get(subKey);
          return {
            item: { sub, key: subKey },
            mask: rectMask(sub.cost[0], sub.cost[1]),
            col: pinned?.col ?? sub.col,
            row: pinned?.row ?? sub.row,
          };
        });
        // Pack into a compact square-ish box (capped at `√(area · aspect)` —
        // wider would let `farthest-fit` run away to the far right of the
        // outer grid instead of landing at the diagonal corner) with
        // `farthest-fit` flow always on, so:
        //  • the *first* (largest) tile anchors at `(0,0)`,
        //  • each subsequent tile lands as far from the anchors as it fits,
        //  • when a tile has an explicit drop position, the rest still arrange
        //    around it diagonally,
        //  • pressing a tile (drag-start with no movement) doesn't shift
        //    anything — its origin = its current cell, so the diagonal
        //    re-pack is identical to the previous frame.
        const totalSubCells = subs.reduce(
          (n, s) => n + Math.max(1, Math.floor(s.cost[0])) * Math.max(1, Math.floor(s.cost[1])),
          0,
        );
        const targetAspect = props.subAspect ?? 1.6;
        const compactCols = Math.max(maxSubW, Math.ceil(Math.sqrt(totalSubCells * targetAspect)));
        // Grow the column cap if a pin (drag drop / live preview) sits past
        // the compact extent, so dragging a sub-item past the panel's current
        // right edge extends the panel instead of having the packer overflow
        // the pin and re-flow it back inside.
        const maxPinCol = subInputs.reduce((m, i) => {
          if (i.col == null) return m;
          const w = i.mask[0]?.length ?? 1;
          return Math.max(m, i.col + w);
        }, 0);
        const subC = Math.max(props.subCols ?? compactCols, maxPinCol);
        const subPlaced = packItems(subInputs, subC, { flowOrder: "farthest-fit" }).placed;
        const matrix = placementToMask(subPlaced).map((row) => row.map((b) => (b ? 1 : 0)));
        resolved.push({
          props,
          key,
          matrix,
          tier: 1,
          subPlaced: subPlaced.map((p) => ({ sub: p.item.sub, key: p.item.key, col: p.col, row: p.row })),
        });
        continue;
      }
      // Plain item (or panel whose every sub-item was dragged out — render the
      // empty husk as a 1×1 so the panel still has a key for animations etc.).
      if (props.subItems && props.subItems.length > 0) continue; // every sub was promoted away — drop the empty husk
      const matrix = resolveShapeMatrix(props.shape ?? [[1]], {
        width,
        columns: colCount,
        breakpoints: bps,
      });
      resolved.push({ props, key, matrix, tier: props.tier ?? maxTier(matrix) });
    }
    // Promoted sub-items show up as standalone outer-grid items at the cell
    // the user dropped them on. Their pinned position lives in `promotedSubs`
    // (not the regular `overrides` map) so they're independent of the parent
    // panel's drag state.
    for (const entry of promotedSubs.values()) {
      const cost = entry.sub.cost;
      const matrix = rectMatrix(cost[0], cost[1]);
      resolved.push({
        props: {
          shape: matrix,
          fill: entry.sub.fill,
          radius: entry.sub.radius,
          pad: entry.sub.pad,
          col: entry.col,
          row: entry.row,
          children: entry.sub.content,
        },
        key: promoteKey(entry.parentKey, entry.subKey),
        matrix,
        tier: 1,
      });
    }

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
    // Primitive `liveSnap` deps — re-pack only when the dragged sub-item's
    // snapped cell changes, not on every sub-pixel pointer-move.
  }, [children, items, width, colCount, bps, nest, overrides, subOverrides, promotedSubs, liveSnap?.parentKey, liveSnap?.subKey, liveSnap?.col, liveSnap?.row]);

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
                        // Pin every sibling at its current rendered cell so the
                        // farthest-fit pack treats them as anchors during this
                        // drag — without this, moving one sub-item makes the
                        // others slide to the diagonally-opposite cell on every
                        // re-pack. Only the dragged tile moves; siblings stay
                        // put until the user drags them next.
                        setSubOverrides((prev) => {
                          const next = new Map(prev);
                          const inner = new Map(next.get(key) ?? new Map());
                          for (const p of subPlaced) inner.set(p.key, { col: p.col, row: p.row });
                          next.set(key, inner);
                          return next;
                        });
                        setSubDrag({
                          parentKey: key,
                          subKey,
                          sub,
                          pointerId: e.pointerId,
                          startX: e.clientX,
                          startY: e.clientY,
                          originCol: sc,
                          originRow: sr,
                          cost: sub.cost,
                          parentSubCols,
                          parentSubRows,
                          parentOuterCol: col,
                          parentOuterRow: row,
                          parentOuterCols: itemCols,
                          parentOuterRows: matrix.length,
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
                      // Inset by `gap / 2` on all sides so each sub-item is a
                      // bounded rounded rect — adjacent ones sit `gap` apart and
                      // the panel's chrome-background shows through, giving the
                      // user something to grab to drag the whole panel.
                      left: sc * itemBlock + gap / 2,
                      top: sr * itemBlock + gap / 2,
                      width: blocks(sub.cost[0]) * itemBlock - gap,
                      height: blocks(sub.cost[1]) * itemBlock - gap,
                      padding: sub.pad ?? props.pad ?? pad ?? 16,
                      borderRadius: (sub.radius ?? props.radius ?? radius ?? 24) * 0.75,
                      background: sub.fill && sub.fill !== "none" ? sub.fill : undefined,
                      // Compensate for the dragged sub-item's packed cell
                      // having moved under it during live re-pack: the visual
                      // position follows the cursor's offset from the drag
                      // start regardless of which cell the pack put it in.
                      transform: subBeingDragged
                        ? `translate(${subDrag.dx - (sc - subDrag.originCol) * itemBlock}px, ${subDrag.dy - (sr - subDrag.originRow) * itemBlock}px)`
                        : undefined,
                      zIndex: subBeingDragged ? 30 : undefined,
                      ...sub.style,
                    }}
                  >
                    {sub.content}
                  </div>
                );
              })
            : props.children;

          // Whole-item drag — for plain items, pointer-down anywhere on the tile
          // drags it; for panels, pointer-down on the panel's chrome (the gap
          // regions between sub-items, or any spot not covered by a sub-item)
          // drags the panel, while pointer-down on a sub-item stops propagation
          // and starts a sub-item drag instead.
          const dragHandlers = draggable
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

          return (
            <div
              key={key}
              {...dragHandlers}
              className={cn(
                "absolute",
                draggable && "select-none touch-none",
                draggable && (dragging ? "cursor-grabbing" : "cursor-grab"),
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
