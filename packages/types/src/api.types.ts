/**
 * Shared API contracts used by both the Feathers `api` app and the `sdk`.
 *
 * Kept as plain TypeScript (no TypeBox / Feathers deps) so the shared `types`
 * package stays runtime-light. The api app derives its own TypeBox-validated
 * types internally but keeps these public shapes aligned.
 */

/** Service paths exposed by the Game Library API. */
export enum ApiServicePath {
  Authentication = "authentication",
  Users = "users",
  Assets = "assets",
  Audit = "audit",

  // Reference data (shared lookup tables)
  Platforms = "platforms",
  Categories = "categories",
  Countries = "countries",
  ReleaseTypes = "release-types",
  Ownerships = "ownerships",
  Genres = "genres",
  Companies = "companies",

  // Catalog + collection
  Games = "games",
  CollectionItems = "collection-items",
  Library = "library",
  CatalogSearch = "catalog-search"
}

/** The service paths that are simple `{ id, name }` lookup tables. */
export type ApiLookupPath =
  | ApiServicePath.Platforms
  | ApiServicePath.Categories
  | ApiServicePath.Countries
  | ApiServicePath.ReleaseTypes
  | ApiServicePath.Ownerships
  | ApiServicePath.Genres
  | ApiServicePath.Companies;

/** A user as returned by the API (password is always stripped from responses). */
export interface ApiUser {
  id: string;
  email: string;
  name: string;
  /** Grants access to super-admin-only surfaces (e.g. the audit log). */
  isSuperAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * A single audit-log entry: one external API action. Written automatically for
 * every client-originated service call; readable only by super admins.
 */
export interface ApiAuditLog {
  id: string;
  /** The acting user (null if that user has since been deleted). */
  userId?: string | null;
  /** Denormalized snapshot of the acting user's email. */
  userEmail?: string | null;
  /** The service path the action hit (e.g. "users"). */
  service: string;
  /** The Feathers method (find/get/create/patch/remove). */
  method: string;
  /** The affected record id, when the action targeted one. */
  targetId?: string | null;
  createdAt: string;
}

/** An uploaded file stored in object storage (MinIO/S3). */
export interface ApiAsset {
  id: string;
  /** The user who uploaded the file (null if the user was deleted). */
  ownerId?: string | null;
  filename: string;
  contentType: string;
  /** Size in bytes. */
  size: number;
  /** Object storage key. */
  key: string;
  /** Publicly resolvable URL to the object. */
  url: string;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Reference data ───────────────────────────────────────────────────

/** A row of any lookup table (platform, genre, company, …). */
export interface ApiLookup {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Catalog ──────────────────────────────────────────────────────────

/** A game (or console) in the shared catalog. Lookups are referenced by id. */
export interface ApiGame {
  id: string;
  title: string;
  platformId: string;
  categoryId: string;
  countryId?: string | null;
  releaseTypeId?: string | null;
  publisherId?: string | null;
  developerId?: string | null;
  /** Metacritic score 0–100, when known. */
  metacritic?: number | null;
  /** Market value of a loose copy. */
  priceLoose?: number | null;
  /** Market value complete in box. */
  priceCib?: number | null;
  /** Market value new/sealed. */
  priceNew?: number | null;
  /** Cover image URL to render (object storage once resolved). */
  coverUrl?: string | null;
  coverAssetId?: string | null;
  /** Where the cover art was fetched from. */
  coverSourceUrl?: string | null;
  /** External catalog this game was matched to (e.g. "igdb"). */
  externalSource?: string | null;
  externalId?: string | null;
  /** Genres of the game (many-to-many). */
  genreIds?: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Collection ───────────────────────────────────────────────────────

/** Whether a collection item is owned or only wanted. */
export enum CollectionStatus {
  Owned = "owned",
  Wishlist = "wishlist"
}

/** One physical copy of a catalog game owned (or wanted) by a user. */
export interface ApiCollectionItem {
  id: string;
  ownerId: string;
  gameId: string;
  ownershipId?: string | null;
  status: CollectionStatus;
  /** Current value of this copy. */
  value?: number | null;
  pricePaid?: number | null;
  priceSold?: number | null;
  itemCondition?: string | null;
  boxCondition?: string | null;
  manualCondition?: string | null;
  otherCondition?: string | null;
  notes?: string | null;
  /** ISO date (YYYY-MM-DD) the copy was added to the collection. */
  acquiredAt?: string | null;
  /** Marked as a favorite by its owner. */
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * A collection item flattened with its game and lookup names — the row shape
 * of the `library` read service that drives the tile and list views.
 */
export interface ApiLibraryItem extends ApiCollectionItem {
  ownershipName?: string | null;
  title: string;
  platformId: string;
  platformName: string;
  categoryId: string;
  categoryName: string;
  countryId?: string | null;
  countryName?: string | null;
  releaseTypeId?: string | null;
  releaseTypeName?: string | null;
  publisherId?: string | null;
  publisherName?: string | null;
  developerId?: string | null;
  developerName?: string | null;
  metacritic?: number | null;
  priceLoose?: number | null;
  priceCib?: number | null;
  priceNew?: number | null;
  coverUrl?: string | null;
  genreIds: string[];
  genreNames: string[];
  isFavorite: boolean;
}

/** Totals for a (filtered) library, plus cover-sync progress. */
export interface ApiLibrarySummary {
  /** Number of collection items matching the filters. */
  count: number;
  /** Sum of `value` across those items. */
  totalValue: number;
  /** How many of them still have no cover image. */
  missingCovers: number;
  /** True while the server is fetching covers in the background. */
  coverSyncActive: boolean;
}

/** Outcome of a CSV collection import. */
export interface ApiImportResult {
  /** Data rows found in the file. */
  rows: number;
  /** Collection items created. */
  items: number;
  /** Catalog games created by this import. */
  gamesCreated: number;
  /** Catalog games that already existed and were reused. */
  gamesExisting: number;
  /** Rows that could not be imported, with the reason. */
  skipped: Array<{ line: number; reason: string }>;
}

// ─── External catalog search ──────────────────────────────────────────

/** A game found in an external catalog (e.g. IGDB), ready to prefill the add form. */
export interface ApiCatalogResult {
  source: string;
  externalId: string;
  title: string;
  platformNames: string[];
  releaseYear?: number | null;
  coverUrl?: string | null;
  genres: string[];
  publisher?: string | null;
  developer?: string | null;
}

/** Response of the `catalog-search` service. */
export interface ApiCatalogSearchResult {
  /** Matches already in our own catalog. */
  local: ApiGame[];
  /** Matches from the external provider (empty when none is configured). */
  external: ApiCatalogResult[];
  /** Name of the configured external provider, or null. */
  provider: string | null;
}
