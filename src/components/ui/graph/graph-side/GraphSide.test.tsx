import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { GraphSide, type GraphSideNode } from "./GraphSide";

afterEach(cleanup);

const node: GraphSideNode = { id: "a", label: "Alpha", tag: "core" };

describe("GraphSide", () => {
  it("renders details when a node is provided", () => {
    const { getByText } = render(
      <GraphSide
        node={node}
        onClose={() => {}}
        renderDetails={(n) => <p>Details for {n.label}</p>}
      />,
    );
    expect(getByText("Details for Alpha")).toBeInTheDocument();
    expect(getByText("Alpha")).toBeInTheDocument();
    expect(getByText("core")).toBeInTheDocument();
  });

  it("fires onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <GraphSide
        node={node}
        onClose={onClose}
        renderDetails={() => null}
      />,
    );
    fireEvent.click(getByRole("button", { name: "Close details" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render details when node is null", () => {
    const { queryByText } = render(
      <GraphSide
        node={null}
        onClose={() => {}}
        renderDetails={(n) => <p>Details for {n.label}</p>}
      />,
    );
    expect(queryByText(/Details for/)).toBeNull();
  });

  it("honors the open prop when explicitly set to false even with a node", () => {
    const { container } = render(
      <GraphSide
        node={node}
        open={false}
        onClose={() => {}}
        renderDetails={() => null}
      />,
    );
    const panel = container.firstChild as HTMLElement;
    expect(panel.getAttribute("aria-hidden")).toBe("true");
  });
});
