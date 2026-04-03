import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ActivityList, type ActivityItem } from "./ActivityList";

const items: ActivityItem[] = [
  { id: "1", icon: "edit", label: "Edited file", timestamp: "2 min ago" },
  { id: "2", icon: "upload", label: "Uploaded image", timestamp: "5 min ago" },
  { id: "3", icon: "delete", label: "Deleted item", timestamp: "1 hour ago" },
];

function renderList(
  props: Partial<Parameters<typeof ActivityList>[0]> = {},
) {
  return render(<ActivityList items={items} {...props} />);
}

describe("ActivityList", () => {
  it("renders all items", () => {
    const { container } = renderList();
    expect(container.textContent).toContain("Edited file");
    expect(container.textContent).toContain("Uploaded image");
    expect(container.textContent).toContain("Deleted item");
  });

  it("renders icon, label, and timestamp for each item", () => {
    const { container } = renderList();
    const rows = container.querySelectorAll(".bg-surface-container");
    expect(rows).toHaveLength(3);

    const firstRow = rows[0];
    expect(firstRow.textContent).toContain("edit");
    expect(firstRow.textContent).toContain("Edited file");
    expect(firstRow.textContent).toContain("2 min ago");
  });

  it("marks icons as aria-hidden", () => {
    const { container } = renderList();
    const icons = container.querySelectorAll("[aria-hidden='true']");
    expect(icons).toHaveLength(3);
  });

  describe("loading", () => {
    it("shows spinner when loading", () => {
      const { container } = renderList({ loading: true });
      expect(container.querySelector("[role='progressbar']")).toBeInTheDocument();
    });

    it("does not render items when loading", () => {
      const { container } = renderList({ loading: true });
      expect(container.textContent).not.toContain("Edited file");
    });
  });

  describe("empty", () => {
    it("shows default empty message when no items", () => {
      const { container } = renderList({ items: [] });
      expect(container.textContent).toContain("No activity recorded yet.");
    });

    it("shows custom empty message", () => {
      const { container } = renderList({
        items: [],
        emptyMessage: "Nothing here",
      });
      expect(container.textContent).toContain("Nothing here");
    });
  });

  describe("load more", () => {
    it("shows load-more button when hasMore and onLoadMore", () => {
      const { container } = renderList({
        hasMore: true,
        onLoadMore: () => {},
      });
      const btn = container.querySelector("button");
      expect(btn).toBeInTheDocument();
      expect(btn?.textContent).toContain("Load more");
    });

    it("does not show load-more button when hasMore is false", () => {
      const { container } = renderList({
        hasMore: false,
        onLoadMore: () => {},
      });
      const btn = container.querySelector("button");
      expect(btn).not.toBeInTheDocument();
    });

    it("does not show load-more button when onLoadMore is not provided", () => {
      const { container } = renderList({ hasMore: true });
      const btn = container.querySelector("button");
      expect(btn).not.toBeInTheDocument();
    });

    it("calls onLoadMore when button is clicked", () => {
      const handler = vi.fn();
      const { container } = renderList({
        hasMore: true,
        onLoadMore: handler,
      });
      const btn = container.querySelector("button") as HTMLButtonElement;
      fireEvent.click(btn);
      expect(handler).toHaveBeenCalledOnce();
    });
  });

  describe("className", () => {
    it("applies className to loading state", () => {
      const { container } = renderList({
        loading: true,
        className: "custom-class",
      });
      expect(
        container.firstElementChild?.getAttribute("class"),
      ).toContain("custom-class");
    });

    it("applies className to empty state", () => {
      const { container } = renderList({
        items: [],
        className: "custom-class",
      });
      expect(
        container.firstElementChild?.getAttribute("class"),
      ).toContain("custom-class");
    });

    it("applies className to list container", () => {
      const { container } = renderList({ className: "custom-class" });
      expect(
        container.firstElementChild?.getAttribute("class"),
      ).toContain("custom-class");
    });
  });
});
