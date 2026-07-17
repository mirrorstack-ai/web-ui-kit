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
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Graph",
  description:
    "Force-directed network graph canvas with auto-sizing, drag-to-pin, scroll/pinch-to-zoom, fixed nodes, and an imperative replay/fit handle. The physics simulation auto-pauses once the layout settles and resumes on drag, replay, or resize, so an idle graph costs no per-frame work. Pair with GraphAction and GraphSide for a full UI.",
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
  /**
   * Render this edge as a dashed line instead of solid. Lets consumers
   * distinguish a second edge kind (e.g. a "provides"/contributes relation
   * alongside solid "depends on" edges) without any other styling change.
   * Defaults to solid.
   */
  dashed?: boolean;
};

export interface GraphHandle {
  /**
   * Start (or restart) the playback animation: nodes appear one by one in
   * BFS order from the first pinned node. Also re-seeds positions so a
   * dragged pin returns to its consumer-defined ratio.
   */
  replay: () => void;
  /**
   * Abort an in-progress playback and reveal every node immediately.
   * No-op when nothing is playing back.
   */
  stop: () => void;
  /**
   * Animate zoom + pan back to defaults and re-seed positions, which
   * restores every pin-ratio node to its consumer-defined ratio.
   */
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
  /** Multiplier applied to node radii. Default 1. */
  nodeSize?: number;
  /** Multiplier applied to label font size. Default 1. */
  textSize?: number;
  /** Multiplier applied to edge stroke width. Default 1. */
  lineSize?: number;
  /** Render each node's tag below its always-visible label. Default false. */
  showTags?: boolean;
  /** Pairwise repulsion strength. Default 1500. */
  repulsion?: number;
  /** Spring rest length for edges. Default 70. */
  linkDistance?: number;
  /**
   * Map of node id → fill color (any CSS color). The consumer decides how
   * each id maps to a color (e.g. by group/tag/property match). When a
   * node's id is in the map its circle uses that color; otherwise the
   * `on-surface-variant` token. Focused/dragged nodes still win with the
   * primary token regardless.
   */
  colors?: Record<string, string>;
  /**
   * Fires after a playback (from `replay`) finishes revealing every node.
   * Does NOT fire when playback is aborted via `stop`. Lets the consumer
   * resync any "playing" UI state (e.g. a play/stop toolbar button).
   */
  onPlaybackEnd?: () => void;
  /** Allow scroll/pinch to zoom. Default true. Set false on scrollable pages. */
  scrollZoom?: boolean;
  className?: string;
}

const DEFAULT_REPULSION = 1500;
const SPRING = 0.04;
const DEFAULT_LINK_DISTANCE = 70;
const CENTER = 0.005;
const DAMPING = 0.85;
// |velocity|² below which a revealed, unpinned node counts as at rest
// (≈0.05 px/frame — sub-pixel, imperceptible). When every such node is below
// this and nothing is driving motion, the RAF loop parks itself (see below).
const SETTLE_V2 = 0.0025;
const CLICK_THRESHOLD = 4;
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 5;
const ZOOM_STEP = 0.0015;
const REVEAL_TICK_MS = 250;

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
      // Clone pin so a future drag-rewrite can't reach the consumer's data.
      pin: n.pin ? { ...n.pin } : undefined,
      x,
      y,
      vx: 0,
      vy: 0,
      pinned: Boolean(n.fixed || n.pin),
      degree: 0,
    };
  });
}

// During BFS playback, only `revealed` nodes participate in physics:
// repulsion / spring / center / boundary forces all skip non-revealed
// nodes. Without this guard, unrevealed nodes still pull on revealed
// ones, distorting the intermediate-frame shape (e.g., a 7-node fully-
// connected subset settles into a tangled cluster instead of a clean
// heptagon because hidden facts tug on their hubs). Once playback ends
// every node is in `revealed`, so this is a no-op for steady-state.
function step(
  nodes: Sim[],
  byId: Map<string, Sim>,
  edges: GraphEdge[],
  revealed: Set<string>,
  W: number,
  H: number,
  repulsion: number,
  linkDistance: number,
) {
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    if (!revealed.has(a.id)) continue;
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      if (!revealed.has(b.id)) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.max(20, Math.sqrt(dx * dx + dy * dy));
      const f = repulsion / (dist * dist);
      const fx = (dx / dist) * f;
      const fy = (dy / dist) * f;
      if (!a.pinned) { a.vx -= fx; a.vy -= fy; }
      if (!b.pinned) { b.vx += fx; b.vy += fy; }
    }
  }
  for (const e of edges) {
    if (!revealed.has(e.source) || !revealed.has(e.target)) continue;
    const a = byId.get(e.source);
    const b = byId.get(e.target);
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    const diff = dist - linkDistance;
    const fx = (dx / dist) * diff * SPRING;
    const fy = (dy / dist) * diff * SPRING;
    if (!a.pinned) { a.vx += fx; a.vy += fy; }
    if (!b.pinned) { b.vx -= fx; b.vy -= fy; }
  }
  for (const n of nodes) {
    if (n.pinned) continue;
    if (!revealed.has(n.id)) continue;
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

// Stable style object reused on every <g> / <line> so React's reconciler
// can skip the diff and the browser can still animate the opacity change
// when revealedRef changes.
const REVEAL_TRANSITION_STYLE = { transition: "opacity 200ms ease" };

// Base font size for node labels. Multiplied by nodeSize so labels grow
// in step with circles when the consumer bumps node size — the per-frame
// style object is memoised below in the component so we still avoid
// allocating a literal per node per frame.
const LABEL_BASE_FONT_SIZE = 13;
const LABEL_TRANSITION = "opacity 200ms ease";

// Per-node LOD: target opacity (0..1) for each label at the current zoom.
// Anchors (pinned), interaction state (focused/hovered), and synthetic
// tag nodes always render at full opacity. Sparse graphs (< 10 nodes)
// also stay at full opacity — there's nothing to declutter. Dense graphs
// fade non-hub labels in/out based on a zoom-linear ramp per tier:
// mid-degree fades early, leaves fade later. At default zoom (1.0) hubs
// + mid show fully and leaves sit at ~20% opacity (faintly visible);
// zoom in past ~1.4 reaches full opacity for everyone.
function labelOpacity(
  degree: number,
  pinned: boolean,
  focused: boolean,
  hovered: boolean,
  isTagNode: boolean,
  zoom: number,
  totalNodes: number,
): number {
  if (isTagNode || pinned || focused || hovered) return 1;
  if (totalNodes < 10) return 1;
  if (degree >= 5) return 1;
  const ramp = (min: number, max: number) =>
    Math.max(0, Math.min(1, (zoom - min) / (max - min)));
  if (degree >= 2) return ramp(0.7, 1.0);
  return ramp(0.9, 1.4);
}

// Prefix used for synthetic "tag nodes" spawned when `showTags` is true.
// One tag node per unique tag value in the consumer's nodes prop, each
// connected via virtual edges to the real nodes carrying that tag.
const TAG_PREFIX = "__tag:";

export const Graph = forwardRef<GraphHandle, GraphProps>(function Graph(
  {
    nodes,
    edges,
    height,
    onNodeClick,
    selectedId,
    nodeSize = 1,
    textSize = 1,
    lineSize = 1,
    showTags = false,
    repulsion = DEFAULT_REPULSION,
    linkDistance = DEFAULT_LINK_DISTANCE,
    colors,
    onPlaybackEnd,
    scrollZoom = true,
    className,
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodeGroupEls = useRef<Map<string, SVGGElement>>(new Map());
  const edgeEls = useRef<Map<string, SVGLineElement>>(new Map());

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
        const prev = sizeRef.current;
        if (prev.w === w && prev.h === h) continue;
        // Re-snap pin-ratio nodes whenever the viewport changes so they
        // stay anchored to their fractional position. Drag-to-reposition
        // is preserved because pointerup overwrites pin to the new ratio.
        for (const n of nodesRef.current) {
          if (n.pin) {
            n.x = n.pin.x * w;
            n.y = n.pin.y * h;
          } else {
            n.x = (n.x / prev.w) * w;
            n.y = (n.y / prev.h) * h;
          }
        }
        // Positions were just re-mapped to the new viewport — re-settle.
        activeRef.current = true;
        setSize({ w, h });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  const { w: W, h: H } = size;
  const sizeRef = useRef(size);
  sizeRef.current = size;

  // When `showTags` is on we synthesize one virtual tag node per unique
  // tag value in the consumer's nodes, plus an edge from each tagged node
  // to its tag node. The sim and render treat them like any other node;
  // the only difference is the prefixed id, which we use at render time
  // to flip to an outline style and at click time to suppress onNodeClick.
  const allNodes = useMemo<GraphNode[]>(() => {
    if (!showTags) return nodes;
    if (isDev) {
      const collision = nodes.find((n) => n.id.startsWith(TAG_PREFIX));
      if (collision) {
        console.warn(
          `[Graph] node id "${collision.id}" collides with the synthetic ` +
            `tag-node prefix "${TAG_PREFIX}". Tag rendering and ` +
            `onNodeClick will misbehave for this node.`,
        );
      }
    }
    const uniqueTags = new Set<string>();
    for (const n of nodes) if (n.tag) uniqueTags.add(n.tag);
    const tagNodes: GraphNode[] = Array.from(uniqueTags).map((tag) => ({
      id: `${TAG_PREFIX}${tag}`,
      label: tag,
    }));
    return [...nodes, ...tagNodes];
  }, [nodes, showTags]);

  const allEdges = useMemo<GraphEdge[]>(() => {
    if (!showTags) return edges;
    const tagEdges: GraphEdge[] = [];
    for (const n of nodes) {
      if (n.tag) {
        tagEdges.push({ source: n.id, target: `${TAG_PREFIX}${n.tag}` });
      }
    }
    return [...edges, ...tagEdges];
  }, [nodes, edges, showTags]);

  const seededFor = useRef<{ nodes: GraphNode[]; edges: GraphEdge[] } | null>(
    null,
  );
  const nodesRef = useRef<Sim[]>([]);
  const byIdRef = useRef<Map<string, Sim>>(new Map());
  const [reseedKey, setReseedKey] = useState(0);

  // Whether the simulation is doing visible work. The RAF loop parks (skips the
  // O(n²) physics step AND the per-frame SVG re-render) once the cluster has
  // settled and nothing is driving motion, then any wake source below re-arms
  // it within a frame. Without this, every on-page Graph re-runs physics and
  // reconciles its whole SVG forever; three of them cold-starting on a single
  // scroll frame is what makes scrolling into a multi-graph section lag.
  const activeRef = useRef(true);

  // Rebuild node positions, byId map, and degree counts. Used both inline
  // when topology identity changes and from the replay-key effect.
  const rebuildSim = (w: number, h: number) => {
    nodesRef.current = seed(allNodes, w, h);
    const map = new Map<string, Sim>();
    for (const n of nodesRef.current) map.set(n.id, n);
    for (const e of allEdges) {
      const a = map.get(e.source);
      const b = map.get(e.target);
      if (a) a.degree += 1;
      if (b) b.degree += 1;
    }
    byIdRef.current = map;
    // A fresh seed scatters every node — wake the loop to animate the settle.
    activeRef.current = true;
  };

  if (
    seededFor.current === null ||
    seededFor.current.nodes !== allNodes ||
    seededFor.current.edges !== allEdges
  ) {
    rebuildSim(W, H);
    seededFor.current = { nodes: allNodes, edges: allEdges };
  }

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  // Ref mirror of draggingId so the window-level safety listener (which is
  // bound once on mount) can read the current value without re-binding.
  const draggingIdRef = useRef<string | null>(null);
  draggingIdRef.current = draggingId;

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
    for (const n of allNodes) m.set(n.id, new Set());
    for (const e of allEdges) {
      m.get(e.source)?.add(e.target);
      m.get(e.target)?.add(e.source);
    }
    return m;
  }, [allNodes, allEdges]);

  // Pre-build a per-node style object so every <circle> reuses the same
  // reference across renders. Without this each frame would allocate a new
  // `{ fill }` literal per node, defeating React's reconciler diffing.
  const nodeStyles = useMemo(() => {
    if (!colors) return undefined;
    const out: Record<string, { fill: string }> = {};
    for (const [nodeId, color] of Object.entries(colors)) {
      out[nodeId] = { fill: color };
    }
    return out;
  }, [colors]);

  // Memoised once per nodeSize so every <text> element points at the
  // same object literal — keeps the React reconciler happy across the
  // RAF redraw cycle.
  const labelTextStyle = useMemo(
    () => ({
      fontSize: LABEL_BASE_FONT_SIZE * textSize,
      transition: LABEL_TRANSITION,
    }),
    [textSize],
  );

  // RAF loop reads edges from a ref so a new array identity from the
  // consumer doesn't tear down and restart the simulation.
  const edgesRef = useRef(allEdges);
  edgesRef.current = allEdges;
  // Physics tunables are read via refs so changing them never tears down
  // the RAF loop or restarts the simulation.
  const repulsionRef = useRef(repulsion);
  repulsionRef.current = repulsion;
  const linkDistanceRef = useRef(linkDistance);
  linkDistanceRef.current = linkDistance;

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (activeRef.current) {
        const s = sizeRef.current;
        const ns = nodesRef.current;
        step(
          ns,
          byIdRef.current,
          edgesRef.current,
          revealedRef.current,
          s.w,
          s.h,
          repulsionRef.current,
          linkDistanceRef.current,
        );
        // Node group translate (1 attr write/node) + edge endpoints (4/edge).
        // Runs only while the sim is active; a parked graph does zero
        // per-frame DOM work.
        const groups = nodeGroupEls.current;
        for (let i = 0; i < ns.length; i++) {
          const n = ns[i];
          const g = groups.get(n.id);
          if (g) g.setAttribute("transform", `translate(${n.x} ${n.y})`);
        }
        const es = edgesRef.current;
        const byId = byIdRef.current;
        const lines = edgeEls.current;
        for (let i = 0; i < es.length; i++) {
          const e = es[i];
          const l = lines.get(`${e.source}-${e.target}-${i}`);
          if (!l) continue;
          const a = byId.get(e.source);
          const b = byId.get(e.target);
          if (!a || !b) continue;
          l.setAttribute("x1", String(a.x));
          l.setAttribute("y1", String(a.y));
          l.setAttribute("x2", String(b.x));
          l.setAttribute("y2", String(b.y));
        }
        // Park once the cluster has settled and nothing is driving motion, so
        // an at-rest graph stops re-running physics + reconciling its SVG every
        // frame for the life of the page. Checked AFTER step() so a just-
        // released node (velocity 0 at release, force applied this frame) keeps
        // the loop awake until it actually comes to rest. Drag, replay/reseed,
        // and resize re-arm activeRef; the loop resumes within one frame.
        if (draggingIdRef.current === null && revealTimerRef.current === null) {
          const revealed = revealedRef.current;
          let settled = true;
          for (let i = 0; i < ns.length; i++) {
            const n = ns[i];
            if (n.pinned || !revealed.has(n.id)) continue;
            // Bail on the first still-moving node — only the predicate matters.
            if (n.vx * n.vx + n.vy * n.vy >= SETTLE_V2) {
              settled = false;
              break;
            }
          }
          if (settled) activeRef.current = false;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Playback (sequential reveal) state. Default: every node visible.
  // `replay()` empties the set and adds nodes one-by-one in BFS order from
  // the first pinned node; `stop()` cancels and re-fills the set.
  const revealedRef = useRef<Set<string>>(new Set(allNodes.map((n) => n.id)));
  const [, setRevealFrame] = useState(0);
  const revealTimerRef = useRef<number | null>(null);
  const onPlaybackEndRef = useRef(onPlaybackEnd);
  onPlaybackEndRef.current = onPlaybackEnd;

  // BFS order from the first pinned node (root). Unconnected nodes go at
  // the end so they still appear during playback.
  const revealOrder = useMemo(() => {
    const root = allNodes.find((n) => n.pin || n.fixed)?.id ?? allNodes[0]?.id;
    if (!root) return [];
    const order: string[] = [];
    const visited = new Set<string>();
    const queue: string[] = [root];
    while (queue.length > 0) {
      const id = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);
      order.push(id);
      const ns = neighborsOf.get(id);
      if (ns) {
        for (const nb of ns) if (!visited.has(nb)) queue.push(nb);
      }
    }
    for (const n of allNodes) if (!visited.has(n.id)) order.push(n.id);
    return order;
  }, [allNodes, neighborsOf]);

  // Reset revealed set whenever the nodes prop identity changes, aborting
  // any in-progress playback. Also covers component unmount cleanup.
  useEffect(() => {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    revealedRef.current = new Set(allNodes.map((n) => n.id));
    setRevealFrame((f) => f + 1);
    return () => {
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
        revealTimerRef.current = null;
      }
    };
  }, [allNodes]);

  const startReveal = useCallback(() => {
    activeRef.current = true;
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    revealedRef.current = new Set();
    setRevealFrame((f) => f + 1);
    let i = 0;
    const tick = () => {
      if (i >= revealOrder.length) {
        revealTimerRef.current = null;
        onPlaybackEndRef.current?.();
        return;
      }
      revealedRef.current.add(revealOrder[i]);
      i++;
      setRevealFrame((f) => f + 1);
      revealTimerRef.current = window.setTimeout(tick, REVEAL_TICK_MS);
    };
    tick();
  }, [revealOrder]);

  const stopReveal = useCallback(() => {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    revealedRef.current = new Set(allNodes.map((n) => n.id));
    setRevealFrame((f) => f + 1);
  }, [allNodes]);

  useEffect(() => {
    if (reseedKey === 0) return;
    rebuildSim(sizeRef.current.w, sizeRef.current.h);
    // rebuildSim intentionally not in deps — it closes over the latest
    // nodes/edges via render time, which matches the inline reseed path.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reseedKey]);

  // Animate view back to defaults instead of snapping. Used by `fit()`.
  const fitRafRef = useRef<number | null>(null);
  const animateFit = useCallback(() => {
    if (fitRafRef.current !== null) cancelAnimationFrame(fitRafRef.current);
    const start = viewRef.current;
    const target = { zoom: 1, panX: 0, panY: 0 };
    const startTime = performance.now();
    const DURATION = 300;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / DURATION);
      const k = ease(t);
      setView({
        zoom: start.zoom + (target.zoom - start.zoom) * k,
        panX: start.panX + (target.panX - start.panX) * k,
        panY: start.panY + (target.panY - start.panY) * k,
      });
      if (t < 1) {
        fitRafRef.current = requestAnimationFrame(tick);
      } else {
        fitRafRef.current = null;
      }
    };
    fitRafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => {
      if (fitRafRef.current !== null) cancelAnimationFrame(fitRafRef.current);
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      replay: () => {
        setReseedKey((k) => k + 1);
        startReveal();
      },
      stop: stopReveal,
      fit: () => {
        animateFit();
        // Re-seed restores pinned-node positions from the consumer's `nodes`
        // prop, so a dragged pin snaps back to its original ratio.
        setReseedKey((k) => k + 1);
      },
    }),
    [animateFit, startReveal, stopReveal],
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
      activeRef.current = true;
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

  // onNodeClick lives in a ref so `finishDrag` stays referentially stable
  // even when consumers pass an inline arrow — otherwise the window-level
  // pointerup listener would re-register on every parent render.
  const onNodeClickRef = useRef(onNodeClick);
  onNodeClickRef.current = onNodeClick;

  // Shared drag cleanup. Called from pointerup, pointercancel, and the
  // window-level safety listener so a pointer release outside the window
  // can't leave a node stuck to the cursor.
  const finishDrag = useCallback((opts: { fireClick: boolean }) => {
    const id = draggingIdRef.current;
    if (!id) return;
    const node = byIdRef.current.get(id);
    if (node) {
      node.pinned = Boolean(node.fixed || node.pin);
      if (node.pin && pointerMovedRef.current) {
        const s = sizeRef.current;
        node.pin = {
          x: Math.min(1, Math.max(0, node.x / s.w)),
          y: Math.min(1, Math.max(0, node.y / s.h)),
        };
      }
    }
    setDraggingId(null);
    draggingIdRef.current = null;
    if (
      opts.fireClick &&
      !pointerMovedRef.current &&
      onNodeClickRef.current &&
      !id.startsWith(TAG_PREFIX)
    ) {
      onNodeClickRef.current(id);
    }
    pointerStartRef.current = null;
    pointerMovedRef.current = false;
  }, []);

  const handlePointerEnd = (e: React.PointerEvent, fireClick: boolean) => {
    if (draggingId) {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
      finishDrag({ fireClick });
      return;
    }
    panStartRef.current = null;
  };

  const handlePointerUp = (e: React.PointerEvent) =>
    handlePointerEnd(e, true);
  const handlePointerCancel = (e: React.PointerEvent) =>
    handlePointerEnd(e, false);

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

  // Safety net for drag releases that happen outside the window. Browser
  // pointer capture mostly handles this, but releasing past the viewport
  // edge can occasionally swallow pointerup — the node would then stick to
  // the cursor until the next click. Listening on window for pointerup +
  // pointercancel guarantees cleanup.
  useEffect(() => {
    const onAnywhereUp = () => {
      if (draggingIdRef.current) finishDrag({ fireClick: false });
    };
    window.addEventListener("pointerup", onAnywhereUp);
    window.addEventListener("pointercancel", onAnywhereUp);
    return () => {
      window.removeEventListener("pointerup", onAnywhereUp);
      window.removeEventListener("pointercancel", onAnywhereUp);
    };
  }, [finishDrag]);

  // Native listener so we can preventDefault on pinch gestures (Safari/Chrome
  // synthesize wheel events with ctrlKey=true for trackpad pinch — without
  // preventDefault the browser zooms the whole page).
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      if (!scrollZoom) return;
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
  }, [toView, scrollZoom]);

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
        onPointerCancel={handlePointerCancel}
      >
        <g
          transform={`translate(${view.panX} ${view.panY}) scale(${view.zoom})`}
        >
          <g stroke="currentColor" className="text-on-surface-variant">
            {allEdges.map((e, i) => {
              const a = byIdRef.current.get(e.source);
              const b = byIdRef.current.get(e.target);
              if (!a || !b) return null;
              const lit = isEdgeLit(e);
              const visible =
                revealedRef.current.has(e.source) &&
                revealedRef.current.has(e.target);
              const k = `${e.source}-${e.target}-${i}`;
              return (
                <line
                  key={k}
                  ref={(el) => {
                    const m = edgeEls.current;
                    if (el) m.set(k, el);
                    else m.delete(k);
                  }}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  strokeWidth={((lit ? 1.5 : 1) * lineSize) / view.zoom}
                  strokeDasharray={
                    e.dashed ? `${6 / view.zoom} ${4 / view.zoom}` : undefined
                  }
                  strokeOpacity={lit ? 0.7 : 0.15}
                  opacity={visible ? 1 : 0}
                  style={REVEAL_TRANSITION_STYLE}
                />
              );
            })}
          </g>
          <g>
            {nodesRef.current.map((n) => {
              const lit = isLit(n.id);
              const isFocused = n.id === focused;
              const isTagNode = n.id.startsWith(TAG_PREFIX);
              const r =
                (4 + Math.min(n.degree, 6) + (isFocused ? 2 : 0)) * nodeSize;
              const nodeStyle = !isFocused ? nodeStyles?.[n.id] : undefined;
              const circleClass = isTagNode
                ? "fill-none stroke-on-surface-variant"
                : isFocused
                  ? "fill-primary"
                  : nodeStyle
                    ? undefined
                    : "fill-on-surface-variant";
              const revealed = revealedRef.current.has(n.id);
              return (
                <g
                  key={n.id}
                  data-node-id={n.id}
                  ref={(el) => {
                    const m = nodeGroupEls.current;
                    if (el) m.set(n.id, el);
                    else m.delete(n.id);
                  }}
                  transform={`translate(${n.x} ${n.y})`}
                  className="cursor-grab active:cursor-grabbing"
                  onPointerDown={handleNodePointerDown(n.id)}
                  onPointerEnter={() => setHoveredId(n.id)}
                  onPointerLeave={() =>
                    setHoveredId((cur) => (cur === n.id ? null : cur))
                  }
                  opacity={revealed ? (lit ? 1 : 0.2) : 0}
                  style={REVEAL_TRANSITION_STYLE}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={r}
                    className={circleClass}
                    strokeWidth={isTagNode ? 1.25 / view.zoom : undefined}
                    style={isTagNode ? undefined : nodeStyle}
                  />
                  <text
                    x={0}
                    y={r + LABEL_BASE_FONT_SIZE * textSize}
                    textAnchor="middle"
                    className="fill-on-surface-variant pointer-events-none"
                    style={labelTextStyle}
                    opacity={labelOpacity(
                      n.degree,
                      n.pinned,
                      isFocused,
                      hoveredId === n.id,
                      isTagNode,
                      view.zoom,
                      allNodes.length,
                    )}
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
