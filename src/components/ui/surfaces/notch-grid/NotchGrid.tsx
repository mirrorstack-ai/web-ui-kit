// NotchGrid — desire-driven notched layout for the dynamic-ui wire format.
//
// Items declare position / shape priorities; `solveLayout` packs them; each
// placement renders as a `BlockShape` themed via `resolveNotchTheme`.
//
// Container sizing (when `cols="auto"`): a ResizeObserver applies the
// >blockMin-gain-1-col rule —
//   `cols = max(1, floor(containerWidth / blockMin))`
//   `block = containerWidth / cols`
// so the surface never leaves dead space at the edges, and block size lives
// in `[blockMin, 2·blockMin)`.
//
// Drag (when `draggable`): outer tiles drag-to-place; sub-items drag within
// their panel and promote to top-level when dropped past the panel rect.
//
// See `mirrorstack-docs/architecture/notch-grid-v2/02-api.md` + `05-sub-drag.md`.

import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import { maskCols } from "@/utils/grid-outline";
import { BlockShape, BLOCK_SIZE } from "./BlockShape";
import {
  placementToMask,
  solveLayout,
  type Desire,
  type Mask,
  type Placement,
  type Pos,
  type SolverOutput,
} from "./layout";
import { resolveNotchTheme, type NotchTheme } from "./theme";

export const meta: ComponentMeta = {
  name: "NotchGrid",
  description:
    "Desire-driven notched layout. Items declare position/shape priorities; the solver packs them; each placement renders as a BlockShape themed via tokens. Implements the >96px gain-1-col / 1fr container rule, outer drag-to-place, and sub-item drag + promote.",
};

// --- Public types ----------------------------------------------------------

export type ItemKey = string;

/** Free-form payload for a renderable primitive. The grid passes the entire
 *  `ui` object to the primitive component as its props — `type` selects which
 *  component to render, the rest are forwarded. */
export interface NotchGridUI {
  type: string;
  /** Reference into the envelope's `defs` for the renderer to evaluate. The
   *  grid itself does not run it. */
  code?: string;
  [extraProps: string]: unknown;
}

export interface NotchGridItem {
  key?: ItemKey;
  desire: Desire;
  theme?: NotchTheme;
  /** Reserved — adjacency auto-link by `groupKey`. Renders as separate
   *  chromes today; unified chrome via union-of-masks lands in a later slice. */
  groupKey?: string;
  /** Either `ui` (single primitive content) or `subItems` (nested panel). */
  ui?: NotchGridUI;
  subItems?: NotchSubItem[];
}

export interface NotchSubItem {
  key?: ItemKey;
  desire: Desire;
  /** Sub-items inherit `type` from the parent panel; only `variant` and
   *  `gradient` can be overridden. */
  theme?: Partial<NotchTheme>;
  ui: NotchGridUI;
}

export type PrimitiveRegistry = Record<string, ComponentType<Record<string, unknown>>>;

export interface NotchGridError {
  kind: "unknown-primitive";
  type: string;
}

export interface NotchGridProps {
  items: NotchGridItem[];
  /** Column count, or `"auto"` (default) to derive from container width via
   *  the gain-1-col rule. */
  cols?: number | "auto";
  /** Minimum block size in px when `cols="auto"`. The grid gains a column
   *  each time the container can fit one more `blockMin`. Default 96. */
  blockMin?: number;
  /** Gap between blocks in px (notch erosion). Default 8. */
  gap?: number;
  /** Reserved — already implied by the solver's cell-level collision. */
  nest?: boolean;
  /** Map from `ui.type` → React component. Receives the full `ui` object as
   *  props. Unknown types fire `onItemError` and render a placeholder so the
   *  layout doesn't collapse. */
  primitives?: PrimitiveRegistry;
  onItemError?: (key: ItemKey, error: NotchGridError) => void;
  /** Enable outer-grid drag-to-place AND sub-item drag + promote. */
  draggable?: boolean;
  /** Called after an outer tile drops, with its new block position. */
  onItemMove?: (key: ItemKey, pos: Pos) => void;
  /** Called after a sub-item is repositioned within its panel. */
  onSubItemMove?: (parentKey: ItemKey, subIndex: number, pos: Pos) => void;
  /** Called after a sub-item is dragged out of its panel (promoted to a
   *  top-level tile), with its new outer block position. */
  onSubItemPromote?: (parentKey: ItemKey, subIndex: number, pos: Pos) => void;
  className?: string;
  style?: CSSProperties;
}

// --- Internal helpers ------------------------------------------------------

/** Content inset (px) inside a tile / sub-cell. Matches BlockShape's default. */
const CONTENT_PAD = 16;

/** Pointer capture, tolerant of test envs (jsdom) that lack the API. */
function safePointerCapture(el: Element, pointerId: number): void {
  try {
    el.setPointerCapture(pointerId);
  } catch {
    /* jsdom / unsupported — drag still works via document-level events */
  }
}
function safePointerRelease(el: Element, pointerId: number): void {
  try {
    el.releasePointerCapture(pointerId);
  } catch {
    /* pointer may already be released */
  }
}

/** Stable key for a sub-item within its panel. Index-based since sub-items
 *  may omit `key`. */
type SubKey = string;
const subKeyOf = (parentKey: ItemKey, index: number): SubKey =>
  `${parentKey}::${index}`;

/** A sub-item paired with its original index in the panel's `subItems` (kept
 *  through filtering/overriding so drag handlers can identify the cell). */
interface SubEntry {
  sub: NotchSubItem;
  index: number;
}

function maskToShape(mask: Mask): number[][] {
  return mask.map((row) => row.map((v) => (v ? 1 : 0)));
}

/** Assign synthetic keys to items missing one. Returns the same array when
 *  every item already has a key (preserves referential equality for memos). */
function assignKeys(items: NotchGridItem[]): NotchGridItem[] {
  if (items.every((it) => it.key != null)) return items;
  return items.map((it, i) => (it.key ? it : { ...it, key: `item-${i}` }));
}

/** First (highest-priority) mask from a `Priority<Mask>` — used for width. */
function firstMask(shape: Desire["shape"]): Mask {
  if (Array.isArray(shape)) return shape as Mask;
  const keys = Object.keys(shape as Record<string, Mask>).sort(
    (a, b) => Number(a) - Number(b),
  );
  return (shape as Record<string, Mask>)[keys[0]];
}

/** Inner column count a panel's sub-grid spans, from explicit positions +
 *  shape widths (flow sub-items contribute their own width at col 0). */
function subGridCols(entries: SubEntry[]): number {
  let cols = 1;
  for (const { sub } of entries) {
    const w = maskCols(firstMask(sub.desire.shape));
    const pos = sub.desire.position;
    const startCol = Array.isArray(pos) ? pos[0] : 0;
    cols = Math.max(cols, startCol + w);
  }
  return cols;
}

/** A panel's effective sub-items: promoted ones removed, repositioned ones
 *  given their override position. Original indices are preserved. */
function effectiveSubEntries(
  panelKey: ItemKey,
  subItems: NotchSubItem[],
  subOverrides: Map<SubKey, Pos>,
  promoted: ReadonlySet<SubKey> | Map<SubKey, unknown>,
): SubEntry[] {
  const out: SubEntry[] = [];
  subItems.forEach((sub, index) => {
    const sk = subKeyOf(panelKey, index);
    if (promoted.has(sk)) return;
    const ov = subOverrides.get(sk);
    out.push({
      sub: ov ? { ...sub, desire: { ...sub.desire, position: ov } } : sub,
      index,
    });
  });
  return out;
}

/** Solve a panel's effective sub-items into placements within their bounding
 *  sub-grid. The panel's footprint is the union of these placements. */
function solvePanel(
  entries: SubEntry[],
  keyPrefix: ItemKey,
): SolverOutput<SubEntry> {
  return solveLayout<SubEntry>({
    items: entries.map((e) => ({
      key: subKeyOf(keyPrefix, e.index),
      desire: e.sub.desire,
      item: e,
    })),
    cols: subGridCols(entries),
  });
}

interface DragState {
  key: ItemKey;
  pointerId: number;
  startX: number;
  startY: number;
  /** Origin position in block units (where the item sits at drag start). */
  originCol: number;
  originRow: number;
  /** Footprint width in blocks (to clamp the dropped column). */
  originCols: number;
  /** Live pointer delta in px. */
  dx: number;
  dy: number;
}

interface SubDragState {
  parentKey: ItemKey;
  subIndex: number;
  pointerId: number;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  /** Panel outer rect (block units) — promote hit-test. */
  panelCol: number;
  panelRow: number;
  panelCols: number;
  panelRows: number;
  /** Sub-cell origin within the panel (block units). */
  subCol: number;
  subRow: number;
  /** Cursor-follow ghost chrome (themed like the panel). */
  ghostShape: number[][];
  ghostFill: string;
  ghostStroke: string;
  ghostStrokeWidth: number;
}

/** A sub-item promoted to a top-level tile, with its origin panel key so it
 *  can be dropped when that panel is removed from `items`. */
interface PromotedSub {
  item: NotchGridItem;
  parentKey: ItemKey;
}

/** The panel's outer bounding rect (block units) — promote hit-box. */
export interface PanelRect {
  col: number;
  row: number;
  cols: number;
  rows: number;
}

/** Decide where a dropped sub-item lands. The decision + promote target use
 *  the **cursor's** outer-grid cell (so dragging the cursor out of the panel
 *  promotes, matching where you actually dropped it); the reposition target
 *  uses the sub's `originInner` cell so the move stays grab-relative within
 *  the panel. Pure — exported for testing. */
export type SubDrop =
  | { kind: "reposition"; pos: Pos }
  | { kind: "promote"; pos: Pos };

export function resolveSubDrop(
  panel: PanelRect,
  cursorCol: number,
  cursorRow: number,
  repositionInner: Pos,
): SubDrop {
  const inside =
    cursorCol >= panel.col &&
    cursorCol < panel.col + panel.cols &&
    cursorRow >= panel.row &&
    cursorRow < panel.row + panel.rows;
  return inside
    ? { kind: "reposition", pos: repositionInner }
    : { kind: "promote", pos: [cursorCol, cursorRow] };
}

// --- Component -------------------------------------------------------------

export function NotchGrid({
  items,
  cols = "auto",
  blockMin = BLOCK_SIZE,
  gap = 8,
  nest = true,
  primitives,
  onItemError,
  draggable = false,
  onItemMove,
  onSubItemMove,
  onSubItemPromote,
  className,
  style,
}: NotchGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.getBoundingClientRect().width);
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const keyedItems = useMemo(() => assignKeys(items), [items]);

  const { resolvedCols, block } = useMemo(() => {
    if (cols !== "auto") return { resolvedCols: cols, block: blockMin };
    if (containerWidth == null) return { resolvedCols: null as number | null, block: blockMin };
    const c = Math.max(1, Math.floor(containerWidth / blockMin));
    return { resolvedCols: c, block: containerWidth / c };
  }, [cols, blockMin, containerWidth]);

  // Outer drag-to-place state (pinned drops + the live drag).
  const [overrides, setOverrides] = useState<Map<ItemKey, Pos>>(new Map());
  const [drag, setDrag] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  dragRef.current = drag;

  // Sub-item state: repositioned subs, promoted subs (now top-level), and the
  // live sub-drag. Promoted entries carry their origin `parentKey` so they
  // can be dropped when the parent item is removed.
  const [subOverrides, setSubOverrides] = useState<Map<SubKey, Pos>>(new Map());
  const [promoted, setPromoted] = useState<Map<SubKey, PromotedSub>>(new Map());
  const [subDrag, setSubDrag] = useState<SubDragState | null>(null);
  const subDragRef = useRef<SubDragState | null>(null);
  subDragRef.current = subDrag;

  // Drag-start handlers are stable (no per-item closure) so NotchItem's
  // React.memo holds during a drag — only the dragged tile + ghost re-render.
  // They receive the tile's `placement` from NotchItem at call time.
  const handleItemDragStart = useCallback(
    (p: Placement<NotchGridItem>, e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.button != null && e.button !== 0) return;
      safePointerCapture(e.currentTarget, e.pointerId);
      setDrag({
        key: p.key,
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
    [],
  );

  const handleSubDragStart = useCallback(
    (
      p: Placement<NotchGridItem>,
      entry: SubEntry,
      sp: Placement<SubEntry>,
      e: ReactPointerEvent<HTMLDivElement>,
    ) => {
      if (e.button != null && e.button !== 0) return;
      safePointerCapture(e.currentTarget, e.pointerId);
      const panel = resolveNotchTheme((p.item as NotchGridItem).theme ?? {});
      setSubDrag({
        parentKey: p.key,
        subIndex: entry.index,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        dx: 0,
        dy: 0,
        panelCol: p.col,
        panelRow: p.row,
        panelCols: p.cols,
        panelRows: p.rows,
        subCol: sp.col,
        subRow: sp.row,
        ghostShape: maskToShape(sp.mask),
        ghostFill: panel.fill,
        ghostStroke: panel.stroke,
        ghostStrokeWidth: panel.strokeWidth,
      });
    },
    [],
  );

  const handlePointerMove = useCallback((e: ReactPointerEvent) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (dx === d.dx && dy === d.dy) return;
    setDrag({ ...d, dx, dy });
  }, []);

  const handlePointerEnd = useCallback(
    (e: ReactPointerEvent) => {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      safePointerRelease(e.currentTarget, e.pointerId);
      setDrag(null);
      const blockPx = block || blockMin;
      const colCount = resolvedCols ?? 1;
      const maxCol = Math.max(0, colCount - d.originCols);
      const nextCol = Math.min(maxCol, Math.max(0, d.originCol + Math.round(d.dx / blockPx)));
      const nextRow = Math.max(0, d.originRow + Math.round(d.dy / blockPx));
      const pos: Pos = [nextCol, nextRow];
      setOverrides((prev) => new Map(prev).set(d.key, pos));
      onItemMove?.(d.key, pos);
    },
    [block, blockMin, resolvedCols, onItemMove],
  );

  const handleSubPointerMove = useCallback((e: ReactPointerEvent) => {
    const s = subDragRef.current;
    if (!s || e.pointerId !== s.pointerId) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    if (dx === s.dx && dy === s.dy) return;
    setSubDrag({ ...s, dx, dy });
  }, []);

  const handleSubPointerEnd = useCallback(
    (e: ReactPointerEvent) => {
      const s = subDragRef.current;
      if (!s || e.pointerId !== s.pointerId) return;
      safePointerRelease(e.currentTarget, e.pointerId);
      setSubDrag(null);
      const blockPx = block || blockMin;
      // Promote decision + target use the cursor's outer-grid cell; the
      // reposition target uses the sub's origin + rounded delta (grab-relative).
      const rect = wrapperRef.current?.getBoundingClientRect();
      const cursorCol = rect
        ? Math.max(0, Math.floor((e.clientX - rect.left) / blockPx))
        : s.panelCol + s.subCol;
      const cursorRow = rect
        ? Math.max(0, Math.floor((e.clientY - rect.top) / blockPx))
        : s.panelRow + s.subRow;
      const repositionInner: Pos = [
        Math.max(0, s.subCol + Math.round(s.dx / blockPx)),
        Math.max(0, s.subRow + Math.round(s.dy / blockPx)),
      ];
      const drop = resolveSubDrop(
        { col: s.panelCol, row: s.panelRow, cols: s.panelCols, rows: s.panelRows },
        cursorCol,
        cursorRow,
        repositionInner,
      );
      const sk = subKeyOf(s.parentKey, s.subIndex);
      if (drop.kind === "reposition") {
        setSubOverrides((prev) => new Map(prev).set(sk, drop.pos));
        onSubItemMove?.(s.parentKey, s.subIndex, drop.pos);
        return;
      }
      // Promote: synthesize a top-level item from the sub.
      const parent = keyedItems.find((it) => it.key === s.parentKey);
      const sub = parent?.subItems?.[s.subIndex];
      if (sub) {
        setPromoted((prev) =>
          new Map(prev).set(sk, {
            parentKey: s.parentKey,
            item: {
              key: `promoted::${sk}`,
              desire: { position: drop.pos, shape: firstMask(sub.desire.shape) },
              theme: { ...parent.theme, ...sub.theme } as NotchTheme,
              ui: sub.ui,
            },
          }),
        );
      }
      // Pin the parent at its current cell — promoting shrinks its mask, and
      // without a pin the outer pack would reflow the panel (and its remaining
      // siblings) to a new cell. Don't override an existing pin.
      setOverrides((prev) =>
        prev.has(s.parentKey)
          ? prev
          : new Map(prev).set(s.parentKey, [s.panelCol, s.panelRow]),
      );
      onSubItemPromote?.(s.parentKey, s.subIndex, drop.pos);
    },
    [block, blockMin, keyedItems, onSubItemMove, onSubItemPromote],
  );

  // Solve: panels get their desire.shape replaced by the union of their
  // *effective* sub-item footprints; promoted subs are appended as top-level
  // items. The per-panel sub-layouts are kept so NotchItem renders content
  // without re-solving.
  const { layout, panelSubLayouts } = useMemo(() => {
    if (resolvedCols == null) {
      return { layout: null, panelSubLayouts: new Map<ItemKey, SolverOutput<SubEntry>>() };
    }
    const liveKeys = new Set(keyedItems.map((it) => it.key!));
    const subLayouts = new Map<ItemKey, SolverOutput<SubEntry>>();
    const solverItems = keyedItems.map((it) => {
      const ov = overrides.get(it.key!);
      let desire = ov ? { ...it.desire, position: ov } : it.desire;
      if (it.subItems && it.subItems.length > 0) {
        const entries = effectiveSubEntries(it.key!, it.subItems, subOverrides, promoted);
        const sub = solvePanel(entries, it.key!);
        subLayouts.set(it.key!, sub);
        desire = { ...desire, shape: placementToMask(sub.placements) };
      }
      return { key: it.key!, desire, groupKey: it.groupKey, item: it };
    });
    // Promoted subs → synthetic top-level items. Skip orphans whose origin
    // panel was removed from `items` (their pinned tile shouldn't linger).
    for (const { item, parentKey } of promoted.values()) {
      if (!liveKeys.has(parentKey)) continue;
      solverItems.push({
        key: item.key!,
        desire: item.desire,
        groupKey: item.groupKey,
        item,
      });
    }
    return {
      layout: solveLayout({ items: solverItems, cols: resolvedCols, nest }),
      panelSubLayouts: subLayouts,
    };
  }, [keyedItems, resolvedCols, nest, overrides, subOverrides, promoted]);

  const unfitKey = layout?.unfit.join(",") ?? "";
  useEffect(() => {
    if (isDev && layout && layout.unfit.length > 0) {
      console.warn(
        `[NotchGrid] ${layout.unfit.length} item(s) didn't fit: ${layout.unfit.join(", ")}. Mask wider than cols=${resolvedCols}.`,
      );
    }
  }, [unfitKey, resolvedCols, layout]);

  const totalRows = layout?.rowsUsed ?? 0;

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-full", className)}
      style={{
        minHeight: totalRows > 0 ? totalRows * block : undefined,
        ...style,
      }}
    >
      {layout?.placements.map((p) => {
        const isDragging = drag?.key === p.key;
        const dragOffset: readonly [number, number] | undefined =
          isDragging && drag ? [drag.dx, drag.dy] : undefined;
        return (
          <NotchItem
            key={p.key}
            placement={p}
            item={p.item as NotchGridItem}
            block={block}
            gap={gap}
            primitives={primitives}
            onItemError={onItemError}
            draggable={draggable}
            dragOffset={dragOffset}
            hasOverride={overrides.has(p.key)}
            subLayout={panelSubLayouts.get(p.key) ?? null}
            draggingSubIndex={
              subDrag && subDrag.parentKey === p.key ? subDrag.subIndex : null
            }
            onItemDragStart={handleItemDragStart}
            onSubDragStart={handleSubDragStart}
            onSubDragMove={handleSubPointerMove}
            onSubDragEnd={handleSubPointerEnd}
            onDragMove={handlePointerMove}
            onDragEnd={handlePointerEnd}
          />
        );
      })}

      {/* Cursor-follow ghost for the sub-item being dragged. */}
      {subDrag && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-30 opacity-90"
          style={{
            left: (subDrag.panelCol + subDrag.subCol) * block + subDrag.dx,
            top: (subDrag.panelRow + subDrag.subRow) * block + subDrag.dy,
          }}
        >
          <BlockShape
            shape={subDrag.ghostShape}
            block={block}
            gap={gap}
            fill={subDrag.ghostFill}
            stroke={subDrag.ghostStroke}
            strokeWidth={subDrag.ghostStrokeWidth}
          />
        </div>
      )}
    </div>
  );
}

// --- NotchItem (internal) --------------------------------------------------

interface NotchItemProps {
  placement: Placement<NotchGridItem>;
  item: NotchGridItem;
  block: number;
  gap: number;
  primitives?: PrimitiveRegistry;
  onItemError?: (key: ItemKey, error: NotchGridError) => void;
  /** When true, the wrapper accepts pointer events for outer-grid drag. */
  draggable?: boolean;
  /** Live `[dx, dy]` in px while this tile is being dragged. */
  dragOffset?: readonly [number, number];
  /** True when this tile has a committed drop override (sits above non-pinned). */
  hasOverride?: boolean;
  /** Pre-solved sub-item placements for a panel (null for leaf tiles). */
  subLayout?: SolverOutput<SubEntry> | null;
  /** The sub-item index currently being dragged out of this panel (hidden). */
  draggingSubIndex?: number | null;
  /** Stable drag-start callbacks (receive this tile's placement at call time)
   *  so NotchItem's memo holds during a drag. */
  onItemDragStart?: (
    placement: Placement<NotchGridItem>,
    e: ReactPointerEvent<HTMLDivElement>,
  ) => void;
  onSubDragStart?: (
    placement: Placement<NotchGridItem>,
    entry: SubEntry,
    subPlacement: Placement<SubEntry>,
    e: ReactPointerEvent<HTMLDivElement>,
  ) => void;
  onSubDragMove?: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onSubDragEnd?: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onDragMove?: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: ReactPointerEvent<HTMLDivElement>) => void;
}

const NotchItem = memo(function NotchItem({
  placement,
  item,
  block,
  gap,
  primitives,
  onItemError,
  draggable = false,
  dragOffset,
  hasOverride = false,
  subLayout,
  draggingSubIndex,
  onItemDragStart,
  onSubDragStart,
  onSubDragMove,
  onSubDragEnd,
  onDragMove,
  onDragEnd,
}: NotchItemProps) {
  const itemTheme: NotchTheme = item.theme ?? {};
  const resolved = useMemo(() => resolveNotchTheme(itemTheme), [
    itemTheme.type,
    itemTheme.variant,
    itemTheme.gradient,
  ]);
  const shape = useMemo(() => maskToShape(placement.mask), [placement.mask]);

  const Primitive = item.ui ? primitives?.[item.ui.type] : undefined;
  const unknownPrimitive = item.ui != null && !Primitive;

  useEffect(() => {
    if (unknownPrimitive && onItemError && item.ui) {
      onItemError(placement.key, {
        kind: "unknown-primitive",
        type: item.ui.type,
      });
    }
  }, [unknownPrimitive, onItemError, placement.key, item.ui]);

  const isDragging = dragOffset !== undefined;
  const wrapperStyle: CSSProperties = {
    position: "absolute",
    left: placement.col * block,
    top: placement.row * block,
    color: resolved.color,
  };
  if (isDragging) {
    wrapperStyle.transform = `translate(${dragOffset[0]}px, ${dragOffset[1]}px)`;
    wrapperStyle.zIndex = 20;
  } else if (hasOverride) {
    wrapperStyle.zIndex = 10;
  }
  if (draggable) {
    wrapperStyle.cursor = isDragging ? "grabbing" : "grab";
    wrapperStyle.touchAction = "none";
  }

  const dragHandlers =
    draggable && onItemDragStart
      ? {
          onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) =>
            onItemDragStart(placement, e),
          onPointerMove: onDragMove,
          onPointerUp: onDragEnd,
          onPointerCancel: onDragEnd,
        }
      : undefined;

  let content: ReactNode = null;
  if (subLayout) {
    // Sub-items render as positioned content inside the panel's single chrome
    // (no nested BlockShape). The cell being dragged out is hidden (its ghost
    // follows the cursor at the grid level).
    content = (
      <div className="relative h-full w-full">
        {subLayout.placements.map((sp) => {
          const entry = sp.item as SubEntry;
          if (draggingSubIndex === entry.index) return null;
          const sub = entry.sub;
          const SubPrimitive = sub.ui ? primitives?.[sub.ui.type] : undefined;
          const subHandlers =
            draggable && onSubDragStart
              ? {
                  onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => {
                    e.stopPropagation(); // don't start the panel's outer drag
                    onSubDragStart(placement, entry, sp, e);
                  },
                  onPointerMove: onSubDragMove,
                  onPointerUp: onSubDragEnd,
                  onPointerCancel: onSubDragEnd,
                }
              : undefined;
          return (
            <div
              key={sp.key}
              {...subHandlers}
              className={draggable ? "cursor-grab touch-none" : undefined}
              style={{
                position: "absolute",
                left: sp.col * block,
                top: sp.row * block,
                width: sp.cols * block,
                height: sp.rows * block,
                padding: CONTENT_PAD,
              }}
            >
              {SubPrimitive ? (
                <SubPrimitive {...sub.ui} />
              ) : (
                <UnknownPrimitivePlaceholder type={sub.ui.type} />
              )}
            </div>
          );
        })}
      </div>
    );
  } else if (Primitive && item.ui) {
    content = <Primitive {...item.ui} />;
  } else if (unknownPrimitive && item.ui) {
    content = <UnknownPrimitivePlaceholder type={item.ui.type} />;
  }

  return (
    <div
      {...dragHandlers}
      className={cn(
        draggable && "select-none",
        // drop-shadow (a filter) traces the notched SVG outline; plain
        // box-shadow would be rectangular.
        resolved.elevated && "drop-shadow-lg",
      )}
      style={wrapperStyle}
    >
      <BlockShape
        shape={shape}
        block={block}
        gap={gap}
        fill={resolved.fill}
        stroke={resolved.stroke}
        strokeWidth={resolved.strokeWidth}
        pad={subLayout ? 0 : CONTENT_PAD}
      >
        {resolved.accentBar && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1"
            style={{ background: resolved.accentBar }}
          />
        )}
        {content}
      </BlockShape>
    </div>
  );
});

// --- Placeholders ----------------------------------------------------------

function UnknownPrimitivePlaceholder({ type }: { type: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center text-xs"
      style={{ color: "var(--color-on-error-container)" }}
    >
      Unknown primitive: <code className="ml-1">{type}</code>
    </div>
  );
}
