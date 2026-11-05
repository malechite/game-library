"use client";

import type { ReactNode } from "react";
import { MagnifyingGlassIcon, SortAscendingIcon, XIcon } from "@phosphor-icons/react";

import { cn } from "../../../lib/utils";
import { Button } from "../../base/Button";
import { Input } from "../../base/Input";
import { Select } from "../../base/Select";
import {
  filterBar,
  filterBarSearch,
  filterBarSearchIcon,
  filterBarSearchInput,
  filterBarSearchClear,
  filterBarGroup,
  filterBarEnd,
  filterBarLabel,
  filterBarActive,
  filterBarToggle
} from "./FilterBar.css";

/** Select value standing for "no filter" (Select needs a concrete string). */
const ALL = "__all__";

export interface FilterBarOption {
  value: string;
  label: string;
}

export interface FilterBarFilter {
  /** Key this filter's value is stored under in `values`. */
  key: string;
  /** Plural noun for the dimension, e.g. "Platforms" — used for the "All …" choice. */
  label: string;
  options: FilterBarOption[];
  /** Override the text of the "no filter" choice (default `All ${label}`). */
  allLabel?: string;
}

export interface FilterBarToggle {
  /** Stable key for the toggle. */
  key: string;
  /** Button text. */
  label: string;
  /** Optional leading icon (any node, so the caller controls weight and color). */
  icon?: ReactNode;
  /** Whether the toggle is on. */
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
}

export interface FilterBarSearch {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface FilterBarSort {
  value: string;
  options: FilterBarOption[];
  onChange: (value: string) => void;
}

export interface FilterBarProps {
  /** Free-text search box. Omit to hide it. */
  search?: FilterBarSearch;
  /** Dropdown filters, rendered in order. */
  filters?: FilterBarFilter[];
  /** Current value per filter key; a missing/undefined entry means "all". */
  values?: Record<string, string | undefined>;
  /** Called with `undefined` when a filter is set back to "all". */
  onFilterChange?: (key: string, value: string | undefined) => void;
  /** On/off filters (e.g. "Favorites"), rendered after the dropdowns. */
  toggles?: FilterBarToggle[];
  /** Sort order picker, shown at the right. */
  sort?: FilterBarSort;
  /** Shown as a "Clear" button whenever the search or any filter is active. */
  onClear?: () => void;
  /** Extra controls after the sort (e.g. a view toggle). */
  trailing?: ReactNode;
  className?: string;
}

/**
 * FilterBar — a prop-driven toolbar for narrowing and ordering a list: search,
 * any number of dropdown filters and on/off toggles, a sort picker and a clear action.
 *
 * It is controlled and domain-agnostic: pass option lists and current values,
 * handle the change callbacks, and keep the state wherever you like (URL, store).
 *
 * @example
 * <FilterBar
 *   search={{ value: term, onChange: setTerm, placeholder: "Search games" }}
 *   filters={[{ key: "platform", label: "Platforms", options: platformOptions }]}
 *   values={{ platform }}
 *   onFilterChange={(key, value) => setFilter(key, value)}
 *   sort={{ value: sort, options: sortOptions, onChange: setSort }}
 *   onClear={reset}
 * />
 */
export const FilterBar = ({
  search,
  filters = [],
  values = {},
  onFilterChange,
  toggles = [],
  sort,
  onClear,
  trailing,
  className
}: FilterBarProps) => {
  const hasActiveFilters =
    Boolean(search?.value) ||
    filters.some((filter) => values[filter.key] !== undefined) ||
    toggles.some((toggle) => toggle.pressed);

  return (
    <div data-slot="filter-bar" role="search" className={cn(filterBar, className)}>
      {search && (
        <div className={filterBarSearch}>
          <MagnifyingGlassIcon className={filterBarSearchIcon} />
          <Input
            type="search"
            aria-label={search.placeholder ?? "Search"}
            placeholder={search.placeholder ?? "Search"}
            value={search.value}
            onChange={(event) => search.onChange(event.target.value)}
            className={filterBarSearchInput}
          />
          {search.value && (
            <button type="button" aria-label="Clear search" className={filterBarSearchClear} onClick={() => search.onChange("")}>
              <XIcon size={12} />
            </button>
          )}
        </div>
      )}

      {(filters.length > 0 || toggles.length > 0) && (
        <div className={filterBarGroup}>
          {filters.map((filter) => {
            const current = values[filter.key];
            return (
              <Select
                key={filter.key}
                value={current ?? ALL}
                onValueChange={(value) => onFilterChange?.(filter.key, value === ALL ? undefined : value)}
                options={[{ value: ALL, label: filter.allLabel ?? `All ${filter.label}` }, ...filter.options]}
                triggerClassName={current !== undefined ? filterBarActive : undefined}
              />
            );
          })}
          {toggles.map((toggle) => (
            <Button
              key={toggle.key}
              variant="outline"
              aria-pressed={toggle.pressed}
              className={cn(filterBarToggle, toggle.pressed && filterBarActive)}
              onClick={() => toggle.onPressedChange(!toggle.pressed)}
            >
              {toggle.icon}
              {toggle.label}
            </Button>
          ))}
          {onClear && hasActiveFilters && (
            <Button variant="ghost" onClick={onClear}>
              <XIcon />
              Clear
            </Button>
          )}
        </div>
      )}

      {(sort || trailing) && (
        <div className={filterBarEnd}>
          {sort && (
            <>
              <span className={filterBarLabel}>
                <SortAscendingIcon size={14} />
                Sort
              </span>
              <Select value={sort.value} onValueChange={sort.onChange} options={sort.options} />
            </>
          )}
          {trailing}
        </div>
      )}
    </div>
  );
};
