"use client";

import { useMemo, useCallback } from "react";

/** Constant for ellipsis markers in page numbers array */
export const PAGINATION_ELLIPSIS = "ellipsis" as const;
export type PaginationEllipsis = typeof PAGINATION_ELLIPSIS;
export type PageNumber = number | PaginationEllipsis;

export interface UsePaginationOptions {
  /** Current page index (0-based, default: 0) */
  pageIndex?: number;
  /** Total number of items */
  totalCount: number;
  /** Number of items per page (default: 10) */
  pageSize?: number;
  /** Available page size options (default: [10, 25, 50, 100]) */
  pageSizeOptions?: number[];
  /** Maximum number of visible page links (default: 5) */
  maxVisiblePages?: number;
  /** Callback when page changes */
  onPageChange?: (pageIndex: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
}

export interface PaginationProps {
  /** Array of page numbers or ellipsis markers to render */
  pageNumbers: PageNumber[];
  /** Whether previous page navigation is available */
  canPreviousPage: boolean;
  /** Whether next page navigation is available */
  canNextPage: boolean;
  /** Go to a specific page */
  goToPage: (page: number) => void;
  /** Go to the previous page */
  previousPage: () => void;
  /** Go to the next page */
  nextPage: () => void;
  /** Current page index (0-based) */
  pageIndex: number;
  /** Total number of pages */
  pageCount: number;
}

export interface UsePaginationResult extends PaginationProps {
  /** Go to the first page */
  firstPage: () => void;
  /** Go to the last page */
  lastPage: () => void;
  /** First item number being displayed (1-based) */
  startItem: number;
  /** Last item number being displayed */
  endItem: number;
  /** Total number of items */
  totalCount: number;
  /** Current page size */
  pageSize: number;
  /** Available page size options */
  pageSizeOptions: number[];
  /** Handler for page size select change */
  handlePageSizeChange: (value: string | null) => void;
  /** Props to spread to the Pagination component */
  paginationProps: PaginationProps;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const usePagination = ({
  pageIndex: pageIndexProp = 0,
  totalCount,
  pageSize: pageSizeProp = 10,
  pageSizeOptions: pageSizeOptionsProp,
  maxVisiblePages = 5,
  onPageChange,
  onPageSizeChange
}: UsePaginationOptions): UsePaginationResult => {
  const pageIndex = pageIndexProp;
  const pageSize = pageSizeProp;
  const pageSizeOptions = pageSizeOptionsProp ?? DEFAULT_PAGE_SIZE_OPTIONS;

  const pageCount = Math.ceil(totalCount / pageSize);
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  const startItem = totalCount > 0 ? pageIndex * pageSize + 1 : 0;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalCount);

  const goToPage = useCallback(
    (page: number) => {
      const clampedPage = Math.max(0, Math.min(pageCount - 1, page));
      onPageChange?.(clampedPage);
    },
    [pageCount, onPageChange]
  );

  const previousPage = useCallback(() => {
    if (canPreviousPage) goToPage(pageIndex - 1);
  }, [canPreviousPage, pageIndex, goToPage]);

  const nextPage = useCallback(() => {
    if (canNextPage) goToPage(pageIndex + 1);
  }, [canNextPage, pageIndex, goToPage]);

  const firstPage = useCallback(() => {
    goToPage(0);
  }, [goToPage]);

  const lastPage = useCallback(() => {
    goToPage(pageCount - 1);
  }, [pageCount, goToPage]);

  const handlePageSizeChange = useCallback(
    (value: string | null) => {
      if (!value) return;
      const newSize = parseInt(value, 10);
      onPageSizeChange?.(newSize);
      onPageChange?.(0);
    },
    [onPageSizeChange, onPageChange]
  );

  const pageNumbers = useMemo(() => {
    const pages: PageNumber[] = [];

    if (pageCount <= 0) return pages;

    if (pageCount <= maxVisiblePages) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);

      if (pageIndex <= 2) {
        pages.push(1, 2, PAGINATION_ELLIPSIS, pageCount - 1);
      } else if (pageIndex >= pageCount - 3) {
        pages.push(PAGINATION_ELLIPSIS, pageCount - 3, pageCount - 2, pageCount - 1);
      } else {
        pages.push(PAGINATION_ELLIPSIS, pageIndex - 1, pageIndex, pageIndex + 1, PAGINATION_ELLIPSIS, pageCount - 1);
      }
    }

    return pages;
  }, [pageIndex, pageCount, maxVisiblePages]);

  const paginationProps: PaginationProps = {
    pageNumbers,
    canPreviousPage,
    canNextPage,
    goToPage,
    previousPage,
    nextPage,
    pageIndex,
    pageCount
  };

  return {
    ...paginationProps,
    paginationProps,
    firstPage,
    lastPage,
    startItem,
    endItem,
    totalCount,
    pageSize,
    pageSizeOptions,
    handlePageSizeChange
  };
};
