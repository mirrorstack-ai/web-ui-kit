import { cleanup, render } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { Notch } from "./Notch";

afterEach(cleanup);

describe("Notch", () => {
  it("renders an SVG with path", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector("path")).toBeInTheDocument();
  });

  it("sets correct SVG dimensions for right notch", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} notchSide="right" />,
    );
    const svg = container.querySelector("svg");
    // Element is the content box (width+notchWidth × height); the centered
    // stroke is accommodated by the padded viewBox (content + strokeWidth,
    // offset by -strokeWidth/2) so the border stays inside the box.
    expect(svg).toHaveAttribute("width", "240");
    expect(svg).toHaveAttribute("height", "150");
    expect(svg).toHaveAttribute("viewBox", "-0.5 -0.5 241 151");
  });

  it("sets correct SVG dimensions for bottom notch", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} notchSide="bottom" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "200");
    expect(svg).toHaveAttribute("height", "200");
    expect(svg).toHaveAttribute("viewBox", "-0.5 -0.5 201 201");
  });

  it("renders head only", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={60} notchHeight={40} headOnly />,
    );
    const svg = container.querySelector("svg");
    // offset=0 → atStart=true, topIr=0, botIr=6
    // pathW = 60 + 6 = 66 (element width); pathH = 40 + 0 + 6 = 46 (element height)
    // viewBox pads by strokeWidth so the stroke stays inside the box: 67 × 47.
    expect(svg).toHaveAttribute("width", "66");
    expect(svg).toHaveAttribute("height", "46");
    expect(svg).toHaveAttribute("viewBox", "-0.5 -0.5 67 47");
  });

  it("bleeds the headOnly connecting edge to avoid a fractional-DPI seam", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={60} notchHeight={40} headOnly />,
    );
    const svg = container.querySelector("svg");
    // The flat connecting edge (build x=0) is extended to x=-1 so the tab fill
    // OVERLAPS the surface below rather than abutting it edge-to-edge — otherwise
    // the shared boundary aliases into a 1px seam on non-integer DPR. overflow
    // must be visible so that 1px bleed isn't clipped to the box.
    expect(svg).toHaveAttribute("overflow", "visible");
    expect(svg?.querySelector("path")?.getAttribute("d")).toMatch(/^M -1,/);
  });

  it("applies fill and stroke", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} fill="red" stroke="blue" strokeWidth={2} />,
    );
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "red");
    expect(path).toHaveAttribute("stroke", "blue");
    expect(path).toHaveAttribute("stroke-width", "2");
  });

  it("supports fill none for outline only", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} fill="none" />,
    );
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "none");
  });

  // notchOffset semantics: positive = from left, on the top AND bottom edges.
  // The top edge renders via rotate(90), which mirrors the build axis — these
  // pin the internal flip that compensates, so a given offset lands the tab at
  // the same visual spot whichever edge it's on.
  describe("notchOffset edge semantics", () => {
    const pathD = (notchSide: "top" | "bottom", notchOffset: number) => {
      const { container } = render(
        <Notch
          width={200}
          height={150}
          notchWidth={52}
          notchHeight={46}
          notchSide={notchSide}
          notchOffset={notchOffset}
        />,
      );
      const d = container.querySelector("path")?.getAttribute("d");
      cleanup();
      return d;
    };

    it("mirrors the build-space offset on the top edge", () => {
      // Same visual spot (30px from the left) requires mirrored build paths:
      // top(30) must match bottom's tab placed 30px from the RIGHT (-30).
      expect(pathD("top", 30)).toBe(pathD("bottom", -30));
      expect(pathD("top", -30)).toBe(pathD("bottom", 30));
    });

    it("keeps top and bottom build paths distinct for an uncentered offset", () => {
      expect(pathD("top", 30)).not.toBe(pathD("bottom", 30));
    });
  });
});
