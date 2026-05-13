import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MetricBlock } from "./MetricBlock";

afterEach(cleanup);

describe("MetricBlock", () => {
  it("renders the icon, label, and value", () => {
    const { container, getByText } = render(
      <MetricBlock icon="apps" label="Installs" value="1,240" />,
    );
    expect(getByText("Installs")).toBeInTheDocument();
    expect(getByText("1,240")).toBeInTheDocument();
    expect(container.querySelector(".material-symbols-rounded")?.textContent).toBe("apps");
  });

  it("omits the icon when none is given", () => {
    const { container } = render(<MetricBlock label="x" value="1" />);
    expect(container.querySelector(".material-symbols-rounded")).toBeNull();
  });

  it("renders the optional hint line", () => {
    const { getByText, queryByText, rerender } = render(<MetricBlock label="x" value="1" />);
    expect(queryByText("2 pending")).toBeNull();
    rerender(<MetricBlock label="x" value="1" hint="2 pending" />);
    expect(getByText("2 pending")).toBeInTheDocument();
  });

  it("colours the delta chip with the success/error tokens by trend", () => {
    const { getByText, rerender } = render(<MetricBlock label="x" value="1" delta="+18%" />);
    expect(getByText("+18%").className).toContain("text-success"); // inferred up
    rerender(<MetricBlock label="x" value="1" delta="-12%" />);
    expect(getByText("-12%").className).toContain("text-error"); // inferred down from leading "-"
    rerender(<MetricBlock label="x" value="1" delta="big" deltaTrend="down" />);
    expect(getByText("big").className).toContain("text-error"); // explicit override
  });

  it("renders a sparkline that fills the height only when `chart` is given", () => {
    const { container, rerender } = render(<MetricBlock label="x" value="1" />);
    expect(container.querySelector(".flex-1")).toBeNull(); // no chart ⇒ no growing section
    rerender(<MetricBlock label="x" value="1" chart={[10, 50, 130, -5]} />);
    const bars = container.querySelectorAll<HTMLElement>(".flex-1 > div");
    expect(bars).toHaveLength(4);
    expect(bars[1].style.height).toBe("50%");
    expect(bars[2].style.height).toBe("100%"); // clamped to 100
    expect(bars[3].style.height).toBe("0%"); // clamped to 0
  });

  it("gives each bar a hover tooltip — the per-point label when given, else the value", () => {
    const { container } = render(
      <MetricBlock label="x" value="1" chart={[42, { value: 80, label: "Wk 3 · 920" }]} />,
    );
    const bars = container.querySelectorAll<HTMLElement>(".flex-1 > div");
    expect(bars[0].title).toBe("42");
    expect(bars[1].title).toBe("Wk 3 · 920");
    expect(bars[1].style.height).toBe("80%");
  });

  it("shows a floating chip (portaled, so it isn't clipped) on the hovered bar", () => {
    const { container } = render(
      <MetricBlock label="x" value="1" chart={[42, { value: 80, label: "Wk 3 · 920" }]} />,
    );
    expect(screen.queryByText("Wk 3 · 920")).toBeNull(); // hidden until hovered
    const chart = container.querySelector(".flex-1")!;
    fireEvent.pointerEnter(chart.querySelectorAll("div")[1]);
    expect(screen.getByText("Wk 3 · 920")).toBeInTheDocument(); // rendered into <body>
    fireEvent.pointerLeave(chart);
    expect(screen.queryByText("Wk 3 · 920")).toBeNull(); // gone on leave
  });

  it("places the delta in the top row (stacked) — not under the value", () => {
    const { container } = render(<MetricBlock icon="apps" label="Lbl" value="42" delta="+1%" />);
    const root = container.querySelector("div.h-full")!;
    expect(root.firstElementChild!.textContent).toContain("+1%"); // top row (icon + delta)
    expect(root.firstElementChild!.querySelector(".material-symbols-rounded")).not.toBeNull();
    expect(root.lastElementChild!.textContent).not.toContain("+1%"); // label / value / hint block
  });

  it("uses a card layout — header row + big value — when `layout=\"card\"`", () => {
    const { container, getByText } = render(
      <MetricBlock layout="card" icon="apps" label="Installs" value="1,240" delta="+18%" chart={[10, 90]} />,
    );
    expect(getByText("1,240").className).toContain("text-3xl"); // the big number
    const header = getByText("Installs").parentElement!;
    expect(header.textContent).toContain("+18%"); // icon · label · delta share the header
    expect(header.querySelector(".material-symbols-rounded")).not.toBeNull();
    expect(container.querySelectorAll(".flex-1 > div")).toHaveLength(2); // chart below
  });

  it("renders a bigcard — big value, sparkline, and a sub-stats row — when `layout=\"bigcard\"`", () => {
    const { container, getByText } = render(
      <MetricBlock
        layout="bigcard"
        icon="apps"
        label="Installs"
        value="VAL"
        delta="DELTA"
        chart={[10, 90, 50]}
        stats={[
          { label: "WTD", value: "WTD_V", delta: "WTD_D" },
          { label: "MTD", value: "MTD_V" },
        ]}
      />,
    );
    expect(getByText("VAL").className).toContain("text-3xl");
    expect(getByText("WTD")).toBeInTheDocument();
    expect(getByText("WTD_V")).toBeInTheDocument();
    expect(getByText("WTD_D").className).toContain("text-success"); // up-trend (no leading "-")
    expect(getByText("MTD_V")).toBeInTheDocument();
    expect(container.querySelectorAll("[title]")).toHaveLength(3); // 3 sparkline bars
  });

  it("renders a chart-led card — no big value, full-width sparkline — when `layout=\"chart\"`", () => {
    const { container, getByText, queryByText } = render(
      <MetricBlock
        layout="chart"
        icon="payments"
        label="Revenue"
        value="$12.4k"
        delta="+22%"
        chart={[10, 90, 50, 70]}
        stats={[{ label: "WTD", value: "WTD_V" }]}
      />,
    );
    expect(queryByText("$12.4k")).toBeNull(); // headline value intentionally not shown
    expect(getByText("Revenue")).toBeInTheDocument();
    expect(getByText("WTD")).toBeInTheDocument();
    expect(getByText("WTD_V")).toBeInTheDocument();
    expect(container.querySelectorAll("[title]")).toHaveLength(4); // sparkline fills the middle
  });

  it("uses a horizontal layout when `layout=\"wide\"`", () => {
    const { container, getByText, queryByText, rerender } = render(
      <MetricBlock layout="wide" icon="payments" label="Revenue" value="$12k" delta="+22%" />,
    );
    const root = container.querySelector("div.h-full") as HTMLElement;
    expect(root.className).toContain("items-center"); // a row, not flex-col
    expect(root.className).not.toContain("flex-col");
    // delta sits inline with the label (not in a separate top row)
    expect(getByText("Revenue").parentElement!.textContent).toContain("+22%");

    // a wide sparkline replaces the inline delta when `chart` is given
    rerender(<MetricBlock layout="wide" label="x" value="1" delta="+22%" chart={[10, 90]} />);
    expect(queryByText("+22%")).toBeNull();
    expect(container.querySelectorAll(".w-\\[42\\%\\] > div")).toHaveLength(2);
  });

  it("fills its container (h-full) so it fits a grid cell", () => {
    const { container } = render(<MetricBlock label="x" value="1" />);
    expect(container.firstElementChild).toHaveClass("h-full");
  });

  it("switches text tone for non-surface backgrounds", () => {
    const { getByText, rerender } = render(<MetricBlock label="Lbl" value="42" />);
    expect(getByText("42").className).toContain("text-on-surface");
    rerender(<MetricBlock label="Lbl" value="42" tone="primary" />);
    expect(getByText("42").className).toContain("text-on-primary-container");
  });
});
