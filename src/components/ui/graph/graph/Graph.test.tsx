import { afterEach, describe, expect, it, vi, beforeAll } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Graph, type GraphEdge, type GraphNode } from "./Graph";

// JSDOM lacks pointer-capture APIs that the component calls when a drag
// starts; stub them so handlers don't throw under test.
beforeAll(() => {
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = () => {};
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {};
  }
});

afterEach(cleanup);

const nodes: GraphNode[] = [
  { id: "a", label: "Alpha" },
  { id: "b", label: "Beta" },
  { id: "c", label: "Gamma" },
];

const edges: GraphEdge[] = [
  { source: "a", target: "b" },
  { source: "b", target: "c" },
];

describe("Graph", () => {
  it("renders a node group for each input node", () => {
    const { container } = render(<Graph nodes={nodes} edges={edges} />);
    for (const n of nodes) {
      expect(
        container.querySelector(`[data-node-id="${n.id}"]`),
      ).toBeInTheDocument();
    }
  });

  it("renders each node label", () => {
    const { container } = render(<Graph nodes={nodes} edges={edges} />);
    const labels = Array.from(container.querySelectorAll("text")).map(
      (t) => t.textContent,
    );
    expect(labels).toEqual(expect.arrayContaining(["Alpha", "Beta", "Gamma"]));
  });

  it("fires onNodeClick when pointerdown to pointerup happens on a node without movement", () => {
    const onNodeClick = vi.fn();
    const { container } = render(
      <Graph nodes={nodes} edges={edges} onNodeClick={onNodeClick} />,
    );
    const node = container.querySelector('[data-node-id="b"]') as Element;
    expect(node).toBeTruthy();

    fireEvent.pointerDown(node, {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
    });
    fireEvent.pointerUp(node, {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
    });

    expect(onNodeClick).toHaveBeenCalledWith("b");
  });

  it("highlights the selectedId node with the focused fill class", () => {
    const { container } = render(
      <Graph nodes={nodes} edges={edges} selectedId="c" />,
    );
    const focusedGroup = container.querySelector('[data-node-id="c"]');
    const otherGroup = container.querySelector('[data-node-id="a"]');
    expect(focusedGroup?.querySelector("circle")?.getAttribute("class")).toContain(
      "fill-primary",
    );
    expect(otherGroup?.querySelector("circle")?.getAttribute("class")).toContain(
      "fill-on-surface-variant",
    );
  });
});
