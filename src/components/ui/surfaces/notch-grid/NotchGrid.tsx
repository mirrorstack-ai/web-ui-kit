// NotchGrid — desire-driven notched layout for the dynamic-ui wire format.
//
// Items declare position / shape priorities; `solveLayout` packs them;
// each placement renders as a `BlockShape` themed via `resolveNotchTheme`.
// No drag in this slice — that's PRs 5–7.
//
// Container sizing: when `cols="auto"` (default), a ResizeObserver measures
// the wrapper width and applies the >96px-gain-1-col rule —
//   `cols = max(1, floor(containerWidth / blockMin))` and
//   `block = containerWidth / cols`
// so the surface never leaves dead space at the edges.
//
// See `mirrorstack-docs/architecture/notch-grid-v2/02-api.md`.

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
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
   *  chromes in PR 4; unified chrome lands in PR 6. */
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
  className?: string;
  style?: CSSProperties;
}

// --- Internal helpers ------------------------------------------------------

/** Convert a boolean mask to BlockShape's tier-encoded shape matrix (0/1). */
function maskToShape(mask: Mask): number[][] {
  return mask.map((row) => row.map((v) => (v ? 1 : 0)));
}

/** Parse `resolveNotchTheme().border` ("none" or "Npx solid var(--…)") into
 *  BlockShape's `stroke` + `strokeWidth` props. */
function parseBorder(border: string): { stroke: string; strokeWidth: number } {
  if (border === "none") return { stroke: "none", strokeWidth: 0 };
  const m = border.match(/^(\d+)px\s+solid\s+(.+)$/);
  if (m) return { stroke: m[2], strokeWidth: Number(m[1]) };
  return { stroke: border, strokeWidth: 1 };
}

/** Assign synthetic keys to items missing one. Stable across re-renders for
 *  the same input order; matches the design doc's open question 2.1 lean
 *  (sequential, at parse). */
function assignKeys(items: NotchGridItem[]): NotchGridItem[] {
  return items.map((it, i) => (it.key ? it : { ...it, key: `item-${i}` }));
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

  // Compute cols + block size. Auto: gain-1-col rule + 1fr distribution.
  const { resolvedCols, block } = useMemo(() => {
    if (cols !== "auto") return { resolvedCols: cols, block: blockMin };
    if (containerWidth == null) return { resolvedCols: null as number | null, block: blockMin };
    const c = Math.max(1, Math.floor(containerWidth / blockMin));
    return { resolvedCols: c, block: containerWidth / c };
  }, [cols, blockMin, containerWidth]);

  // Solve layout once cols are known.
  const layout = useMemo(() => {
    if (resolvedCols == null) return null;
    return solveLayout({
      items: keyedItems.map((it) => ({
        key: it.key!,
        desire: it.desire,
        groupKey: it.groupKey,
        item: it,
      })),
      cols: resolvedCols,
      nest,
    });
  }, [keyedItems, resolvedCols, nest]);

  if (isDev && layout && layout.unfit.length > 0) {
    console.warn(
      `[NotchGrid] ${layout.unfit.length} item(s) didn't fit: ${layout.unfit.join(", ")}. Mask wider than cols=${resolvedCols}.`,
    );
  }

  const totalRows = layout?.rowsUsed ?? 0;

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-full", className)}
      style={{
        // Reserve vertical space pre-paint so the page doesn't reflow when
        // layout resolves.
        minHeight: totalRows > 0 ? totalRows * block : undefined,
        ...style,
      }}
    >
      {layout
        ? layout.placements.map((p) => (
            <NotchItem
              key={p.key}
              placement={p}
              item={p.item as NotchGridItem}
              block={block}
              gap={gap}
              primitives={primitives}
              onItemError={onItemError}
              parentTheme={undefined}
            />
          ))
        : null}
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
}

function NotchItem({
  placement,
  item,
  block,
  gap,
  primitives,
  onItemError,
  parentTheme,
}: NotchItemProps) {
  // Sub-items inherit `type` from the parent panel; only `variant` and
  // `gradient` are overridable (design doc rationale: visual coherence).
  const itemTheme: NotchTheme = parentTheme
    ? { ...item.theme, type: parentTheme.type }
    : item.theme ?? {};
  const resolved = resolveNotchTheme(itemTheme);
  const { stroke, strokeWidth } = parseBorder(resolved.border);
  const shape = useMemo(() => maskToShape(placement.mask), [placement.mask]);

  // Sub-items: solve inner layout. The sub-grid's col count is the parent's
  // bounding-box cols; each sub-cell uses the same `block` px size.
  const subLayout = useMemo(() => {
    if (!item.subItems || item.subItems.length === 0) return null;
    return solveLayout({
      items: item.subItems.map((s, i) => ({
        key: s.key ?? `${placement.key}/${i}`,
        desire: s.desire,
        item: { ...s } as NotchGridItem,
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

  // The wrapper carries placement + non-BlockShape theme bits (text color,
  // drop-shadow filter for elevated chromes — traces the SVG path rather
  // than the bounding box — and optional border-left color cue for
  // elevated warn/error).
  const wrapperStyle: CSSProperties = {
    position: "absolute",
    left: placement.col * block,
    top: placement.row * block,
    color: resolved.color,
    ...(resolved.filter !== "none" ? { filter: resolved.filter } : {}),
    ...(resolved.borderLeft ? { borderLeft: resolved.borderLeft } : {}),
  };

  // Gradient backgrounds (`linear-gradient(...)`) aren't valid SVG `fill`
  // values. v1 falls back to the BlockShape's default solid fill when a
  // gradient is requested. Tracked in the design doc.
  const fill = resolved.background.startsWith("linear-gradient")
    ? undefined
    : resolved.background;

  return (
    <div style={wrapperStyle}>
      <BlockShape
        shape={shape}
        block={block}
        gap={gap}
        fill={fill ?? "transparent"}
        stroke={stroke}
        strokeWidth={strokeWidth}
        pad={subLayout ? 0 : 16}
      >
        {subLayout ? (
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
        ) : Primitive && item.ui ? (
          <Primitive {...item.ui} />
        ) : unknownPrimitive && item.ui ? (
          <UnknownPrimitivePlaceholder type={item.ui.type} />
        ) : null}
      </BlockShape>
    </div>
  );
}

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
