import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { ActivityList } from "./ActivityList";

afterEach(cleanup);

const items = [
  { id: "1", icon: "login", label: "Signed in", timestamp: "2 min ago" },
  { id: "2", icon: "key", label: "Added passkey", timestamp: "1 hour ago" },
];

describe("ActivityList", () => {
  it("renders items", () => {
    render(<ActivityList items={items} />);
    expect(screen.getByText("Signed in")).toBeInTheDocument();
    expect(screen.getByText("Added passkey")).toBeInTheDocument();
    expect(screen.getByText("2 min ago")).toBeInTheDocument();
  });

  it("shows loading spinner", () => {
    const { container } = render(<ActivityList items={[]} loading />);
    expect(container.querySelector("[role='progressbar']")).toBeInTheDocument();
  });

  it("shows empty message when no items", () => {
    render(<ActivityList items={[]} />);
    expect(screen.getByText("No activity recorded yet.")).toBeInTheDocument();
  });

  it("shows custom empty message", () => {
    render(<ActivityList items={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("shows load more button when hasMore and onLoadMore", () => {
    const onLoadMore = vi.fn();
    render(<ActivityList items={items} hasMore onLoadMore={onLoadMore} />);
    const btn = screen.getByRole("button", { name: "Load more" });
    fireEvent.click(btn);
    expect(onLoadMore).toHaveBeenCalledOnce();
  });

  it("hides load more when hasMore is false", () => {
    render(<ActivityList items={items} onLoadMore={() => {}} />);
    expect(screen.queryByRole("button", { name: "Load more" })).not.toBeInTheDocument();
  });
});
