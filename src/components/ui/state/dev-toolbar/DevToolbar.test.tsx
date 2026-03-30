import { render, screen, fireEvent } from "@testing-library/react";
declare const process: any;
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DevToolbar } from "./DevToolbar";
import { ENV } from "@/utils/env";

describe("DevToolbar", () => {
  const defaultProps = {
    items: [
      { label: "State A", value: "a" },
      { label: "State B", value: "b" },
    ],
    value: "a",
    onChange: vi.fn(),
  };

  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.clearAllMocks();
  });

  it("renders in dev mode", () => {
    process.env.NODE_ENV = ENV.DEV;
    render(<DevToolbar {...defaultProps} />);
    expect(screen.getAllByRole("button", { name: "State A" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "State B" })[0]).toBeInTheDocument();
  });

  it("returns null in production", () => {
    process.env.NODE_ENV = ENV.PROD;
    const { container } = render(<DevToolbar {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it("calls onChange when an item is clicked", () => {
    process.env.NODE_ENV = ENV.DEV;
    render(<DevToolbar {...defaultProps} />);
    
    const buttonB = screen.getAllByRole("button", { name: "State B" })[0];
    fireEvent.click(buttonB);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith("b");
  });

  it("calls onToggleError when error button is clicked", () => {
    process.env.NODE_ENV = ENV.DEV;
    const onToggleError = vi.fn();
    render(<DevToolbar {...defaultProps} onToggleError={onToggleError} />);
    
    const errorButton = screen.getAllByRole("button", { name: "Show Error" })[0];
    fireEvent.click(errorButton);
    
    expect(onToggleError).toHaveBeenCalled();
  });
});
