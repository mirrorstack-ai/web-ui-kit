import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AvatarStack } from "./AvatarStack";

afterEach(cleanup);

const items = (n: number) =>
  Array.from({ length: n }, (_, i) => ({ fallback: `P${i}` }));

describe("AvatarStack", () => {
  it("renders all items without a chip up to exactly max", () => {
    render(<AvatarStack items={items(4)} max={4} />);
    expect(screen.getByText("P0")).toBeInTheDocument();
    expect(screen.getByText("P3")).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("collapses overflow into a +N chip within max total slots", () => {
    render(<AvatarStack items={items(6)} max={4} />);
    expect(screen.getByText("P2")).toBeInTheDocument();
    expect(screen.queryByText("P3")).not.toBeInTheDocument();
    expect(screen.getByText("+3")).toBeInTheDocument();
  });

  it("caps the overflow label at 99+", () => {
    render(<AvatarStack items={items(120)} max={4} />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("derives the chip from total when items are a server-capped preview", () => {
    render(<AvatarStack items={items(4)} max={4} total={10} />);
    expect(screen.getByText("P2")).toBeInTheDocument();
    expect(screen.queryByText("P3")).not.toBeInTheDocument();
    expect(screen.getByText("+7")).toBeInTheDocument();
  });

  it("ignores a total below items.length", () => {
    render(<AvatarStack items={items(3)} max={4} total={1} />);
    expect(screen.getByText("P2")).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("renders the trailing avatar square and uncollapsed, even when overflowing", () => {
    const { container } = render(
      <AvatarStack items={items(6)} max={4} trailing={{ fallback: "ORG", square: true }} />,
    );
    expect(screen.getByText("+3")).toBeInTheDocument();
    expect(screen.getByText("ORG")).toBeInTheDocument();
    // All list items are circles, so the only sm square radius source is the
    // trailing avatar.
    expect(container.querySelector(".rounded-lg")).toBeInTheDocument();
  });

  it("renders nothing when empty", () => {
    const { container } = render(<AvatarStack items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("clamps max below 2 instead of dropping the chip", () => {
    render(<AvatarStack items={items(5)} max={0} />);
    expect(screen.getByText("P0")).toBeInTheDocument();
    expect(screen.getByText("+4")).toBeInTheDocument();
  });

  it("overlaps every avatar after the first", () => {
    const { container } = render(<AvatarStack items={items(3)} size="sm" />);
    expect(container.querySelectorAll(".-ml-2")).toHaveLength(2);
  });

  it("renders every avatar opaque so overlaps occlude", () => {
    const { container } = render(
      <AvatarStack items={items(2)} trailing={{ fallback: "ORG", square: true }} />,
    );
    expect(container.querySelectorAll(".bg-surface")).toHaveLength(3);
  });
});
