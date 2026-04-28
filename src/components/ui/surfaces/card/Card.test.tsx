import { cleanup, render } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { Card } from "./Card";

afterEach(cleanup);

describe("Card", () => {
  it("renders children", () => {
    const { getByText } = render(<Card>Hello Card</Card>);
    expect(getByText("Hello Card")).toBeInTheDocument();
  });

  it("passes className through to Surface", () => {
    const { container } = render(<Card className="p-5">Content</Card>);
    const surface = container.firstChild as HTMLElement;
    expect(surface.className).toContain("p-5");
    expect(surface.className).toContain("rounded-2xl");
  });

  it("delegates interactive prop to Surface", () => {
    const { container } = render(<Card interactive>Content</Card>);
    const surface = container.firstChild as HTMLElement;
    expect(surface.className).toContain("hover:bg-surface-container");
    expect(surface.className).toContain("cursor-pointer");
  });

  it("does not apply interactive classes by default", () => {
    const { container } = render(<Card>Content</Card>);
    const surface = container.firstChild as HTMLElement;
    expect(surface.className).not.toContain("hover:bg-surface-container");
    expect(surface.className).not.toContain("cursor-pointer");
  });

  it("renders Skeleton lines when loading is true", () => {
    const { container, queryByText } = render(
      <Card loading>
        <p>Should not appear</p>
      </Card>,
    );
    expect(queryByText("Should not appear")).not.toBeInTheDocument();
    const skeletonBars = container.querySelectorAll(".animate-pulse");
    expect(skeletonBars.length).toBe(3);
  });

  it("renders children when loading is false", () => {
    const { getByText, container } = render(
      <Card loading={false}>
        <p>Visible</p>
      </Card>,
    );
    expect(getByText("Visible")).toBeInTheDocument();
    const skeletonBars = container.querySelectorAll(".animate-pulse");
    expect(skeletonBars.length).toBe(0);
  });
});
