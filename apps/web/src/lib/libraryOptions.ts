import type { LibraryQuery } from "@game-library/sdk";
import { CollectionStatus } from "@game-library/types";

/** How the library is laid out. */
export enum LibraryView {
  Tiles = "tiles",
  List = "list"
}

/** Sort orders offered in the filter bar. The value is what goes in the URL. */
export enum LibrarySort {
  TitleAsc = "title",
  TitleDesc = "-title",
  ValueDesc = "-value",
  ValueAsc = "value",
  RecentlyAdded = "-added",
  Platform = "platform",
  Metacritic = "-metacritic"
}

export const DEFAULT_SORT = LibrarySort.TitleAsc;
export const DEFAULT_VIEW = LibraryView.Tiles;

/** Items per page, in both views. Matches the library service's page size. */
export const PAGE_SIZE = 100;

export const SORT_OPTIONS: Array<{ value: LibrarySort; label: string }> = [
  { value: LibrarySort.TitleAsc, label: "Title A–Z" },
  { value: LibrarySort.TitleDesc, label: "Title Z–A" },
  { value: LibrarySort.ValueDesc, label: "Value: high to low" },
  { value: LibrarySort.ValueAsc, label: "Value: low to high" },
  { value: LibrarySort.RecentlyAdded, label: "Recently added" },
  { value: LibrarySort.Platform, label: "Platform" },
  { value: LibrarySort.Metacritic, label: "Metacritic score" }
];

/** The Feathers `$sort` for each option (secondary keys keep groups tidy). */
export const SORT_QUERY: Record<LibrarySort, NonNullable<LibraryQuery["$sort"]>> = {
  [LibrarySort.TitleAsc]: { title: 1 },
  [LibrarySort.TitleDesc]: { title: -1 },
  [LibrarySort.ValueDesc]: { value: -1 },
  [LibrarySort.ValueAsc]: { value: 1 },
  [LibrarySort.RecentlyAdded]: { acquiredAt: -1, createdAt: -1 },
  [LibrarySort.Platform]: { platformName: 1, title: 1 },
  [LibrarySort.Metacritic]: { metacritic: -1 }
};

export const STATUS_OPTIONS: Array<{ value: CollectionStatus; label: string }> = [
  { value: CollectionStatus.Owned, label: "Owned" },
  { value: CollectionStatus.Wishlist, label: "Wishlist" }
];

const isOneOf = <T extends string>(values: Record<string, T>, value: string | null): value is T =>
  value !== null && (Object.values(values) as string[]).includes(value);

export const parseSort = (value: string | null): LibrarySort => (isOneOf(LibrarySort, value) ? value : DEFAULT_SORT);
export const parseView = (value: string | null): LibraryView | null => (isOneOf(LibraryView, value) ? value : null);
export const parseStatus = (value: string | null): CollectionStatus | undefined =>
  isOneOf(CollectionStatus, value) ? value : undefined;
