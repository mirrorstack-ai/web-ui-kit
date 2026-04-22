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
});
