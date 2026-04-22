import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { NavDrawer } from "./NavDrawer";

afterEach(cleanup);

const sections = [
  {
    label: "Main",
    items: [
      { id: "home", label: "Home", icon: "home" },
      { id: "settings", label: "Settings", icon: "settings" },
    ],
  },
  {
    items: [
      { id: "logout", label: "Sign Out", icon: "logout", variant: "danger" as const },
    ],
  },
];

describe("NavDrawer", () => {
  it("renders sections and items", () => {
    render(<NavDrawer sections={sections} />);
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("highlights active item", () => {
    render(<NavDrawer sections={sections} activeItemId="home" />);
    const homeBtn = screen.getByText("Home").closest("button");
    expect(homeBtn).toHaveClass("bg-primary/10");
  });

  it("calls onItemClick when item clicked", () => {
    const onItemClick = vi.fn();
    render(<NavDrawer sections={sections} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByText("Settings"));
    expect(onItemClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: "settings", label: "Settings" }),
    );
  });

  it("renders branding", () => {
    render(<NavDrawer sections={sections} branding={<span>Logo</span>} />);
    expect(screen.getByText("Logo")).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(<NavDrawer sections={sections} footer={<span>Footer</span>} />);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("renders context switcher", () => {
    render(
      <NavDrawer sections={sections} contextSwitcher={<span>User Info</span>} />,
    );
    expect(screen.getByText("User Info")).toBeInTheDocument();
  });
});
