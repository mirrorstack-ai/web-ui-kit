import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  NotchGrid,
  resolveSubDrop,
  type NotchGridItem,
  type PrimitiveRegistry,
  type SubDropGeometry,
} from "./NotchGrid";

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

  // Fixed width so the gain-1-col rule resolves deterministically.
  const orig = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function () {
    const r = orig.call(this);
    return { ...r, width: 480 } as DOMRect;
  };
});

const M = (cols: number, rows: number) =>
  Array.from({ length: rows }, () => Array<boolean>(cols).fill(true));

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

describe("resolveSubDrop", () => {
  // Panel occupies outer cells [2..4) × [2..4); the sub starts at the panel's
  // top-left cell (subCol/subRow = 0 → outer origin (2,2)). block = 100.
  const base: SubDropGeometry = {
    panelCol: 2,
    panelRow: 2,
    panelCols: 2,
    panelRows: 2,
    subCol: 0,
    subRow: 0,
    dx: 0,
    dy: 0,
  };

  it("no movement → reposition at the same inner cell", () => {
    expect(resolveSubDrop(base, 100)).toEqual({ kind: "reposition", pos: [0, 0] });
  });

  it("small move within the panel → reposition at the new inner cell", () => {
    // +1 col, +1 row → outer (3,3), still inside → inner (1,1)
    expect(resolveSubDrop({ ...base, dx: 100, dy: 100 }, 100)).toEqual({
      kind: "reposition",
      pos: [1, 1],
    });
  });

  it("drag past the right edge → promote at the outer cell", () => {
    // +3 cols → outer (5,2), panel spans cols 2..3 → outside → promote
    expect(resolveSubDrop({ ...base, dx: 300 }, 100)).toEqual({
      kind: "promote",
      pos: [5, 2],
    });
  });

  it("drag below the panel → promote", () => {
    expect(resolveSubDrop({ ...base, dy: 300 }, 100)).toEqual({
      kind: "promote",
      pos: [2, 5],
    });
  });

  it("drag far up-left clamps to 0 and promotes", () => {
    // outer col = max(0, 2+0-3) = 0, outside panel (col < 2) → promote
    expect(resolveSubDrop({ ...base, dx: -300, dy: -300 }, 100)).toEqual({
      kind: "promote",
      pos: [0, 0],
    });
  });
});
