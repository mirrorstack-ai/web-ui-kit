import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PolarChart } from "./PolarChart";

afterEach(cleanup);

const reaches = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("path")).map((path) =>
    Number(/A([\d.]+),/.exec(path.getAttribute("d")!)![1]),
  );

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
    // 3.82% of a whole of 1 is a stub, not a full-length wedge: the hub is 9
    // and the rim 43, so a leader-scaled chart would put it at 43.
    const [leader] = reaches(container);
    expect(leader).toBeLessThan(12);
  });

  it("writes a server ratio as the percent an operator reads", () => {
    render(
      <PolarChart measure="rate" data={[{ key: "a", label: "首頁上方", value: 0.0234 }]} />,
    );
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
    expect(reaches(container)[0]).toBe(43);
  });

  it("falls back to the key when a label is empty", () => {
    render(
      <PolarChart
        title="CTR"
        measure="rate"
        data={[{ key: "ad_7f3", label: "", value: 0.02 }]}
      />,
    );
    expect(screen.getByText("ad_7f3")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "CTR — ad_7f3: 2%");
  });

  // ad-core's day one again, from the rate side.
  it("draws no wedge when every rate is zero", () => {
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
