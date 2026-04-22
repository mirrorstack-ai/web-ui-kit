import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { NavigationRail } from "./NavigationRail";

afterEach(cleanup);

describe("NavigationRail", () => {
  it("renders children", () => {
    render(<NavigationRail><span>Nav</span></NavigationRail>);
    expect(screen.getByText("Nav")).toBeInTheDocument();
  });

  it("renders logo and header", () => {
    render(
      <NavigationRail logo={<span>Logo</span>} header={<span>Header</span>}>
        <span>Nav</span>
      </NavigationRail>,
    );
    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("shows divider when logo present", () => {
    const { container } = render(
      <NavigationRail logo={<span>Logo</span>}><span>Nav</span></NavigationRail>,
    );
    expect(container.querySelector(".bg-outline")).toBeInTheDocument();
  });

  it("hides divider when no logo or header", () => {
    const { container } = render(
      <NavigationRail><span>Nav</span></NavigationRail>,
    );
    expect(container.querySelector(".bg-outline")).not.toBeInTheDocument();
  });

  it("renders footer", () => {
    render(
      <NavigationRail footer={<span>Footer</span>}><span>Nav</span></NavigationRail>,
    );
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
