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
// See `mirrorstack-docs/architecture/notch-grid-v2/02-api.md`.

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
import { BlockShape, BLOCK_SIZE } from "./BlockShape";
import {
  solveLayout,
  type Desire,
  type Mask,
  type Placement,
  type Pos,
} from "./layout";
import { resolveNotchTheme, type NotchTheme } from "./theme";

export const meta: ComponentMeta = {
  name: "NotchGrid",
  description:
    "Desire-driven notched layout. Items declare position/shape priorities; the solver packs them; each placement renders as a BlockShape themed via tokens. Implements the >96px gain-1-col / 1fr container rule.",
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
  /** Enable outer-grid drag-to-place. Dropped items pin to their new cell
   *  (winning the cell on next solve); everything else re-flows around them. */
  draggable?: boolean;
  /** Called after a drag drops an item, with its new block position. */
  onItemMove?: (key: ItemKey, pos: Pos) => void;
  className?: string;
  style?: CSSProperties;
}

// --- Internal helpers ------------------------------------------------------

function maskToShape(mask: Mask): number[][] {
  return mask.map((row) => row.map((v) => (v ? 1 : 0)));
}

/** Assign synthetic keys to items missing one. Returns the same array when
 *  every item already has a key (preserves referential equality for memos). */
function assignKeys(items: NotchGridItem[]): NotchGridItem[] {
  if (items.every((it) => it.key != null)) return items;
  return items.map((it, i) => (it.key ? it : { ...it, key: `item-${i}` }));
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

  // Drag-to-place: positions the user has dropped items at (pinned) + the
  // live drag offset for visual feedback. Overrides drive a re-solve;
  // `drag` is paint-only state during the pointer sequence.
  const [overrides, setOverrides] = useState<Map<ItemKey, Pos>>(new Map());
  const [drag, setDrag] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  dragRef.current = drag;

  const handlePointerMove = useCallback((e: ReactPointerEvent) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    // Skip the no-op spread + re-render when the pointer hasn't actually moved.
    if (dx === d.dx && dy === d.dy) return;
    setDrag({ ...d, dx, dy });
  }, []);

  const handlePointerEnd = useCallback(
    (e: ReactPointerEvent) => {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer may already be released */
      }
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

  // Items with an override get their desire.position rewritten — that promotes
  // them to the solver's fixed-position fast path so they win their cell on
  // the next solve.
  const layout = useMemo(() => {
    if (resolvedCols == null) return null;
    return solveLayout({
      items: keyedItems.map((it) => {
        const ov = overrides.get(it.key!);
        return {
          key: it.key!,
          desire: ov ? { ...it.desire, position: ov } : it.desire,
          groupKey: it.groupKey,
          item: it,
        };
      }),
      cols: resolvedCols,
      nest,
    });
  }, [keyedItems, resolvedCols, nest, overrides]);

  // Warn-once-per-distinct-unfit-set, not every paint.
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
            parentTheme={undefined}
            draggable={draggable}
            dragOffset={dragOffset}
            hasOverride={overrides.has(p.key)}
            onDragStart={
              draggable
                ? (e) => {
                    // Ignore secondary buttons when the event reports one
                    // (jsdom's fireEvent drops it — treat undefined as primary).
                    if (e.button != null && e.button !== 0) return;
                    try {
                      e.currentTarget.setPointerCapture(e.pointerId);
                    } catch {
                      /* test envs (jsdom) lack pointer capture */
                    }
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
                  }
                : undefined
            }
            onDragMove={handlePointerMove}
            onDragEnd={handlePointerEnd}
          />
        );
      })}
    </div>
  );
}

// --- NotchItem (internal, recursive for sub-items) -------------------------

interface NotchItemProps {
  placement: Placement<NotchGridItem>;
  item: NotchGridItem;
  block: number;
  gap: number;
  primitives?: PrimitiveRegistry;
  onItemError?: (key: ItemKey, error: NotchGridError) => void;
  /** Set when rendered as a sub-item; inherits `type` from the parent panel. */
  parentTheme?: NotchTheme;
  /** When true, the wrapper accepts pointer events for outer-grid drag. */
  draggable?: boolean;
  /** Live `[dx, dy]` in px while this tile is being dragged. */
  dragOffset?: readonly [number, number];
  /** True when this tile has a committed drop override (sits above non-pinned). */
  hasOverride?: boolean;
  onDragStart?: (e: ReactPointerEvent<HTMLDivElement>) => void;
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
  parentTheme,
  draggable = false,
  dragOffset,
  hasOverride = false,
  onDragStart,
  onDragMove,
  onDragEnd,
}: NotchItemProps) {
  // Sub-items inherit `type` from the parent panel; only `variant` and
  // `gradient` are overridable (visual coherence — a filled panel with an
  // outlined sub-item looks broken).
  const itemTheme: NotchTheme = parentTheme
    ? { ...item.theme, type: parentTheme.type }
    : item.theme ?? {};
  const resolved = useMemo(() => resolveNotchTheme(itemTheme), [
    itemTheme.type,
    itemTheme.variant,
    itemTheme.gradient,
  ]);
  const shape = useMemo(() => maskToShape(placement.mask), [placement.mask]);

  const subLayout = useMemo(() => {
    if (!item.subItems || item.subItems.length === 0) return null;
    return solveLayout({
      items: item.subItems.map((s, i) => ({
        key: s.key ?? `${placement.key}/${i}`,
        desire: s.desire,
        item: s as NotchGridItem,
      })),
      cols: placement.cols,
    });
  }, [item.subItems, placement.cols, placement.key]);

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
  if (resolved.filter !== "none") wrapperStyle.filter = resolved.filter;
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

  const dragHandlers = draggable
    ? {
        onPointerDown: onDragStart,
        onPointerMove: onDragMove,
        onPointerUp: onDragEnd,
        onPointerCancel: onDragEnd,
      }
    : undefined;

  let content: ReactNode = null;
  if (subLayout) {
    content = (
      <div className="relative h-full w-full">
        {subLayout.placements.map((sp) => (
          <NotchItem
            key={sp.key}
            placement={sp}
            item={sp.item as NotchGridItem}
            block={block}
            gap={gap}
            primitives={primitives}
            onItemError={onItemError}
            parentTheme={itemTheme}
          />
        ))}
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
      className={draggable ? "select-none" : undefined}
      style={wrapperStyle}
    >
      <BlockShape
        shape={shape}
        block={block}
        gap={gap}
        fill={resolved.fill}
        stroke={resolved.stroke}
        strokeWidth={resolved.strokeWidth}
        pad={subLayout ? 0 : 16}
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
