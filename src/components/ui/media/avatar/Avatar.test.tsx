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

  it("applies square shape when square prop set", () => {
    const { container } = render(<Avatar square fallback="S" />);
    const inner = container.querySelector(".rounded-2xl");
    expect(inner).toBeInTheDocument();
  });

  it("renders overlay when provided", () => {
    render(<Avatar editable overlay={<span data-testid="spinner" />} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
