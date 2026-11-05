import type { Paginated, Params } from "@feathersjs/feathers";
import type { ApiLibraryItem, CollectionStatus } from "@game-library/types";

/** Columns the library can be sorted by. */
export type LibrarySortField = "title" | "value" | "acquiredAt" | "platformName" | "metacritic" | "createdAt";

export interface LibraryQuery {
  id?: string;
  gameId?: string;
  status?: CollectionStatus;
  ownershipId?: string;
  platformId?: string;
  categoryId?: string;
  countryId?: string;
  releaseTypeId?: string;
  publisherId?: string;
  developerId?: string;
  /** Exact title, or `{ $ilike: "%zelda%" }` for the search box. */
  title?: string | { $ilike?: string };
  /** Only games tagged with this genre. */
  genreId?: string;
  /** Only favorites (`true`) or only non-favorites (`false`). */
  isFavorite?: boolean;
  $limit?: number;
  $skip?: number;
  $sort?: Partial<Record<LibrarySortField, 1 | -1>>;
}

// Read-only: the flattened view of the caller's collection. Edits go through
// `collection-items` (the copy) and `games` (the catalog entry).
export interface LibraryService {
  find(params?: Params<LibraryQuery>): Promise<Paginated<ApiLibraryItem>>;
  get(id: string, params?: Params<LibraryQuery>): Promise<ApiLibraryItem>;
}

export const libraryMethods = ["find", "get"] as const;
