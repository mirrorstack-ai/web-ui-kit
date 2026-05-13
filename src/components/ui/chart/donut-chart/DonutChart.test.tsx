import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DonutChart } from "./DonutChart";

afterEach(cleanup);

const DATA = [
  { label: "A", value: 50 },
  { label: "B", value: 30 },
  { label: "C", value: 20 },
];

const segPaths = (el: HTMLElement) => [...el.querySelectorAll("path")];

describe("DonutChart", () => {
  it("renders a track circle plus one segment path per datum", () => {
    const { container } = render(<DonutChart data={DATA} legend={false} />);
    expect(container.querySelectorAll("circle")).toHaveLength(1); // the faint track
    expect(segPaths(container)).toHaveLength(3);
  });

  it("draws each segment as a non-empty arc path", () => {
    const { container } = render(<DonutChart data={DATA} legend={false} />);
    for (const p of segPaths(container)) {
      const d = p.getAttribute("d") ?? "";
      expect(d.startsWith("M")).toBe(true);
      expect(d).toContain("A");
    }
  });

  it("keeps a path slot for a zero-value datum without crashing", () => {
    const { container } = render(<DonutChart data={[{ label: "z", value: 0 }, { label: "y", value: 5 }]} legend={false} />);
    const paths = segPaths(container);
    expect(paths).toHaveLength(2);
    expect(paths[1].getAttribute("d")).toContain("A"); // "y" still drawn
  });

  it("renders the centre label + sub", () => {
    render(<DonutChart data={DATA} centerLabel="100" centerSub="total" legend={false} />);
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("total")).toBeInTheDocument();
  });

  it("renders a legend row (label / value / %) per datum, formatting the value", () => {
    render(<DonutChart data={DATA} formatValue={(v) => `${v}u`} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("50u")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument(); // A = 50/100
    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("pops a portaled hover chip on a segment and clears it on leave", () => {
    const { container } = render(<DonutChart data={DATA} legend={false} />);
    expect(screen.queryByText(/^A · /)).toBeNull();
    fireEvent.pointerEnter(segPaths(container)[0], { clientX: 10, clientY: 10 });
    expect(screen.getByText("A · 50 · 50%")).toBeInTheDocument(); // rendered into <body>
    fireEvent.pointerLeave(container.querySelector("svg")!);
    expect(screen.queryByText(/^A · /)).toBeNull();
  });

  it("renders just the track circle for empty data", () => {
    const { container } = render(<DonutChart data={[]} legend={false} />);
    expect(container.querySelectorAll("circle")).toHaveLength(1);
    expect(segPaths(container)).toHaveLength(0);
  });
});
