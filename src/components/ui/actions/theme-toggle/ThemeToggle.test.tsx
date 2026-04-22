import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

afterEach(cleanup);

describe("ThemeToggle", () => {
  it("renders with correct icon for auto", () => {
    render(<ThemeToggle theme="auto" onToggle={() => {}} />);
    expect(screen.getByText("brightness_auto")).toBeInTheDocument();
  });

  it("renders with correct icon for light", () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByText("light_mode")).toBeInTheDocument();
  });

  it("renders with correct icon for dark", () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByText("dark_mode")).toBeInTheDocument();
  });

  it("calls onToggle when clicked", () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="auto" onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it("has correct aria-label for each theme", () => {
    const { rerender } = render(<ThemeToggle theme="auto" onToggle={() => {}} />);
    expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();

    rerender(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();

    rerender(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByLabelText("Switch to auto mode")).toBeInTheDocument();
  });

  it("ThemeToggle.next cycles correctly", () => {
    expect(ThemeToggle.next("auto")).toBe("light");
    expect(ThemeToggle.next("light")).toBe("dark");
    expect(ThemeToggle.next("dark")).toBe("auto");
  });
});
