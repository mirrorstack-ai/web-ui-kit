import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { BottomNavItem } from "./BottomNavItem";

afterEach(cleanup);

describe("BottomNavItem", () => {
  it("shows the label only while selected", () => {
    const { rerender } = render(<BottomNavItem icon="dashboard" label="Overview" />);
    expect(screen.queryByText("Overview")).not.toBeInTheDocument();

    rerender(<BottomNavItem icon="dashboard" label="Overview" selected />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("never shows the label when showTitle is false", () => {
    render(<BottomNavItem icon="more_horiz" label="More" selected showTitle={false} />);
    expect(screen.queryByText("More")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More" })).toBeInTheDocument();
  });

  it("marks the selected item as the current page", () => {
    render(<BottomNavItem icon="dashboard" label="Overview" selected />);
    expect(screen.getByRole("button", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders customIcon in a bordered frame while selected", () => {
    const { container } = render(
      <BottomNavItem customIcon={<span>App</span>} label="My App" selected showTitle={false} />,
    );
    expect(screen.getByText("App")).toBeInTheDocument();
    expect(container.querySelector(".border-primary")).toBeInTheDocument();
  });

  it("uses a circular frame for iconShape circle", () => {
    const { container } = render(
      <BottomNavItem customIcon={<span>U</span>} iconShape="circle" label="Account" />,
    );
    expect(container.querySelector(".rounded-full")).toBeInTheDocument();
  });
});
