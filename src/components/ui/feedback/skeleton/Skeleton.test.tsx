import { cleanup, render } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { Skeleton } from "./Skeleton";

afterEach(cleanup);

describe("Skeleton", () => {
  it("renders a single skeleton bar by default", () => {
    const { container } = render(<Skeleton />);
    const bars = container.querySelectorAll(".animate-pulse");
    expect(bars).toHaveLength(1);
  });

  it("applies default width and height classes", () => {
    const { container } = render(<Skeleton />);
    const bar = container.firstElementChild!;
    expect(bar).toHaveClass("w-full");
    expect(bar).toHaveClass("h-4");
  });

  it("applies custom width and height", () => {
    const { container } = render(<Skeleton width="w-48" height="h-8" />);
    const bar = container.firstElementChild!;
    expect(bar).toHaveClass("w-48");
    expect(bar).toHaveClass("h-8");
  });

  it("renders multiple lines when lines > 1", () => {
    const { container } = render(<Skeleton lines={3} />);
    const bars = container.querySelectorAll(".animate-pulse");
    expect(bars).toHaveLength(3);
  });

  it("wraps multiple lines in a container with spacing", () => {
    const { container } = render(<Skeleton lines={2} />);
    const wrapper = container.firstElementChild!;
    expect(wrapper).toHaveClass("space-y-2");
  });

  it("applies className to the single-line bar", () => {
    const { container } = render(<Skeleton className="mt-4" />);
    const bar = container.firstElementChild!;
    expect(bar).toHaveClass("mt-4");
  });

  it("applies className to the multi-line wrapper", () => {
    const { container } = render(<Skeleton lines={2} className="mt-4" />);
    const wrapper = container.firstElementChild!;
    expect(wrapper).toHaveClass("mt-4");
  });

  it("clamps lines < 1 to 1", () => {
    const { container } = render(<Skeleton lines={0} />);
    const bars = container.querySelectorAll(".animate-pulse");
    expect(bars).toHaveLength(1);
  });
});
