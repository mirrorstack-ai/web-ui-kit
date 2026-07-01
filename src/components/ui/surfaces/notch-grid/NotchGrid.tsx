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

import type { ItemKey, PrimitiveRegistry } from "./types";
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
import { maskCols, gridOutlinePath } from "@/utils/grid-outline";
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

// ItemKey + PrimitiveRegistry live in ./types (breaks the NotchGrid<->registry
// import cycle); imported above and re-exported here for the public barrel.
export type { ItemKey, PrimitiveRegistry } from "./types";

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

// PrimitiveRegistry is defined in ./types and re-exported above.

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
  /** CSS padding inset on each tile / sub-cell's content. Default `"16px 8px"`.
   *  Lower it (or `0`) for fine-resolution grids where a tile may be only a
   *  fraction of a block tall — the default would over-pad short cells. */
  contentPad?: number | string;
  /** Expand each panel's outline OUTWARD by `panelBleed` px so its frame can sit
   *  beyond the cells — lets the outer frame match the inter-tile gap instead of
   *  being half of it. Pair with a `contentPad` of the same value for uniform
   *  spacing. Default 0. */
  panelBleed?: number;
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

/** Content inset inside a tile / sub-cell (8px sides, 16px top/bottom). Matches BlockShape's default. */
const DEFAULT_CONTENT_PAD = "16px 8px";

/** Minimum seam the kit guarantees between two DISTINCT components' outlines,
 *  as a FRACTION OF ONE CELL — so it scales with `block` (the grid's live cell
 *  size, which callers resize responsively) instead of staying a fixed pixel
 *  value that reads as imperceptible at typical block sizes. `0.25` matches a
 *  quarter-cell gap, the same unit callers already use for their own panel
 *  spacing (e.g. `gap` in visual-tile callers), so a component never renders
 *  closer to a distinct neighbour than that — even at `gap=0` with a
 *  `panelBleed` that would otherwise dilate them into each other. */
const MIN_COMPONENT_SEP_FRACTION = 0.25;

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

/** The window-level drag backstop receives DOM PointerEvents, but the drag
 *  handlers are typed for React's synthetic event. They only read fields both
 *  share (pointerId, clientX/Y, currentTarget), so this bridges the two without
 *  repeating the cast at every call site. */
const toReact = (e: PointerEvent): ReactPointerEvent =>
  e as unknown as ReactPointerEvent;

/** Stable key for a sub-item within its panel. Index-based since sub-items
 *  may omit `key`. */
type SubKey = string;
const subKeyOf = (parentKey: ItemKey, index: number): SubKey =>
  `${parentKey}::${index}`;

/** The grid cell a sub-drag will land in: the ghost's top-left (origin + drag
 *  delta) rounded to the nearest cell. Shared by the drop handler and the drop
 *  indicator so the preview matches the landing spot. */
function subDropCell(
  s: {
    panelCol: number;
    subCol: number;
    panelRow: number;
    subRow: number;
    dx: number;
    dy: number;
  },
  blockPx: number,
): Pos {
  return [
    Math.max(0, Math.round(((s.panelCol + s.subCol) * blockPx + s.dx) / blockPx)),
    Math.max(0, Math.round(((s.panelRow + s.subRow) * blockPx + s.dy) / blockPx)),
  ];
}

/** Dashed outline marking the cell a dragged tile will land in. Shared by the
 *  sub-drag and outer-drag indicators so both read identically — each caller
 *  computes its own landing geometry (their drop math differs) and this only
 *  renders it. */
function DropIndicator({
  col,
  row,
  cols,
  rows,
  blockPx,
  contentPad,
  color,
}: {
  col: number;
  row: number;
  cols: number;
  rows: number;
  blockPx: number;
  contentPad: number | string;
  color: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-20"
      style={{
        left: col * blockPx,
        top: row * blockPx,
        width: cols * blockPx,
        height: rows * blockPx,
        padding: contentPad,
      }}
    >
      <div
        className="h-full w-full rounded-[22px] border-2 border-dashed"
        style={{ borderColor: color, opacity: 0.6 }}
      />
    </div>
  );
}

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

/** Minimum Chebyshev cell distance between two components' filled cells.
 *  `1` = touching (edge OR diagonal); larger = that-many-plus empty cells apart.
 *  Short-circuits at 1 — the closest two non-overlapping components can sit. */
function minComponentCheb(
  a: ReadonlyArray<readonly [number, number]>,
  b: ReadonlyArray<readonly [number, number]>,
): number {
  let best = Infinity;
  for (const [ax, ay] of a) {
    for (const [bx, by] of b) {
      const d = Math.max(Math.abs(ax - bx), Math.abs(ay - by));
      if (d < best) {
        best = d;
        if (best <= 1) return best;
      }
    }
  }
  return best;
}

/** Per-component outline geometry that GUARANTEES distinct components never
 *  render with overlapping (or fully flush) outlines — the frame separation a
 *  caller would otherwise have to hand-maintain by leaving empty cells between
 *  panels.
 *
 *  `panelBleed` dilates each component's outline OUTWARD, and `gap=0` applies no
 *  counter-erosion, so two distinct components on touching cells overlap by
 *  `2·panelBleed` px (the later-painted one visually cutting into the earlier).
 *  Here each component's outward bleed is capped at half the empty-pixel space
 *  to its nearest distinct neighbour, and a flush/near neighbour forces a small
 *  inward erosion so a seam of at least `MIN_COMPONENT_SEP_FRACTION * block`
 *  (a quarter-cell, not a fixed pixel value) always shows. Components with
 *  room to spare keep the full `panelBleed`, so nothing changes for layouts that
 *  already separate their panels. */
function computeComponentOutlines(
  components: ReadonlyArray<ReadonlyArray<Placement<NotchGridItem>>>,
  block: number,
  gap: number,
  panelBleed: number,
): Array<{ gap: number; bleed: number }> {
  const cells = components.map((members) =>
    members.flatMap((m) => placedCells(m)),
  );
  const minSep = MIN_COMPONENT_SEP_FRACTION * block;
  return components.map((_, i) => {
    let minCheb = Infinity;
    for (let j = 0; j < components.length; j++) {
      if (j === i) continue;
      const d = minComponentCheb(cells[i], cells[j]);
      if (d < minCheb) minCheb = d;
    }
    if (minCheb === Infinity) return { gap, bleed: panelBleed };
    const emptyPx = Math.max(0, minCheb - 1) * block;
    // Symmetric outward offset each component may take while still leaving a
    // minSep seam between the two (both offset toward the seam).
    const offset = Math.min(panelBleed, emptyPx / 2 - minSep / 2);
    if (offset >= 0) return { gap, bleed: offset };
    // Flush / near neighbour: drop the outward bleed and erode inward instead,
    // so the two outlines pull apart into a visible seam (erosion = |offset|).
    return { gap: Math.max(gap, -2 * offset), bleed: 0 };
  });
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
  /** Footprint in blocks (to clamp the dropped column + size the drop
   *  indicator). Captured at drag-start so the indicator needs no placement
   *  lookup mid-drag. */
  originCols: number;
  originRows: number;
  /** Resolved theme color, captured at drag-start to tint the drop indicator
   *  without re-resolving the theme on every pointer move. */
  color: string;
  /** Live pointer delta in px. */
  dx: number;
  dy: number;
  /** Set on a whole-component drag (grab the linked chrome, not one cell):
   *  every listed member shifts by the same cell delta on drop. */
  members?: { key: ItemKey; col: number; row: number; cols: number; rows: number }[];
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
  /** Sub content + text colour so the ghost shows the real cell, not a blank
   *  chrome, while it's dragged. */
  ghostUi: NotchGridUI;
  ghostColor: string;
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
  contentPad = DEFAULT_CONTENT_PAD,
  panelBleed = 0,
  nest = true,
  primitives = {},
  onItemError,
  draggable = false,
  onItemMove,
  onSubItemPromote,
  className,
  style,
}: NotchGridProps) {
  // No batteries-included default: consumers opt in with
  // `primitives={defaultPrimitives}` (from @/components/registry/notch-primitives)
  // so grid-only usage doesn't bundle every block component.
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
        originRows: p.rows,
        color: resolveNotchTheme(p.item?.theme ?? {}).color,
        dx: 0,
        dy: 0,
      });
    },
    [],
  );

  // Grabbing the linked chrome (the connection area between cells, not a
  // sub-cell or content tile) drags the whole component as a unit.
  const handleComponentDragStart = useCallback(
    (members: Placement<NotchGridItem>[], e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.button != null && e.button !== 0) return;
      safePointerCapture(e.currentTarget, e.pointerId);
      const lead = members[0];
      setDrag({
        key: lead.key,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        originCol: lead.col,
        originRow: lead.row,
        originCols: lead.cols,
        originRows: lead.rows,
        color: resolveNotchTheme(lead.item?.theme ?? {}).color,
        dx: 0,
        dy: 0,
        members: members.map((m) => ({
          key: m.key,
          col: m.col,
          row: m.row,
          cols: m.cols,
          rows: m.rows,
        })),
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
        ghostUi: entry.sub.ui,
        ghostColor: panel.color,
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
      // Clear synchronously so the element + window backstop firing in the same
      // tick can't run this twice.
      dragRef.current = null;
      safePointerRelease(e.currentTarget, e.pointerId);
      setDrag(null);
      const blockPx = block || blockMin;
      const colCount = resolvedCols ?? 1;
      if (d.members) {
        // Whole-component drag: shift every member by the same cell delta,
        // clamped so the group's bounding box stays on the grid.
        const minCol = Math.min(...d.members.map((m) => m.col));
        const minRow = Math.min(...d.members.map((m) => m.row));
        const maxRight = Math.max(...d.members.map((m) => m.col + m.cols));
        const dCol = Math.max(
          -minCol,
          Math.min(colCount - maxRight, Math.round(d.dx / blockPx)),
        );
        const dRow = Math.max(-minRow, Math.round(d.dy / blockPx));
        if (dCol === 0 && dRow === 0) return;
        setOverrides((prev) => {
          const next = new Map(prev);
          for (const m of d.members!) next.set(m.key, [m.col + dCol, m.row + dRow]);
          return next;
        });
        for (const m of d.members) onItemMove?.(m.key, [m.col + dCol, m.row + dRow]);
        return;
      }
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
      // Clear synchronously so the element + window backstop firing in the same
      // tick can't run this twice (which would double-promote the sub-item).
      subDragRef.current = null;
      safePointerRelease(e.currentTarget, e.pointerId);
      setSubDrag(null);
      // Unified drop: the sub lands at the cursor's outer-grid cell as a
      // group member. Render-time auto-link re-unions it with same-group
      // tiles it's adjacent to (so a drop next to the panel reads as "stayed
      // in the panel"); dropped far, it stands alone.
      // Drop where the ghost visually sits (origin + drag delta, rounded to the
      // nearest cell) so the landing spot matches both the ghost and the drop
      // indicator the user was aiming with.
      const pos = subDropCell(s, block || blockMin);
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

  // Window-level drag backstop: the element handlers rely on pointer capture,
  // but capture can be lost (capture failed, or the captured cell detached mid
  // re-render) — then the element never sees pointerup and the tile sticks to
  // the cursor. Listening on window guarantees the drag ALWAYS ends on release,
  // wherever the pointer is. Element handlers still fire first when capture
  // works; these handlers are idempotent (they no-op once the drag is cleared),
  // so the double path is harmless.
  const dragging = drag !== null || subDrag !== null;
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      if (subDragRef.current) handleSubPointerMove(toReact(e));
      else if (dragRef.current) handlePointerMove(toReact(e));
    };
    const onEnd = (e: PointerEvent) => {
      if (subDragRef.current) handleSubPointerEnd(toReact(e));
      else if (dragRef.current) handlePointerEnd(toReact(e));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };
  }, [
    dragging,
    handlePointerMove,
    handlePointerEnd,
    handleSubPointerMove,
    handleSubPointerEnd,
  ]);

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

  // Per-component outline geometry (bleed capped / seam enforced against the
  // nearest distinct neighbour) — memoised separately from the solve so it only
  // recomputes on resize (block change), not on every drag tick.
  const componentOutlines = useMemo(
    () => computeComponentOutlines(components, block, gap, panelBleed),
    [components, block, gap, panelBleed],
  );

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
      {components.map((members, compIndex) => {
        const compKey = members.map((m) => m.key).join("|");
        // Neighbour-aware outline params: bleed capped (and a seam eroded) so
        // this component can't overlap a distinct one that ended up flush.
        const outline = componentOutlines[compIndex] ?? { gap, bleed: panelBleed };
        // Outer-drag offset, if a member of this component is being dragged.
        const dragMember = drag ? members.find((m) => m.key === drag.key) : undefined;
        const dragOffset: readonly [number, number] | undefined =
          dragMember && drag ? [drag.dx, drag.dy] : undefined;
        const draggingSub =
          subDrag && members.some((m) => m.key === subDrag.parentKey)
            ? { parentKey: subDrag.parentKey, subIndex: subDrag.subIndex }
            : null;
        const overridden = members.some((m) => overrides.has(m.key));
        // The whole component is being dragged (chrome grab) vs. one member.
        const wholeDrag = drag?.members != null && dragMember != null;
        return (
          <NotchComponent
            key={compKey}
            members={members}
            block={block}
            gap={outline.gap}
            contentPad={contentPad}
            panelBleed={outline.bleed}
            primitives={primitives}
            onItemError={onItemError}
            draggable={draggable}
            panelSubLayouts={panelSubLayouts}
            dragKey={dragMember?.key ?? null}
            dragOffset={dragOffset}
            wholeDrag={wholeDrag}
            draggingSub={draggingSub}
            overridden={overridden}
            onItemDragStart={handleItemDragStart}
            onComponentDragStart={handleComponentDragStart}
            onSubDragStart={handleSubDragStart}
            onSubDragMove={handleSubPointerMove}
            onSubDragEnd={handleSubPointerEnd}
            onDragMove={handlePointerMove}
            onDragEnd={handlePointerEnd}
          />
        );
      })}

      {/* Drop indicator — a dashed outline at the cell the dragged sub-item
          will land in (same `subDropCell` the drop uses), so the user can aim. */}
      {subDrag &&
        (() => {
          const blockPx = block || blockMin;
          const [tCol, tRow] = subDropCell(subDrag, blockPx);
          return (
            <DropIndicator
              col={tCol}
              row={tRow}
              cols={subDrag.ghostShape[0]?.length ?? 1}
              rows={subDrag.ghostShape.length}
              blockPx={blockPx}
              contentPad={contentPad}
              color={subDrag.ghostColor}
            />
          );
        })()}

      {/* Drop indicator for an OUTER drag (a top-level tile / promoted sub) —
          after a sub-item is dragged out it becomes top-level, so the SECOND
          drag is an outer drag and needs its own indicator. Footprint + color
          are captured in `drag` at drag-start, so no placement lookup is needed.
          Single-tile drags only (a whole-component move keeps members together). */}
      {drag &&
        !drag.members &&
        (() => {
          const blockPx = block || blockMin;
          const colCount = resolvedCols ?? 1;
          const maxCol = Math.max(0, colCount - drag.originCols);
          const tCol = Math.min(
            maxCol,
            Math.max(0, drag.originCol + Math.round(drag.dx / blockPx)),
          );
          const tRow = Math.max(0, drag.originRow + Math.round(drag.dy / blockPx));
          return (
            <DropIndicator
              col={tCol}
              row={tRow}
              cols={drag.originCols}
              rows={drag.originRows}
              blockPx={blockPx}
              contentPad={contentPad}
              color={drag.color}
            />
          );
        })()}

      {/* Cursor-follow ghost for the sub-item being dragged — carries the
          sub's own content so it reads as the real cell, not a blank chrome. */}
      {subDrag &&
        (() => {
          const GhostPrimitive = primitives?.[subDrag.ghostUi.type];
          return (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-30 opacity-90"
              style={{
                left: (subDrag.panelCol + subDrag.subCol) * block + subDrag.dx,
                top: (subDrag.panelRow + subDrag.subRow) * block + subDrag.dy,
                color: subDrag.ghostColor,
              }}
            >
              <BlockShape
                shape={subDrag.ghostShape}
                block={block}
                gap={gap}
                bleed={panelBleed}
                pad={contentPad}
                fill={subDrag.ghostFill}
                stroke={subDrag.ghostStroke}
                strokeWidth={subDrag.ghostStrokeWidth}
              >
                {GhostPrimitive ? <GhostPrimitive {...subDrag.ghostUi} /> : null}
              </BlockShape>
            </div>
          );
        })()}
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
  contentPad: number | string;
  panelBleed: number;
  primitives?: PrimitiveRegistry;
  onItemError?: (key: ItemKey, error: NotchGridError) => void;
  draggable?: boolean;
  panelSubLayouts: ReadonlyMap<ItemKey, SolverOutput<SubEntry>>;
  /** The member key being outer-dragged (if any), + its live offset. */
  dragKey?: ItemKey | null;
  dragOffset?: readonly [number, number];
  /** True when the *whole* component is being dragged (chrome grab) rather
   *  than a single member — the wrapper moves as a unit. */
  wholeDrag?: boolean;
  /** The sub being dragged out of a member panel (hidden during drag). */
  draggingSub?: { parentKey: ItemKey; subIndex: number } | null;
  /** Any member has a committed drop override (raises z-index). */
  overridden?: boolean;
  onItemDragStart?: (
    placement: Placement<NotchGridItem>,
    e: ReactPointerEvent<HTMLDivElement>,
  ) => void;
  onComponentDragStart?: (
    members: Placement<NotchGridItem>[],
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
  contentPad,
  panelBleed,
  primitives,
  onItemError,
  draggable = false,
  panelSubLayouts,
  dragKey,
  dragOffset,
  wholeDrag = false,
  draggingSub,
  overridden = false,
  onItemDragStart,
  onComponentDragStart,
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

  const isPlainSingleton =
    members.length === 1 && !panelSubLayouts.has(members[0].key);

  // Outline of the chrome (same path BlockShape draws). Used to hit-clip the
  // wrapper so its bounding-box rectangle doesn't intercept pointer events over
  // empty notch cells — otherwise an overlapping neighbour's rectangle would
  // steal clicks meant for this component (and vice-versa). Every component
  // (incl. a dragged-out singleton) bleeds by `panelBleed` so frames stay
  // consistent.
  const chromePath = useMemo(
    () =>
      gridOutlinePath(
        unionShape.map((row) => row.map(Boolean)),
        { cell: block, gap, bleed: panelBleed, radius: 24, inverseRadius: 32 },
      ),
    [unionShape, block, gap, panelBleed],
  );

  // Theme from the lead member — same-group members share their theme.
  const lead = members[0];
  const leadItem = lead.item as NotchGridItem;
  const resolved = useMemo(
    () => resolveNotchTheme(leadItem.theme ?? {}),
    // Deliberately keyed on the theme's fields, not the object — callers
    // pass inline literals whose identity changes every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // panels & multi-member chromes drag per sub-cell / per content tile, OR as
  // a whole unit when the chrome (connection area) itself is grabbed.
  // The whole wrapper moves as a unit — for a plain singleton always, or for a
  // panel/linked chrome when the chrome itself (not a cell) is being dragged.
  const wrapperMoves = (isPlainSingleton || wholeDrag) && dragKey === lead.key;
  // Drop the shape clip only when a *single* member needs to escape the chrome
  // (multi-member outer drag). A unit move keeps its clip so notched content
  // stays inside the outline; a sub-drag uses a separate ghost.
  const memberEscaping = dragKey != null && !isPlainSingleton && !wholeDrag;
  // A chromeless (ghost) panel draws no fill and no border, so clipping its
  // content to the rounded outline only shaves the corners of self-shaped
  // children (e.g. bordered cards). Skip the clip entirely for ghost — the
  // children define their own shape. (`noChrome` is resolved by the theme, not
  // re-inferred from CSS strings here.)
  const skipClip = memberEscaping || resolved.noChrome;

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    left: minCol * block,
    top: minRow * block,
    color: resolved.color,
  };
  if (wrapperMoves && dragOffset) {
    wrapperStyle.transform = `translate(${dragOffset[0]}px, ${dragOffset[1]}px)`;
    wrapperStyle.zIndex = 20;
  } else if (overridden) {
    wrapperStyle.zIndex = 10;
  }
  if (draggable) {
    wrapperStyle.cursor = wrapperMoves ? "grabbing" : "grab";
    wrapperStyle.touchAction = "none";
  }
  // Hit-clip the wrapper rectangle to the chrome outline so it only catches
  // pointers over the actual shape — except while a member is escaping (then
  // the un-clipped tile needs to render past the bounds).
  if (!skipClip) {
    wrapperStyle.clipPath = `path('${chromePath}')`;
  }

  // The wrapper-level drag: a plain singleton drags its one item; a panel or
  // linked chrome drags every member together. Sub-cells / member tiles
  // stopPropagation, so this only fires when the chrome itself is grabbed.
  const wrapperDrag =
    draggable && isPlainSingleton && onItemDragStart
      ? {
          onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) =>
            onItemDragStart(lead, e),
          onPointerMove: onDragMove,
          onPointerUp: onDragEnd,
          onPointerCancel: onDragEnd,
        }
      : draggable && !isPlainSingleton && onComponentDragStart
        ? {
            onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) =>
              onComponentDragStart(members, e),
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
          // Outer cell: no handler, so the padding frame / inter-cell gap
          // bubbles up to the wrapper → whole-component drag (the "connection
          // area"). The inner content div carries the sub-drag handler +
          // stopPropagation so grabbing the content moves just this sub.
          <div
            key={`${m.key}/${entry.index}`}
            className="absolute"
            style={{
              left: (offCol + sp.col) * block,
              top: (offRow + sp.row) * block,
              width: sp.cols * block,
              height: sp.rows * block,
              padding: contentPad,
              opacity: beingDragged ? 0 : undefined,
            }}
          >
            <div
              {...subHandlers}
              className={cn("h-full w-full", draggable && "cursor-grab touch-none")}
            >
              {SubPrimitive ? (
                <SubPrimitive {...sub.ui} />
              ) : (
                <UnknownPrimitivePlaceholder type={sub.ui.type} />
              )}
            </div>
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
      // Only a member that moves its *own* tile (single-member outer drag) gets
      // the pickup transform/background here. A plain singleton or a whole-
      // component drag is moved by the wrapper — adding it here too would
      // double-translate the content away from its chrome.
      const draggingThis = !isPlainSingleton && !wholeDrag && dragKey === m.key;
      // Resolve the member's own theme so the picked-up tile keeps its themed
      // surface once the transform takes it past the shared chrome.
      const memberTheme = resolveNotchTheme(it.theme ?? {});
      tiles.push(
        // Outer tile carries the pickup visual (transform/background) but no
        // handler, so its frame bubbles to the wrapper → whole-component drag.
        // The inner content div carries the member-drag handler.
        <div
          key={m.key}
          className="absolute"
          style={{
            left: offCol * block,
            top: offRow * block,
            width: m.cols * block,
            height: m.rows * block,
            padding: contentPad,
            // Follow the cursor while this member is outer-dragged so it reads
            // as picked up (the sub-drag has its own ghost; standalone members
            // move their own tile). The themed background + rounded corners
            // only kick in during the drag — at rest the tile is transparent
            // and the shared chrome shows through. Raised above siblings.
            transform:
              draggingThis && dragOffset
                ? `translate(${dragOffset[0]}px, ${dragOffset[1]}px)`
                : undefined,
            zIndex: draggingThis ? 30 : undefined,
            background: draggingThis ? memberTheme.cssBackground : undefined,
            color: draggingThis ? memberTheme.color : undefined,
            borderRadius: draggingThis ? 24 : undefined,
          }}
        >
          <div
            {...memberHandlers}
            className={cn(
              "h-full w-full",
              draggable && !isPlainSingleton && "cursor-grab touch-none",
            )}
          >
            {Primitive && it.ui ? (
              <Primitive {...it.ui} />
            ) : it.ui ? (
              <UnknownPrimitivePlaceholder type={it.ui.type} />
            ) : null}
          </div>
        </div>,
      );
    }
  }

  return (
    <div
      {...wrapperDrag}
      className={cn(
        draggable && "select-none",
        resolved.elevated && "drop-shadow-lg",
      )}
      style={wrapperStyle}
    >
      <BlockShape
        shape={unionShape}
        block={block}
        gap={gap}
        bleed={panelBleed}
        fill={resolved.fill}
        stroke={resolved.stroke}
        strokeWidth={resolved.strokeWidth}
        pad={0}
        noClip={skipClip}
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
