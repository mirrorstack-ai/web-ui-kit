import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ModuleSettingsLayout } from "../src/components/ModuleSettingsLayout";
import type { SettingsNavSection } from "../src/components/SettingsLayout";

const navSections: SettingsNavSection[] = [
  {
    label: "Configuration",
    items: [
      { id: "general", label: "General", icon: "settings" },
      { id: "storage", label: "Storage", icon: "cloud" },
    ],
  },
  {
    label: "Danger zone",
    items: [
      {
        id: "delete",
        label: "Delete module",
        icon: "delete",
        variant: "danger",
      },
    ],
  },
];

describe("ModuleSettingsLayout", () => {
  it("renders module name in the header", () => {
    render(
      <ModuleSettingsLayout
        moduleName="Media Library"
        navSections={navSections}
      >
        <div>Content</div>
      </ModuleSettingsLayout>,
    );

    expect(screen.getByText("Media Library")).toBeInTheDocument();
  });

  it("renders module description when provided", () => {
    render(
      <ModuleSettingsLayout
        moduleName="Media Library"
        moduleDescription="v2.1.0"
        navSections={navSections}
      >
        <div>Content</div>
      </ModuleSettingsLayout>,
    );

    expect(screen.getByText("v2.1.0")).toBeInTheDocument();
  });

  it("renders module icon", () => {
    const { container } = render(
      <ModuleSettingsLayout
        moduleName="Media"
        moduleIcon="perm_media"
        navSections={navSections}
      >
        <div>Content</div>
      </ModuleSettingsLayout>,
    );

    const icons = container.querySelectorAll(".material-symbols-rounded");
    const iconTexts = Array.from(icons).map((el) => el.textContent);
    expect(iconTexts).toContain("perm_media");
  });

  it("renders children in the content area", () => {
    render(
      <ModuleSettingsLayout
        moduleName="Media"
        navSections={navSections}
      >
        <div data-testid="content">Settings content here</div>
      </ModuleSettingsLayout>,
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders navigation items from sections", () => {
    render(
      <ModuleSettingsLayout
        moduleName="Media"
        navSections={navSections}
      >
        <div>Content</div>
      </ModuleSettingsLayout>,
    );

    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Storage")).toBeInTheDocument();
    expect(screen.getByText("Delete module")).toBeInTheDocument();
  });

  it("calls onNavItemClick when a nav item is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <ModuleSettingsLayout
        moduleName="Media"
        navSections={navSections}
        onNavItemClick={handleClick}
      >
        <div>Content</div>
      </ModuleSettingsLayout>,
    );

    await user.click(screen.getByText("General"));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: "general", label: "General" }),
    );
  });

  it("renders footer actions when provided", () => {
    render(
      <ModuleSettingsLayout
        moduleName="Media"
        navSections={navSections}
        footerActions={<button>Save Changes</button>}
      >
        <div>Content</div>
      </ModuleSettingsLayout>,
    );

    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });
});
