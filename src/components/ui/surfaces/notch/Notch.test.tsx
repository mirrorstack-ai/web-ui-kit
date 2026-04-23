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
    expect(svg).toHaveAttribute("width", "61");
    expect(svg).toHaveAttribute("height", "41");
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
});
