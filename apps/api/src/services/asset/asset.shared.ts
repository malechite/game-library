import type { AssetService } from "./asset.class";

export type { Asset, AssetData, AssetPatch, AssetQuery, AssetUploadData } from "./asset.class";

export const assetMethods: Array<keyof AssetService> = ["find", "get", "create", "patch", "remove", "upload"];
