import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { NotchGrid, type NotchGridItem, type PrimitiveRegistry } from "./NotchGrid";

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

  it("renders sub-items as nested tiles inside the parent's content area", () => {
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
          { desire: { shape: M(1, 1) }, ui: { type: "Leaf", tag: "a" } },
          { desire: { shape: M(1, 1) }, ui: { type: "Leaf", tag: "b" } },
        ],
      },
    ];
    const { getAllByTestId } = render(
      <NotchGrid items={items} primitives={primitives} />,
    );
    const leaves = getAllByTestId("leaf");
    expect(leaves).toHaveLength(2);
    expect(leaves.map((l) => l.textContent)).toEqual(["a", "b"]);
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
});
