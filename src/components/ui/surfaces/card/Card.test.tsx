import { cleanup, render } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { Card } from "./Card";

afterEach(cleanup);

describe("Card", () => {
  it("renders children", () => {
    const { getByText } = render(<Card>Card content</Card>);
    expect(getByText("Card content")).toBeInTheDocument();
  });

  it("renders media slot when provided", () => {
    const { getByTestId } = render(
      <Card media={<div data-testid="media">Media</div>}>Content</Card>,
    );
    expect(getByTestId("media")).toBeInTheDocument();
  });

  it("does not render media wrapper when media is not provided", () => {
    const { container } = render(<Card>Content</Card>);
    // Only the content div should be inside the Surface
    const surface = container.firstChild as HTMLElement;
    expect(surface.children).toHaveLength(1);
  });

  it("renders actions slot when provided", () => {
    const { getByText } = render(
      <Card actions={<button>Save</button>}>Content</Card>,
    );
    expect(getByText("Save")).toBeInTheDocument();
  });

  it("does not render actions wrapper when actions is not provided", () => {
    const { container } = render(<Card>Content</Card>);
    const surface = container.firstChild as HTMLElement;
    // Only the content div, no actions div
    expect(surface.children).toHaveLength(1);
  });

  it("applies interactive prop to Surface", () => {
    const { container } = render(<Card interactive>Content</Card>);
    const surface = container.firstChild as HTMLElement;
    expect(surface.className).toContain("cursor-pointer");
    expect(surface.className).toContain("hover:bg-surface-container");
  });

  it("does not apply interactive classes by default", () => {
    const { container } = render(<Card>Content</Card>);
    const surface = container.firstChild as HTMLElement;
    expect(surface.className).not.toContain("cursor-pointer");
  });

  it("merges custom className onto Surface", () => {
    const { container } = render(<Card className="max-w-sm">Content</Card>);
    const surface = container.firstChild as HTMLElement;
    expect(surface.className).toContain("max-w-sm");
    expect(surface.className).toContain("overflow-hidden");
  });

  it("renders all slots together", () => {
    const { getByTestId, getByText } = render(
      <Card
        media={<div data-testid="media">Image</div>}
        actions={<button>Action</button>}
      >
        Body text
      </Card>,
    );
    expect(getByTestId("media")).toBeInTheDocument();
    expect(getByText("Body text")).toBeInTheDocument();
    expect(getByText("Action")).toBeInTheDocument();
  });
});
