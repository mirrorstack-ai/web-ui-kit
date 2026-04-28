import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { EmptyState } from "./EmptyState";

afterEach(cleanup);

describe("EmptyState", () => {
  it("renders icon, title", () => {
    render(<EmptyState icon="folder_open" title="No items" />);
    expect(screen.getByText("folder_open")).toBeInTheDocument();
    expect(screen.getByText("No items")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <EmptyState
        icon="search_off"
        title="No results"
        description="Try a different search term."
      />,
    );
    expect(screen.getByText("Try a different search term.")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    const { container } = render(
      <EmptyState icon="folder_open" title="No items" />,
    );
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  it("renders action slot when provided", () => {
    render(
      <EmptyState
        icon="add"
        title="Nothing here"
        action={<button>Create one</button>}
      />,
    );
    expect(screen.getByText("Create one")).toBeInTheDocument();
  });

  it("does not render action when omitted", () => {
    render(<EmptyState icon="folder_open" title="No items" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <EmptyState icon="folder_open" title="No items" className="mt-8" />,
    );
    expect(container.firstChild).toHaveClass("mt-8");
  });
});
