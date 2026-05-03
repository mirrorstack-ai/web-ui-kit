import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TypeToConfirmDialog } from "./TypeToConfirmDialog";

afterEach(cleanup);

function renderDialog(overrides: Partial<React.ComponentProps<typeof TypeToConfirmDialog>> = {}) {
  const onClose = vi.fn();
  const onConfirm = vi.fn();
  const utils = render(
    <TypeToConfirmDialog
      open
      onClose={onClose}
      onConfirm={onConfirm}
      phrase="delete"
      warnTitle="Delete this app?"
      confirmActionLabel="Delete app"
      consequences={<p>This is destructive.</p>}
      {...overrides}
    />,
  );
  return { ...utils, onClose, onConfirm };
}

describe("TypeToConfirmDialog", () => {
  it("opens at the warn stage with the consequences body", () => {
    renderDialog();
    expect(screen.getByText("Delete this app?")).toBeInTheDocument();
    expect(screen.getByText("This is destructive.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("Continue advances to the type stage and shows the input", () => {
    renderDialog();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Type 'delete' to confirm")).toBeInTheDocument();
    // Consequences body repeats so the user sees the same info before typing.
    expect(screen.getByText("This is destructive.")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmation")).toBeInTheDocument();
  });

  it("disables the confirm button until the phrase matches (case-insensitive, trimmed)", () => {
    renderDialog();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    const confirmBtn = screen.getByRole("button", { name: "Delete app" });
    const input = screen.getByLabelText("Confirmation");

    expect(confirmBtn).toBeDisabled();

    fireEvent.change(input, { target: { value: "del" } });
    expect(confirmBtn).toBeDisabled();

    fireEvent.change(input, { target: { value: "  DELETE  " } });
    expect(confirmBtn).not.toBeDisabled();
  });

  it("calls onConfirm when the matched confirm button is clicked", () => {
    const { onConfirm } = renderDialog();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Confirmation"), {
      target: { value: "delete" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Delete app" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls onClose from Cancel on the warn stage", () => {
    const { onClose } = renderDialog();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("resets to warn stage and clears input when reopened", () => {
    const { rerender } = render(
      <TypeToConfirmDialog
        open
        onClose={() => {}}
        onConfirm={() => {}}
        phrase="x"
        warnTitle="W"
        confirmActionLabel="Go"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Confirmation"), {
      target: { value: "x" },
    });

    rerender(
      <TypeToConfirmDialog
        open={false}
        onClose={() => {}}
        onConfirm={() => {}}
        phrase="x"
        warnTitle="W"
        confirmActionLabel="Go"
      />,
    );
    rerender(
      <TypeToConfirmDialog
        open
        onClose={() => {}}
        onConfirm={() => {}}
        phrase="x"
        warnTitle="W"
        confirmActionLabel="Go"
      />,
    );

    // Back at warn stage — type-stage title should NOT appear.
    expect(screen.queryByText("Type 'x' to confirm")).not.toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
  });

  it("disables Cancel + Confirm while loading", () => {
    renderDialog({ loading: true });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Confirmation"), {
      target: { value: "delete" },
    });
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    // Confirm button shows a loading spinner; the Button component renders
    // it as disabled when loading is true.
    expect(screen.getByRole("button", { name: "Delete app" })).toBeDisabled();
  });
});
