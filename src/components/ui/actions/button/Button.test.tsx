import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

function getButton(container: HTMLElement) {
  return container.querySelector("button") as HTMLButtonElement;
}

describe("Button", () => {
  it("renders children text", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  describe("variant", () => {
    it("applies filled styles by default", () => {
      const { container } = render(<Button>Test</Button>);
      expect(getButton(container).getAttribute("class")).toContain("bg-primary");
    });

    it("applies tonal styles", () => {
      const { container } = render(<Button variant="tonal">Test</Button>);
      expect(getButton(container).getAttribute("class")).toContain("bg-primary-container");
    });

    it("applies outline styles", () => {
      const { container } = render(<Button variant="outline">Test</Button>);
      expect(getButton(container).getAttribute("class")).toContain("border");
    });

    it("applies text styles", () => {
      const { container } = render(<Button variant="text">Test</Button>);
      const cls = getButton(container).getAttribute("class")!;
      expect(cls).toContain("text-primary");
      expect(cls).not.toContain("border");
    });
  });

  describe("color", () => {
    const colors = ["primary", "secondary", "tertiary", "error", "warning"] as const;

    for (const color of colors) {
      it(`applies ${color} color`, () => {
        const { container } = render(<Button color={color}>Test</Button>);
        expect(getButton(container).getAttribute("class")).toContain(color);
      });
    }
  });

  describe("size", () => {
    it("applies sm size", () => {
      const { container } = render(<Button size="sm">Test</Button>);
      expect(getButton(container).getAttribute("class")).toContain("h-10");
    });

    it("applies md size by default", () => {
      const { container } = render(<Button>Test</Button>);
      expect(getButton(container).getAttribute("class")).toContain("px-4");
    });

    it("applies lg size", () => {
      const { container } = render(<Button size="lg">Test</Button>);
      expect(getButton(container).getAttribute("class")).toContain("text-lg");
    });
  });

  describe("loading", () => {
    it("shows spinner when loading", () => {
      const { container } = render(<Button loading>Test</Button>);
      expect(container.querySelector("[role='progressbar']")).toBeInTheDocument();
    });

    it("disables button when loading", () => {
      const { container } = render(<Button loading>Test</Button>);
      expect(getButton(container)).toBeDisabled();
    });

    it("hides children text when loading", () => {
      const { container } = render(<Button loading>Test</Button>);
      const inner = getButton(container).querySelector("span:last-child");
      expect(inner?.getAttribute("class")).toContain("opacity-0");
    });
  });

  describe("disabled", () => {
    it("disables the button", () => {
      const { container } = render(<Button disabled>Test</Button>);
      expect(getButton(container)).toBeDisabled();
    });
  });

  describe("fullWidth", () => {
    it("applies w-full class", () => {
      const { container } = render(<Button fullWidth>Test</Button>);
      expect(getButton(container).getAttribute("class")).toContain("w-full");
    });
  });

  describe("icons", () => {
    it("renders left icon", () => {
      const { container } = render(<Button leftIcon="search">Test</Button>);
      const icon = container.querySelector(".material-symbols-rounded");
      expect(icon).toBeInTheDocument();
      expect(icon?.textContent).toBe("search");
    });

    it("renders right icon", () => {
      const { container } = render(<Button rightIcon="arrow_forward">Test</Button>);
      const icons = container.querySelectorAll(".material-symbols-rounded");
      expect(icons).toHaveLength(1);
      expect(icons[0].textContent).toBe("arrow_forward");
    });

    it("renders both icons", () => {
      const { container } = render(
        <Button leftIcon="search" rightIcon="arrow_forward">Test</Button>,
      );
      const icons = container.querySelectorAll(".material-symbols-rounded");
      expect(icons).toHaveLength(2);
      expect(icons[0].textContent).toBe("search");
      expect(icons[1].textContent).toBe("arrow_forward");
    });
  });

  describe("onClick", () => {
    it("fires when clicked", () => {
      const handler = vi.fn();
      const { container } = render(<Button onClick={handler}>Test</Button>);
      fireEvent.click(getButton(container));
      expect(handler).toHaveBeenCalledOnce();
    });

    it("does not fire when disabled", () => {
      const handler = vi.fn();
      const { container } = render(<Button disabled onClick={handler}>Test</Button>);
      fireEvent.click(getButton(container));
      expect(handler).not.toHaveBeenCalled();
    });

    it("does not fire when loading", () => {
      const handler = vi.fn();
      const { container } = render(<Button loading onClick={handler}>Test</Button>);
      fireEvent.click(getButton(container));
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
