"use client";

import { cn } from "../utils/cn";

export interface PaginationProps {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Called when the user navigates to a page */
  onPageChange: (page: number) => void;
  /** Maximum number of page buttons visible (default: 7) */
  maxVisible?: number;
  className?: string;
}

function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

function getPageNumbers(
  current: number,
  total: number,
  maxVisible: number,
): (number | "ellipsis")[] {
  if (total <= maxVisible) {
    return range(1, total);
  }

  const sideWidth = Math.floor((maxVisible - 3) / 2);
  const leftEnd = Math.max(2, current - sideWidth);
  const rightStart = Math.min(total - 1, current + sideWidth);

  const pages: (number | "ellipsis")[] = [1];

  if (leftEnd > 2) {
    pages.push("ellipsis");
  }

  for (let i = leftEnd; i <= rightStart; i++) {
    pages.push(i);
  }

  if (rightStart < total - 1) {
    pages.push("ellipsis");
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  maxVisible = 7,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages, maxVisible);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="h-9 w-9 rounded-lg inline-flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
          chevron_left
        </span>
      </button>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="h-9 w-9 inline-flex items-center justify-center text-on-surface-variant text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            className={cn(
              "h-9 min-w-9 px-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
              p === page
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:bg-surface-container",
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="h-9 w-9 rounded-lg inline-flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
          chevron_right
        </span>
      </button>
    </nav>
  );
}
