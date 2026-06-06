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

  it("closes on Escape", () => {
    render(<AppSwitcher currentApp="Account" logo={<span>L</span>} apps={apps} activeAppId="account" />);
    fireEvent.click(screen.getByRole("button", { name: /Current app/ }));
    expect(screen.getByRole("navigation", { name: "Switch application" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Switch application" })).not.toBeInTheDocument();
  });
});
