import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IconButton } from "./IconButton";

function getButton(container: HTMLElement) {
  return container.querySelector("button") as HTMLButtonElement;
}

describe("IconButton", () => {
  it("renders the icon", () => {
    const { container } = render(
      <IconButton icon="settings" aria-label="Settings" />,
    );
    const icon = container.querySelector(".material-symbols-rounded");
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe("settings");
  });

  it("sets aria-label on the button", () => {
    const { container } = render(
      <IconButton icon="close" aria-label="Close" />,
    );
    expect(getButton(container)).toHaveAttribute("aria-label", "Close");
  });

  it("sets title from tooltip prop", () => {
    const { container } = render(
      <IconButton icon="close" aria-label="Close" tooltip="Close dialog" />,
    );
    expect(getButton(container)).toHaveAttribute("title", "Close dialog");
  });

  it("falls back title to aria-label when no tooltip", () => {
    const { container } = render(
      <IconButton icon="close" aria-label="Close" />,
    );
    expect(getButton(container)).toHaveAttribute("title", "Close");
  });

  describe("variant", () => {
    it("applies text styles by default", () => {
      const { container } = render(
        <IconButton icon="star" aria-label="Star" />,
      );
      const cls = getButton(container).getAttribute("class")!;
      expect(cls).toContain("text-primary");
      expect(cls).not.toContain("border");
    });

    it("applies filled styles", () => {
      const { container } = render(
        <IconButton icon="star" aria-label="Star" variant="filled" />,
      );
      expect(getButton(container).getAttribute("class")).toContain("bg-primary");
    });

    it("applies tonal styles", () => {
      const { container } = render(
        <IconButton icon="star" aria-label="Star" variant="tonal" />,
      );
      expect(getButton(container).getAttribute("class")).toContain("bg-primary-container");
    });

    it("applies outline styles", () => {
      const { container } = render(
        <IconButton icon="star" aria-label="Star" variant="outline" />,
      );
      expect(getButton(container).getAttribute("class")).toContain("border");
    });
  });

  describe("color", () => {
    const colors = ["primary", "secondary", "tertiary", "error", "warning"] as const;

    for (const color of colors) {
      it(`applies ${color} color`, () => {
        const { container } = render(
          <IconButton icon="star" aria-label="Star" variant="filled" color={color} />,
        );
        expect(getButton(container).getAttribute("class")).toContain(`bg-${color}`);
      });
    }
  });

  describe("size", () => {
    it("applies sm size", () => {
      const { container } = render(
        <IconButton icon="star" aria-label="Star" size="sm" />,
      );
      const cls = getButton(container).getAttribute("class")!;
      expect(cls).toContain("h-8");
      expect(cls).toContain("w-8");
    });

    it("applies md size by default", () => {
      const { container } = render(
        <IconButton icon="star" aria-label="Star" />,
      );
      const cls = getButton(container).getAttribute("class")!;
      expect(cls).toContain("h-10");
      expect(cls).toContain("w-10");
    });

    it("applies lg size", () => {
      const { container } = render(
        <IconButton icon="star" aria-label="Star" size="lg" />,
      );
      const cls = getButton(container).getAttribute("class")!;
      expect(cls).toContain("h-12");
      expect(cls).toContain("w-12");
    });
  });

  describe("loading", () => {
    it("shows spinner when loading", () => {
      const { container } = render(
        <IconButton icon="refresh" aria-label="Refresh" loading />,
      );
      expect(container.querySelector("[role='progressbar']")).toBeInTheDocument();
    });

    it("hides icon when loading", () => {
      const { container } = render(
        <IconButton icon="refresh" aria-label="Refresh" loading />,
      );
      expect(container.querySelector(".material-symbols-rounded")).not.toBeInTheDocument();
    });

    it("disables button when loading", () => {
      const { container } = render(
        <IconButton icon="refresh" aria-label="Refresh" loading />,
      );
      expect(getButton(container)).toBeDisabled();
    });
  });

  describe("disabled", () => {
    it("disables the button", () => {
      const { container } = render(
        <IconButton icon="star" aria-label="Star" disabled />,
      );
      expect(getButton(container)).toBeDisabled();
    });
  });

  describe("onClick", () => {
    it("fires when clicked", () => {
      const handler = vi.fn();
      const { container } = render(
        <IconButton icon="star" aria-label="Star" onClick={handler} />,
      );
      fireEvent.click(getButton(container));
      expect(handler).toHaveBeenCalledOnce();
    });

    it("does not fire when disabled", () => {
      const handler = vi.fn();
      const { container } = render(
        <IconButton icon="star" aria-label="Star" disabled onClick={handler} />,
      );
      fireEvent.click(getButton(container));
      expect(handler).not.toHaveBeenCalled();
    });

    it("does not fire when loading", () => {
      const handler = vi.fn();
      const { container } = render(
        <IconButton icon="star" aria-label="Star" loading onClick={handler} />,
      );
      fireEvent.click(getButton(container));
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
