import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { AppSwitcher } from "./AppSwitcher";

afterEach(cleanup);

const apps = [
  { id: "account", label: "Account", icon: "shield_person", href: "/account" },
  { id: "apps", label: "Apps", icon: "apps", href: "/apps" },
];

describe("AppSwitcher", () => {
  it("renders current app name", () => {
    render(<AppSwitcher currentApp="Account" logo={<span>L</span>} apps={apps} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
  });

  it("opens the switcher panel on click", () => {
    render(<AppSwitcher currentApp="Account" logo={<span>L</span>} apps={apps} activeAppId="account" />);
    fireEvent.click(screen.getByRole("button", { name: /Current app/ }));
    expect(screen.getByRole("navigation", { name: "Switch application" })).toBeInTheDocument();
  });

  it("filters out the active app from the panel", () => {
    render(<AppSwitcher currentApp="Account" logo={<span>L</span>} apps={apps} activeAppId="account" />);
    fireEvent.click(screen.getByRole("button", { name: /Current app/ }));
    expect(screen.queryByRole("link", { name: /Account/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Apps/ })).toBeInTheDocument();
  });

  /**
   * 🔴 THE TRIGGER MUST NOT SET THE MENU'S WIDTH. The container is `w-fit`, so
   * a switcher labelled 帳號 opened a menu about that wide — every row's label
   * hit `truncate` and every description `line-clamp-1`, so a menu whose entire
   * job is to describe the places you can go described none of them. The
   * narrower the current app's name, the less legible the menu.
   */
  it("holds a width floor the trigger's label cannot shrink", () => {
    render(<AppSwitcher currentApp="帳號" logo={<span>L</span>} apps={apps} activeAppId="account" />);
    fireEvent.click(screen.getByRole("button", { name: /Current app/ }));
    const panel = screen.getByRole("navigation", { name: "Switch application" })
      .parentElement as HTMLElement;
    expect(panel.style.minWidth).toBe("17rem");
  });

  it("closes on Escape", () => {
    render(<AppSwitcher currentApp="Account" logo={<span>L</span>} apps={apps} activeAppId="account" />);
    fireEvent.click(screen.getByRole("button", { name: /Current app/ }));
    expect(screen.getByRole("navigation", { name: "Switch application" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Switch application" })).not.toBeInTheDocument();
  });
});
