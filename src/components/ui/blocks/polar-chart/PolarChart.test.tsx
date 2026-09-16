import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PolarChart } from "./PolarChart";

afterEach(cleanup);

const CENTER = 50;

// A bar is a ring SECTOR with rounded corners (owner: "should start narrow near
// the center and grow wider toward the outer edge … looks like flower petals,
// not a chart"), so what it claims is the radius of its outer arc — the only
// arc in the path drawn anticlockwise, which is how it is picked out here. That
// radius is the number a reader turns back into a value.
const outerArcRadius = (d: string) => {
  const match = /A([\d.]+),[\d.]+ 0 \d 0 /.exec(d);
  if (!match) throw new Error(`no outer arc in path: ${d}`);
  return Number(match[1]);
};

const painted = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("path")).map((path) =>
    outerArcRadius(path.getAttribute("d")!),
  );

// Distance from the centre to a point in the path, for checking the shape
// itself rather than only its reach.
const radiusOfPoint = (x: number, y: number) => Math.hypot(x - CENTER, y - CENTER);

const RATES = [
  { key: "q1", label: "Q1", value: 90 },
  { key: "q2", label: "Q2", value: 45 },
];

describe("PolarChart", () => {
  // 🔴 The structure the owner asked for: a bar is narrow where it starts and
  // wide where it ends, which is what makes lengths comparable round a circle.
  // A constant-width capped stroke — the previous attempt — lost exactly that.
  it("draws a bar that is narrower at the hub than at the rim", () => {
    const { container } = render(
      <PolarChart max={100} data={[{ key: "q", label: "Q", value: 100 }]} legend={false} />,
    );
    const d = container.querySelector("path")!.getAttribute("d")!;
    const points = Array.from(d.matchAll(/(\d+\.\d+),(\d+\.\d+)/g)).map(([, x, y]) =>
      radiusOfPoint(Number(x), Number(y)),
    );
    const inner = Math.min(...points);
    const outer = Math.max(...points);
    // Both edges are arcs at their own radius, and the outer one is longer
    // because it is further out — the sector widens on its way there.
    expect(outer).toBeGreaterThan(inner);
    expect(inner).toBeGreaterThanOrEqual(9);
  });

  it("rounds the corners rather than the whole shape", () => {
    const { container } = render(<PolarChart max={100} data={RATES} legend={false} />);
    const bars = Array.from(container.querySelectorAll("path"));
    expect(bars).toHaveLength(2);
    for (const bar of bars) {
      const d = bar.getAttribute("d")!;
      // Four corner fillets plus the two edges: a petal would have neither the
      // straight radial runs nor four small arcs.
      expect((d.match(/A/g) ?? []).length).toBe(6);
      expect((d.match(/L/g) ?? []).length).toBe(2);
    }
  });

  it("scales bars against an explicit maximum, not against the best category", () => {
    const { container } = render(<PolarChart max={100} data={RATES} legend={false} />);
    const [first, second] = painted(container);
    // 90 reaches further than 45, and neither touches the rim a max-less chart
    // would hand the leader (MAX_RADIUS is 43).
    expect(first).toBeGreaterThan(second);
    expect(first).toBeLessThan(43);
  });

  it("clamps a bar that exceeds max to the rim rather than overflowing the chart", () => {
    const { container } = render(
      <PolarChart max={50} data={[{ key: "q1", label: "Q1", value: 90 }]} legend={false} />,
    );
    expect(painted(container)[0]).toBeCloseTo(43, 1);
  });

  // 🔴 A round CAP paints half its own width past the line it ends, which is
  // why the capped-stroke version had to narrow short bars to stay honest and
  // still drew a 12% bar as a blob. A sector's outer edge simply sits on its
  // value, at any size.
  it("puts a short bar's outer edge exactly on its value", () => {
    const { container } = render(
      <PolarChart
        max={100}
        legend={false}
        data={[
          { key: "big", label: "Big", value: 95 },
          { key: "small", label: "Small", value: 12 },
        ]}
      />,
    );
    const [big, small] = painted(container);
    // 12 of 100 over the hub-to-rim span (9 → 43).
    expect(small).toBeCloseTo(9 + (43 - 9) * 0.12, 1);
    expect(big).toBeCloseTo(9 + (43 - 9) * 0.95, 1);
  });

  it("draws no bar for a zero value and says the series is empty", () => {
    const { container } = render(
      <PolarChart data={[{ key: "q1", label: "Q1", value: 0 }]} emptyLabel="Nothing answered" />,
    );
    expect(container.querySelectorAll("path")).toHaveLength(0);
    expect(screen.getByText("Nothing answered")).toBeInTheDocument();
  });

  it("reads its values out rather than hiding the drawing from assistive tech", () => {
    render(<PolarChart title="Correct rate" max={100} data={RATES} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Correct rate — Q1: 90, Q2: 45",
    );
  });
});

describe("PolarChart measures (63's review of ad-core's block)", () => {
  // 🔴 A ratio's whole is 1, and saying so is better than declaring a ceiling:
  // it gets the scale and the text right together. Without it, ad-core's four
  // placements would each be drawn against the best of themselves — a 0.34%
  // CTR reaching the rim because nothing beat it.
  it("scales a rate against a whole of 1, not against the leading category", () => {
    const { container } = render(
      <PolarChart
        measure="rate"
        legend={false}
        data={[
          { key: "home-top", label: "首頁上方", value: 0.0382 },
          { key: "footer", label: "頁尾", value: 0.0034 },
        ]}
      />,
    );
    // 3.82% of a whole of 1 is a stub: the hub is 9 and the rim 43, so a
    // leader-scaled chart would have put it at 43.
    expect(painted(container)[0]).toBeLessThan(12);
  });

  it("writes a server ratio as the percent an operator reads", () => {
    render(<PolarChart measure="rate" data={[{ key: "a", label: "首頁上方", value: 0.0234 }]} />);
    // The legend value and the rim's own scale label.
    expect(screen.getByText("2.3%")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("still honours an explicit max in the values' own units", () => {
    const { container } = render(
      <PolarChart
        measure="rate"
        max={0.05}
        legend={false}
        data={[{ key: "a", label: "A", value: 0.05 }]}
      />,
    );
    // 0.05 of a 0.05 ceiling is the rim — the units are the data's, never the
    // formatter's.
    expect(painted(container)[0]).toBeCloseTo(43, 1);
  });

  it("falls back to the key when a label is empty", () => {
    render(
      <PolarChart title="CTR" measure="rate" data={[{ key: "ad_7f3", label: "", value: 0.02 }]} />,
    );
    expect(screen.getByText("ad_7f3")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "CTR — ad_7f3: 2%");
  });

  // ad-core's day one again, from the rate side.
  it("draws no bar when every rate is zero", () => {
    const { container } = render(
      <PolarChart
        measure="rate"
        emptyLabel="尚無點擊"
        data={[
          { key: "a", label: "首頁上方", value: 0 },
          { key: "b", label: "頁尾", value: 0 },
        ]}
      />,
    );
    expect(container.querySelectorAll("path")).toHaveLength(0);
    expect(screen.getByText("尚無點擊")).toBeInTheDocument();
  });
});
