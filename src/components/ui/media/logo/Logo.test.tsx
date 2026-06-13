import { cleanup, render } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { Logo } from "./Logo";

afterEach(cleanup);

describe("Logo", () => {
  it("renders an accessible img with the default label", () => {
    const { getByRole } = render(<Logo />);
    expect(getByRole("img", { name: "MirrorStack Logo" })).toBeInTheDocument();
  });

  it("renders six petals across two interleaved triangles", () => {
    const { container } = render(<Logo />);
    expect(container.querySelectorAll("path")).toHaveLength(6);
    expect(container.querySelector(".ms-logo__tri--cw")).toBeInTheDocument();
    expect(container.querySelector(".ms-logo__tri--ccw")).toBeInTheDocument();
  });

  it("uses the fixed brand colours for the two triangles", () => {
    const { container } = render(<Logo />);
    expect(
      container.querySelector(".ms-logo__tri--cw path"),
    ).toHaveAttribute("fill", "#006973");
    expect(
      container.querySelector(".ms-logo__tri--ccw path"),
    ).toHaveAttribute("fill", "#28bdce");
  });

  it("leaves the centre transparent — no painted core element", () => {
    const { container } = render(<Logo />);
    // The aperture's centre hole shows the background through; there must be
    // no circle/core punched on top.
    expect(container.querySelector("circle")).not.toBeInTheDocument();
  });

  it("does not report busy or request the loading animation by default", () => {
    const { getByRole } = render(<Logo />);
    const svg = getByRole("img");
    expect(svg).not.toHaveAttribute("aria-busy");
    expect(svg).not.toHaveClass("ms-logo--loading");
  });

  it("counter-rotates and sets aria-busy when loading", () => {
    const { getByRole } = render(<Logo loading />);
    const svg = getByRole("img");
    expect(svg).toHaveClass("ms-logo--loading");
    expect(svg).toHaveAttribute("aria-busy", "true");
  });

  it("accepts a custom title and className", () => {
    const { getByRole } = render(<Logo title="Loading" className="w-8 h-8" />);
    const svg = getByRole("img", { name: "Loading" });
    expect(svg).toHaveClass("w-8");
    expect(svg).toHaveClass("h-8");
  });
});
