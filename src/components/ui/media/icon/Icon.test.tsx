import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders the icon name as text content", () => {
    render(<Icon name="edit" />);
    expect(screen.getByText("edit")).toBeInTheDocument();
  });

  it("applies material-symbols-rounded class", () => {
    render(<Icon name="home" />);
    expect(screen.getByText("home")).toHaveClass("material-symbols-rounded");
  });

  it("sets font size from size prop", () => {
    render(<Icon name="settings" size={32} />);
    expect(screen.getByText("settings")).toHaveStyle({ fontSize: "32px" });
  });

  it("defaults to size 24", () => {
    render(<Icon name="check" />);
    expect(screen.getByText("check")).toHaveStyle({ fontSize: "24px" });
  });

  it("is aria-hidden by default (decorative)", () => {
    render(<Icon name="star" />);
    expect(screen.getByText("star")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses aria-label and role=img when label provided", () => {
    render(<Icon name="delete" aria-label="Delete item" />);
    const el = screen.getByLabelText("Delete item");
    expect(el).toHaveAttribute("role", "img");
    expect(el).not.toHaveAttribute("aria-hidden");
  });

  it("merges custom className", () => {
    render(<Icon name="add" className="text-primary" />);
    expect(screen.getByText("add")).toHaveClass("text-primary");
  });
});
