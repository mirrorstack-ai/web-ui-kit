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
    render(<Dialog open onClose={onClose} title="Test" />);
    // Queried from document.body, not the render container: the dialog is
    // portalled, deliberately, so it cannot affect a parent's layout.
    const backdrop = document.body.querySelector('[aria-hidden="true"]');
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

// The bug this guards, verified against the Tailwind v4 source: `space-y-*`
// compiles to `:where(& > :not(:last-child)) { margin-block-end: … }` — margin
// on every child EXCEPT the last. A dialog rendered as a layout child therefore
// changes WHICH element matches `:last-child`, and the element that used to be
// last silently gains bottom margin the moment the dialog opens. The container
// grows and the page shifts, with nothing in the dialog's own styles to blame.
//
// jsdom computes no layout, so asserting heights would be vacuous. These assert
// the structural precondition instead, which is the actual mechanism: opening a
// dialog must not change the parent's child list or which child is last.
describe("Dialog does not participate in its parent's layout", () => {
  function Host({ open }: { open: boolean }) {
    return (
      <div data-testid="stack" className="space-y-6">
        <div data-testid="first">first</div>
        <div data-testid="tail">tail</div>
        <Dialog open={open} onClose={() => {}} title="t">
          body
        </Dialog>
      </div>
    );
  }

  it("leaves the parent's child count and :last-child unchanged when opened", () => {
    const { rerender } = render(<Host open={false} />);
    const stack = screen.getByTestId("stack");
    const closedCount = stack.children.length;
    const closedLast = stack.lastElementChild;

    rerender(<Host open />);

    expect(screen.getByText("body")).toBeInTheDocument(); // it really did open
    expect(stack.children.length).toBe(closedCount);
    expect(stack.lastElementChild).toBe(closedLast);
    expect(stack.lastElementChild).toBe(screen.getByTestId("tail"));
    // and `tail` keeps matching :last-child, which is what carries the margin
    expect(screen.getByTestId("tail").matches(":last-child")).toBe(true);
  });

  it("renders into document.body, outside the host container", () => {
    render(<Host open />);
    const stack = screen.getByTestId("stack");
    expect(stack.contains(screen.getByText("body"))).toBe(false);
  });
});
