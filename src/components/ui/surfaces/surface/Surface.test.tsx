import { cleanup, render } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { Surface } from "./Surface";

afterEach(cleanup);

describe("Surface", () => {
  it("renders children", () => {
    const { getByText } = render(<Surface>Hello</Surface>);
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    const { container } = render(<Surface>Content</Surface>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("rounded-2xl");
    expect(div.className).toContain("bg-surface-container-low");
    expect(div.className).toContain("border-outline-variant");
  });

  it("merges custom className", () => {
    const { container } = render(<Surface className="p-4">Content</Surface>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("p-4");
    expect(div.className).toContain("rounded-2xl");
  });

  it("does not apply interactive classes by default", () => {
    const { container } = render(<Surface>Content</Surface>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).not.toContain("hover:bg-surface-container");
    expect(div.className).not.toContain("cursor-pointer");
    expect(div.className).not.toContain("transition-colors");
  });

  it("applies interactive classes when interactive is true", () => {
    const { container } = render(<Surface interactive>Content</Surface>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("hover:bg-surface-container");
    expect(div.className).toContain("cursor-pointer");
    expect(div.className).toContain("transition-colors");
  });

  it("passes through HTML attributes", () => {
    const { container } = render(
      <Surface data-testid="surface" role="button">
        Content
      </Surface>,
    );
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveAttribute("data-testid", "surface");
    expect(div).toHaveAttribute("role", "button");
  });
});
