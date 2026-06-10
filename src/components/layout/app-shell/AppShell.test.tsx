import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { AppShell } from "./AppShell";

afterEach(cleanup);

describe("AppShell mobile navigation", () => {
  it("hosts mobileNavigation as a pinned bar by default", () => {
    render(
      <AppShell mobileNavigation={<span>Bottom bar</span>}>content</AppShell>,
    );
    expect(screen.getByText("Bottom bar")).toBeInTheDocument();
    expect(screen.queryByLabelText("Open navigation")).not.toBeInTheDocument();
  });

  it("drawer variant renders a menu trigger and opens the drawer on click", () => {
    render(
      <AppShell
        mobileNavigationVariant="drawer"
        navigation={<span>Drawer nav</span>}
      >
        content
      </AppShell>,
    );
    // Side nav markup exists (hidden via CSS below lg); the drawer is closed.
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Open navigation"));
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent("Drawer nav");
  });

  it("drawer prefers mobileNavigation content over navigation", () => {
    render(
      <AppShell
        mobileNavigationVariant="drawer"
        navigation={<span>Desktop nav</span>}
        mobileNavigation={<span>Mobile nav</span>}
      >
        content
      </AppShell>,
    );
    fireEvent.click(screen.getByLabelText("Open navigation"));
    expect(screen.getByRole("dialog")).toHaveTextContent("Mobile nav");
    expect(screen.getByRole("dialog")).not.toHaveTextContent("Desktop nav");
  });

  it("closes the drawer when a nav control inside is activated", () => {
    render(
      <AppShell
        mobileNavigationVariant="drawer"
        navigation={<button type="button">Profile</button>}
      >
        content
      </AppShell>,
    );
    fireEvent.click(screen.getByLabelText("Open navigation"));
    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Profile" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the drawer on Escape", () => {
    render(
      <AppShell mobileNavigationVariant="drawer" navigation={<span>Nav</span>}>
        content
      </AppShell>,
    );
    fireEvent.click(screen.getByLabelText("Open navigation"));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
