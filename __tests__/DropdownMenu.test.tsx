import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DropdownMenu, type DropdownMenuEntry } from "../src/components/DropdownMenu";

const items: DropdownMenuEntry[] = [
  { id: "edit", label: "Edit", icon: "edit" },
  { id: "duplicate", label: "Duplicate", icon: "content_copy" },
  { type: "separator" },
  { id: "delete", label: "Delete", icon: "delete", variant: "danger" },
];

function renderMenu(onSelect = vi.fn()) {
  return render(
    <DropdownMenu
      trigger={<button>Actions</button>}
      items={items}
      onSelect={onSelect}
    />,
  );
}

describe("DropdownMenu", () => {
  it("does not show the menu initially", () => {
    renderMenu();

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByText("Actions"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("shows all menu items when open", async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByText("Actions"));

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Duplicate")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onSelect and closes when an item is clicked", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    renderMenu(handleSelect);

    await user.click(screen.getByText("Actions"));
    await user.click(screen.getByText("Edit"));

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "edit", label: "Edit" }),
    );
    // Menu should close after selection
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByText("Actions"));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("navigates items with arrow keys and selects with Enter", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    renderMenu(handleSelect);

    await user.click(screen.getByText("Actions"));

    // Arrow down to first item, then Enter
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "edit" }),
    );
  });

  it("renders separators", async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByText("Actions"));

    const separators = screen.getAllByRole("separator");
    expect(separators).toHaveLength(1);
  });

  it("does not call onSelect for disabled items", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const itemsWithDisabled: DropdownMenuEntry[] = [
      { id: "edit", label: "Edit" },
      { id: "locked", label: "Locked", disabled: true },
    ];

    render(
      <DropdownMenu
        trigger={<button>Actions</button>}
        items={itemsWithDisabled}
        onSelect={handleSelect}
      />,
    );

    await user.click(screen.getByText("Actions"));
    await user.click(screen.getByText("Locked"));

    expect(handleSelect).not.toHaveBeenCalled();
  });
});
