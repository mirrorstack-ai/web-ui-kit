import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Graph",
  description:
    "Force-directed network graph canvas with auto-sizing, drag-to-pin, scroll/pinch-to-zoom, fixed nodes, and an imperative replay/fit handle. Pair with GraphAction and GraphSide for a full UI.",
};

export type GraphNode = {
  id: string;
  label: string;
  tag?: string;
  /** Pin to a position in viewBox-ratio space (0..1). Implies `fixed`. */
  pin?: { x: number; y: number };
  /** Anchor the node so the simulation can't move it (drag still works). */
  fixed?: boolean;
};

export type GraphEdge = {
  source: string;
  target: string;
  weight?: number;
};

export interface GraphHandle {
  /** Re-seed node positions from scratch — the toolbar Replay button. */
  replay: () => void;
  /** Reset zoom and pan to 1 / origin — the toolbar Fit button. */
  fit: () => void;
}

export interface GraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  /** Optional explicit height. When omitted, the graph fills its container. */
  height?: number | string;
  onNodeClick?: (id: string) => void;
  /** Controlled selection — highlighted with the same color as hover/drag. */
  selectedId?: string;
  className?: string;
}

const REPULSION = 1500;
const SPRING = 0.04;
const SPRING_LENGTH = 70;
const CENTER = 0.005;
const DAMPING = 0.85;
const CLICK_THRESHOLD = 4;
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 5;
const ZOOM_STEP = 0.0015;

type Sim = GraphNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pinned: boolean;
  degree: number;
};

function seed(nodes: GraphNode[], W: number, H: number): Sim[] {
  return nodes.map((n, i) => {
    const hash = n.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    let x: number;
    let y: number;
    if (n.pin) {
      x = n.pin.x * W;
      y = n.pin.y * H;
    } else if (n.fixed) {
      x = W / 2;
      y = H / 2;
    } else {
      const angle = (i * 137.5 + hash) * (Math.PI / 180);
      const radius = 60 + (hash % 80);
      x = W / 2 + Math.cos(angle) * radius;
      y = H / 2 + Math.sin(angle) * radius;
    }
    return {
      ...n,
      x,
      y,
      vx: 0,
      vy: 0,
      pinned: Boolean(n.fixed || n.pin),
      degree: 0,
    };
  });
}

function step(
  nodes: Sim[],
  byId: Map<string, Sim>,
  edges: GraphEdge[],
  W: number,
  H: number,
) {
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.max(20, Math.sqrt(dx * dx + dy * dy));
      const f = REPULSION / (dist * dist);
      const fx = (dx / dist) * f;
      const fy = (dy / dist) * f;
      if (!a.pinned) { a.vx -= fx; a.vy -= fy; }
      if (!b.pinned) { b.vx += fx; b.vy += fy; }
    }
  }
  for (const e of edges) {
    const a = byId.get(e.source);
    const b = byId.get(e.target);
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    const diff = dist - SPRING_LENGTH;
    const fx = (dx / dist) * diff * SPRING;
    const fy = (dy / dist) * diff * SPRING;
    if (!a.pinned) { a.vx += fx; a.vy += fy; }
    if (!b.pinned) { b.vx -= fx; b.vy -= fy; }
  }
  for (const n of nodes) {
    if (n.pinned) continue;
    n.vx += (W / 2 - n.x) * CENTER;
    n.vy += (H / 2 - n.y) * CENTER;
    n.vx *= DAMPING;
    n.vy *= DAMPING;
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 12) { n.x = 12; n.vx = -n.vx * 0.5; }
    if (n.x > W - 12) { n.x = W - 12; n.vx = -n.vx * 0.5; }
    if (n.y < 12) { n.y = 12; n.vy = -n.vy * 0.5; }
    if (n.y > H - 12) { n.y = H - 12; n.vy = -n.vy * 0.5; }
  }
}

const DEFAULT_W = 600;
const DEFAULT_H = 400;

export const Graph = forwardRef<GraphHandle, GraphProps>(function Graph(
  { nodes, edges, height, onNodeClick, selectedId, className },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [size, setSize] = useState<{ w: number; h: number }>({
    w: DEFAULT_W,
    h: typeof height === "number" ? height : DEFAULT_H,
  });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(200, entry.contentRect.width);
        const h =
          typeof height === "number"
            ? height
            : Math.max(200, entry.contentRect.height || DEFAULT_H);
        // Re-snap pin-ratio nodes whenever the viewport changes so they
        // stay anchored to their fractional position. Drag-to-reposition
        // is preserved because pointerup overwrites pin to the new ratio.
        for (const n of nodesRef.current) {
          if (n.pin) {
            n.x = n.pin.x * w;
            n.y = n.pin.y * h;
          }
        }
        setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  const { w: W, h: H } = size;
  const sizeRef = useRef(size);
  sizeRef.current = size;

  const seededFor = useRef<{ nodes: GraphNode[]; edges: GraphEdge[] } | null>(
    null,
  );
  const nodesRef = useRef<Sim[]>([]);
  const byIdRef = useRef<Map<string, Sim>>(new Map());
  const [reseedKey, setReseedKey] = useState(0);

  // Rebuild node positions, byId map, and degree counts. Used both inline
  // when topology identity changes and from the replay-key effect.
  const rebuildSim = (w: number, h: number) => {
    nodesRef.current = seed(nodes, w, h);
    const map = new Map<string, Sim>();
    for (const n of nodesRef.current) map.set(n.id, n);
    for (const e of edges) {
      const a = map.get(e.source);
      const b = map.get(e.target);
      if (a) a.degree += 1;
      if (b) b.degree += 1;
    }
    byIdRef.current = map;
  };

  if (
    seededFor.current === null ||
    seededFor.current.nodes !== nodes ||
    seededFor.current.edges !== edges
  ) {
    rebuildSim(W, H);
    seededFor.current = { nodes, edges };
  }

  const [, setFrame] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [view, setView] = useState({ zoom: 1, panX: 0, panY: 0 });
  const viewRef = useRef(view);
  viewRef.current = view;

  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerMovedRef = useRef(false);
  const panStartRef = useRef<{
    clientX: number;
    clientY: number;
    panX: number;
    panY: number;
  } | null>(null);

  const neighborsOf = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const n of nodes) m.set(n.id, new Set());
    for (const e of edges) {
      m.get(e.source)?.add(e.target);
      m.get(e.target)?.add(e.source);
    }
    return m;
  }, [nodes, edges]);

  // RAF loop reads edges from a ref so a new array identity from the
  // consumer doesn't tear down and restart the simulation.
  const edgesRef = useRef(edges);
  edgesRef.current = edges;

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const s = sizeRef.current;
      step(nodesRef.current, byIdRef.current, edgesRef.current, s.w, s.h);
      setFrame((f) => f + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (reseedKey === 0) return;
    rebuildSim(sizeRef.current.w, sizeRef.current.h);
    // rebuildSim intentionally not in deps — it closes over the latest
    // nodes/edges via render time, which matches the inline reseed path.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reseedKey]);

  useImperativeHandle(
    ref,
    () => ({
      replay: () => setReseedKey((k) => k + 1),
      fit: () => setView({ zoom: 1, panX: 0, panY: 0 }),
    }),
    [],
  );

  const toGraph = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const s = sizeRef.current;
    const vx = ((clientX - rect.left) / rect.width) * s.w;
    const vy = ((clientY - rect.top) / rect.height) * s.h;
    const { zoom, panX, panY } = viewRef.current;
    return { x: (vx - panX) / zoom, y: (vy - panY) / zoom };
  }, []);

  const toView = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const s = sizeRef.current;
    return {
      x: ((clientX - rect.left) / rect.width) * s.w,
      y: ((clientY - rect.top) / rect.height) * s.h,
    };
  }, []);

  const handleNodePointerDown =
    (id: string) => (e: React.PointerEvent) => {
      e.stopPropagation();
      (e.target as Element).setPointerCapture(e.pointerId);
      const node = byIdRef.current.get(id);
      if (!node) return;
      node.pinned = true;
      node.vx = 0;
      node.vy = 0;
      setDraggingId(id);
      pointerStartRef.current = toGraph(e.clientX, e.clientY);
      pointerMovedRef.current = false;
    };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingId) {
      const node = byIdRef.current.get(draggingId);
      if (!node) return;
      const { x, y } = toGraph(e.clientX, e.clientY);
      if (pointerStartRef.current) {
        const dx = x - pointerStartRef.current.x;
        const dy = y - pointerStartRef.current.y;
        if (dx * dx + dy * dy > CLICK_THRESHOLD * CLICK_THRESHOLD) {
          pointerMovedRef.current = true;
        }
      }
      node.x = x;
      node.y = y;
      return;
    }
    if (panStartRef.current) {
      const dx = e.clientX - panStartRef.current.clientX;
      const dy = e.clientY - panStartRef.current.clientY;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const s = sizeRef.current;
      const vxScale = s.w / rect.width;
      const vyScale = s.h / rect.height;
      setView({
        zoom: viewRef.current.zoom,
        panX: panStartRef.current.panX + dx * vxScale,
        panY: panStartRef.current.panY + dy * vyScale,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingId) {
      const id = draggingId;
      const node = byIdRef.current.get(id);
      if (node) {
        node.pinned = Boolean(node.fixed || node.pin);
        // When the user drags a pin-ratio node, rewrite the pin to the
        // new ratio so future resizes track the dragged position
        // proportionally instead of either drifting or being overlaid.
        if (node.pin && pointerMovedRef.current) {
          const s = sizeRef.current;
          node.pin = { x: node.x / s.w, y: node.y / s.h };
        }
      }
      (e.target as Element).releasePointerCapture?.(e.pointerId);
      setDraggingId(null);
      if (!pointerMovedRef.current && onNodeClick) {
        onNodeClick(id);
      }
      pointerStartRef.current = null;
      pointerMovedRef.current = false;
      return;
    }
    panStartRef.current = null;
  };

  const handleBackgroundPointerDown = (e: React.PointerEvent) => {
    if (e.target !== e.currentTarget) return;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    panStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      panX: viewRef.current.panX,
      panY: viewRef.current.panY,
    };
  };

  // Native listener so we can preventDefault on pinch gestures (Safari/Chrome
  // synthesize wheel events with ctrlKey=true for trackpad pinch — without
  // preventDefault the browser zooms the whole page).
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cursor = toView(e.clientX, e.clientY);
      const cur = viewRef.current;
      // Lines mode → roughly 16px per line so trackpad pinch and mouse wheel
      // both feel similar.
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const factor = Math.exp(-dy * ZOOM_STEP);
      const nextZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, cur.zoom * factor));
      if (nextZoom === cur.zoom) return;
      const ratio = nextZoom / cur.zoom;
      setView({
        zoom: nextZoom,
        panX: cursor.x - (cursor.x - cur.panX) * ratio,
        panY: cursor.y - (cursor.y - cur.panY) * ratio,
      });
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [toView]);

  const focused = draggingId ?? hoveredId ?? selectedId ?? null;
  const focusedNeighbors = focused
    ? neighborsOf.get(focused) ?? new Set<string>()
    : null;
  const isLit = (id: string) =>
    !focused || id === focused || focusedNeighbors?.has(id);
  const isEdgeLit = (e: GraphEdge) =>
    focused !== null && (e.source === focused || e.target === focused);

  const styleHeight =
    typeof height === "string"
      ? height
      : typeof height === "number"
        ? height
        : "100%";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-surface-container border border-outline-variant",
        className,
      )}
      style={{ height: styleHeight, minHeight: 200 }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full block select-none touch-none"
        preserveAspectRatio="xMidYMid meet"
        onPointerDown={handleBackgroundPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <g
          transform={`translate(${view.panX} ${view.panY}) scale(${view.zoom})`}
        >
          <g stroke="currentColor" className="text-on-surface-variant">
            {edges.map((e, i) => {
              const a = byIdRef.current.get(e.source);
              const b = byIdRef.current.get(e.target);
              if (!a || !b) return null;
              const lit = isEdgeLit(e);
              return (
                <line
                  key={`${e.source}-${e.target}-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  strokeWidth={(lit ? 1.5 : 1) / view.zoom}
                  strokeOpacity={lit ? 0.7 : 0.15}
                />
              );
            })}
          </g>
          <g>
            {nodesRef.current.map((n) => {
              const lit = isLit(n.id);
              const r = 4 + Math.min(n.degree, 6) + (n.id === focused ? 2 : 0);
              return (
                <g
                  key={n.id}
                  data-node-id={n.id}
                  className="cursor-grab active:cursor-grabbing"
                  onPointerDown={handleNodePointerDown(n.id)}
                  onPointerEnter={() => setHoveredId(n.id)}
                  onPointerLeave={() =>
                    setHoveredId((cur) => (cur === n.id ? null : cur))
                  }
                  opacity={lit ? 1 : 0.2}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={r}
                    className={
                      n.id === focused
                        ? "fill-primary"
                        : "fill-on-surface-variant"
                    }
                  />
                  <text
                    x={n.x}
                    y={n.y + r + 12}
                    textAnchor="middle"
                    className="fill-on-surface-variant pointer-events-none"
                    style={{ fontSize: 10 }}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
});
