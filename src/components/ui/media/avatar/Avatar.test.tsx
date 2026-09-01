import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Avatar } from "./Avatar";

afterEach(cleanup);

describe("Avatar", () => {
  it("renders initials fallback when no src", () => {
    render(<Avatar fallback="John" />);
    expect(screen.getByText("JOH")).toBeInTheDocument();
  });

  it("uses up to 3 chars of the fallback, uppercased", () => {
    const a = render(<Avatar fallback="A" />);
    expect(a.getByText("A")).toBeInTheDocument();
    a.unmount();

    const ab = render(<Avatar fallback="ab" />);
    expect(ab.getByText("AB")).toBeInTheDocument();
    ab.unmount();

    const abcde = render(<Avatar fallback="abcde" />);
    expect(abcde.getByText("ABC")).toBeInTheDocument();
  });

  it("scales the text size down as char count grows", () => {
    const one = render(<Avatar size="xl" fallback="A" />);
    expect(one.getByText("A")).toHaveClass("text-2xl");
    one.unmount();

    const two = render(<Avatar size="xl" fallback="AB" />);
    expect(two.getByText("AB")).toHaveClass("text-xl");
    two.unmount();

    const three = render(<Avatar size="xl" fallback="ABC" />);
    expect(three.getByText("ABC")).toHaveClass("text-lg");
  });

  it("renders image when src provided", () => {
    const { container } = render(<Avatar src="https://example.com/photo.jpg" />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("defaults to U when no fallback", () => {
    render(<Avatar />);
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("shows edit badge when editable", () => {
    render(<Avatar editable />);
    expect(screen.getByText("edit")).toBeInTheDocument();
  });

  it("triggers file input on click when editable", () => {
    const onFileSelect = vi.fn();
    const { container } = render(<Avatar editable onFileSelect={onFileSelect} />);
    const button = container.querySelector("button");
    fireEvent.click(button!);
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
  });

  it("applies a square radius that scales with size", () => {
    const xl = render(<Avatar square size="xl" fallback="S" />);
    expect(xl.container.querySelector(".rounded-3xl")).toBeInTheDocument();
    xl.unmount();

    const sm = render(<Avatar square size="sm" fallback="S" />);
    expect(sm.container.querySelector(".rounded-lg")).toBeInTheDocument();
  });

  it("renders overlay and hides initials", () => {
    render(<Avatar editable overlay={<span data-testid="spinner" />} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByText("U")).not.toBeInTheDocument();
  });

  it("paints an opaque surface backdrop only when opaque is set", () => {
    const plain = render(<Avatar fallback="A" />);
    expect(plain.container.querySelector(".bg-surface")).not.toBeInTheDocument();
    plain.unmount();

    const { container } = render(<Avatar opaque square size="sm" fallback="A" />);
    const backdrop = container.querySelector(".bg-surface");
    expect(backdrop).toBeInTheDocument();
    // The backdrop radius follows the avatar's own (sm square → rounded-lg)
    // so it hugs the tile instead of squaring its corners.
    expect(backdrop).toHaveClass("rounded-lg");
  });

  it("non-editable square avoids the badge-accommodating bottom-right radius", () => {
    const { container } = render(<Avatar square size="xl" fallback="S" />);
    expect(container.querySelector(".rounded-3xl")).toBeInTheDocument();
    // The rounded-br-* override is only used when editable+square so
    // the corner visually carves room for the edit badge; a
    // non-editable square stays uniform.
    expect(container.querySelector('[class*="rounded-br-"]')).not.toBeInTheDocument();
  });

  /**
   * 🔴 THE DEFAULT FRAME IS ONLY RIGHT ON A NEUTRAL SURFACE. `primary` on a
   * `primary-container` panel is two tones of one hue stacked — the border does
   * not go missing, it goes invisible, worst on exactly the palettes whose
   * accent is palest. Consumers were reaching past this component to fix it,
   * overriding the frame by its SIZE class, which stops matching the day the
   * size changes.
   */
  describe("tone", () => {
    it("frames the initials fallback from primary by default", () => {
      const { container } = render(<Avatar fallback="E" />);
      const box = container.querySelector(".border-2");
      expect(box).toHaveClass("border-primary", "bg-primary/20");
      expect(screen.getByText("E")).toHaveClass("text-primary");
    });

    it("frames the initials fallback from the on-container pair when asked", () => {
      const { container } = render(<Avatar fallback="E" tone="onPrimaryContainer" />);
      const box = container.querySelector(".border-2");
      expect(box).toHaveClass(
        "border-on-primary-container",
        "bg-on-primary-container/10",
      );
      expect(screen.getByText("E")).toHaveClass("text-on-primary-container");
      expect(box).not.toHaveClass("border-primary");
    });

    it("recolors the image border too, not just the fallback", () => {
      const { container } = render(
        <Avatar src="https://example.test/a.png" tone="onPrimaryContainer" />,
      );
      expect(container.querySelector("img")).toHaveClass(
        "border-on-primary-container",
      );
    });

    /** `plain` drops the frame entirely, so there is nothing left to tone. */
    it("draws no frame at all when plain, whatever the tone", () => {
      const { container } = render(
        <Avatar src="https://example.test/a.png" plain tone="onPrimaryContainer" />,
      );
      const img = container.querySelector("img");
      expect(img).not.toHaveClass("border-2");
      expect(img).toHaveClass("object-contain");
    });
  });
});
