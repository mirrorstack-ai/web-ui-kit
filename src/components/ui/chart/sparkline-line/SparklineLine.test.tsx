import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SparklineLine } from "./SparklineLine";

afterEach(cleanup);

describe("SparklineLine", () => {
  it("renders an svg with a (no-fill) line path", () => {
    const { container } = render(<SparklineLine data={[1, 5, 3, 8, 4]} endDot={false} />);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector('path[fill="none"]')).not.toBeNull();
  });

  it("renders an area path only when `areaClassName` is set", () => {
    const { container, rerender } = render(<SparklineLine data={[1, 2, 3]} />);
    expect(container.querySelectorAll("path")).toHaveLength(1); // line only
    rerender(<SparklineLine data={[1, 2, 3]} areaClassName="fill-primary/15" />);
    expect(container.querySelectorAll("path")).toHaveLength(2); // area + line
  });

  it("renders the end dot by default; `endDot={false}` drops it", () => {
    const { container, rerender } = render(<SparklineLine data={[1, 2, 3]} />);
    expect(container.querySelectorAll("span.rounded-full")).toHaveLength(1);
    rerender(<SparklineLine data={[1, 2, 3]} endDot={false} />);
    expect(container.querySelectorAll("span.rounded-full")).toHaveLength(0);
  });

  it("returns null for empty data", () => {
    const { container } = render(<SparklineLine data={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("pops a portaled chip on hover and clears it on leave", () => {
    const { container } = render(<SparklineLine data={[10, 20, 30]} endDot={false} />);
    expect(screen.queryByText("30")).toBeNull();
    // jsdom's getBoundingClientRect returns zeros, so the nearest-point math
    // clamps to the last index — the chip should show its value ("30").
    fireEvent.mouseMove(container.querySelector("svg")!, { clientX: 50, clientY: 5 });
    expect(screen.getByText("30")).toBeInTheDocument(); // rendered into <body>
    fireEvent.mouseLeave(container.querySelector("svg")!);
    expect(screen.queryByText("30")).toBeNull();
  });
});
