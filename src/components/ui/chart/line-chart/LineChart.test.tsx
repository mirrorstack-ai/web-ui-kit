import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LineChart } from "./LineChart";

afterEach(cleanup);

const L5 = ["a", "b", "c", "d", "e"];

describe("LineChart", () => {
  it("renders an svg with a main (no-fill) line path", () => {
    const { container } = render(<LineChart values={[1, 5, 3, 8, 4]} labels={L5} />);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector('path[fill="none"]')).not.toBeNull();
  });

  it("fills the area by default; `showArea={false}` drops the gradient fill", () => {
    const { container, rerender } = render(<LineChart values={[1, 2, 3]} labels={["a", "b", "c"]} />);
    expect(container.querySelector('path[fill^="url("]')).not.toBeNull();
    rerender(<LineChart values={[1, 2, 3]} labels={["a", "b", "c"]} showArea={false} />);
    expect(container.querySelector('path[fill^="url("]')).toBeNull();
  });

  it("draws a dashed threshold line when `thresholdY` is given", () => {
    const { container, rerender } = render(<LineChart values={[1, 2, 3]} labels={["a", "b", "c"]} />);
    expect(container.querySelector("line[stroke-dasharray]")).toBeNull();
    rerender(<LineChart values={[1, 2, 3]} labels={["a", "b", "c"]} thresholdY={2} />);
    expect(container.querySelector("line[stroke-dasharray]")).not.toBeNull();
  });

  it("shows every Nth x-label", () => {
    const { container } = render(<LineChart values={[1, 2, 3, 4, 5]} labels={L5} labelEvery={2} />);
    const xs = [...container.querySelectorAll("text")].map((t) => t.textContent);
    expect(xs).toContain("a");
    expect(xs).toContain("c");
    expect(xs).toContain("e");
    expect(xs).not.toContain("b");
  });

  it("toggles the hover tooltip on mouse move / leave", () => {
    const { container } = render(<LineChart values={[10, 20, 30]} labels={["mon", "tue", "wed"]} />);
    const svg = container.querySelector("svg")!;
    const tip = () => container.querySelector(".pointer-events-none.absolute");
    expect(tip()).toBeNull();
    fireEvent.mouseMove(svg, { clientX: 50, clientY: 5 });
    expect(tip()).not.toBeNull();
    fireEvent.mouseLeave(svg);
    expect(tip()).toBeNull();
  });

  it("renders the overlay's dashed line", () => {
    const { container } = render(
      <LineChart values={[1, 2, 3]} labels={["a", "b", "c"]} overlay={{ values: [3, 2, 1], color: "red", label: "p50" }} />,
    );
    const dashed = [...container.querySelectorAll("path[stroke-dasharray]")];
    expect(dashed.length).toBeGreaterThanOrEqual(1);
  });
});
