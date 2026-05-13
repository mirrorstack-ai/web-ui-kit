import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { NightingaleChart } from "./NightingaleChart";

afterEach(cleanup);

const DATA = [
  { label: "Mon", value: 4 },
  { label: "Tue", value: 9 },
  { label: "Wed", value: 1 },
];

describe("NightingaleChart", () => {
  it("renders one sector path per datum", () => {
    const { container } = render(<NightingaleChart data={DATA} legend={false} />);
    expect(container.querySelectorAll("path")).toHaveLength(3);
  });

  it("produces different geometry for the area vs radius scales", () => {
    const firstPath = (scale: "area" | "radius") => {
      const { container } = render(<NightingaleChart data={DATA} scale={scale} legend={false} />);
      return [...container.querySelectorAll("path")][0].getAttribute("d");
    };
    const area = firstPath("area");
    cleanup();
    const radius = firstPath("radius");
    expect(area).toBeTruthy();
    expect(area).not.toBe(radius);
  });

  it("draws a full disc (no line-to) for a single datum", () => {
    const { container } = render(<NightingaleChart data={[{ label: "All", value: 7 }]} legend={false} />);
    const paths = [...container.querySelectorAll("path")];
    expect(paths).toHaveLength(1);
    expect(paths[0].getAttribute("d")).not.toContain("L"); // a sector wedge would have a "L"
  });

  it("renders a legend row per datum with the formatted value", () => {
    render(<NightingaleChart data={DATA} formatValue={(v) => `${v}h`} />);
    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("9h")).toBeInTheDocument();
  });

  it("pops a portaled hover chip on a sector and clears it on leave", () => {
    const { container } = render(<NightingaleChart data={DATA} legend={false} />);
    const sector = [...container.querySelectorAll("path")][1]; // "Tue"
    expect(screen.queryByText("Tue · 9")).toBeNull();
    fireEvent.pointerEnter(sector, { clientX: 5, clientY: 5 });
    expect(screen.getByText("Tue · 9")).toBeInTheDocument();
    fireEvent.pointerLeave(container.querySelector("svg")!);
    expect(screen.queryByText("Tue · 9")).toBeNull();
  });

  it("renders no sectors for empty data", () => {
    const { container } = render(<NightingaleChart data={[]} legend={false} />);
    expect(container.querySelectorAll("path")).toHaveLength(0);
  });
});
