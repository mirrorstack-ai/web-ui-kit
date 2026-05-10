import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LineChart } from "./LineChart";

afterEach(cleanup);

const data = Array.from({ length: 6 }, (_, i) => ({
  label: `t${i}`,
  value: 10 + i * 5,
}));

const dataWithOverlay = data.map((d, i) => ({
  ...d,
  overlay: 5 + i * 3,
}));

describe("LineChart", () => {
  it("renders a chart container without throwing", () => {
    const { container } = render(<LineChart data={data} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("applies the given className", () => {
    const { container } = render(
      <LineChart data={data} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("respects the height prop", () => {
    const { container } = render(<LineChart data={data} height={200} />);
    expect(container.firstChild).toHaveStyle({ height: "200px" });
  });

  it("renders with overlay data without throwing", () => {
    const { container } = render(<LineChart data={dataWithOverlay} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with thresholdY without throwing", () => {
    const { container } = render(<LineChart data={data} thresholdY={20} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with showArea=false without throwing", () => {
    const { container } = render(<LineChart data={data} showArea={false} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("handles empty data without throwing", () => {
    const { container } = render(<LineChart data={[]} />);
    expect(container.firstChild).toBeTruthy();
  });
});
