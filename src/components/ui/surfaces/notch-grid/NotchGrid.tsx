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
import { gridOutlinePath, maskCols, maskFromShape, maxTier } from "@/utils/grid-outline";
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

type Cell = readonly [number, number];

/** Outer-grid cells filled by a placed item — used for adjacency-based grouping
 *  at render time so two same-`groupKey` tiles that end up next to each other
 *  (edge or corner) get their chromes unioned into one shape. */
function itemFilledCells(p: {
  item: { matrix: number[][]; tier: number };
  col: number;
  row: number;
}): Cell[] {
  const out: Cell[] = [];
  const m = p.item.matrix;
  const tier = p.item.tier;
  for (let r = 0; r < m.length; r++) {
    const row = m[r] ?? [];
    for (let c = 0; c < row.length; c++) {
      const v = row[c];
      if (v >= 1 && v <= tier) out.push([p.col + c, p.row + r]);
    }
  }
  return out;
}

/** Group same-bucket placed items into 8-connected components — two items
 *  belong to the same component if any of one's filled cells is within 1 row /
 *  column of any of the other's (so corner-touching counts, just like the
 *  grid-outline tracer's diagonal-junction handling). */
function findConnectedComponents<T extends { col: number; row: number; cols: number; rows: number; item: { matrix: number[][]; tier: number } }>(
  items: T[],
): T[][] {
  if (items.length <= 1) return items.length ? [items] : [];
  const cells = items.map(itemFilledCells);
  const visited = new Array<boolean>(items.length).fill(false);
  const out: T[][] = [];
  for (let s = 0; s < items.length; s++) {
    if (visited[s]) continue;
    visited[s] = true;
    const queue = [s];
    const comp: T[] = [];
    while (queue.length) {
      const i = queue.shift()!;
      comp.push(items[i]);
      for (let j = 0; j < items.length; j++) {
        if (visited[j]) continue;
        let adj = false;
        outer: for (const [ax, ay] of cells[i]) {
          for (const [bx, by] of cells[j]) {
            if (Math.abs(ax - bx) <= 1 && Math.abs(ay - by) <= 1) {
              adj = true;
              break outer;
            }
          }
        }
        if (adj) {
          visited[j] = true;
          queue.push(j);
        }
      }
    }
    out.push(comp);
  }
  return out;
}

interface DragState {
  key: Key;
  pointerId: number;
  startX: number;
  startY: number;
  originCol: number;
  originRow: number;
  /** The dragged item's footprint width in blocks (to clamp the drop column). */
  originCols: number;
  /** When set, the drag moves a *whole linked component* — every member's
   *  override shifts by the same outer-cell delta on drop, so two tiles that
   *  share a unioned chrome (auto-linked at render time) move together when
   *  the user drags the chrome bridge between them. Singleton-component drags
   *  leave this undefined and just move the one tile. */
  members?: Array<{ key: Key; col: number; row: number; cols: number }>;
  dx: number;
  dy: number;
}

interface SubDragState {
  parentKey: Key;
  subKey: Key;
  /** Snapshot of the sub-item (cost, content, theme) so a drop outside the
   *  parent panel can promote it to a standalone same-themed tile. */
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
  /** The parent panel's outer-grid rect, captured at drag start — drops past
   *  this rect promote the sub to a standalone same-group outer-grid tile. */
  parentOuterCol: number;
  parentOuterRow: number;
  parentOuterCols: number;
  parentOuterRows: number;
  /** Sub-grid block size in px (so we can convert pointer-px to cells). */
  itemBlock: number;
  /** Resolved styles for the cursor-following ghost (theme inherits from the
   *  parent panel where the sub doesn't override). The ghost replaces the
   *  in-chrome tile during the drag so the user sees a rounded filled
   *  preview that follows their cursor instead of just the sub's contents
   *  silhouetted through the panel. */
  ghostFill?: string;
  ghostRadius: number;
  ghostPad: number;
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
  /** Adjacent same-`groupKey` placed items render unioned into one chrome.
   *  Sub-items from a {@link NotchGridItemProps.subItems} panel automatically
   *  share their parent's key as group; promoted (dragged-out) sub-items
   *  keep the same group so they can re-link when dragged back beside the
   *  rest. */
  groupKey?: Key;
  /** Natural panel extent — what the matrix would be if no sub-item drags
   *  had moved anything. Used as the inside-panel hit-box for sub-drag promote
   *  decisions: a drop within the natural rect is a sub-drag (the chrome
   *  reshapes / regrows), a drop past it promotes the sub to a standalone
   *  same-themed tile. Defaults to the current matrix size for plain items. */
  naturalCols: number;
  naturalRows: number;
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
      const deltaCol = Math.round(d.dx / block);
      const deltaRow = Math.round(d.dy / block);
      setDrag(null);
      if (d.members) {
        // Multi-member drag (linked chrome) — shift every member by the same
        // outer-cell delta so they keep their relative arrangement.
        setOverrides((prev) => {
          const next = new Map(prev);
          for (const m of d.members) {
            next.set(m.key, {
              col: Math.max(0, m.col + deltaCol),
              row: Math.max(0, m.row + deltaRow),
            });
          }
          return next;
        });
        for (const m of d.members) {
          onItemMove?.(
            m.key,
            Math.max(0, m.col + deltaCol),
            Math.max(0, m.row + deltaRow),
          );
        }
        return;
      }
      const maxCol = Math.max(0, colCount - d.originCols);
      const nextCol = Math.min(maxCol, Math.max(0, d.originCol + deltaCol));
      const nextRow = Math.max(0, d.originRow + deltaRow);
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
  // Sub-items the user dragged *out* of their parent panel. Each entry renders
  // as a standalone same-themed top-level outer-grid tile at the dropped cell,
  // and is removed from the parent's sub-pack. Linking back happens at render
  // time — promoted tiles share `groupKey = parentKey`, and the grid unions
  // adjacent same-group tiles into one chrome.
  const [promotedSubs, setPromotedSubs] = useState<
    Map<string, { parentKey: Key; subKey: Key; sub: NotchSubItem; col: number; row: number }>
  >(new Map());
  const promoteKey = (parentKey: Key, subKey: Key) => `${String(parentKey)} ${String(subKey)}`;
  // The hovered tile, identified by a composed key. For panel sub-items it's
  // `${parentKey}::${subKey}`; for standalone outer tiles inside a unioned
  // chrome it's the item's own key. The dim overlay (`bg-on-surface/10`) is
  // applied on the matching tile so adjacent grouped items get the same
  // hover affordance, not just sub-items.
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const subTileKey = (parentKey: Key, subKey: Key) => `${String(parentKey)}::${String(subKey)}`;

  /** Snap a drag offset to a sub-grid cell, clamped to `>= 0` on each axis.
   *  No upper clamp — letting the panel grow back is essential for cycles like
   *  "drag up 1 row → drag back": after the first drop the panel has shrunk,
   *  and clamping to the shrunken extent would prevent the drag-back from
   *  reaching its original sub-cell. The chrome can grow because the in-chrome
   *  layout is rebuilt from the placed sub-cells each render. */
  const snapDrag = (s: SubDragState): { col: number; row: number } => ({
    col: Math.max(0, s.originCol + Math.round(s.dx / s.itemBlock)),
    row: Math.max(0, s.originRow + Math.round(s.dy / s.itemBlock)),
  });

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
      // Translate the drop point to an outer-grid cell. If the cursor left the
      // parent panel's rect, the user dragged the sub *out* — promote it to a
      // standalone same-themed tile at that outer cell (adjacent tiles in the
      // same group re-link at render time). Otherwise commit a normal sub-drag.
      const gridRect = ref.current?.getBoundingClientRect();
      const dropOuterCol = gridRect
        ? Math.max(0, Math.floor((e.clientX - gridRect.left) / block))
        : null;
      const dropOuterRow = gridRect
        ? Math.max(0, Math.floor((e.clientY - gridRect.top) / block))
        : null;
      // The panel's natural extent (captured at drag start) is the in-panel
      // hit-box: drops inside it sub-drag (the chrome can reshape back to its
      // natural shape), drops outside promote. Using natural rather than the
      // current shrunken extent stops a "drag-up → drag-back" cycle from
      // tripping the promote branch on the way back.
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
        // Pin the parent panel at its current outer cell — promoting a sub
        // shrinks the panel's mask, and without a pin the outer pack would
        // reflow it (Calls/Day jumping to a new cell when Cron is dragged
        // out). The user can still drag the panel itself later to re-pin.
        setOverrides((prev) => {
          if (prev.has(s.parentKey)) return prev;
          const next = new Map(prev);
          next.set(s.parentKey, { col: s.parentOuterCol, row: s.parentOuterRow });
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
      // Sub-items the user has dragged out of *this* panel — they're rendered
      // below as their own same-group outer-grid tiles, not inside the panel.
      // Preserve the *original* prop-order index as `_i` so the derived
      // sub-keys (`s0`, `s1`, ...) stay stable across filters; otherwise a
      // remaining sibling inherits a promoted tile's stale subOverrides pin
      // and ends up at the wrong sub-cell.
      const raw = (props.subItems ?? [])
        .map((s, i) => ({ s, i }))
        .filter(({ s, i }) => {
          const k = s.key ?? `s${i}`;
          return !promotedSubs.has(promoteKey(key, k));
        });
      if (raw.length > 0) {
        const subs = raw.map(({ s, i }) => ({ ...asSubItem(s), _i: i }));
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
          // Panel layout stays frozen during a sub-drag — the dragged tile is
          // replaced by a cursor-following ghost overlay (rendered at the
          // outer-grid root below) so nothing in the chrome reshapes until the
          // drop commits.
          const pinned = subOver?.get(subKey);
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
        // Grow the column cap if a sub-drag commit pinned a tile past the
        // compact extent, so dropping a sub-item past the panel's current
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
        // Natural extent — what the chrome would be at rest with no sub-drag
        // overrides applied. Used as the in-panel hit-box for promote
        // decisions so a "drag-up → drag-back" cycle stays inside the panel
        // even when the first drop shrunk the live matrix. Re-pack only when
        // subOverrides actually pins something; otherwise it'd be identical
        // to subPlaced.
        const naturalPlaced =
          subOver && subOver.size > 0
            ? packItems(
                ordered.map((sub) => ({
                  item: { sub, key: sub.key ?? `s${sub._i}` },
                  mask: rectMask(sub.cost[0], sub.cost[1]),
                  col: sub.col,
                  row: sub.row,
                })),
                Math.max(props.subCols ?? compactCols, 1),
                { flowOrder: "farthest-fit" },
              ).placed
            : subPlaced;
        const naturalCols = naturalPlaced.reduce(
          (m, p) => Math.max(m, p.col + p.cols),
          maskCols(matrix),
        );
        const naturalRows = naturalPlaced.reduce(
          (m, p) => Math.max(m, p.row + p.rows),
          matrix.length,
        );
        resolved.push({
          props,
          key,
          matrix,
          tier: 1,
          subPlaced: subPlaced.map((p) => ({ sub: p.item.sub, key: p.item.key, col: p.col, row: p.row })),
          groupKey: props.groupKey ?? key,
          naturalCols,
          naturalRows,
        });
        continue;
      }
      // Plain item (or a panel whose every sub-item was dragged out — skip the
      // empty husk, the promoted children below will represent the group).
      if (props.subItems && props.subItems.length > 0) continue;
      const matrix = resolveShapeMatrix(props.shape ?? [[1]], {
        width,
        columns: colCount,
        breakpoints: bps,
      });
      resolved.push({
        props,
        key,
        matrix,
        tier: props.tier ?? maxTier(matrix),
        groupKey: props.groupKey,
        naturalCols: Math.max(1, maskCols(matrix)),
        naturalRows: Math.max(1, matrix.length),
      });
    }
    // Promoted sub-items become standalone outer-grid tiles at the dropped
    // cell. They inherit the parent panel's theme so a Cron tile dragged out
    // of a primary-container panel still reads as part of that family, and
    // share `groupKey = parent-key` so adjacent ones re-link at render time.
    for (const entry of promotedSubs.values()) {
      const parentConfig = configs.find((c) => c.key === entry.parentKey);
      const parentProps: NotchGridItemProps = parentConfig?.props ?? {};
      const cost = entry.sub.cost;
      const matrix = rectMatrix(cost[0], cost[1]);
      resolved.push({
        props: {
          shape: matrix,
          fill: entry.sub.fill ?? parentProps.fill,
          stroke: entry.sub.stroke ?? parentProps.stroke,
          strokeWidth: entry.sub.strokeWidth ?? parentProps.strokeWidth,
          radius: entry.sub.radius ?? parentProps.radius,
          inverseRadius: entry.sub.inverseRadius ?? parentProps.inverseRadius,
          pad: entry.sub.pad ?? parentProps.pad,
          noClip: entry.sub.noClip,
          className: entry.sub.className,
          style: entry.sub.style,
          col: entry.col,
          row: entry.row,
          children: entry.sub.content,
        },
        key: promoteKey(entry.parentKey, entry.subKey),
        matrix,
        tier: 1,
        groupKey: parentProps.groupKey ?? entry.parentKey,
        naturalCols: Math.max(1, maskCols(matrix)),
        naturalRows: Math.max(1, matrix.length),
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
    // Layout is frozen during the drag itself — only the commits in
    // `subOverrides` / `promotedSubs` re-pack. The cursor-following ghost is
    // a render-only overlay that doesn't touch the pack.
  }, [children, items, width, colCount, bps, nest, overrides, subOverrides, promotedSubs]);

  // Bucket placed items by `groupKey` (singletons get a unique bucket so they
  // never accidentally merge with anything). Within each bucket, find 8-
  // connected components — a component is a set of placed items where every
  // member is reachable via edge- or corner-adjacent cells — so two adjacent
  // tiles in the same group render as one unioned chrome, while group members
  // dragged far apart render as separate same-themed tiles.
  const components = useMemo(() => {
    const buckets = new Map<string, typeof placed>();
    placed.forEach((p, i) => {
      const gk =
        p.item.groupKey != null
          ? `g:${String(p.item.groupKey)}`
          : `s:${i}:${String(p.item.key)}`;
      const list = buckets.get(gk);
      if (list) list.push(p);
      else buckets.set(gk, [p]);
    });
    const out: typeof placed[] = [];
    for (const members of buckets.values()) {
      for (const comp of findConnectedComponents(members)) out.push(comp);
    }
    return out;
  }, [placed]);

  return (
    <div ref={ref} className={cn("w-full", className)} style={style}>
      <div
        className="relative"
        style={{ width: gridCols * block, height: gridRows * block }}
      >
        {components.map((comp) => {
          // Bounding box of the component in outer-grid cells — the wrapper
          // sits here and the union mask is built relative to it.
          let minCol = Infinity,
            minRow = Infinity,
            maxCol = 0,
            maxRow = 0;
          for (const p of comp) {
            minCol = Math.min(minCol, p.col);
            minRow = Math.min(minRow, p.row);
            maxCol = Math.max(maxCol, p.col + p.cols);
            maxRow = Math.max(maxRow, p.row + p.rows);
          }
          const groupCols = Math.max(1, maxCol - minCol);
          const groupRows = Math.max(1, maxRow - minRow);
          // Union mask: union of each member's filled cells at their bounding-
          // box-relative position. Same `BlockShape` outline tracer as before;
          // it already handles edge AND corner-touching with the inverse-
          // radius bridge.
          const unionMask: number[][] = Array.from({ length: groupRows }, () =>
            new Array<number>(groupCols).fill(0),
          );
          for (const p of comp) {
            const m = p.item.matrix;
            for (let r = 0; r < m.length; r++) {
              const mr = m[r] ?? [];
              for (let c = 0; c < mr.length; c++) {
                const v = mr[c];
                if (v >= 1 && v <= p.item.tier) {
                  unionMask[p.row - minRow + r][p.col - minCol + c] = 1;
                }
              }
            }
          }
          // Theme is taken from the lead member (the first placed entry in the
          // component) — same-group tiles share their parent's theme by
          // construction so this just propagates it to the unioned chrome.
          const lead = comp[0];
          const leadProps = lead.item.props;
          // Chrome outline (CSS path) — clips the wrapper's hit area to the
          // actual shape so a click on a *notch* (a cell inside the bounding
          // box but outside the chrome) doesn't drag the panel; it passes
          // through to the tile underneath. Dropped during a drag so the
          // cursor-follow tile can extend past the chrome unclipped.
          const wrapperChromePath = gridOutlinePath(
            unionMask.map((row) => row.map((v) => v > 0)),
            {
              cell: block,
              gap,
              radius: leadProps.radius ?? radius ?? 24,
              inverseRadius: leadProps.inverseRadius ?? inverseRadius ?? 32,
            },
          );
          const compKey = comp
            .map((p) => String(p.item.key))
            .sort()
            .join("|");
          // Drop the chrome's clip while *any* member of this component is
          // being dragged — sub-drag of a panel sub-item *or* outer-drag of a
          // unioned standalone (e.g. a promoted Cron sitting beside Calls/Day
          // in the same chrome). Without this the cursor-follow tile gets
          // chopped at the parent outline.
          const isDraggingInComp =
            (!!subDrag && comp.some((p) => p.item.key === subDrag.parentKey)) ||
            (!!drag && comp.some((p) => p.item.key === drag.key));
          const isSingletonComp = comp.length === 1;
          const isPlainSingleton = isSingletonComp && !lead.item.subPlaced;
          // Drag handlers on the component wrapper. For a singleton it moves
          // the one tile (panel chrome or plain tile); for a multi-member
          // linked component it carries `members` and moves every linked
          // tile together. Sub-items / individual member tiles inside have
          // their own handlers with `stopPropagation`, so a press on a tile
          // starts the per-tile drag instead.
          const singletonTileKey = String(lead.item.key);
          const singletonHovered = isPlainSingleton && hoveredTile === singletonTileKey;
          const wrapperDrag =
            draggable
              ? {
                  onPointerEnter: isPlainSingleton
                    ? () => setHoveredTile(singletonTileKey)
                    : undefined,
                  onPointerLeave: isPlainSingleton
                    ? () =>
                        setHoveredTile((prev) =>
                          prev === singletonTileKey ? null : prev,
                        )
                    : undefined,
                  onPointerDown: (e: ReactPointerEvent) => {
                    if (e.button !== 0) return;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setHoveredTile(null);
                    setDrag({
                      key: lead.item.key,
                      pointerId: e.pointerId,
                      startX: e.clientX,
                      startY: e.clientY,
                      originCol: lead.col,
                      originRow: lead.row,
                      originCols: lead.cols,
                      members: isSingletonComp
                        ? undefined
                        : comp.map((p) => ({
                            key: p.item.key,
                            col: p.col,
                            row: p.row,
                            cols: p.cols,
                          })),
                      dx: 0,
                      dy: 0,
                    });
                  },
                  onPointerMove: handlePointerMove,
                  onPointerUp: endDrag,
                  onPointerCancel: endDrag,
                }
              : undefined;
          const wrapperDragging =
            !!drag &&
            (drag.members
              ? drag.members.some((m) => comp.some((p) => p.item.key === m.key))
              : isSingletonComp && drag.key === lead.item.key);
          // Each member of the component contributes its tile(s) — sub-items
          // (with their own sub-drag handlers, which promote out of the panel
          // when the drop leaves the parent rect) for a panel, or the whole
          // content (with outer-drag handlers) for a standalone item.
          const tiles: ReactNode[] = [];
          for (const p of comp) {
            const { props: mProps, key: mKey, matrix: mMatrix, subPlaced } = p.item;
            const mItemBlock = mProps.block ?? block;
            if (subPlaced) {
              // Panel — render each kept sub-item as a positioned tile inside
              // the unioned chrome.
              const parentSubCols = Math.max(
                1,
                ...subPlaced.map((sp) => sp.col + Math.max(1, sp.sub.cost[0])),
              );
              const parentSubRows = Math.max(
                1,
                ...subPlaced.map((sp) => sp.row + Math.max(1, sp.sub.cost[1])),
              );
              for (const { sub, key: subKey, col: sc, row: sr } of subPlaced) {
                const subBeingDragged =
                  subDrag?.parentKey === mKey && subDrag.subKey === subKey;
                const tileKey = subTileKey(mKey, subKey);
                const subHovered = hoveredTile === tileKey;
                const subHandlers = draggable
                  ? {
                      onPointerEnter: () => setHoveredTile(tileKey),
                      onPointerLeave: () =>
                        setHoveredTile((prev) => (prev === tileKey ? null : prev)),
                      onPointerDown: (e: ReactPointerEvent) => {
                        if (e.button !== 0) return;
                        e.stopPropagation();
                        e.currentTarget.setPointerCapture(e.pointerId);
                        // Pointer capture sticks to this element for the rest
                        // of the drag, so siblings never receive a leave event
                        // — clear hover here so a sibling that the cursor *was*
                        // on (e.g. Calls/Day while reaching for Cron) doesn't
                        // stay highlighted for the whole drag.
                        setHoveredTile(null);
                        setSubOverrides((prev) => {
                          const next = new Map(prev);
                          const inner = new Map(next.get(mKey) ?? new Map());
                          for (const sp of subPlaced) inner.set(sp.key, { col: sp.col, row: sp.row });
                          next.set(mKey, inner);
                          return next;
                        });
                        setSubDrag({
                          parentKey: mKey,
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
                          parentOuterCol: p.col,
                          parentOuterRow: p.row,
                          parentOuterCols: p.item.naturalCols,
                          parentOuterRows: p.item.naturalRows,
                          itemBlock: mItemBlock,
                          ghostFill: sub.fill ?? mProps.fill ?? fill,
                          ghostRadius: sub.radius ?? mProps.radius ?? radius ?? 24,
                          ghostPad: sub.pad ?? mProps.pad ?? pad ?? 16,
                          dx: 0,
                          dy: 0,
                        });
                      },
                      onPointerMove: handleSubPointerMove,
                      onPointerUp: endSubDrag,
                      onPointerCancel: endSubDrag,
                    }
                  : undefined;
                // Position relative to the unioned chrome's top-left.
                const tileLeft = (p.col - minCol + sc) * mItemBlock + gap / 2;
                const tileTop = (p.row - minRow + sr) * mItemBlock + gap / 2;
                tiles.push(
                  <div
                    key={`${String(mKey)}/${String(subKey)}`}
                    {...subHandlers}
                    className={cn(
                      "absolute overflow-hidden transition-colors",
                      draggable && "cursor-grab select-none touch-none",
                      // Show grabbing on this tile when it's the one being
                      // dragged *or* when the whole linked component is being
                      // dragged from its chrome bridge (every member shifts
                      // together — they should all read as 'in drag').
                      (subBeingDragged || wrapperDragging) && "cursor-grabbing",
                      subHovered && !subBeingDragged && !wrapperDragging && "bg-on-surface/10",
                      sub.className,
                    )}
                    style={{
                      left: tileLeft,
                      top: tileTop,
                      width: blocks(sub.cost[0]) * mItemBlock - gap,
                      height: blocks(sub.cost[1]) * mItemBlock - gap,
                      padding: sub.pad ?? mProps.pad ?? pad ?? 16,
                      // Drag-active visual: tighten the corner radius (0.5
                      // vs 0.75 at rest) and force a solid background so the
                      // tile reads as a picked-up card lifted off the chrome
                      // when the whole linked component is being dragged.
                      borderRadius:
                        (sub.radius ?? mProps.radius ?? radius ?? 24) *
                        (wrapperDragging ? 0.5 : 0.75),
                      background: wrapperDragging
                        ? sub.fill ?? mProps.fill ?? fill
                        : sub.fill && sub.fill !== "none"
                        ? sub.fill
                        : undefined,
                      // Hide the in-chrome tile during the drag — the ghost
                      // overlay (rendered as a sibling of the grid below)
                      // tracks the cursor with the rounded filled preview.
                      // We keep the element mounted so the captured pointer
                      // still has its target.
                      opacity: subBeingDragged ? 0 : undefined,
                      zIndex: subBeingDragged ? 30 : undefined,
                      ...sub.style,
                    }}
                  >
                    {sub.content}
                  </div>,
                );
              }
            } else {
              // Standalone tile inside a unioned chrome — render its children
              // at its bounding-box-relative position, with outer-drag handlers
              // when there's more than one member in the component (singletons
              // get drag on the outer wrapper instead).
              const draggingThis = drag?.key === mKey;
              const memberTileKey = String(mKey);
              const memberHovered = hoveredTile === memberTileKey;
              const memberDrag =
                draggable && !isPlainSingleton
                  ? {
                      onPointerEnter: () => setHoveredTile(memberTileKey),
                      onPointerLeave: () =>
                        setHoveredTile((prev) => (prev === memberTileKey ? null : prev)),
                      onPointerDown: (e: ReactPointerEvent) => {
                        if (e.button !== 0) return;
                        // Stop bubbling so a tile-level press doesn't also
                        // fire the wrapper's whole-component drag — clicking
                        // a tile moves only that tile.
                        e.stopPropagation();
                        e.currentTarget.setPointerCapture(e.pointerId);
                        setHoveredTile(null);
                        setDrag({
                          key: mKey,
                          pointerId: e.pointerId,
                          startX: e.clientX,
                          startY: e.clientY,
                          originCol: p.col,
                          originRow: p.row,
                          originCols: p.cols,
                          dx: 0,
                          dy: 0,
                        });
                      },
                      onPointerMove: handlePointerMove,
                      onPointerUp: endDrag,
                      onPointerCancel: endDrag,
                    }
                  : undefined;
              const tileLeft = (p.col - minCol) * mItemBlock + gap / 2;
              const tileTop = (p.row - minRow) * mItemBlock + gap / 2;
              tiles.push(
                <div
                  key={String(mKey)}
                  {...memberDrag}
                  className={cn(
                    "absolute overflow-hidden transition-[filter] duration-150",
                    draggable && !isPlainSingleton && "cursor-grab select-none touch-none",
                    // Match the sub-item rule: this tile, or the whole
                    // component (wrapper drag), in active drag → grabbing.
                    (draggingThis || wrapperDragging) && "cursor-grabbing",
                    // Standalone member tiles have an inline background
                    // (inherited from the parent's `fill` so the cursor-
                    // follow visual stays themed when dragged past the
                    // chrome). A Tailwind `bg-on-surface/10` class would be
                    // overridden by that inline background, so use a filter
                    // here — same affordance as sub-items, just applied
                    // through brightness instead of an overlay.
                    memberHovered && !draggingThis && !wrapperDragging && "brightness-95",
                    mProps.className,
                  )}
                  style={{
                    left: tileLeft,
                    top: tileTop,
                    width: maskCols(mMatrix) * mItemBlock - gap,
                    height: mMatrix.length * mItemBlock - gap,
                    padding: mProps.pad ?? pad ?? 16,
                    // Drag-active visual: tighter corner radius (0.5 vs
                    // 0.75 at rest) so a picked-up tile reads as a lifted
                    // card. Applies whether this tile is the one being
                    // outer-dragged or the whole linked component is.
                    borderRadius:
                      (mProps.radius ?? radius ?? 24) *
                      (draggingThis || wrapperDragging ? 0.5 : 0.75),
                    // Same fill as the chrome behind it — invisible at rest
                    // (they overlap exactly), but the moment the member is
                    // outer-dragged its transform takes it past the chrome
                    // and this background keeps the rounded teal preview.
                    background:
                      mProps.fill && mProps.fill !== "none" ? mProps.fill : undefined,
                    transform: draggingThis && drag
                      ? `translate(${drag.dx}px, ${drag.dy}px)`
                      : undefined,
                    zIndex: draggingThis ? 30 : undefined,
                    ...mProps.style,
                  }}
                >
                  {mProps.children}
                </div>,
              );
            }
          }
          return (
            <div
              key={compKey}
              {...wrapperDrag}
              className={cn(
                "absolute transition-[filter] duration-150",
                draggable && "select-none touch-none",
                draggable && (wrapperDragging ? "cursor-grabbing" : "cursor-grab"),
                // Slight tonal dim on the whole tile when hovered — the same
                // affordance the in-chrome members get via `bg-on-surface/10`,
                // applied here via brightness since a singleton's tile is a
                // BlockShape with its own SVG fill (a background overlay would
                // sit *outside* the chrome outline instead of tinting the fill).
                // Only for plain singletons; panels and linked components leave
                // their chrome alone and let each tile carry its own hover.
                singletonHovered && !wrapperDragging && "brightness-95",
              )}
              style={{
                left: minCol * block,
                top: minRow * block,
                transform: wrapperDragging && drag
                  ? `translate(${drag.dx}px, ${drag.dy}px)`
                  : undefined,
                zIndex: wrapperDragging
                  ? 20
                  : overrides.has(lead.item.key)
                  ? 10
                  : undefined,
                // Hit-clip the wrapper to the chrome outline so a click on a
                // notch (e.g. Builds nestled into the Status panel's plus-
                // shaped notch) reaches the underlying tile instead of being
                // intercepted by this component's wrapper rectangle.
                clipPath: isDraggingInComp ? undefined : `path('${wrapperChromePath}')`,
              }}
            >
              <BlockShape
                shape={unionMask}
                tier={1}
                block={block}
                gap={gap}
                radius={leadProps.radius ?? radius}
                inverseRadius={leadProps.inverseRadius ?? inverseRadius}
                fill={leadProps.fill ?? fill}
                stroke={leadProps.stroke ?? stroke}
                strokeWidth={leadProps.strokeWidth ?? strokeWidth}
                pad={isPlainSingleton ? leadProps.pad ?? pad : 0}
                noClip={isDraggingInComp || (isPlainSingleton ? leadProps.noClip : undefined)}
                className={isPlainSingleton ? leadProps.className : undefined}
                style={isPlainSingleton ? leadProps.style : undefined}
              >
                {isPlainSingleton ? leadProps.children : tiles}
              </BlockShape>
            </div>
          );
        })}
        {subDrag && (
          <div
            key={`ghost:${String(subDrag.parentKey)}/${String(subDrag.subKey)}`}
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left:
                subDrag.parentOuterCol * block +
                subDrag.originCol * subDrag.itemBlock +
                gap / 2,
              top:
                subDrag.parentOuterRow * block +
                subDrag.originRow * subDrag.itemBlock +
                gap / 2,
              width: blocks(subDrag.cost[0]) * subDrag.itemBlock - gap,
              height: blocks(subDrag.cost[1]) * subDrag.itemBlock - gap,
              // Tighter radius than at-rest (`* 0.75`) matches the drag-
              // active visual the other tile paths use during a wrapper
              // drag, so the cursor-follow ghost reads consistently.
              borderRadius: subDrag.ghostRadius * 0.5,
              background:
                subDrag.ghostFill && subDrag.ghostFill !== "none"
                  ? subDrag.ghostFill
                  : undefined,
              padding: subDrag.ghostPad,
              transform: `translate(${subDrag.dx}px, ${subDrag.dy}px)`,
              zIndex: 50,
            }}
          >
            {subDrag.sub.content}
          </div>
        )}
      </div>
    </div>
  );
}

