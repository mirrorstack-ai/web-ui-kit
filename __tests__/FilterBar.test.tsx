import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { FilterBar, type FilterChip } from "../src/components/FilterBar";

const filters: FilterChip[] = [
  { id: "images", label: "Images", icon: "image" },
  { id: "videos", label: "Videos", icon: "movie" },
  { id: "documents", label: "Documents", icon: "description" },
];

describe("FilterBar", () => {
  it("renders all filter chips", () => {
    render(
      <FilterBar
        filters={filters}
        activeFilters={new Set()}
        onFilterChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Images")).toBeInTheDocument();
    expect(screen.getByText("Videos")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  it("marks active filters with aria-checked", () => {
    render(
      <FilterBar
        filters={filters}
        activeFilters={new Set(["images"])}
        onFilterChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("checkbox", { name: /Images/ })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("checkbox", { name: /Videos/ })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("calls onFilterChange to add a filter when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterBar
        filters={filters}
        activeFilters={new Set()}
        onFilterChange={handleChange}
      />,
    );

    await user.click(screen.getByText("Images"));

    expect(handleChange).toHaveBeenCalledTimes(1);
    const newFilters = handleChange.mock.calls[0][0] as Set<string>;
    expect(newFilters.has("images")).toBe(true);
  });

  it("calls onFilterChange to remove a filter when clicking active filter", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterBar
        filters={filters}
        activeFilters={new Set(["images"])}
        onFilterChange={handleChange}
      />,
    );

    await user.click(screen.getByText("Images"));

    expect(handleChange).toHaveBeenCalledTimes(1);
    const newFilters = handleChange.mock.calls[0][0] as Set<string>;
    expect(newFilters.has("images")).toBe(false);
  });

  it("allows multiple selections by default", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterBar
        filters={filters}
        activeFilters={new Set(["images"])}
        onFilterChange={handleChange}
      />,
    );

    await user.click(screen.getByText("Videos"));

    const newFilters = handleChange.mock.calls[0][0] as Set<string>;
    expect(newFilters.has("images")).toBe(true);
    expect(newFilters.has("videos")).toBe(true);
  });

  it("clears other selections in single-select mode", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterBar
        filters={filters}
        activeFilters={new Set(["images"])}
        onFilterChange={handleChange}
        multiple={false}
      />,
    );

    await user.click(screen.getByText("Videos"));

    const newFilters = handleChange.mock.calls[0][0] as Set<string>;
    expect(newFilters.has("images")).toBe(false);
    expect(newFilters.has("videos")).toBe(true);
  });

  it("shows and handles clear button when filters are active", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterBar
        filters={filters}
        activeFilters={new Set(["images", "videos"])}
        onFilterChange={handleChange}
      />,
    );

    const clearButton = screen.getByLabelText("Clear all filters");
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);

    const newFilters = handleChange.mock.calls[0][0] as Set<string>;
    expect(newFilters.size).toBe(0);
  });

  it("does not show clear button when no filters are active", () => {
    render(
      <FilterBar
        filters={filters}
        activeFilters={new Set()}
        onFilterChange={vi.fn()}
      />,
    );

    expect(
      screen.queryByLabelText("Clear all filters"),
    ).not.toBeInTheDocument();
  });
});
