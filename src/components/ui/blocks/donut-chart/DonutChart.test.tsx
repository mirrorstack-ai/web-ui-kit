import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DonutChart } from "./DonutChart";
import { normalizeSeries, seriesColor } from "@/types/chart";
import { isFullSweep, ringSegmentPath } from "@/utils/chartGeometry";

afterEach(cleanup);

const OUTCOMES = [
  { key: "passed", label: "Passed", value: 60, tone: "success" as const },
  { key: "failed", label: "Failed", value: 40, tone: "error" as const },
];

// The ring is drawn as stroked, dashed circles (owner: "our style guide is
// rounded"), and there is no track behind them any more (owner again), so every
// circle in the drawing IS a slice.
const slices = (container: HTMLElement) => Array.from(container.querySelectorAll("circle"));

const dashOf = (circle: Element) => Number(circle.getAttribute("stroke-dasharray")?.split(" ")[0]);

describe("DonutChart", () => {
  it("draws one slice per non-zero category and names them all to assistive tech", () => {
    const { container } = render(<DonutChart title="Attempts" data={OUTCOMES} />);
    expect(slices(container)).toHaveLength(2);
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Attempts — Passed: 60, Failed: 40",
    );
  });

  it("rounds both ends of every slice", () => {
    const { container } = render(<DonutChart data={OUTCOMES} legend={false} />);
    for (const slice of slices(container)) {
      expect(slice).toHaveAttribute("stroke-linecap", "round");
    }
  });

  // 🔴 A dash as long as the circumference would have its two round caps meet
  // and overlap, showing a seam on a ring that has none.
  it("draws a single whole-series category as an undashed circle", () => {
    const { container } = render(
      <DonutChart data={[{ key: "only", label: "Only", value: 12 }]} legend={false} />,
    );
    const [slice] = slices(container);
    expect(slice).toBeDefined();
    expect(slice.getAttribute("stroke-dasharray")).toBeNull();
  });

  it("shows the empty state instead of a slice when every value is zero", () => {
    const { container } = render(
      <DonutChart
        centerLabel="attempts"
        data={[{ key: "a", label: "A", value: 0 }]}
        emptyLabel="No attempts yet"
      />,
    );
    expect(slices(container)).toHaveLength(0);
    expect(screen.getByText("No attempts yet")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

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
    // 40 of a 40 whole is the whole ring: undashed, never an arc longer than one.
    expect(slices(container)[0].getAttribute("stroke-dasharray")).toBeNull();
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
    expect(slices(container).map((slice) => slice.getAttribute("stroke"))).toEqual([
      seriesColor(1),
      seriesColor(2),
    ]);
  });

  // 🔴 A round cap paints half the stroke width past each end of the dash, so a
  // slice shorter than the ring is thick would claim more arc than it owns.
  it("draws a slice thinner than the ring rather than letting it overstate its share", () => {
    const { container } = render(
      <DonutChart
        legend={false}
        data={[
          { key: "big", label: "Big", value: 97 },
          { key: "sliver", label: "Sliver", value: 3 },
        ]}
      />,
    );
    const [big, sliver] = slices(container);
    expect(Number(sliver.getAttribute("stroke-width"))).toBeLessThan(
      Number(big.getAttribute("stroke-width")),
    );
    // And it is still drawn: a 3% share is a bead on the ring, not nothing.
    expect(Number(sliver.getAttribute("stroke-width"))).toBeGreaterThan(0);
  });

  it("leaves a seam between neighbours rather than letting the caps touch", () => {
    const { container } = render(<DonutChart data={OUTCOMES} legend={false} />);
    const drawn = slices(container).map(
      (slice) => dashOf(slice) + Number(slice.getAttribute("stroke-width")),
    );
    const circumference = Number(
      slices(container)[0].getAttribute("stroke-dasharray")!.split(" ")[1],
    ) + dashOf(slices(container)[0]);
    // Two slices of a whole, each shortened by the seam.
    expect(drawn[0] + drawn[1]).toBeLessThan(circumference);
    expect(drawn[0] + drawn[1]).toBeGreaterThan(circumference - 6);
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
    // Nothing is drawn at all: the owner had the grey track removed, so an
    // empty series carries its state in the centre dash and the legend rather
    // than in a ring with nothing in it.
    expect(container.querySelectorAll("circle")).toHaveLength(0);
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.getByText("尚無曝光")).toBeInTheDocument();
  });
});

describe("palette cycling", () => {
  // 🔴 Seen on a contact sheet, not reasoned about: a seven-slice ring drew the
  // seventh category in the first category's colour, TOUCHING it, and the two
  // read as one slice with a gap. Six tones is what the theme defines, so the
  // palette repeats — it just must not repeat next to itself.
  it("never puts a repeated colour beside its twin", () => {
    const { container } = render(
      <DonutChart
        legend={false}
        data={Array.from({ length: 14 }, (_, index) => ({
          key: `k${index}`,
          label: `L${index}`,
          value: 10,
        }))}
      />,
    );
    const colours = Array.from(container.querySelectorAll("circle")).map((slice) =>
      slice.getAttribute("stroke"),
    );
    expect(colours).toHaveLength(14);
    for (let i = 0; i < colours.length; i += 1) {
      // Neighbours in a RING: the last slice touches the first.
      expect(colours[i]).not.toBe(colours[(i + 1) % colours.length]);
    }
  });

  // 🔴 The first answer to that adjacency was a lower opacity per lap. It works
  // on a light background and inverts on a dark one — opacity moves a colour
  // toward what is behind it, so the repeat came out dim and muddy and read as
  // disabled. Every category is drawn at full strength now, in both themes.
  it("draws every category at full strength", () => {
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
    for (const slice of container.querySelectorAll("circle")) {
      expect(slice.getAttribute("stroke-opacity")).toBeNull();
    }
  });

  it("keeps a pinned tone exactly where it was put, whatever its position", () => {
    // A tone was chosen to MEAN something; neither position nor lap may move it.
    expect(seriesColor(0, "error")).toBe(seriesColor(9, "error"));
    expect(seriesColor(0)).not.toBe(seriesColor(6));
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
      <DonutChart
        measure="count"
        data={[{ key: "a", label: "A", value: 128450900 }]}
        legend={false}
      />,
    );
    expect(Number(size())).toBeLessThan(12);
  });
});

describe("series normalisation", () => {
  // 🔴 A negative value does not shrink a slice, it eats its neighbours: the
  // sweep runs backwards and every later slice is drawn in the wrong place. A
  // non-finite one propagates into the geometry, which browsers drop silently.
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

  it("never emits NaN into the drawing when the data is unusable", () => {
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

  // Kept for the geometry helper itself, which PolarChart's guide rings and any
  // future filled shape still rely on.
  it("closes every segment path so a wedge is a filled shape", () => {
    const d = ringSegmentPath(50, 50, 46, 28, 0, 90);
    expect(d.startsWith("M")).toBe(true);
    expect(d.endsWith("Z")).toBe(true);
    expect(d).not.toContain("NaN");
  });
});
