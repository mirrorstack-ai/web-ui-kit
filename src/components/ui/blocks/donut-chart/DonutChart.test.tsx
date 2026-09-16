import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DonutChart } from "./DonutChart";
import { PolarChart } from "@/components/ui/blocks/polar-chart/PolarChart";
import { normalizeSeries, seriesColor, seriesOpacity } from "@/types/chart";
import { isFullSweep, ringSegmentPath } from "@/utils/chartGeometry";

afterEach(cleanup);

const OUTCOMES = [
  { key: "passed", label: "Passed", value: 60, tone: "success" as const },
  { key: "failed", label: "Failed", value: 40, tone: "error" as const },
];

describe("DonutChart", () => {
  it("draws one shape per non-zero category and names them all to assistive tech", () => {
    const { container } = render(<DonutChart title="Attempts" data={OUTCOMES} />);
    // Two wedges plus the track circle.
    expect(container.querySelectorAll("path")).toHaveLength(2);
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Attempts — Passed: 60, Failed: 40",
    );
  });

  // 🔴 The whole reason ringSegmentPath refuses a 360° sweep: an SVG arc
  // between two identical points draws NOTHING, so the most ordinary series
  // there is — one category holding everything — would render as an empty ring
  // that reads as missing data.
  it("renders a single whole-series category as a circle, not a degenerate arc", () => {
    const { container } = render(
      <DonutChart data={[{ key: "only", label: "Only", value: 12 }]} legend={false} />,
    );
    expect(container.querySelectorAll("path")).toHaveLength(0);
    // The track plus the full-sweep segment.
    expect(container.querySelectorAll("circle")).toHaveLength(2);
  });

  it("shows the empty state instead of a slice when every value is zero", () => {
    const { container } = render(
      <DonutChart
        centerLabel="attempts"
        data={[{ key: "a", label: "A", value: 0 }]}
        emptyLabel="No attempts yet"
      />,
    );
    // No wedge, and the centre reads as absent rather than as a real zero.
    expect(container.querySelectorAll("path")).toHaveLength(0);
    expect(screen.getByText("No attempts yet")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  // An explicit total is the real denominator; a ring that ignored it would
  // claim the slices are everything.
  it("divides by an explicit total and prints it in the centre", () => {
    render(
      <DonutChart
        total={200}
        centerLabel="attempts"
        data={[{ key: "a", label: "A", value: 50 }]}
        legend={false}
      />,
    );
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("refuses a total below the sum rather than drawing past a full circle", () => {
    const { container } = render(
      <DonutChart total={10} data={[{ key: "a", label: "A", value: 40 }]} legend={false} />,
    );
    // 40 of a 40 whole is a full sweep: a circle, never an arc longer than one.
    expect(container.querySelectorAll("path")).toHaveLength(0);
    expect(container.querySelectorAll("circle")).toHaveLength(2);
  });

  it("keeps a category's colour when a sibling falls to zero", () => {
    const { container } = render(
      <DonutChart
        data={[
          { key: "a", label: "A", value: 0 },
          { key: "b", label: "B", value: 10 },
          { key: "c", label: "C", value: 10 },
        ]}
        legend={false}
      />,
    );
    // A drops out, but B and C keep the SECOND and THIRD palette colours — a
    // legend whose colours shuffle when a number reaches zero cannot be read
    // across two page loads.
    const fills = Array.from(container.querySelectorAll("path")).map((path) =>
      path.getAttribute("fill"),
    );
    expect(fills).toEqual([seriesColor(1), seriesColor(2)]);
  });
});

describe("PolarChart", () => {
  const RATES = [
    { key: "q1", label: "Q1", value: 90 },
    { key: "q2", label: "Q2", value: 45 },
  ];

  // 🔴 READ THE ARC RADIUS, NOT A POINT. Every wedge starts at a different
  // angle, so the first coordinate of its path is a different place on the
  // circle — comparing those y values compares twelve o'clock against six and
  // passes for reasons that have nothing to do with the values. The `A r,r` in
  // the path IS the reach.
  const reaches = (container: HTMLElement) =>
    Array.from(container.querySelectorAll("path")).map((path) =>
      Number(/A([\d.]+),/.exec(path.getAttribute("d")!)![1]),
    );

  it("scales wedges against an explicit maximum, not against the best category", () => {
    const { container } = render(<PolarChart max={100} data={RATES} legend={false} />);
    const [first, second] = reaches(container);
    // 90 reaches further than 45, and neither touches the rim a max-less chart
    // would hand the leader (MAX_RADIUS is 43).
    expect(first).toBeGreaterThan(second);
    expect(first).toBeLessThan(43);
  });

  // A max below the data cannot be drawn honestly — both wedges hit the rim
  // and stop being comparable — so the component clamps and says so in dev
  // (isDev is false under the test runner, which is why the assertion here is
  // on the drawing rather than on the console).
  it("clamps a wedge that exceeds max to the rim rather than overflowing the chart", () => {
    const { container } = render(
      <PolarChart max={50} data={[{ key: "q1", label: "Q1", value: 90 }]} legend={false} />,
    );
    // 90 against a ceiling of 50 stops exactly at the rim; nothing is drawn
    // outside the outermost guide ring.
    expect(reaches(container)[0]).toBe(43);
  });

  it("draws no wedge for a zero value and says the series is empty", () => {
    const { container } = render(
      <PolarChart
        data={[{ key: "q1", label: "Q1", value: 0 }]}
        emptyLabel="Nothing answered"
      />,
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

describe("series normalisation", () => {
  // 🔴 A negative value does not shrink a slice, it eats its neighbours: the
  // sweep runs backwards and every later slice is drawn in the wrong place. A
  // non-finite one propagates into the path `d`, which browsers drop silently.
  it("treats a negative or non-finite value as zero", () => {
    const { data, total } = normalizeSeries([
      { key: "a", label: "A", value: -5 },
      { key: "b", label: "B", value: Number.NaN },
      { key: "c", label: "C", value: Number.POSITIVE_INFINITY },
      { key: "d", label: "D", value: 10 },
    ]);
    expect(data.map((datum) => datum.value)).toEqual([0, 0, 0, 10]);
    expect(total).toBe(10);
  });

  it("never emits NaN into a path when the data is unusable", () => {
    const { container } = render(
      <DonutChart data={[{ key: "a", label: "A", value: Number.NaN }]} legend={false} />,
    );
    expect(container.innerHTML).not.toContain("NaN");
  });

  it("recognises a full sweep within floating-point noise", () => {
    expect(isFullSweep(360)).toBe(true);
    expect(isFullSweep(359.9999999)).toBe(true);
    expect(isFullSweep(359.5)).toBe(false);
  });

  it("closes every segment path so a wedge is a filled shape", () => {
    const d = ringSegmentPath(50, 50, 46, 28, 0, 90);
    expect(d.startsWith("M")).toBe(true);
    expect(d.endsWith("Z")).toBe(true);
    expect(d).not.toContain("NaN");
  });
});

describe("palette cycling", () => {
  // 🔴 Seen on a contact sheet, not reasoned about: a seven-slice ring drew the
  // seventh category in the first category's colour, touching it, and the two
  // read as one slice with a gap. Cycling is still right — a seventh token no
  // theme defines is not — so the repeat is drawn lighter instead.
  it("draws a repeated palette colour at a lighter weight so neighbours stay apart", () => {
    const { container } = render(
      <DonutChart
        legend={false}
        data={Array.from({ length: 7 }, (_, index) => ({
          key: `k${index}`,
          label: `L${index}`,
          value: 10,
        }))}
      />,
    );
    const paths = Array.from(container.querySelectorAll("path"));
    expect(paths[0].getAttribute("fill")).toBe(paths[6].getAttribute("fill"));
    expect(paths[0].getAttribute("fill-opacity")).toBe("1");
    expect(Number(paths[6].getAttribute("fill-opacity"))).toBeLessThan(1);
  });

  it("keeps a pinned tone at full weight wherever it sits in the series", () => {
    expect(seriesOpacity(0)).toBe(1);
    expect(seriesOpacity(6)).toBeLessThan(1);
    // A tone was chosen to mean something; position must not dilute it.
    expect(seriesOpacity(6, "error")).toBe(1);
  });
});

describe("measure and labels (63's review of ad-core's block)", () => {
  // 🔴 The kit must not NAME an empty label: one page apart, the same blank
  // means "this creative was deleted" and "nobody has named this placement".
  // The key is the only fallback that is true in both.
  it("falls back to the key when a label is empty, never to a word of its own", () => {
    render(
      <DonutChart
        title="Impressions"
        data={[
          { key: "ad_7f3", label: "", value: 120 },
          { key: "home-top", label: "首頁上方", value: 80 },
        ]}
      />,
    );
    expect(screen.getByText("ad_7f3")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Impressions — ad_7f3: 120, 首頁上方: 80",
    );
  });

  it("writes a count with thousands and a rate as the percent an operator reads", () => {
    const { rerender } = render(
      <DonutChart measure="count" data={[{ key: "a", label: "A", value: 12543 }]} />,
    );
    // Twice over: the centre figure and the legend row, which must agree.
    expect(screen.getAllByText((12543).toLocaleString())).toHaveLength(2);

    // ad-core's ctr arrives as the ratio the SERVER computed — the console never
    // divides, because zero impressions is an ordinary first day.
    rerender(<DonutChart measure="rate" data={[{ key: "a", label: "A", value: 0.0234 }]} />);
    expect(screen.getAllByText("2.3%")).toHaveLength(2);
  });

  it("lets formatValue win over measure, for what no measure covers", () => {
    render(
      <DonutChart
        measure="count"
        formatValue={(value) => `NT$${value}`}
        data={[{ key: "a", label: "A", value: 90 }]}
      />,
    );
    expect(screen.getAllByText("NT$90")).toHaveLength(2);
  });

  // ad-core's day one: every placement present, every count zero.
  it("draws an empty state rather than one placement taking 100% of nothing", () => {
    const { container } = render(
      <DonutChart
        measure="count"
        centerLabel="impressions"
        emptyLabel="尚無曝光"
        data={[
          { key: "home-top", label: "首頁上方", value: 0 },
          { key: "footer", label: "頁尾", value: 0 },
        ]}
      />,
    );
    expect(container.querySelectorAll("path")).toHaveLength(0);
    // The track only — no wedge circle claiming the whole ring.
    expect(container.querySelectorAll("circle")).toHaveLength(1);
    expect(screen.getByText("尚無曝光")).toBeInTheDocument();
  });
});

describe("centre figure", () => {
  // The hole is a fixed fraction of the viewBox, so a long string has to be set
  // smaller or it runs under the ring — ad-core's grouped impression totals are
  // five digits and a separator as a matter of course.
  it("sets a long total smaller so it stays inside the ring", () => {
    const { container, rerender } = render(
      <DonutChart measure="count" data={[{ key: "a", label: "A", value: 42 }]} legend={false} />,
    );
    const size = () => container.querySelector("text")!.getAttribute("font-size");
    expect(size()).toBe("16");

    rerender(
      <DonutChart measure="count" data={[{ key: "a", label: "A", value: 43680 }]} legend={false} />,
    );
    expect(Number(size())).toBeLessThan(16);

    rerender(
      <DonutChart measure="count" data={[{ key: "a", label: "A", value: 128450900 }]} legend={false} />,
    );
    expect(Number(size())).toBeLessThan(12);
  });
});
