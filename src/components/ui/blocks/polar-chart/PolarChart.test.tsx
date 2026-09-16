import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PolarChart } from "./PolarChart";

afterEach(cleanup);

const CENTER = 50;

// A bar is a ring SECTOR whose corners are rounded by SVG's own round line
// JOIN: the path is the sector INSET by the corner radius, and the stroke grows
// it back. So what the bar claims is its inset outer arc plus half that stroke
// — the painted edge, which is the number a reader turns back into a value.
// Read the two edge radii by SIZE, not by the order or sweep flag they happen
// to be drawn in — those are the geometry's business and have already changed
// twice under tests that asserted on them.
const arcRadii = (d: string) =>
  Array.from(d.matchAll(/A([\d.]+),[\d.]+ /g)).map(([, radius]) => Number(radius));

const painted = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("path")).map((path) => {
    const radii = arcRadii(path.getAttribute("d")!);
    if (radii.length === 0) throw new Error(`no arcs in path: ${path.getAttribute("d")}`);
    return Math.max(...radii) + Number(path.getAttribute("stroke-width") ?? 0) / 2;
  });

const RATES = [
  { key: "q1", label: "Q1", value: 90 },
  { key: "q2", label: "Q2", value: 45 },
];

describe("PolarChart", () => {
  // 🔴 The structure the owner asked for: a bar is narrow where it starts and
  // wide where it ends, which is what makes lengths comparable round a circle.
  // A constant-width capped stroke — an earlier attempt — lost exactly that.
  it("draws a bar that is narrower at the hub than at the rim", () => {
    const { container } = render(
      <PolarChart max={100} data={[{ key: "q", label: "Q", value: 100 }]} legend={false} />,
    );
    const arcs = arcRadii(container.querySelector("path")!.getAttribute("d")!);
    const outer = Math.max(...arcs);
    const inner = Math.min(...arcs);
    // Two arcs at two radii, and the outer one is longer because it is further
    // out — the sector widens on its way there.
    expect(outer).toBeGreaterThan(inner);
  });

  // 🔴 The corners are rounded by the RENDERER's join, not by fillets computed
  // here. The fillet version shipped with a spike on every corner, because its
  // angular inset used `corner / radius` where tangency needs
  // `asin(corner / (radius + corner))` — off by a fraction of a degree, enough
  // that each arc met its edge at an angle instead of tangentially. A join
  // cannot be off-tangent.
  it("rounds the corners with a round join, in the bar's own colour", () => {
    const { container } = render(<PolarChart max={100} data={RATES} legend={false} />);
    const bars = Array.from(container.querySelectorAll("path"));
    expect(bars).toHaveLength(2);
    for (const bar of bars) {
      expect(bar).toHaveAttribute("stroke-linejoin", "round");
      expect(Number(bar.getAttribute("stroke-width"))).toBeGreaterThan(0);
      // The stroke IS the shape's edge, so it cannot be a different colour.
      expect(bar.getAttribute("stroke")).toBe(bar.getAttribute("fill"));
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

describe("bar placement", () => {
  // 🔴 The circle is divided by the number of categories, so one category asked
  // for the whole of it and drew a disc with a notch where its own two ends
  // almost met — and centring each bar INSIDE its slot then put that lone bar
  // at six o'clock. A bar keeps a bar's proportions however few there are, and
  // the first one points straight up.
  it("draws one category as a bar pointing up, not as a disc", () => {
    const { container } = render(
      <PolarChart max={100} data={[{ key: "q", label: "Q", value: 76 }]} legend={false} />,
    );
    const d = container.querySelector("path")!.getAttribute("d")!;
    // 🔴 Only the POINTS, which follow M, L or an arc's flags. A bare
    // "number,number" match also catches an arc's `rx,ry` radii — "A11.00,11.00"
    // read as a point 39 units left of centre and failed this test for a
    // drawing that was correct.
    const points = Array.from(
      d.matchAll(/(?:[ML]|\d ")?(?:[ML]|\d \d )([\d.]+),([\d.]+)/g),
    ).map(([, x, y]) => ({ x: Number(x), y: Number(y) }));
    expect(points.length).toBeGreaterThan(0);
    // Every point is above the centre and within a bar's width of the vertical.
    for (const point of points) {
      expect(point.y).toBeLessThan(50);
      expect(Math.abs(point.x - 50)).toBeLessThan(25);
    }
  });

  it("keeps bars a bar's width however few categories there are", () => {
    for (const count of [1, 2, 3, 6, 12]) {
      cleanup();
      const { container } = render(
        <PolarChart
          max={100}
          legend={false}
          data={Array.from({ length: count }, (_, index) => ({
            key: `k${index}`,
            label: `L${index}`,
            value: 80,
          }))}
        />,
      );
      expect(container.querySelectorAll("path")).toHaveLength(count);
      // None of them swallows the circle: a sector wider than 180° would need
      // the large-arc flag on its outer edge.
      for (const bar of container.querySelectorAll("path")) {
        expect(bar.getAttribute("d")).not.toMatch(/A[\d.]+,[\d.]+ 0 1 1 /);
      }
    }
  });
});
