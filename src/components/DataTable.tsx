"use client";

import { useState, useCallback, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Skeleton } from "./Skeleton";
import { EmptyState } from "./EmptyState";

export interface ColumnDef<T> {
  /** Unique key for the column */
  id: string;
  /** Column header text */
  header: string;
  /** Render cell content */
  cell: (row: T) => ReactNode;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Column width class (e.g. "w-48", "min-w-[200px]") */
  width?: string;
  /** Alignment */
  align?: "left" | "center" | "right";
}

export type SortDirection = "asc" | "desc";

export interface SortState {
  columnId: string;
  direction: SortDirection;
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Data rows */
  data: T[];
  /** Extract a unique key from each row */
  getRowId: (row: T) => string;
  /** Sort state (controlled) */
  sort?: SortState;
  /** Called when a column header is clicked for sorting */
  onSortChange?: (sort: SortState) => void;
  /** Enable row selection with checkboxes */
  selectable?: boolean;
  /** Selected row IDs (controlled) */
  selectedIds?: Set<string>;
  /** Called when selection changes */
  onSelectionChange?: (ids: Set<string>) => void;
  /** Called when a row is clicked */
  onRowClick?: (row: T) => void;
  /** Show loading state */
  loading?: boolean;
  /** Number of skeleton rows to show when loading (default: 5) */
  loadingRows?: number;
  /** Empty state props */
  emptyIcon?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  sort,
  onSortChange,
  selectable = false,
  selectedIds,
  onSelectionChange,
  onRowClick,
  loading = false,
  loadingRows = 5,
  emptyIcon = "inbox",
  emptyTitle = "No data",
  emptyDescription,
  className,
}: DataTableProps<T>) {
  const [internalSelected, setInternalSelected] = useState<Set<string>>(
    new Set(),
  );
  const selected = selectedIds ?? internalSelected;
  const setSelected = onSelectionChange ?? setInternalSelected;

  const allIds = data.map(getRowId);
  const allSelected =
    allIds.length > 0 && allIds.every((id) => selected.has(id));
  const someSelected =
    !allSelected && allIds.some((id) => selected.has(id));

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allIds));
    }
  }, [allSelected, allIds, setSelected]);

  const toggleRow = useCallback(
    (id: string) => {
      const next = new Set(selected);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setSelected(next);
    },
    [selected, setSelected],
  );

  const handleSort = useCallback(
    (columnId: string) => {
      if (!onSortChange) return;
      if (sort?.columnId === columnId) {
        onSortChange({
          columnId,
          direction: sort.direction === "asc" ? "desc" : "asc",
        });
      } else {
        onSortChange({ columnId, direction: "asc" });
      }
    },
    [sort, onSortChange],
  );

  const alignClass = (align?: "left" | "center" | "right") => {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
  };

  if (!loading && data.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-xl border border-outline-variant",
        className,
      )}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-outline-variant bg-surface-container">
            {selectable && (
              <th className="w-12 px-3 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                  className="h-4 w-4 rounded accent-primary cursor-pointer"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.id}
                className={cn(
                  "px-4 py-3 font-medium text-on-surface-variant",
                  col.width,
                  alignClass(col.align),
                  col.sortable &&
                    onSortChange &&
                    "cursor-pointer select-none hover:text-on-surface transition-colors",
                )}
                onClick={
                  col.sortable && onSortChange
                    ? () => handleSort(col.id)
                    : undefined
                }
                aria-sort={
                  sort?.columnId === col.id
                    ? sort.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && sort?.columnId === col.id && (
                    <span
                      className="material-symbols-rounded !text-sm"
                    >
                      {sort.direction === "asc"
                        ? "arrow_upward"
                        : "arrow_downward"}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: loadingRows }, (_, i) => (
                <tr
                  key={`skeleton-${i}`}
                  className="border-b border-outline-variant last:border-b-0"
                >
                  {selectable && (
                    <td className="px-3 py-3">
                      <Skeleton width="w-4" height="h-4" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.id} className="px-4 py-3">
                      <Skeleton
                        width={i % 2 === 0 ? "w-3/4" : "w-1/2"}
                        height="h-4"
                      />
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row) => {
                const id = getRowId(row);
                const isSelected = selected.has(id);
                return (
                  <tr
                    key={id}
                    className={cn(
                      "border-b border-outline-variant last:border-b-0 transition-colors",
                      isSelected && "bg-primary/5",
                      onRowClick &&
                        "cursor-pointer hover:bg-surface-container",
                    )}
                    onClick={
                      onRowClick ? () => onRowClick(row) : undefined
                    }
                  >
                    {selectable && (
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleRow(id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select row ${id}`}
                          className="h-4 w-4 rounded accent-primary cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          "px-4 py-3 text-on-surface",
                          col.width,
                          alignClass(col.align),
                        )}
                      >
                        {col.cell(row)}
                      </td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
