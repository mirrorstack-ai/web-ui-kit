import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Graph",
  description:
    "Force-directed network graph with deterministic seed positions, drag-to-pin, and hover/selection highlight",
};

export type GraphNode = {
  id: string;
  label: string;
  /** Reserved for future filtering. Accepted now, ignored behaviorally. */
  tag?: string;
  /** Arbitrary consumer payload. */
  data?: unknown;
};

export type GraphEdge = {
  source: string;
  target: string;
  weight?: number;
};

export interface GraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  /** Pixel height of the SVG viewBox. Defaults to 337.5 (16:9 of 600). */
  height?: number | string;
  onNodeClick?: (id: string) => void;
  /** Controlled selection — highlighted with the same color as hover/drag. */
  selectedId?: string;
  className?: string;
}

const W = 600;
const DEFAULT_H = 337.5;
const REPULSION = 1500;
const SPRING = 0.04;
const SPRING_LENGTH = 70;
const CENTER = 0.005;
const DAMPING = 0.85;
// Pointer-movement threshold (in SVG units) below which a pointerup is
// treated as a click rather than the end of a drag.
const CLICK_THRESHOLD = 4;

type Sim = GraphNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fixed: boolean;
  degree: number;
};

// Deterministic id-hash seed so SSR/CSR start positions match — Math.random
// would mismatch and trigger a hydration warning.
function seed(nodes: GraphNode[], h: number): Sim[] {
  return nodes.map((n, i) => {
    const hash = n.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const angle = (i * 137.5 + hash) * (Math.PI / 180);
    const radius = 60 + (hash % 80);
    return {
      ...n,
      x: W / 2 + Math.cos(angle) * radius,
      y: h / 2 + Math.sin(angle) * radius,
      vx: 0,
      vy: 0,
      fixed: false,
      degree: 0,
    };
  });
}

function step(
  nodes: Sim[],
  byId: Map<string, Sim>,
  edges: GraphEdge[],
  h: number,
) {
  // Pairwise repulsion.
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
      if (!a.fixed) { a.vx -= fx; a.vy -= fy; }
      if (!b.fixed) { b.vx += fx; b.vy += fy; }
    }
  }
  // Spring along edges.
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
    if (!a.fixed) { a.vx += fx; a.vy += fy; }
    if (!b.fixed) { b.vx -= fx; b.vy -= fy; }
  }
  // Center pull, damping, integration.
  for (const n of nodes) {
    if (n.fixed) continue;
    n.vx += (W / 2 - n.x) * CENTER;
    n.vy += (h / 2 - n.y) * CENTER;
    n.vx *= DAMPING;
    n.vy *= DAMPING;
    n.x += n.vx;
    n.y += n.vy;
    // Soft walls so a high-energy bounce doesn't fly off-canvas.
    if (n.x < 12) { n.x = 12; n.vx = -n.vx * 0.5; }
    if (n.x > W - 12) { n.x = W - 12; n.vx = -n.vx * 0.5; }
    if (n.y < 12) { n.y = 12; n.vy = -n.vy * 0.5; }
    if (n.y > h - 12) { n.y = h - 12; n.vy = -n.vy * 0.5; }
  }
}

export function Graph({
  nodes,
  edges,
  height = DEFAULT_H,
  onNodeClick,
  selectedId,
  className,
}: GraphProps) {
  // String heights ("100%", "50vh") can't drive sim math — fall back to
  // the default for the numeric viewBox while CSS handles outer sizing.
  const H = typeof height === "number" ? height : DEFAULT_H;

  // Stable ref to current H so the sim loop reads the latest value without
  // re-seeding on height change (which would erase consumer-dragged positions).
  const hRef = useRef(H);
  hRef.current = H;

  // Track the topology we've seeded for so we can re-seed when it changes
  // without paying for a redundant post-mount re-seed.
  const seededFor = useRef<{ nodes: GraphNode[]; edges: GraphEdge[] } | null>(
    null,
  );
  const nodesRef = useRef<Sim[]>([]);
  const byIdRef = useRef<Map<string, Sim>>(new Map());

  if (
    seededFor.current === null ||
    seededFor.current.nodes !== nodes ||
    seededFor.current.edges !== edges
  ) {
    nodesRef.current = seed(nodes, H);
    const map = new Map<string, Sim>();
    for (const n of nodesRef.current) map.set(n.id, n);
    for (const e of edges) {
      const a = map.get(e.source);
      const b = map.get(e.target);
      if (a) a.degree += 1;
      if (b) b.degree += 1;
    }
    byIdRef.current = map;
    seededFor.current = { nodes, edges };
  }

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [, setFrame] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerMovedRef = useRef(false);

  // Adjacency lookup for highlight — recomputed only when topology changes.
  const neighborsOf = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const n of nodes) m.set(n.id, new Set());
    for (const e of edges) {
      m.get(e.source)?.add(e.target);
      m.get(e.target)?.add(e.source);
    }
    return m;
  }, [nodes, edges]);

  // Continuous sim loop. setFrame nudges React to re-render with the new
  // positions; with ~15 nodes a 60Hz re-render is cheap.
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      step(nodesRef.current, byIdRef.current, edges, hRef.current);
      setFrame((f) => f + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [edges]);

  // Convert pointer position from screen → SVG viewBox coords so drag
  // tracks correctly on any rendered size.
  const toSvg = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * W,
      y: ((clientY - rect.top) / rect.height) * H,
    };
  };

  const handlePointerDown = (id: string) => (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    const node = byIdRef.current.get(id);
    if (!node) return;
    node.fixed = true;
    node.vx = 0;
    node.vy = 0;
    setDraggingId(id);
    pointerStartRef.current = toSvg(e.clientX, e.clientY);
    pointerMovedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId) return;
    const node = byIdRef.current.get(draggingId);
    if (!node) return;
    const { x, y } = toSvg(e.clientX, e.clientY);
    if (pointerStartRef.current) {
      const dx = x - pointerStartRef.current.x;
      const dy = y - pointerStartRef.current.y;
      if (dx * dx + dy * dy > CLICK_THRESHOLD * CLICK_THRESHOLD) {
        pointerMovedRef.current = true;
      }
    }
    node.x = x;
    node.y = y;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggingId) return;
    const id = draggingId;
    const node = byIdRef.current.get(id);
    if (node) node.fixed = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    setDraggingId(null);
    // Treat a near-stationary pointer-up as a click.
    if (!pointerMovedRef.current && onNodeClick) {
      onNodeClick(id);
    }
    pointerStartRef.current = null;
    pointerMovedRef.current = false;
  };

  const focused = draggingId ?? hoveredId ?? selectedId ?? null;
  const focusedNeighbors = focused
    ? neighborsOf.get(focused) ?? new Set<string>()
    : null;

  const isLit = (id: string) =>
    !focused || id === focused || focusedNeighbors?.has(id);

  // Edges are dim by default — only the focused node's edges light up.
  // Keeping the resting state quiet makes the graph read as a network at
  // a glance instead of a wall of lines.
  const isEdgeLit = (e: GraphEdge) =>
    focused !== null && (e.source === focused || e.target === focused);

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl bg-surface-container border border-outline-variant",
        className,
      )}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto select-none"
        preserveAspectRatio="xMidYMid meet"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
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
                strokeWidth={lit ? 1.5 : 1}
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
                onPointerDown={handlePointerDown(n.id)}
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
      </svg>
    </div>
  );
}
