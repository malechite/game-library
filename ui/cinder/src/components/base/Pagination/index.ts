// High-level prop-driven component (recommended)
export { Pagination, type PaginationViewProps } from "./Pagination";

// Hook for managing pagination state
export {
  usePagination,
  PAGINATION_ELLIPSIS,
  type UsePaginationOptions,
  type UsePaginationResult,
  type PaginationProps as BasePaginationProps,
  type PageNumber,
  type PaginationEllipsis
} from "./usePagination";

// Low-level building blocks (for advanced customization)
export {
  PaginationContainer,
  PaginationContent,
  PaginationEllipsis as PaginationEllipsisIcon,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "./PaginationComponents";
