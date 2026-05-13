import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BarChart } from "./BarChart";

afterEach(cleanup);

const DATA = [
  { label: "a", value: 10 },
  { label: "b", value: 30 },
  { label: "c", value: 20 },
];

describe("BarChart", () => {
  it("renders one bar (with a title) per datum", () => {
    const { container } = render(<BarChart data={DATA} />);
    const rects = [...container.querySelectorAll("rect")];
    expect(rects).toHaveLength(3);
    expect(rects[1].querySelector("title")?.textContent).toBe("b: 30");
  });

  it("renders the x-axis label for each datum", () => {
    const { container } = render(<BarChart data={DATA} />);
    const texts = [...container.querySelectorAll("text")].map((t) => t.textContent);
    expect(texts).toEqual(expect.arrayContaining(["a", "b", "c"]));
  });

  it("highlights the last bar by default; `highlightIndex` overrides it; `-1` highlights none", () => {
    const fills = (data: typeof DATA, hi?: number) => {
      const { container } = render(<BarChart data={data} highlightIndex={hi} />);
      // the highlighted bar gets `fill="url(...)"`, others a plain colour
      return [...container.querySelectorAll("rect")].map((r) => r.getAttribute("fill")?.startsWith("url("));
    };
    expect(fills(DATA)).toEqual([false, false, true]); // default = last
    cleanup();
    expect(fills(DATA, 0)).toEqual([true, false, false]);
    cleanup();
    expect(fills(DATA, -1)).toEqual([false, false, false]);
  });

  it("prefixes / rounds the Y-axis ticks", () => {
    const { container } = render(<BarChart data={[{ label: "x", value: 50 }]} unitPrefix="$" precision={2} />);
    const texts = [...container.querySelectorAll("text")].map((t) => t.textContent);
    // max = 50 * 1.2 = 60 ⇒ ticks at 0, 30, 60 → "$0.00", "$30.00", "$60.00"
    expect(texts).toEqual(expect.arrayContaining(["$0.00", "$30.00", "$60.00"]));
  });

  it("pops a portaled chip on the hovered bar and clears it on leave", () => {
    const { container } = render(<BarChart data={DATA} unitPrefix="$" />);
    const rects = [...container.querySelectorAll("rect")];
    expect(screen.queryByText("b · $30")).toBeNull();
    fireEvent.pointerEnter(rects[1]);
    expect(screen.getByText("b · $30")).toBeInTheDocument(); // rendered into <body>
    fireEvent.pointerLeave(container.querySelector("svg")!);
    expect(screen.queryByText("b · $30")).toBeNull();
  });

  it("renders nothing weird for empty data (just the axis)", () => {
    const { container } = render(<BarChart data={[]} />);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelectorAll("rect")).toHaveLength(0);
  });
});
