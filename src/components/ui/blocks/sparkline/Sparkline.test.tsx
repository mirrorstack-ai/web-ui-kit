import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Sparkline } from "./Sparkline";

afterEach(cleanup);

/** The bar elements are the direct children of the sparkline root (the hover
 *  chip is portaled to <body>, not a child). */
const bars = (container: HTMLElement) =>
  [...(container.firstElementChild?.children ?? [])] as HTMLElement[];

describe("Sparkline", () => {
  it("renders one bar per point, heights clamped to 0–100", () => {
    const { container } = render(<Sparkline data={[10, 50, 130, -5]} />);
    const b = bars(container);
    expect(b).toHaveLength(4);
    expect(b[0].style.height).toBe("10%");
    expect(b[2].style.height).toBe("100%");
    expect(b[3].style.height).toBe("0%");
  });

  it("renders nothing for empty data", () => {
    const { container } = render(<Sparkline data={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("titles each bar with its label, falling back to the value", () => {
    const { container } = render(<Sparkline data={[42, { value: 80, label: "Wk 3 · 920" }]} />);
    const b = bars(container);
    expect(b[0].title).toBe("42");
    expect(b[1].title).toBe("Wk 3 · 920");
    expect(b[1].style.height).toBe("80%");
  });

  it("pops a portaled chip on the hovered bar and clears it on leave", () => {
    const { container } = render(<Sparkline data={[42, { value: 80, label: "Wk 3 · 920" }]} />);
    expect(screen.queryByText("Wk 3 · 920")).toBeNull();
    fireEvent.pointerEnter(bars(container)[1]);
    expect(screen.getByText("Wk 3 · 920")).toBeInTheDocument(); // rendered into <body>
    fireEvent.pointerLeave(container.firstElementChild!);
    expect(screen.queryByText("Wk 3 · 920")).toBeNull();
  });

  it("defaults the line stroke to width 1.5 / opacity 0.6 (0.5 for area)", () => {
    const line = render(<Sparkline data={[1, 2, 3]} variant="line" />).container;
    const stroke = line.querySelector('path[stroke="currentColor"]')!;
    expect(stroke.getAttribute("stroke-width")).toBe("1.5");
    expect(stroke.getAttribute("opacity")).toBe("0.6");

    const area = render(<Sparkline data={[1, 2, 3]} variant="area" />).container;
    expect(
      area.querySelector('path[stroke="currentColor"]')!.getAttribute("opacity"),
    ).toBe("0.5");
  });

  it("applies `strokeWidth` and `opacity` to the line stroke, leaving the area fill alone", () => {
    const { container } = render(
      <Sparkline data={[1, 2, 3]} variant="area" strokeWidth={3} opacity={1} />,
    );
    const stroke = container.querySelector('path[stroke="currentColor"]')!;
    expect(stroke.getAttribute("stroke-width")).toBe("3");
    expect(stroke.getAttribute("opacity")).toBe("1");
    const fill = container.querySelector('path[fill="currentColor"]')!;
    expect(fill.getAttribute("opacity")).toBe("0.15");
  });

  it("swaps `barClassName` for `barActiveClassName` on the hovered bar", () => {
    const { container } = render(
      <Sparkline data={[1, 2, 3]} barClassName="bg-rest" barActiveClassName="bg-active" />,
    );
    expect(bars(container)[1].className).toContain("bg-rest");
    fireEvent.pointerEnter(bars(container)[1]);
    expect(bars(container)[1].className).toContain("bg-active");
    expect(bars(container)[1].className).not.toContain("bg-rest");
  });
});
