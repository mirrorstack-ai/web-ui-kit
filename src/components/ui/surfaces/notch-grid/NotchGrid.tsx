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
  /** Called after a sub-item is dragged to a new cell (it becomes a top-level
   *  group member; auto-link re-unions it with adjacent same-group tiles). */
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

/** A panel's effective sub-items: promoted ones removed (they now render as
 *  top-level group members). Original indices are preserved so drag handlers
 *  can identify the cell. */
function effectiveSubEntries(
  panelKey: ItemKey,
  subItems: NotchSubItem[],
  promoted: ReadonlySet<SubKey> | Map<SubKey, unknown>,
): SubEntry[] {
  const out: SubEntry[] = [];
  subItems.forEach((sub, index) => {
    if (promoted.has(subKeyOf(panelKey, index))) return;
    out.push({ sub, index });
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

/** Outer-grid cells a placement fills (its mask's true cells offset by its
 *  top-left). Used for 8-connected adjacency. */
function placedCells(p: Placement<unknown>): Array<readonly [number, number]> {
  const out: Array<readonly [number, number]> = [];
  for (let r = 0; r < p.mask.length; r++) {
    const row = p.mask[r];
    for (let c = 0; c < row.length; c++) {
      if (row[c]) out.push([p.col + c, p.row + r]);
    }
  }
  return out;
}

/** Group placements into 8-connected components — two placements join if any
 *  filled cell of one is within 1 row/col of any filled cell of the other
 *  (edge OR corner touch, matching the outline tracer's diagonal-junction
 *  bridge). Exported for testing. */
export function findConnectedComponents<T>(
  items: ReadonlyArray<Placement<T>>,
): Placement<T>[][] {
  if (items.length <= 1) return items.length ? [[...items]] : [];
  const cells = items.map(placedCells);
  const seen = new Array<boolean>(items.length).fill(false);
  const adjacent = (i: number, j: number): boolean => {
    for (const [ax, ay] of cells[i]) {
      for (const [bx, by] of cells[j]) {
        if (Math.abs(ax - bx) <= 1 && Math.abs(ay - by) <= 1) return true;
      }
    }
    return false;
  };
  const out: Placement<T>[][] = [];
  for (let s = 0; s < items.length; s++) {
    if (seen[s]) continue;
    seen[s] = true;
    const queue = [s];
    const comp: Placement<T>[] = [];
    while (queue.length) {
      const i = queue.shift()!;
      comp.push(items[i]);
      for (let j = 0; j < items.length; j++) {
        if (!seen[j] && adjacent(i, j)) {
          seen[j] = true;
          queue.push(j);
        }
      }
    }
    out.push(comp);
  }
  return out;
}

/** Bucket placements by their effective group (from `groupOf`, keyed by item
 *  key), then split each bucket into 8-connected components. Items without a
 *  group are singleton buckets so they never merge with anything. */
function groupComponents(
  placements: ReadonlyArray<Placement<NotchGridItem>>,
  groupOf: ReadonlyMap<ItemKey, string | undefined>,
): Placement<NotchGridItem>[][] {
  const buckets = new Map<string, Placement<NotchGridItem>[]>();
  placements.forEach((p, i) => {
    const gk = groupOf.get(p.key);
    const bucket = gk != null ? `g:${gk}` : `s:${i}`;
    const list = buckets.get(bucket);
    if (list) list.push(p);
    else buckets.set(bucket, [p]);
  });
  const out: Placement<NotchGridItem>[][] = [];
  for (const members of buckets.values()) {
    for (const comp of findConnectedComponents(members)) out.push(comp);
  }
  return out;
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
      // Unified drop: the sub lands at the cursor's outer-grid cell as a
      // group member. Render-time auto-link re-unions it with same-group
      // tiles it's adjacent to (so a drop next to the panel reads as "stayed
      // in the panel"); dropped far, it stands alone.
      const blockPx = block || blockMin;
      const rect = wrapperRef.current?.getBoundingClientRect();
      const dropCol = rect
        ? Math.max(0, Math.floor((e.clientX - rect.left) / blockPx))
        : s.panelCol + s.subCol;
      const dropRow = rect
        ? Math.max(0, Math.floor((e.clientY - rect.top) / blockPx))
        : s.panelRow + s.subRow;
      const pos: Pos = [dropCol, dropRow];
      const sk = subKeyOf(s.parentKey, s.subIndex);
      const parent = keyedItems.find((it) => it.key === s.parentKey);
      const sub = parent?.subItems?.[s.subIndex];
      if (sub) {
        setPromoted((prev) =>
          new Map(prev).set(sk, {
            parentKey: s.parentKey,
            item: {
              key: `promoted::${sk}`,
              desire: { position: pos, shape: firstMask(sub.desire.shape) },
              theme: { ...parent.theme, ...sub.theme } as NotchTheme,
              // Share the panel's group so auto-link re-unions when adjacent.
              groupKey: parent.groupKey ?? s.parentKey,
              ui: sub.ui,
            },
          }),
        );
      }
      // Pin the parent at its current cell — moving a sub out shrinks its
      // mask, and without a pin the outer pack would reflow the panel (and its
      // remaining siblings). Don't override an existing pin.
      setOverrides((prev) =>
        prev.has(s.parentKey)
          ? prev
          : new Map(prev).set(s.parentKey, [s.panelCol, s.panelRow]),
      );
      onSubItemPromote?.(s.parentKey, s.subIndex, pos);
    },
    [block, blockMin, keyedItems, onSubItemPromote],
  );

  // Solve: panels get their desire.shape replaced by the union of their
  // *effective* sub-item footprints; promoted subs are appended as top-level
  // items. The per-panel sub-layouts are kept so NotchItem renders content
  // without re-solving.
  const { layout, panelSubLayouts, components } = useMemo(() => {
    const empty = {
      layout: null,
      panelSubLayouts: new Map<ItemKey, SolverOutput<SubEntry>>(),
      components: [] as Placement<NotchGridItem>[][],
    };
    if (resolvedCols == null) return empty;
    const liveKeys = new Set(keyedItems.map((it) => it.key!));
    const subLayouts = new Map<ItemKey, SolverOutput<SubEntry>>();
    const groupOf = new Map<ItemKey, string | undefined>();
    const solverItems = keyedItems.map((it) => {
      const ov = overrides.get(it.key!);
      let desire = ov ? { ...it.desire, position: ov } : it.desire;
      // A panel's group is its own key (unless explicitly grouped) so its
      // promoted subs — which share that group — auto-link back to it.
      let groupKey = it.groupKey;
      if (it.subItems && it.subItems.length > 0) {
        const entries = effectiveSubEntries(it.key!, it.subItems, promoted);
        const sub = solvePanel(entries, it.key!);
        subLayouts.set(it.key!, sub);
        desire = { ...desire, shape: placementToMask(sub.placements) };
        groupKey = it.groupKey ?? it.key;
      }
      groupOf.set(it.key!, groupKey);
      return { key: it.key!, desire, groupKey, item: it };
    });
    // Promoted subs → synthetic top-level items. Skip orphans whose origin
    // panel was removed from `items` (their pinned tile shouldn't linger).
    // A promoted sub can be outer-dragged again, so honour its `overrides`
    // entry the same way a real item does — otherwise the second drag writes
    // an override the solve ignores and the tile never moves.
    for (const { item, parentKey } of promoted.values()) {
      if (!liveKeys.has(parentKey)) continue;
      const ov = overrides.get(item.key!);
      const desire = ov ? { ...item.desire, position: ov } : item.desire;
      groupOf.set(item.key!, item.groupKey);
      solverItems.push({
        key: item.key!,
        desire,
        groupKey: item.groupKey,
        item,
      });
    }
    const solved = solveLayout({ items: solverItems, cols: resolvedCols, nest });
    return {
      layout: solved,
      panelSubLayouts: subLayouts,
      components: groupComponents(solved.placements, groupOf),
    };
  }, [keyedItems, resolvedCols, nest, overrides, promoted]);

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
      {components.map((members) => {
        const compKey = members.map((m) => m.key).join("|");
        // Outer-drag offset, if a member of this component is being dragged.
        const dragMember = drag ? members.find((m) => m.key === drag.key) : undefined;
        const dragOffset: readonly [number, number] | undefined =
          dragMember && drag ? [drag.dx, drag.dy] : undefined;
        const draggingSub =
          subDrag && members.some((m) => m.key === subDrag.parentKey)
            ? { parentKey: subDrag.parentKey, subIndex: subDrag.subIndex }
            : null;
        const overridden = members.some((m) => overrides.has(m.key));
        return (
          <NotchComponent
            key={compKey}
            members={members}
            block={block}
            gap={gap}
            primitives={primitives}
            onItemError={onItemError}
            draggable={draggable}
            panelSubLayouts={panelSubLayouts}
            dragKey={dragMember?.key ?? null}
            dragOffset={dragOffset}
            draggingSub={draggingSub}
            overridden={overridden}
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

// --- NotchComponent (internal) ---------------------------------------------
//
// Renders one 8-connected component of same-group placements as a SINGLE
// unioned BlockShape chrome, with each member's content positioned inside.
// A panel member lays out its sub-cells (each sub-draggable); a standalone
// member renders its content (outer-draggable). Adjacent same-group tiles
// thus read as one chrome — that's the auto-link.

interface NotchComponentProps {
  members: Placement<NotchGridItem>[];
  block: number;
  gap: number;
  primitives?: PrimitiveRegistry;
  onItemError?: (key: ItemKey, error: NotchGridError) => void;
  draggable?: boolean;
  panelSubLayouts: ReadonlyMap<ItemKey, SolverOutput<SubEntry>>;
  /** The member key being outer-dragged (if any), + its live offset. */
  dragKey?: ItemKey | null;
  dragOffset?: readonly [number, number];
  /** The sub being dragged out of a member panel (hidden during drag). */
  draggingSub?: { parentKey: ItemKey; subIndex: number } | null;
  /** Any member has a committed drop override (raises z-index). */
  overridden?: boolean;
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

const NotchComponent = memo(function NotchComponent({
  members,
  block,
  gap,
  primitives,
  onItemError,
  draggable = false,
  panelSubLayouts,
  dragKey,
  dragOffset,
  draggingSub,
  overridden = false,
  onItemDragStart,
  onSubDragStart,
  onSubDragMove,
  onSubDragEnd,
  onDragMove,
  onDragEnd,
}: NotchComponentProps) {
  // Component bounding box (outer cells) — the wrapper sits here and the
  // union mask is built relative to it.
  let minCol = Infinity;
  let minRow = Infinity;
  let maxCol = 0;
  let maxRow = 0;
  for (const m of members) {
    minCol = Math.min(minCol, m.col);
    minRow = Math.min(minRow, m.row);
    maxCol = Math.max(maxCol, m.col + m.cols);
    maxRow = Math.max(maxRow, m.row + m.rows);
  }
  const compCols = Math.max(1, maxCol - minCol);
  const compRows = Math.max(1, maxRow - minRow);

  // Union mask of every member's filled cells, at bbox-relative positions.
  const unionShape = useMemo(() => {
    const grid = Array.from({ length: compRows }, () =>
      new Array<number>(compCols).fill(0),
    );
    for (const m of members) {
      for (let r = 0; r < m.mask.length; r++) {
        const row = m.mask[r];
        for (let c = 0; c < row.length; c++) {
          if (row[c]) grid[m.row - minRow + r][m.col - minCol + c] = 1;
        }
      }
    }
    return grid;
  }, [members, compCols, compRows, minCol, minRow]);

  // Theme from the lead member — same-group members share their theme.
  const lead = members[0];
  const leadItem = lead.item as NotchGridItem;
  const resolved = useMemo(
    () => resolveNotchTheme(leadItem.theme ?? {}),
    [leadItem.theme?.type, leadItem.theme?.variant, leadItem.theme?.gradient],
  );

  // Report unknown primitives across all members' content.
  useEffect(() => {
    if (!onItemError) return;
    for (const m of members) {
      const it = m.item as NotchGridItem;
      if (it.ui && !primitives?.[it.ui.type]) {
        onItemError(m.key, { kind: "unknown-primitive", type: it.ui.type });
      }
    }
  }, [members, primitives, onItemError]);

  // A lone non-panel tile drags as a whole (chrome + content move together);
  // panels & multi-member chromes drag per sub-cell / per content tile.
  const isPlainSingleton =
    members.length === 1 && !panelSubLayouts.has(lead.key);
  const isDraggingHere = dragKey != null || draggingSub != null;

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    left: minCol * block,
    top: minRow * block,
    color: resolved.color,
  };
  if (isPlainSingleton && dragKey === lead.key && dragOffset) {
    wrapperStyle.transform = `translate(${dragOffset[0]}px, ${dragOffset[1]}px)`;
    wrapperStyle.zIndex = 20;
  } else if (overridden) {
    wrapperStyle.zIndex = 10;
  }
  if (draggable && isPlainSingleton) {
    wrapperStyle.cursor = dragKey === lead.key ? "grabbing" : "grab";
    wrapperStyle.touchAction = "none";
  }

  const singletonDrag =
    draggable && isPlainSingleton && onItemDragStart
      ? {
          onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) =>
            onItemDragStart(lead, e),
          onPointerMove: onDragMove,
          onPointerUp: onDragEnd,
          onPointerCancel: onDragEnd,
        }
      : undefined;

  // Each member contributes content positioned at its bbox-relative cell.
  const tiles: ReactNode[] = [];
  for (const m of members) {
    const it = m.item as NotchGridItem;
    const offCol = m.col - minCol;
    const offRow = m.row - minRow;
    const subLayout = panelSubLayouts.get(m.key);
    if (subLayout) {
      // Panel member — render its sub-cells (each sub-draggable).
      for (const sp of subLayout.placements) {
        const entry = sp.item as SubEntry;
        // The cell being dragged is kept MOUNTED but invisible (opacity 0) —
        // the pointer was captured on this element, so unmounting it would
        // kill the capture and stop pointermove/up firing. Its visible
        // stand-in is the cursor-follow ghost at the grid root.
        const beingDragged =
          draggingSub?.parentKey === m.key && draggingSub.subIndex === entry.index;
        const sub = entry.sub;
        const SubPrimitive = sub.ui ? primitives?.[sub.ui.type] : undefined;
        const subHandlers =
          draggable && onSubDragStart
            ? {
                onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  onSubDragStart(m, entry, sp, e);
                },
                onPointerMove: onSubDragMove,
                onPointerUp: onSubDragEnd,
                onPointerCancel: onSubDragEnd,
              }
            : undefined;
        tiles.push(
          <div
            key={`${m.key}/${entry.index}`}
            {...subHandlers}
            className={draggable ? "cursor-grab touch-none" : undefined}
            style={{
              position: "absolute",
              left: (offCol + sp.col) * block,
              top: (offRow + sp.row) * block,
              width: sp.cols * block,
              height: sp.rows * block,
              padding: CONTENT_PAD,
              opacity: beingDragged ? 0 : undefined,
            }}
          >
            {SubPrimitive ? (
              <SubPrimitive {...sub.ui} />
            ) : (
              <UnknownPrimitivePlaceholder type={sub.ui.type} />
            )}
          </div>,
        );
      }
    } else {
      // Standalone member — render its content. In a multi-member component
      // it carries its own outer-drag handlers; a plain singleton is dragged
      // by the wrapper instead (singletonDrag above).
      const Primitive = it.ui ? primitives?.[it.ui.type] : undefined;
      const memberHandlers =
        draggable && !isPlainSingleton && onItemDragStart
          ? {
              onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => {
                e.stopPropagation();
                onItemDragStart(m, e);
              },
              onPointerMove: onDragMove,
              onPointerUp: onDragEnd,
              onPointerCancel: onDragEnd,
            }
          : undefined;
      const draggingThis = dragKey === m.key;
      tiles.push(
        <div
          key={m.key}
          {...memberHandlers}
          className={draggable && !isPlainSingleton ? "cursor-grab touch-none" : undefined}
          style={{
            position: "absolute",
            left: offCol * block,
            top: offRow * block,
            width: m.cols * block,
            height: m.rows * block,
            padding: CONTENT_PAD,
            // Follow the cursor while this member is outer-dragged so it reads
            // as picked up (the sub-drag has its own ghost; standalone members
            // move their own tile). Raised above siblings during the drag.
            transform:
              draggingThis && dragOffset
                ? `translate(${dragOffset[0]}px, ${dragOffset[1]}px)`
                : undefined,
            zIndex: draggingThis ? 30 : undefined,
          }}
        >
          {Primitive && it.ui ? (
            <Primitive {...it.ui} />
          ) : it.ui ? (
            <UnknownPrimitivePlaceholder type={it.ui.type} />
          ) : null}
        </div>,
      );
    }
  }

  return (
    <div
      {...singletonDrag}
      className={cn(
        draggable && isPlainSingleton && "select-none",
        resolved.elevated && "drop-shadow-lg",
      )}
      style={wrapperStyle}
    >
      <BlockShape
        shape={unionShape}
        block={block}
        gap={gap}
        fill={resolved.fill}
        stroke={resolved.stroke}
        strokeWidth={resolved.strokeWidth}
        pad={0}
        noClip={isDraggingHere}
      >
        {resolved.accentBar && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1"
            style={{ background: resolved.accentBar }}
          />
        )}
        {tiles}
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
