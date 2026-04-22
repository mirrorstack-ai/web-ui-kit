import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { Badge } from "./Badge";

afterEach(cleanup);

describe("Badge", () => {
  it("renders text content", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(<Badge icon="check_circle">Ready</Badge>);
    expect(screen.getByText("check_circle")).toBeInTheDocument();
  });

  it("renders pulsing dot when dot=true", () => {
    const { container } = render(<Badge dot>Online</Badge>);
    const dot = container.querySelector(".animate-pulse");
    expect(dot).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    render(<Badge variant="error">Error</Badge>);
    expect(screen.getByText("Error").closest("span")).toHaveClass("text-error");
  });

  it("applies size styles", () => {
    render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small").closest("span")).toHaveClass("px-2");
  });

  it("applies custom className", () => {
    render(<Badge className="mt-2">Test</Badge>);
    expect(screen.getByText("Test").closest("span")).toHaveClass("mt-2");
  });
});
