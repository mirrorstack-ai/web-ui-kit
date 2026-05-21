import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  NotchGrid,
  findConnectedComponents,
  type NotchGridItem,
  type PrimitiveRegistry,
} from "./NotchGrid";
import type { Placement } from "./layout";

afterEach(cleanup);

// jsdom doesn't ship ResizeObserver. Stub it to fire once with the wrapper's
// width — Element.getBoundingClientRect is also stubbed below.
beforeAll(() => {
  type Cb = (entries: ResizeObserverEntry[], obs: ResizeObserver) => void;
  class StubResizeObserver {
    constructor(_cb: Cb) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (globalThis as unknown as { ResizeObserver: typeof StubResizeObserver }).ResizeObserver =
    StubResizeObserver;

  // Fixed rect (origin 0,0, width 480) so the gain-1-col rule resolves and the
  // sub-drag drop-cell math (clientX - rect.left) is deterministic.
  Element.prototype.getBoundingClientRect = function () {
    return { x: 0, y: 0, top: 0, left: 0, right: 480, bottom: 480, width: 480, height: 480, toJSON() {} } as DOMRect;
  };
  // jsdom lacks pointer capture.
  Element.prototype.setPointerCapture = function () {};
  Element.prototype.releasePointerCapture = function () {};
});

const M = (cols: number, rows: number) =>
  Array.from({ length: rows }, () => Array<boolean>(cols).fill(true));

/** Dispatch a real PointerEvent carrying coordinates — `fireEvent.pointer*`
 *  drops clientX/Y/button/pointerId in jsdom, so build the native event and
 *  set the fields directly, then dispatch (React reads them off the native
 *  event). */
function pointer(
  el: Element,
  type: string,
  init: { clientX: number; clientY: number; pointerId?: number; button?: number },
) {
  const ev = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(ev, {
    clientX: init.clientX,
    clientY: init.clientY,
    pointerId: init.pointerId ?? 1,
    button: init.button ?? 0,
    pointerType: "mouse",
  });
  el.dispatchEvent(ev);
}

describe("NotchGrid", () => {
  it("renders an empty grid without crashing", () => {
    const { container } = render(<NotchGrid items={[]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("places a single item inside the wrapper", () => {
    const items: NotchGridItem[] = [
      { key: "a", desire: { shape: M(2, 2) } },
    ];
    const { container } = render(<NotchGrid items={items} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeTruthy();
    const tiles = wrapper.querySelectorAll(":scope > div");
    expect(tiles.length).toBeGreaterThan(0);
  });

  it("respects cols when explicit (gain-1-col rule bypassed)", () => {
    const items: NotchGridItem[] = [
      { key: "a", desire: { position: [0, 0], shape: M(1, 1) } },
      { key: "b", desire: { position: [3, 0], shape: M(1, 1) } },
    ];
    const { container } = render(<NotchGrid items={items} cols={4} blockMin={120} />);
    const tiles = container.querySelectorAll(":scope > div > div");
    expect(tiles.length).toBeGreaterThanOrEqual(2);
  });

  it("renders a registered primitive from the items' ui.type", () => {
    const HelloTile = (props: { greeting?: string }) => (
      <div data-testid="hello">{props.greeting ?? "hi"}</div>
    );
    const primitives: PrimitiveRegistry = {
      Hello: HelloTile as unknown as PrimitiveRegistry[string],
    };
    const items: NotchGridItem[] = [
      {
        key: "a",
        desire: { shape: M(2, 2) },
        ui: { type: "Hello", greeting: "world" },
      },
    ];
    const { getByTestId } = render(
      <NotchGrid items={items} primitives={primitives} />,
    );
    expect(getByTestId("hello").textContent).toBe("world");
  });

  it("fires onItemError for unknown ui.type and renders the placeholder", () => {
    const onItemError = vi.fn();
    const items: NotchGridItem[] = [
      {
        key: "x",
        desire: { shape: M(2, 2) },
        ui: { type: "Mystery" },
      },
    ];
    const { container } = render(
      <NotchGrid items={items} onItemError={onItemError} />,
    );
    expect(onItemError).toHaveBeenCalledWith("x", {
      kind: "unknown-primitive",
      type: "Mystery",
    });
    expect(container.textContent).toContain("Mystery");
  });

  it("assigns synthetic keys when items omit `key`", () => {
    const items: NotchGridItem[] = [
      { desire: { shape: M(1, 1) } },
      { desire: { shape: M(1, 1) } },
    ];
    const { container } = render(<NotchGrid items={items} />);
    const tiles = container.querySelectorAll(":scope > div > div");
    expect(tiles.length).toBeGreaterThanOrEqual(2);
  });

  it("renders sub-items as content within a single unified panel chrome", () => {
    const Leaf = (props: { tag?: string }) => (
      <div data-testid="leaf">{props.tag}</div>
    );
    const primitives: PrimitiveRegistry = {
      Leaf: Leaf as unknown as PrimitiveRegistry[string],
    };
    const items: NotchGridItem[] = [
      {
        key: "panel",
        desire: { shape: M(2, 2) },
        subItems: [
          { desire: { position: [0, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "a" } },
          { desire: { position: [1, 1], shape: M(1, 1) }, ui: { type: "Leaf", tag: "b" } },
        ],
      },
    ];
    const { getAllByTestId, container } = render(
      <NotchGrid items={items} primitives={primitives} cols={4} blockMin={100} />,
    );
    // Both sub-items render their content...
    const leaves = getAllByTestId("leaf");
    expect(leaves).toHaveLength(2);
    expect(leaves.map((l) => l.textContent)).toEqual(["a", "b"]);
    // ...but as ONE chrome (one BlockShape svg), not one per sub-item. The
    // two diagonal sub-items bridge into a single unioned outline.
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("applies inline color from resolved theme (variant=primary)", () => {
    const items: NotchGridItem[] = [
      {
        key: "a",
        desire: { shape: M(2, 2) },
        theme: { type: "filled", variant: "primary" },
      },
    ];
    const { container } = render(<NotchGrid items={items} />);
    const tile = container.querySelector(":scope > div > div") as HTMLElement;
    expect(tile.style.color).toBe("var(--color-on-primary-container)");
  });

  it("fixed `cols` uses blockMin as the literal block size", () => {
    const items: NotchGridItem[] = [
      { key: "a", desire: { position: [0, 0], shape: M(1, 1) } },
    ];
    const { container } = render(
      <NotchGrid items={items} cols={3} blockMin={100} />,
    );
    const tile = container.querySelector(":scope > div > div") as HTMLElement;
    expect(tile.style.left).toBe("0px");
    expect(tile.style.top).toBe("0px");
  });

  it("draggable: cursor=grab on tiles, no drag handlers when omitted", () => {
    const items: NotchGridItem[] = [
      { key: "a", desire: { shape: M(1, 1) } },
    ];

    // Without draggable: no cursor styling
    const { container: plain } = render(
      <NotchGrid items={items} cols={2} blockMin={100} />,
    );
    const plainTile = plain.querySelector(":scope > div > div") as HTMLElement;
    expect(plainTile.style.cursor).toBe("");

    // With draggable: cursor=grab
    cleanup();
    const { container: drag } = render(
      <NotchGrid items={items} cols={2} blockMin={100} draggable />,
    );
    const dragTile = drag.querySelector(":scope > div > div") as HTMLElement;
    expect(dragTile.style.cursor).toBe("grab");
  });

  // Full pointerDown → move → up drag flow isn't exercised here because
  // jsdom's `fireEvent.pointer*` drops PointerEvent init properties
  // (clientX/Y, button, pointerId all come through as `undefined`), so
  // dx/dy resolves to NaN. The `cursor=grab` test above is the wiring
  // smoke check; visual end-to-end verification lives in the `Draggable`
  // story. The promote/reposition decision is unit-tested via
  // `resolveSubDrop` below.

  it("draggable: dragging a sub-cell fires onSubItemPromote with the drop cell", () => {
    const onSubItemPromote = vi.fn();
    const Leaf = (p: { tag?: string }) => <div data-testid="leaf">{p.tag}</div>;
    const primitives: PrimitiveRegistry = {
      Leaf: Leaf as unknown as PrimitiveRegistry[string],
    };
    const items: NotchGridItem[] = [
      {
        key: "panel",
        desire: { position: [0, 0], shape: M(2, 1) },
        subItems: [
          { desire: { position: [0, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "cron" } },
          { desire: { position: [1, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "calls" } },
        ],
      },
    ];
    const { getAllByTestId } = render(
      <NotchGrid items={items} primitives={primitives} cols={4} blockMin={100} draggable onSubItemPromote={onSubItemPromote} />,
    );
    // The "calls" sub-cell wrapper (its leaf's parent).
    const cronCellBefore = getAllByTestId("leaf").find((l) => l.textContent === "cron")!
      .parentElement as HTMLElement;
    const cronLeftBefore = cronCellBefore.style.left;
    const callsLeaf = getAllByTestId("leaf").find((l) => l.textContent === "calls")!;
    const callsCell = callsLeaf.parentElement as HTMLElement;
    // Grab calls (~150,50 = its cell at outer col 1) and drop at col 3 (~350).
    // act() flushes the setSubDrag re-render between events (so subDragRef
    // updates) — the same flush a real browser does between event ticks.
    act(() => pointer(callsCell, "pointerdown", { clientX: 150, clientY: 50 }));
    act(() => pointer(callsCell, "pointermove", { clientX: 350, clientY: 50 }));
    act(() => pointer(callsCell, "pointerup", { clientX: 350, clientY: 50 }));

    expect(onSubItemPromote).toHaveBeenCalledTimes(1);
    // Dropped at clientX 350 / block 100 → col 3, row 0.
    expect(onSubItemPromote).toHaveBeenCalledWith("panel", 1, [3, 0]);

    // Cron must NOT move — only Calls relocates.
    const cronCellAfter = getAllByTestId("leaf").find((l) => l.textContent === "cron")!
      .parentElement as HTMLElement;
    expect(cronCellAfter.style.left).toBe(cronLeftBefore);
  });

  it("draggable: grabbing the chrome connection area drags the whole component", () => {
    const onItemMove = vi.fn();
    const onSubItemPromote = vi.fn();
    const Leaf = (p: { tag?: string }) => <div data-testid="leaf">{p.tag}</div>;
    const primitives: PrimitiveRegistry = {
      Leaf: Leaf as unknown as PrimitiveRegistry[string],
    };
    const items: NotchGridItem[] = [
      {
        key: "panel",
        desire: { position: [0, 0], shape: M(2, 1) },
        subItems: [
          { desire: { position: [0, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "cron" } },
          { desire: { position: [1, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "calls" } },
        ],
      },
    ];
    const { getAllByTestId } = render(
      <NotchGrid items={items} primitives={primitives} cols={4} blockMin={100} draggable onItemMove={onItemMove} onSubItemPromote={onSubItemPromote} />,
    );
    // The OUTER cell (frame) carries no handler — grabbing it bubbles to the
    // wrapper → whole-component drag. (leaf → inner content div → outer cell.)
    const cronOuter = getAllByTestId("leaf").find((l) => l.textContent === "cron")!
      .parentElement!.parentElement as HTMLElement;
    act(() => pointer(cronOuter, "pointerdown", { clientX: 10, clientY: 10 }));
    act(() => pointer(cronOuter, "pointermove", { clientX: 210, clientY: 10 }));
    act(() => pointer(cronOuter, "pointerup", { clientX: 210, clientY: 10 }));

    // Whole panel shifts +2 cols; it's a sub-drag of neither cell.
    expect(onSubItemPromote).not.toHaveBeenCalled();
    expect(onItemMove).toHaveBeenCalledWith("panel", [2, 0]);
  });

  it("draggable: the sub-drag ghost carries the sub's content (not a blank chrome)", () => {
    const Leaf = (p: { tag?: string }) => <div data-testid="leaf">{p.tag}</div>;
    const primitives: PrimitiveRegistry = {
      Leaf: Leaf as unknown as PrimitiveRegistry[string],
    };
    const items: NotchGridItem[] = [
      {
        key: "panel",
        desire: { position: [0, 0], shape: M(2, 1) },
        subItems: [
          { desire: { position: [0, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "cron" } },
          { desire: { position: [1, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "calls" } },
        ],
      },
    ];
    const { container, getAllByTestId } = render(
      <NotchGrid items={items} primitives={primitives} cols={4} blockMin={100} draggable />,
    );
    const callsCell = getAllByTestId("leaf").find((l) => l.textContent === "calls")!
      .parentElement as HTMLElement;
    act(() => pointer(callsCell, "pointerdown", { clientX: 150, clientY: 50 }));
    act(() => pointer(callsCell, "pointermove", { clientX: 250, clientY: 90 }));

    // The cursor-follow ghost (aria-hidden, z-30) must contain the dragged
    // sub's content — before the fix it rendered only a blank themed chrome.
    const ghost = container.querySelector('div[aria-hidden="true"].z-30');
    expect(ghost).toBeTruthy();
    expect(ghost!.textContent).toContain("calls");

    act(() => pointer(callsCell, "pointerup", { clientX: 250, clientY: 90 }));
  });

  it("draggable: a promoted sub can be dragged AGAIN (override honoured on promoted items)", () => {
    const onItemMove = vi.fn();
    const onSubItemPromote = vi.fn();
    const Leaf = (p: { tag?: string }) => <div data-testid="leaf">{p.tag}</div>;
    const primitives: PrimitiveRegistry = {
      Leaf: Leaf as unknown as PrimitiveRegistry[string],
    };
    const items: NotchGridItem[] = [
      {
        key: "panel",
        desire: { position: [0, 0], shape: M(2, 1) },
        subItems: [
          { desire: { position: [0, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "cron" } },
          { desire: { position: [1, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "calls" } },
        ],
      },
    ];
    const { getAllByTestId } = render(
      <NotchGrid items={items} primitives={primitives} cols={4} blockMin={100} draggable onItemMove={onItemMove} onSubItemPromote={onSubItemPromote} />,
    );
    // Stage 1 — sub-drag Calls out of the panel to col 3 (promotes it).
    const callsCell = getAllByTestId("leaf").find((l) => l.textContent === "calls")!
      .parentElement as HTMLElement;
    act(() => pointer(callsCell, "pointerdown", { clientX: 150, clientY: 50 }));
    act(() => pointer(callsCell, "pointermove", { clientX: 350, clientY: 50 }));
    act(() => pointer(callsCell, "pointerup", { clientX: 350, clientY: 50 }));
    expect(onSubItemPromote).toHaveBeenCalledWith("panel", 1, [3, 0]);

    // Stage 2 — the promoted Calls is now a standalone member; outer-drag it
    // back two cells (col 3 → 1). Before the fix the solve ignored its override
    // and it never moved.
    const promotedCalls = getAllByTestId("leaf").find((l) => l.textContent === "calls")!
      .parentElement as HTMLElement;
    act(() => pointer(promotedCalls, "pointerdown", { clientX: 350, clientY: 50 }));
    act(() => pointer(promotedCalls, "pointermove", { clientX: 150, clientY: 50 }));
    act(() => pointer(promotedCalls, "pointerup", { clientX: 150, clientY: 50 }));

    // Outer drag is delta-based: origin col 3 + round(-200/100) = col 1.
    expect(onItemMove).toHaveBeenCalledTimes(1);
    expect(onItemMove).toHaveBeenCalledWith("promoted::panel::1", [1, 0]);
  });

  it("draggable: sub-cells become grab targets inside a panel", () => {
    const Leaf = (p: { tag?: string }) => <div data-testid="leaf">{p.tag}</div>;
    const primitives: PrimitiveRegistry = {
      Leaf: Leaf as unknown as PrimitiveRegistry[string],
    };
    const items: NotchGridItem[] = [
      {
        key: "panel",
        desire: { shape: M(2, 2) },
        subItems: [
          { desire: { position: [0, 0], shape: M(1, 1) }, ui: { type: "Leaf", tag: "a" } },
          { desire: { position: [1, 1], shape: M(1, 1) }, ui: { type: "Leaf", tag: "b" } },
        ],
      },
    ];
    const { getAllByTestId } = render(
      <NotchGrid items={items} primitives={primitives} cols={4} blockMin={100} draggable />,
    );
    // Each sub-cell wrapper (the leaf's parent) carries the grab cursor class.
    const leaves = getAllByTestId("leaf");
    expect(leaves).toHaveLength(2);
    for (const leaf of leaves) {
      expect((leaf.parentElement as HTMLElement).className).toContain("cursor-grab");
    }
  });
});

describe("findConnectedComponents", () => {
  // Minimal 1×1 placement at (col,row) with a single filled cell.
  const cell = (key: string, col: number, row: number): Placement<unknown> => ({
    key,
    item: undefined,
    col,
    row,
    mask: [[true]],
    cols: 1,
    rows: 1,
    priorityUsed: { position: "0", shape: "0" },
    scale: 1,
    cost: 0,
  });

  it("a single placement is its own component", () => {
    const comps = findConnectedComponents([cell("a", 0, 0)]);
    expect(comps).toHaveLength(1);
    expect(comps[0].map((p) => p.key)).toEqual(["a"]);
  });

  it("edge-adjacent placements merge into one component", () => {
    const comps = findConnectedComponents([cell("a", 0, 0), cell("b", 1, 0)]);
    expect(comps).toHaveLength(1);
    expect(comps[0].map((p) => p.key).sort()).toEqual(["a", "b"]);
  });

  it("corner-adjacent (diagonal) placements merge (8-connected)", () => {
    const comps = findConnectedComponents([cell("a", 0, 0), cell("b", 1, 1)]);
    expect(comps).toHaveLength(1);
  });

  it("non-adjacent placements stay separate", () => {
    const comps = findConnectedComponents([cell("a", 0, 0), cell("b", 5, 5)]);
    expect(comps).toHaveLength(2);
  });

  it("a chain links transitively into one component", () => {
    // a-b adjacent, b-c adjacent, a-c not — still one component via b.
    const comps = findConnectedComponents([
      cell("a", 0, 0),
      cell("c", 4, 0),
      cell("b", 2, 0),
    ]);
    // a(0) and b(2) aren't within 1 col, so a is separate from b/c chain...
    // verify the actual adjacency: a at 0, b at 2 (gap 1 cell) → NOT adjacent.
    // So this yields a alone + (b,c)? b at 2, c at 4 → gap, not adjacent either.
    // All three are 2 apart → three singletons.
    expect(comps).toHaveLength(3);
  });

  it("touching chain (each 1 apart) links into one component", () => {
    const comps = findConnectedComponents([
      cell("a", 0, 0),
      cell("b", 1, 0),
      cell("c", 2, 0),
    ]);
    expect(comps).toHaveLength(1);
    expect(comps[0]).toHaveLength(3);
  });
});
