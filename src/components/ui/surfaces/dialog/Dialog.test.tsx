import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Dialog } from "./Dialog";

afterEach(cleanup);

describe("Dialog", () => {
  it("renders nothing when closed", () => {
    render(<Dialog open={false} title="Test" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(<Dialog open title="Test Dialog" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
  });

  it("calls onClose on backdrop click", () => {
    const onClose = vi.fn();
    const { container } = render(<Dialog open onClose={onClose} title="Test" />);
    const backdrop = container.querySelector('[aria-hidden="true"]');
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Test" />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders action buttons", () => {
    const onClick = vi.fn();
    render(
      <Dialog
        open
        title="Test"
        actions={[{ label: "Confirm", onClick }]}
      />,
    );
    const btn = screen.getByRole("button", { name: "Confirm" });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders children content", () => {
    render(
      <Dialog open title="Test">
        <p>Dialog body</p>
      </Dialog>,
    );
    expect(screen.getByText("Dialog body")).toBeInTheDocument();
  });

  it("has correct aria attributes", () => {
    render(<Dialog open title="Accessible Dialog" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby");
  });

  it("compensates scrollbar gutter with paddingRight when locking scroll", () => {
    // Simulate a vertical scrollbar: viewport is 1024px wide but
    // the document only has 1009px of usable width (15px gutter).
    const originalInnerWidth = window.innerWidth;
    const originalClientWidth = document.documentElement.clientWidth;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      value: 1009,
    });
    try {
      const { rerender } = render(<Dialog open title="Test" />);
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.body.style.paddingRight).toBe("15px");
      rerender(<Dialog open={false} title="Test" />);
      expect(document.body.style.overflow).toBe("");
      expect(document.body.style.paddingRight).toBe("");
    } finally {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: originalInnerWidth,
      });
      Object.defineProperty(document.documentElement, "clientWidth", {
        configurable: true,
        value: originalClientWidth,
      });
    }
  });

  it("skips paddingRight when there's no scrollbar gutter", () => {
    // Page already has scrollbar-gutter: stable (or no scrollbar at
    // all), so innerWidth === clientWidth and locking scroll
    // shouldn't add padding.
    const originalInnerWidth = window.innerWidth;
    const originalClientWidth = document.documentElement.clientWidth;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      value: 1024,
    });
    try {
      render(<Dialog open title="Test" />);
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.body.style.paddingRight).toBe("");
    } finally {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: originalInnerWidth,
      });
      Object.defineProperty(document.documentElement, "clientWidth", {
        configurable: true,
        value: originalClientWidth,
      });
    }
  });
});
