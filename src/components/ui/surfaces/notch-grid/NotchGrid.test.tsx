import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { NotchGrid } from "./NotchGrid";
import { NotchGridItem } from "./NotchGridItem";

afterEach(cleanup);

/** Each placed item is wrapped in `<div class="absolute" style="left/top">`
 *  (BlockShape's own internal `.absolute` content layer has no `left`). */
const positioned = (container: HTMLElement) =>
  [...container.querySelectorAll<HTMLElement>("div.absolute")]
    .filter((el) => el.style.left !== "")
    .map((el) => ({ left: el.style.left, top: el.style.top }));

describe("NotchGrid", () => {
  it("renders one positioned BlockShape per NotchGridItem child", () => {
    const { container } = render(
      <NotchGrid cols={2} block={50} gap={0}>
        <NotchGridItem shape={[[1]]}>a</NotchGridItem>
        <NotchGridItem shape={[[1]]}>b</NotchGridItem>
        <NotchGridItem shape={[[1]]}>c</NotchGridItem>
      </NotchGrid>,
    );
    expect(positioned(container)).toEqual([
      { left: "0px", top: "0px" },
      { left: "50px", top: "0px" },
      { left: "0px", top: "50px" }, // wrapped to row 1
    ]);
  });

  it("applies `gap` by eroding each item's outline, not by moving items", () => {
    const grid = (gap: number) =>
      render(
        <NotchGrid cols={1} block={100} gap={gap}>
          <NotchGridItem shape={[[1]]}>x</NotchGridItem>
        </NotchGrid>,
      );
    const path = (c: HTMLElement) =>
      c.querySelector("svg path[fill]")!.getAttribute("d")!;

    const a = grid(0);
    const b = grid(20);
    // Same position + footprint either way…
    expect(positioned(a.container)).toEqual(positioned(b.container));
    expect((a.container.querySelector("div.relative") as HTMLElement).style.width).toBe(
      (b.container.querySelector("div.relative") as HTMLElement).style.width,
    );
    // …but the gap=20 outline is the eroded (smaller) one.
    expect(path(a.container)).not.toBe(path(b.container));
  });

  it("honours explicit { col, row } placement", () => {
    const { container } = render(
      <NotchGrid cols={3} block={40} gap={0}>
        <NotchGridItem shape={[[1]]} col={2} row={1}>
          pinned
        </NotchGridItem>
        <NotchGridItem shape={[[1]]}>flow</NotchGridItem>
      </NotchGrid>,
    );
    const pos = positioned(container);
    expect(pos).toContainEqual({ left: "80px", top: "40px" }); // pinned at (2,1)
    expect(pos).toContainEqual({ left: "0px", top: "0px" }); // flow lands at (0,0)
  });

  it("sizes the inner grid box to cols×rows blocks", () => {
    const { container } = render(
      <NotchGrid cols={2} block={50} gap={0}>
        <NotchGridItem shape={[[1]]}>a</NotchGridItem>
        <NotchGridItem shape={[[1]]}>b</NotchGridItem>
        <NotchGridItem shape={[[1]]}>c</NotchGridItem>
      </NotchGrid>,
    );
    const box = container.querySelector("div.relative") as HTMLElement;
    expect(box.style.width).toBe("100px"); // 2 cols × 50
    expect(box.style.height).toBe("100px"); // 2 rows × 50
  });

  it("accepts items via the `items` prop too", () => {
    const { container } = render(
      <NotchGrid cols={4} block={30} items={[{ shape: [[1]] }, { shape: [[1]] }]} />,
    );
    expect(positioned(container)).toHaveLength(2);
  });

  it("renders the content passed to each item", () => {
    const { getByText } = render(
      <NotchGrid cols={2}>
        <NotchGridItem shape={[[1]]}>
          <span>hello grid</span>
        </NotchGridItem>
      </NotchGrid>,
    );
    expect(getByText("hello grid")).toBeInTheDocument();
  });

  it("renders a panel item as positioned sub-item regions", () => {
    const { container, getByText } = render(
      <NotchGrid cols={6} block={40}>
        <NotchGridItem
          subItems={[
            { cost: [2, 2], content: <span>big</span> },
            { cost: [1, 1], content: <span>small</span> },
          ]}
        />
      </NotchGrid>,
    );
    expect(getByText("big")).toBeInTheDocument();
    expect(getByText("small")).toBeInTheDocument();
    // Aims for a square-ish panel: subCols = max(2, ceil(√5)) = 3 ⇒
    // 2×2 at (0,0), 1×1 at (col 2, row 0). Each sub is inset by `gap/2 = 4px`
    // so adjacent ones sit `gap` apart and read as bounded rounded rects.
    const subPositions = positioned(container).map((p) => `${p.left},${p.top}`);
    expect(subPositions).toContain("4px,4px"); // 2×2 sub
    expect(subPositions).toContain("84px,4px"); // 1×1 sub beside it (col 2 × 40 + 4px inset)
  });

  it("resolves a responsive shape to its base variant when width is unmeasured", () => {
    // jsdom has no ResizeObserver / layout, so width stays 0 ⇒ `base`.
    const { container } = render(
      <NotchGrid cols={4} block={20}>
        <NotchGridItem shape={{ base: [[1]], md: [[1, 1], [1, 1]] }}>x</NotchGridItem>
      </NotchGrid>,
    );
    const box = container.querySelector("div.relative") as HTMLElement;
    // base = 1×1 ⇒ grid is at least 4 cols wide (the requested colCount) × 1 row.
    expect(box.style.height).toBe("20px");
  });
});
