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

  it("opens menu on click", () => {
    render(<AppSwitcher currentApp="Account" logo={<span>L</span>} apps={apps} activeAppId="account" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("filters out active app from menu", () => {
    render(<AppSwitcher currentApp="Account" logo={<span>L</span>} apps={apps} activeAppId="account" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("menuitem", { name: /Account/ })).not.toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Apps/ })).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(<AppSwitcher currentApp="Account" logo={<span>L</span>} apps={apps} activeAppId="account" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
