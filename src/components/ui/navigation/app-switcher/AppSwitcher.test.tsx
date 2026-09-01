import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
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
    expect(panel.style.minWidth).toBe("16rem"); // 256px
  });

  /**
   * 🔴 THE CLOSED TRIGGER IS OPAQUE. It floats in a band its host renders
   * `absolute … pointer-events-none` with no fill, so a page scrolling
   * underneath showed THROUGH the control. `background` rather than a surface
   * token: the job is to occlude, and the page's own colour does that without
   * drawing a second card on top of the notch — and it follows a themed host.
   */
  it("fills the closed trigger with the page background", () => {
    render(<AppSwitcher currentApp="Apps" logo={<span />} apps={apps} />);
    const trigger = screen.getByRole("button", { name: /Current app/ });
    expect(trigger).toHaveClass("bg-background", "hover:bg-surface-container");
  });

  /**
   * 🔴 OPEN, IT MUST NOT PAINT AT ALL. The notch is one path with a 1px stroke
   * CENTRED on it, so half falls inside the shape and the open trigger's box
   * sits exactly on that boundary: any fill covers the inner half and the
   * border reads as cut away. No colour fixes it — the card's own fill eats it
   * too.
   */
  it("paints nothing behind the open trigger, so the notch stroke survives", () => {
    render(<AppSwitcher currentApp="Apps" logo={<span />} apps={apps} />);
    const trigger = screen.getByRole("button", { name: /Current app/ });
    fireEvent.click(trigger);
    expect(trigger).not.toHaveClass("bg-background");
    expect(trigger).toHaveClass("rounded-t-2xl");
  });

  /**
   * The radius swap is instant while the fill transitions, so animating the
   * colour alone showed a frame of hard bottom corners as the tab opened.
   */
  it("transitions the radius alongside the fill", () => {
    render(<AppSwitcher currentApp="Apps" logo={<span />} apps={apps} />);
    expect(screen.getByRole("button", { name: /Current app/ })).toHaveClass(
      "transition-[background-color,border-radius]",
    );
  });

  /**
   * 🔴 THE OUTLINE MUST EXIST IN THE FRAME THAT OPENS. Measuring only inside
   * requestAnimationFrame left one painted frame with the card open and nothing
   * drawn behind it — the whole control blinked transparent, and consumers
   * papered over it with their own backgrounds. Layout is committed by the time
   * the effect runs, so the synchronous pass is the one that matters; the rAF
   * stays as a correction.
   */
  it("draws the outline synchronously on open, not a frame later", () => {
    const raf = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 0 as unknown as number);
    try {
      const { container } = render(
        <AppSwitcher currentApp="Apps" logo={<span />} apps={apps} />,
      );
      fireEvent.click(screen.getByRole("button", { name: /Current app/ }));
      const path = container.querySelector("svg path");
      expect(path?.getAttribute("d")).toBeTruthy();
    } finally {
      raf.mockRestore();
    }
  });

  it("closes on Escape", () => {
    render(<AppSwitcher currentApp="Account" logo={<span>L</span>} apps={apps} activeAppId="account" />);
    fireEvent.click(screen.getByRole("button", { name: /Current app/ }));
    expect(screen.getByRole("navigation", { name: "Switch application" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Switch application" })).not.toBeInTheDocument();
  });
});
