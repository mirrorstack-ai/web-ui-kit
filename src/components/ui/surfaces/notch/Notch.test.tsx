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
    expect(svg).toHaveAttribute("width", "241");
    expect(svg).toHaveAttribute("height", "151");
  });

  it("sets correct SVG dimensions for bottom notch", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={40} notchHeight={50} notchSide="bottom" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "201");
    expect(svg).toHaveAttribute("height", "201");
  });

  it("renders head only", () => {
    const { container } = render(
      <Notch width={200} height={150} notchWidth={60} notchHeight={40} headOnly />,
    );
    const svg = container.querySelector("svg");
    // offset=0 → atStart=true, topIr=0, botIr=6
    // pathW = 60 + 6 = 66, + stroke = 67
    // pathH = 40 + 0 + 6 = 46, + stroke = 47
    expect(svg).toHaveAttribute("width", "67");
    expect(svg).toHaveAttribute("height", "47");
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
