import type { Paginated, Params } from "@feathersjs/feathers";
import type { ApiAsset } from "@game-library/types";

export interface AssetPatch {
  filename?: string;
  metadata?: Record<string, unknown>;
}

export interface AssetQuery {
  id?: string;
  ownerId?: string;
  filename?: string;
  contentType?: string;
  $limit?: number;
  $skip?: number;
  $sort?: Record<string, 1 | -1>;
}

// Note: assets are created via the dedicated upload endpoint (see useUploadAsset),
// not the standard `create` method — so it's intentionally omitted here.
export interface AssetService {
  find(params?: Params<AssetQuery>): Promise<Paginated<ApiAsset>>;
  get(id: string, params?: Params<AssetQuery>): Promise<ApiAsset>;
  patch(id: string, data: AssetPatch, params?: Params<AssetQuery>): Promise<ApiAsset>;
  remove(id: string, params?: Params<AssetQuery>): Promise<ApiAsset>;
}

export const assetMethods = ["find", "get", "patch", "remove"] as const;
