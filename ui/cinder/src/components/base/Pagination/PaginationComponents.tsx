import * as React from "react";

import { cn } from "../../../lib/utils";
import { Button } from "../Button/Button";
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react";
import {
  paginationNav,
  paginationContent,
  paginationPrevious,
  paginationNext,
  paginationText,
  paginationEllipsis,
  srOnly
} from "./Pagination.css";

const PaginationContainer = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav role="navigation" aria-label="pagination" data-slot="pagination" className={cn(paginationNav, className)} {...props} />
);

const PaginationContent = ({ className, ...props }: React.ComponentProps<"ul">) => (
  <ul data-slot="pagination-content" className={cn(paginationContent, className)} {...props} />
);

const PaginationItem = ({ ...props }: React.ComponentProps<"li">) => <li data-slot="pagination-item" {...props} />;

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <Button
    variant={isActive ? "outline" : "ghost"}
    size={size}
    className={cn(className)}
    nativeButton={false}
    render={<a aria-current={isActive ? "page" : undefined} data-slot="pagination-link" data-active={isActive} {...props} />}
  />
);

const PaginationPrevious = ({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn(paginationPrevious, className)} {...props}>
    <CaretLeftIcon data-icon="inline-start" />
    <span className={paginationText}>{text}</span>
  </PaginationLink>
);

const PaginationNext = ({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn(paginationNext, className)} {...props}>
    <span className={paginationText}>{text}</span>
    <CaretRightIcon data-icon="inline-end" />
  </PaginationLink>
);

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden data-slot="pagination-ellipsis" className={cn(paginationEllipsis, className)} {...props}>
    <DotsThreeIcon />
    <span className={srOnly}>More pages</span>
  </span>
);

export {
  PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
};
