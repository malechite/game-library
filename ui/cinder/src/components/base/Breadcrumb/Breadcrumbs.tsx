"use client";

import { Fragment, type ReactElement } from "react";
import {
  BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "./BreadcrumbComponents";
import { cn } from "../../../lib/utils";

export interface BreadcrumbEntry {
  /** Display label for the breadcrumb */
  label: string;
  /** URL for the breadcrumb link (omit for non-navigable items) */
  href?: string;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb entries to render */
  crumbs: BreadcrumbEntry[];
  /** Custom link renderer for framework integration (e.g. Next.js Link) */
  renderLink?: (href: string) => ReactElement;
  /** Additional CSS class */
  className?: string;
}

/**
 * Breadcrumbs — Prop-driven breadcrumb navigation.
 *
 * Pass an array of `crumbs` and the component handles separators,
 * link rendering, and marking the last crumb as the current page.
 *
 * @example
 * <Breadcrumbs
 *   crumbs={[
 *     { label: "Home", href: "/" },
 *     { label: "Products", href: "/products" },
 *     { label: "Widget" },
 *   ]}
 * />
 */
export const Breadcrumbs = ({ crumbs, renderLink, className }: BreadcrumbsProps) => {
  if (crumbs.length === 0) return null;

  return (
    <BreadcrumbRoot className={cn(className)}>
      <BreadcrumbList>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <Fragment key={i}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : crumb.href ? (
                  <BreadcrumbLink render={renderLink?.(crumb.href)}>{crumb.label}</BreadcrumbLink>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};
