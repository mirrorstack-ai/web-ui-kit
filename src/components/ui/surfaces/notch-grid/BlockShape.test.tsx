import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BlockShape, BLOCK_SIZE } from "./BlockShape";

afterEach(cleanup);

const SHAPE = [
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 0],
];

describe("BlockShape", () => {
  it("sizes the wrapper to cols×rows blocks", () => {
    const { container } = render(<BlockShape shape={SHAPE} block={50} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.width).toBe(`${4 * 50}px`);
    expect(root.style.height).toBe(`${3 * 50}px`);
  });

  it("defaults the block size to BLOCK_SIZE (96px)", () => {
    const { container } = render(<BlockShape shape={[[1]]} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.width).toBe(`${BLOCK_SIZE}px`);
    expect(BLOCK_SIZE).toBe(96);
  });

  it("renders an SVG outline path", () => {
    const { container } = render(<BlockShape shape={SHAPE} />);
    const path = container.querySelector("svg path[fill]");
    expect(path).not.toBeNull();
    expect(path!.getAttribute("d")!.startsWith("M ")).toBe(true);
    expect(path!.getAttribute("fill-rule")).toBe("evenodd");
  });

  it("grows the shape with the tier — a tier-2 cell is empty at tier 1", () => {
    const tiered = [
      [1, 2],
      [1, 1],
    ];
    const { container: c1 } = render(<BlockShape shape={tiered} tier={1} block={40} />);
    const { container: c2 } = render(<BlockShape shape={tiered} tier={2} block={40} />);
    const d1 = c1.querySelector("svg path[fill]")!.getAttribute("d")!;
    const d2 = c2.querySelector("svg path[fill]")!.getAttribute("d")!;
    // tier 1 = an L-shape (6 corners); tier 2 = a full 2×2 square (4 corners).
    expect((d1.match(/ A /g) ?? []).length).toBe(6);
    expect((d2.match(/ A /g) ?? []).length).toBe(4);
  });

  it("renders content on top of the shape", () => {
    const { getByText } = render(
      <BlockShape shape={[[1]]}>
        <span>hello</span>
      </BlockShape>,
    );
    expect(getByText("hello")).toBeInTheDocument();
  });

  it("clips the content layer to the outline by default; noClip removes it", () => {
    const { container, rerender } = render(<BlockShape shape={[[1]]}>x</BlockShape>);
    const content = () =>
      (container.firstElementChild as HTMLElement).lastElementChild as HTMLElement;
    expect(content().style.clipPath).toMatch(/^url\(#block-shape-clip-/);
    rerender(
      <BlockShape shape={[[1]]} noClip>
        x
      </BlockShape>,
    );
    expect(content().style.clipPath).toBe("");
  });
});
