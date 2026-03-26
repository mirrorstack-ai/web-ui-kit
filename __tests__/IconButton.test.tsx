import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { IconButton } from "../src/components/IconButton";

describe("IconButton", () => {
  it("renders the icon with correct aria-label", () => {
    render(<IconButton icon="delete" aria-label="Delete item" />);

    const button = screen.getByRole("button", { name: "Delete item" });
    expect(button).toBeInTheDocument();
    expect(button.querySelector(".material-symbols-rounded")).toHaveTextContent(
      "delete",
    );
  });

  it("applies tooltip via title attribute", () => {
    render(
      <IconButton
        icon="edit"
        aria-label="Edit"
        tooltip="Edit this item"
      />,
    );

    const button = screen.getByRole("button", { name: "Edit" });
    expect(button).toHaveAttribute("title", "Edit this item");
  });

  it("defaults tooltip to aria-label when not provided", () => {
    render(<IconButton icon="settings" aria-label="Open settings" />);

    const button = screen.getByRole("button", { name: "Open settings" });
    expect(button).toHaveAttribute("title", "Open settings");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <IconButton icon="add" aria-label="Add" onClick={handleClick} />,
    );

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<IconButton icon="delete" aria-label="Delete" disabled />);

    expect(screen.getByRole("button", { name: "Delete" })).toBeDisabled();
  });

  it("is disabled when loading prop is true", () => {
    render(<IconButton icon="save" aria-label="Save" loading />);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    // Should show spinner, not the icon
    expect(
      button.querySelector(".material-symbols-rounded"),
    ).not.toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("applies variant and color classes", () => {
    render(
      <IconButton
        icon="close"
        aria-label="Close"
        variant="filled"
        color="error"
      />,
    );

    const button = screen.getByRole("button", { name: "Close" });
    expect(button.className).toContain("bg-error");
  });

  it("applies size classes", () => {
    const { rerender } = render(
      <IconButton icon="add" aria-label="Add" size="sm" />,
    );

    let button = screen.getByRole("button", { name: "Add" });
    expect(button.className).toContain("h-8");
    expect(button.className).toContain("w-8");

    rerender(<IconButton icon="add" aria-label="Add" size="lg" />);

    button = screen.getByRole("button", { name: "Add" });
    expect(button.className).toContain("h-12");
    expect(button.className).toContain("w-12");
  });
});
