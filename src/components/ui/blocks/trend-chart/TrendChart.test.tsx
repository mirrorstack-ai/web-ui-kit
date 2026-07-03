import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { TrendChart } from "./TrendChart";

afterEach(cleanup);

// jsdom doesn't ship ResizeObserver, and the hover math needs a real,
// deterministic bounding rect — stub both the same way NotchGrid.test.tsx does.
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

  Element.prototype.getBoundingClientRect = function () {
    return { x: 0, y: 0, top: 0, left: 0, right: 400, bottom: 140, width: 400, height: 140, toJSON() {} } as DOMRect;
  };
});

const VALUES = [10, 40, 30, 60, 50, 80];
const LABELS = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];

describe("TrendChart", () => {
  it("renders the main line and area fill", () => {
    const { container } = render(
      <TrendChart values={VALUES} labels={LABELS} color="text-primary" fillId="t1" />,
    );
    expect(container.querySelector('path[stroke="currentColor"]')).toBeInTheDocument();
    expect(container.querySelector('path[fill="url(#t1)"]')).toBeInTheDocument();
  });

  it("omits the area fill when showArea is false", () => {
    const { container } = render(
      <TrendChart values={VALUES} labels={LABELS} color="text-primary" fillId="t2" showArea={false} />,
    );
    expect(container.querySelector('path[fill="url(#t2)"]')).not.toBeInTheDocument();
  });

  it("renders an empty frame instead of throwing when values.length < 2", () => {
    expect(() =>
      render(<TrendChart values={[1]} labels={["only"]} color="text-primary" fillId="t3" />),
    ).not.toThrow();
    expect(() =>
      render(<TrendChart values={[]} labels={[]} color="text-primary" fillId="t4" />),
    ).not.toThrow();
  });

  it("renders x-axis labels every labelEvery-th tick by default, and omits them when showXAxisLabels is false", () => {
    const { container: withLabels } = render(
      <TrendChart values={VALUES} labels={LABELS} color="text-primary" fillId="t5" labelEvery={2} />,
    );
    expect(withLabels.textContent).toContain("00:00");
    expect(withLabels.textContent).toContain("08:00");
    expect(withLabels.textContent).not.toContain("04:00");

    const { container: withoutLabels } = render(
      <TrendChart values={VALUES} labels={LABELS} color="text-primary" fillId="t6" showXAxisLabels={false} />,
    );
    expect(withoutLabels.textContent).not.toContain("00:00");
  });

  it("draws a dashed threshold line, gating the red shading behind showArea", () => {
    const { container: withArea } = render(
      <TrendChart values={VALUES} labels={LABELS} color="text-primary" fillId="t7" thresholdY={50} />,
    );
    expect(withArea.querySelector('line[stroke-dasharray="4 3"]')).toBeInTheDocument();
    expect(withArea.querySelector('rect[fill="url(#t7-threshold)"]')).toBeInTheDocument();

    const { container: noArea } = render(
      <TrendChart
        values={VALUES}
        labels={LABELS}
        color="text-primary"
        fillId="t8"
        thresholdY={50}
        showArea={false}
      />,
    );
    expect(noArea.querySelector('line[stroke-dasharray="4 3"]')).toBeInTheDocument();
    expect(noArea.querySelector('rect[fill="url(#t8-threshold)"]')).not.toBeInTheDocument();
  });

  it("renders one dashed overlay per entry, each with its own color class", () => {
    const { container } = render(
      <TrendChart
        values={VALUES}
        labels={LABELS}
        color="text-primary"
        fillId="t9"
        overlays={[
          { values: [5, 20, 15, 30, 25, 40], color: "text-secondary", label: "p50" },
          { values: [1, 2, 3, 2, 1, 2], color: "text-error", label: "5xx", fixedMax: 10, unit: "%" },
        ]}
      />,
    );
    const overlayPaths = container.querySelectorAll('path[stroke-dasharray="4 3"]');
    expect(overlayPaths).toHaveLength(2);
    expect(overlayPaths[0]).toHaveClass("text-secondary");
    expect(overlayPaths[1]).toHaveClass("text-error");
  });

  it("shows a tooltip on hover with the main value and each overlay's own unit", () => {
    const { container } = render(
      <TrendChart
        values={VALUES}
        labels={LABELS}
        color="text-primary"
        unit="ms"
        fillId="t10"
        overlays={[{ values: [5, 20, 15, 30, 25, 40], color: "text-secondary", label: "p50", fixedMax: 100, unit: "%" }]}
      />,
    );
    const svg = container.querySelector("svg")!;
    fireEvent.mouseMove(svg, { clientX: 200 });
    expect(screen.getByText(LABELS[2])).toBeInTheDocument();
    expect(screen.getByText(/p50:/)).toHaveTextContent("%");
    fireEvent.mouseLeave(svg);
    expect(screen.queryByText(/p50:/)).not.toBeInTheDocument();
  });

  it("falls back overlay unit to the chart's own unit when the overlay omits it", () => {
    const { container } = render(
      <TrendChart
        values={VALUES}
        labels={LABELS}
        color="text-primary"
        unit="ms"
        fillId="t11"
        overlays={[{ values: [5, 20, 15, 30, 25, 40], color: "text-secondary", label: "p99", fixedMax: 100 }]}
      />,
    );
    fireEvent.mouseMove(container.querySelector("svg")!, { clientX: 200 });
    expect(screen.getByText(/p99:/)).toHaveTextContent("ms");
  });

  it("uses a generated gradient id when fillId is omitted", () => {
    const { container } = render(<TrendChart values={VALUES} labels={LABELS} color="text-primary" />);
    const gradient = container.querySelector("linearGradient")!;
    expect(gradient.id).toMatch(/^trend-chart-/);
  });
});
