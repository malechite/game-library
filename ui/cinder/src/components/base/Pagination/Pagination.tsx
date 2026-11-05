"use client";

import { cn } from "../../../lib/utils";
import {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "./PaginationComponents";
import { PAGINATION_ELLIPSIS, type PaginationProps as BasePaginationProps } from "./usePagination";

export interface PaginationViewProps extends BasePaginationProps {
  /** Additional CSS class */
  className?: string;
}

/**
 * Pagination — Prop-driven pagination navigation.
 *
 * Accepts pagination state (from `usePagination` hook or manual) and renders
 * a complete pagination UI with page links, prev/next, and ellipsis.
 *
 * @example
 * const pagination = usePagination({ totalCount: 100, onPageChange: setPage })
 * <Pagination {...pagination.paginationProps} />
 */
export const Pagination = ({
  pageNumbers,
  canPreviousPage,
  canNextPage,
  goToPage,
  previousPage,
  nextPage,
  pageIndex,
  pageCount,
  className
}: PaginationViewProps) => {
  if (pageCount <= 1) return null;

  return (
    <PaginationContainer className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={canPreviousPage ? previousPage : undefined}
            style={!canPreviousPage ? { pointerEvents: "none", opacity: 0.5 } : undefined}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) =>
          page === PAGINATION_ELLIPSIS ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === pageIndex} onClick={() => goToPage(page)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={canNextPage ? nextPage : undefined}
            style={!canNextPage ? { pointerEvents: "none", opacity: 0.5 } : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
};
