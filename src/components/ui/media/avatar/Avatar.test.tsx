import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Avatar } from "./Avatar";

afterEach(cleanup);

describe("Avatar", () => {
  it("renders initials fallback when no src", () => {
    render(<Avatar fallback="John" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("renders image when src provided", () => {
    const { container } = render(<Avatar src="https://example.com/photo.jpg" />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("defaults to U when no fallback", () => {
    render(<Avatar />);
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("shows edit badge when editable", () => {
    render(<Avatar editable />);
    expect(screen.getByText("edit")).toBeInTheDocument();
  });

  it("triggers file input on click when editable", () => {
    const onFileSelect = vi.fn();
    const { container } = render(<Avatar editable onFileSelect={onFileSelect} />);
    const button = container.querySelector("button");
    fireEvent.click(button!);
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
  });

  it("applies a square radius that scales with size", () => {
    const xl = render(<Avatar square size="xl" fallback="S" />);
    expect(xl.container.querySelector(".rounded-3xl")).toBeInTheDocument();
    xl.unmount();

    const sm = render(<Avatar square size="sm" fallback="S" />);
    expect(sm.container.querySelector(".rounded-lg")).toBeInTheDocument();
  });

  it("renders overlay and hides initials", () => {
    render(<Avatar editable overlay={<span data-testid="spinner" />} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByText("U")).not.toBeInTheDocument();
  });

  it("non-editable square avoids the badge-accommodating bottom-right radius", () => {
    const { container } = render(<Avatar square size="xl" fallback="S" />);
    expect(container.querySelector(".rounded-3xl")).toBeInTheDocument();
    // The rounded-br-* override is only used when editable+square so
    // the corner visually carves room for the edit badge; a
    // non-editable square stays uniform.
    expect(container.querySelector('[class*="rounded-br-"]')).not.toBeInTheDocument();
  });
});
