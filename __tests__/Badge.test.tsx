import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../src/components/Badge";

describe("Badge", () => {
  it("renders the label text", () => {
    render(<Badge>Active</Badge>);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    render(<Badge>Default</Badge>);

    const badge = screen.getByText("Default").closest("span");
    expect(badge?.className).toContain("bg-surface-container");
  });

  it("applies variant styles for success", () => {
    render(<Badge variant="success">Ready</Badge>);

    const badge = screen.getByText("Ready").closest("span");
    expect(badge?.className).toContain("text-success");
  });

  it("applies variant styles for error", () => {
    render(<Badge variant="error">Failed</Badge>);

    const badge = screen.getByText("Failed").closest("span");
    expect(badge?.className).toContain("text-error");
  });

  it("applies variant styles for warning", () => {
    render(<Badge variant="warning">Pending</Badge>);

    const badge = screen.getByText("Pending").closest("span");
    expect(badge?.className).toContain("text-warning");
  });

  it("renders a dot indicator when dot prop is true", () => {
    const { container } = render(
      <Badge variant="success" dot>
        Processing
      </Badge>,
    );

    const dot = container.querySelector(".animate-pulse.rounded-full");
    expect(dot).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    const { container } = render(
      <Badge variant="error" icon="error">
        Failed
      </Badge>,
    );

    const icon = container.querySelector(".material-symbols-rounded");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent("error");
  });

  it("applies small size class", () => {
    render(
      <Badge size="sm" variant="primary">
        Small
      </Badge>,
    );

    const badge = screen.getByText("Small").closest("span");
    expect(badge?.className).toContain("py-0.5");
  });

  it("accepts custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);

    const badge = screen.getByText("Custom").closest("span");
    expect(badge?.className).toContain("custom-class");
  });
});
