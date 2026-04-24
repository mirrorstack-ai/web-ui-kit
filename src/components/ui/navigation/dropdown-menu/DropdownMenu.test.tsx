import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { DropdownMenu } from "./DropdownMenu";
import type { DropdownMenuEntry } from "./DropdownMenu";

afterEach(cleanup);

const items: DropdownMenuEntry[] = [
  { id: "edit", label: "Edit", icon: "edit" },
  { id: "duplicate", label: "Duplicate", icon: "content_copy" },
  { type: "separator" },
  { id: "disabled-item", label: "Locked", disabled: true },
  { id: "delete", label: "Delete", icon: "delete", variant: "danger" },
];

const trigger = <button>Open</button>;

describe("DropdownMenu", () => {
  it("renders trigger", () => {
    render(<DropdownMenu items={items} onSelect={() => {}} trigger={trigger} />);
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("opens menu on click", () => {
    render(<DropdownMenu items={items} onSelect={() => {}} trigger={trigger} />);
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("calls onSelect when item clicked", () => {
    const onSelect = vi.fn();
    render(<DropdownMenu items={items} onSelect={onSelect} trigger={trigger} />);
    fireEvent.click(screen.getByText("Open"));
    fireEvent.click(screen.getByText("Edit"));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "edit", label: "Edit" }),
    );
  });

  it("closes on Escape", () => {
    render(<DropdownMenu items={items} onSelect={() => {}} trigger={trigger} />);
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("skips disabled items in keyboard nav", () => {
    const onSelect = vi.fn();
    render(<DropdownMenu items={items} onSelect={onSelect} trigger={trigger} />);
    fireEvent.click(screen.getByText("Open"));
    const menu = screen.getByRole("menu");

    // ArrowDown from first item (Edit) -> Duplicate -> skip separator -> skip disabled -> Delete
    fireEvent.keyDown(menu, { key: "ArrowDown" }); // Edit -> Duplicate
    fireEvent.keyDown(menu, { key: "ArrowDown" }); // Duplicate -> Delete (skips separator + disabled)
    fireEvent.keyDown(menu, { key: "Enter" });

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "delete" }),
    );
  });
});
