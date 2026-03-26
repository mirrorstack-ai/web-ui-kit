"use client";

import { cn } from "../utils/cn";

export interface FilterChip {
  /** Unique key */
  id: string;
  /** Display label */
  label: string;
  /** Material Symbols icon name */
  icon?: string;
}

export interface FilterBarProps {
  /** Available filter chips */
  filters: FilterChip[];
  /** Currently active filter IDs */
  activeFilters: Set<string>;
  /** Called when a filter chip is toggled */
  onFilterChange: (activeFilters: Set<string>) => void;
  /** Allow selecting multiple filters (default: true) */
  multiple?: boolean;
  /** Label for assistive technology */
  "aria-label"?: string;
  className?: string;
}

/**
 * Composable filter chip bar for filtering lists or tables.
 *
 * @example
 * ```tsx
 * const [active, setActive] = useState<Set<string>>(new Set());
 *
 * <FilterBar
 *   filters={[
 *     { id: "images", label: "Images", icon: "image" },
 *     { id: "videos", label: "Videos", icon: "movie" },
 *     { id: "documents", label: "Documents", icon: "description" },
 *   ]}
 *   activeFilters={active}
 *   onFilterChange={setActive}
 * />
 * ```
 */
export function FilterBar({
  filters,
  activeFilters,
  onFilterChange,
  multiple = true,
  "aria-label": ariaLabel = "Filters",
  className,
}: FilterBarProps) {
  const handleToggle = (id: string) => {
    const next = new Set(activeFilters);

    if (next.has(id)) {
      next.delete(id);
    } else {
      if (!multiple) {
        next.clear();
      }
      next.add(id);
    }

    onFilterChange(next);
  };

  const handleClearAll = () => {
    onFilterChange(new Set());
  };

  const hasActiveFilters = activeFilters.size > 0;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("flex items-center gap-2 flex-wrap", className)}
    >
      {filters.map((filter) => {
        const isActive = activeFilters.has(filter.id);
        return (
          <button
            key={filter.id}
            type="button"
            role="checkbox"
            aria-checked={isActive}
            onClick={() => handleToggle(filter.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
              "border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isActive
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-surface-container text-on-surface-variant border-outline-variant hover:bg-surface-container-high",
            )}
          >
            {filter.icon && (
              <span
                className="material-symbols-rounded"
                style={{ fontSize: 16 }}
                aria-hidden="true"
              >
                {isActive ? "check" : filter.icon}
              </span>
            )}
            {!filter.icon && isActive && (
              <span
                className="material-symbols-rounded"
                style={{ fontSize: 16 }}
                aria-hidden="true"
              >
                check
              </span>
            )}
            {filter.label}
          </button>
        );
      })}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={handleClearAll}
          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          aria-label="Clear all filters"
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 14 }}
            aria-hidden="true"
          >
            close
          </span>
          Clear
        </button>
      )}
    </div>
  );
}
