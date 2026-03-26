import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ConfirmDialog } from "../src/components/ConfirmDialog";

describe("ConfirmDialog", () => {
  it("does not render when open is false", () => {
    render(
      <ConfirmDialog
        open={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Confirm action"
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders title and action buttons when open", () => {
    render(
      <ConfirmDialog
        open={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Delete this item?"
      />,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Delete this item?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <ConfirmDialog
        open={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Warning"
      >
        <p>This cannot be undone.</p>
      </ConfirmDialog>,
    );

    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();

    render(
      <ConfirmDialog
        open={true}
        onClose={vi.fn()}
        onConfirm={handleConfirm}
        title="Are you sure?"
        confirmLabel="Yes"
      />,
    );

    await user.click(screen.getByText("Yes"));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <ConfirmDialog
        open={true}
        onClose={handleClose}
        onConfirm={vi.fn()}
        title="Are you sure?"
      />,
    );

    // The Cancel text is inside a <span> inside the <button>, so find the button via role
    const buttons = screen.getAllByRole("button");
    const cancelButton = buttons.find((btn) =>
      btn.textContent?.includes("Cancel"),
    );
    expect(cancelButton).toBeDefined();
    await user.click(cancelButton!);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("uses custom button labels", () => {
    render(
      <ConfirmDialog
        open={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Remove?"
        confirmLabel="Yes, remove"
        cancelLabel="No, keep"
      />,
    );

    expect(screen.getByText("Yes, remove")).toBeInTheDocument();
    expect(screen.getByText("No, keep")).toBeInTheDocument();
  });

  it("disables cancel button when loading", () => {
    render(
      <ConfirmDialog
        open={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Deleting..."
        loading={true}
      />,
    );

    // Find the Cancel button via role -- text is inside a nested span
    const buttons = screen.getAllByRole("button");
    const cancelButton = buttons.find((btn) =>
      btn.textContent?.includes("Cancel"),
    );
    expect(cancelButton).toBeDefined();
    expect(cancelButton).toBeDisabled();
  });
});
