import type { Paginated, Params } from "@feathersjs/feathers";
import type { ApiCollectionItem, CollectionStatus } from "@game-library/types";
import type { GameData } from "./game";

/** The fields a user can set on their own copy. */
export interface CollectionItemFields {
  ownershipId?: string | null;
  status?: CollectionStatus;
  value?: number | null;
  pricePaid?: number | null;
  priceSold?: number | null;
  itemCondition?: string | null;
  boxCondition?: string | null;
  manualCondition?: string | null;
  otherCondition?: string | null;
  notes?: string | null;
  /** ISO date (YYYY-MM-DD). */
  acquiredAt?: string | null;
  isFavorite?: boolean;
}

/** Add a copy of an existing catalog game (`gameId`) or of a new one (`game`). */
export interface CollectionItemData extends CollectionItemFields {
  gameId?: string;
  game?: GameData;
}

export type CollectionItemPatch = CollectionItemFields;

export interface CollectionItemQuery {
  id?: string;
  gameId?: string;
  ownershipId?: string;
  status?: CollectionStatus;
  $limit?: number;
  $skip?: number;
  $sort?: Record<string, 1 | -1>;
}

// CSV import is a raw route (`POST /collection-items/import`), not a Feathers
// method — see hooks/collection/useImportCollection.
export interface CollectionItemService {
  find(params?: Params<CollectionItemQuery>): Promise<Paginated<ApiCollectionItem>>;
  get(id: string, params?: Params<CollectionItemQuery>): Promise<ApiCollectionItem>;
  create(data: CollectionItemData, params?: Params<CollectionItemQuery>): Promise<ApiCollectionItem>;
  patch(id: string, data: CollectionItemPatch, params?: Params<CollectionItemQuery>): Promise<ApiCollectionItem>;
  remove(id: string, params?: Params<CollectionItemQuery>): Promise<ApiCollectionItem>;
}

export const collectionItemMethods = ["find", "get", "create", "patch", "remove"] as const;
