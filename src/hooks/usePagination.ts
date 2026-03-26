"use client";

import { useState, useMemo, useCallback } from "react";

export interface UsePaginationOptions {
  /** Total number of items */
  totalItems: number;
  /** Items per page (default: 20) */
  pageSize?: number;
  /** Initial page (1-indexed, default: 1) */
  initialPage?: number;
}

export interface PaginationState {
  /** Current page (1-indexed) */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
  /** Start index for slicing data (0-indexed, inclusive) */
  startIndex: number;
  /** End index for slicing data (0-indexed, exclusive) */
  endIndex: number;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Go to a specific page */
  goToPage: (page: number) => void;
  /** Go to the next page */
  nextPage: () => void;
  /** Go to the previous page */
  previousPage: () => void;
  /** Go to the first page */
  firstPage: () => void;
  /** Go to the last page */
  lastPage: () => void;
  /** Reset to first page (useful when data changes) */
  reset: () => void;
}

/**
 * Pagination state management hook.
 *
 * @example
 * ```tsx
 * const pagination = usePagination({ totalItems: items.length });
 * const pageData = items.slice(pagination.startIndex, pagination.endIndex);
 *
 * return (
 *   <>
 *     <DataTable data={pageData} />
 *     <Pagination
 *       page={pagination.page}
 *       totalPages={pagination.totalPages}
 *       onPageChange={pagination.goToPage}
 *     />
 *   </>
 * );
 * ```
 */
export function usePagination({
  totalItems,
  pageSize: initialPageSize = 20,
  initialPage = 1,
}: UsePaginationOptions): PaginationState {
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize],
  );

  // Clamp page to valid range
  const clampedPage = useMemo(
    () => Math.max(1, Math.min(page, totalPages)),
    [page, totalPages],
  );

  const startIndex = (clampedPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const goToPage = useCallback(
    (newPage: number) => {
      setPage(Math.max(1, Math.min(newPage, totalPages)));
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    setPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setPage((p) => Math.max(p - 1, 1));
  }, []);

  const firstPage = useCallback(() => {
    setPage(1);
  }, []);

  const lastPage = useCallback(() => {
    setPage(totalPages);
  }, [totalPages]);

  const reset = useCallback(() => {
    setPage(1);
  }, []);

  return {
    page: clampedPage,
    pageSize,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    hasPreviousPage: clampedPage > 1,
    hasNextPage: clampedPage < totalPages,
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    reset,
  };
}
