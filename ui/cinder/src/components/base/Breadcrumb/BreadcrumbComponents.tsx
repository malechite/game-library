import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "../../../lib/utils";
import { CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react";
import {
  breadcrumbList,
  breadcrumbItem,
  breadcrumbLink,
  breadcrumbPage,
  breadcrumbSeparator,
  breadcrumbEllipsis,
  srOnly
} from "./Breadcrumb.css";

const BreadcrumbRoot = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav aria-label="breadcrumb" data-slot="breadcrumb" className={cn(className)} {...props} />
);

const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => (
  <ol data-slot="breadcrumb-list" className={cn(breadcrumbList, className)} {...props} />
);

const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li data-slot="breadcrumb-item" className={cn(breadcrumbItem, className)} {...props} />
);

const BreadcrumbLink = ({ className, render, ...props }: useRender.ComponentProps<"a">) =>
  useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(breadcrumbLink, className)
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link"
    }
  });

const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(breadcrumbPage, className)}
    {...props}
  />
);

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    className={cn(breadcrumbSeparator, className)}
    {...props}
  >
    {children ?? <CaretRightIcon />}
  </li>
);

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    className={cn(breadcrumbEllipsis, className)}
    {...props}
  >
    <DotsThreeIcon />
    <span className={srOnly}>More</span>
  </span>
);

export {
  BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
};
