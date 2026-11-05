import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { AssetService } from "./asset.class";

const metadata = Type.Record(Type.String(), Type.Unknown());

// ─── Main schema ──────────────────────────────────────────────────────────
export const assetSchema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    ownerId: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
    filename: Type.String(),
    contentType: Type.String(),
    size: Type.Number(),
    key: Type.String(),
    url: Type.String(),
    metadata: Type.Optional(Type.Union([metadata, Type.Null()])),
    createdAt: Type.String(),
    updatedAt: Type.String()
  },
  { $id: "Asset", additionalProperties: false }
);
export type Asset = Static<typeof assetSchema>;
export const assetResolver = resolve<Asset, HookContext<AssetService>>({});
export const assetExternalResolver = resolve<Asset, HookContext<AssetService>>({});

// ─── Create (internal — populated by the service after upload) ──────────────
export const assetDataSchema = Type.Object(
  {
    ownerId: Type.Optional(Type.String({ format: "uuid" })),
    filename: Type.String(),
    contentType: Type.String(),
    size: Type.Number(),
    key: Type.String(),
    url: Type.String(),
    metadata: Type.Optional(metadata)
  },
  { $id: "AssetData", additionalProperties: false }
);
export type AssetData = Static<typeof assetDataSchema>;
export const assetDataValidator = getValidator(assetDataSchema, dataValidator);
export const assetDataResolver = resolve<Asset, HookContext<AssetService>>({});

// ─── Upload (base64 over HTTP) ──────────────────────────────────────────────
export const assetUploadSchema = Type.Object(
  {
    filename: Type.String(),
    contentType: Type.String(),
    fileData: Type.String({ description: "Base64-encoded file data" }),
    metadata: Type.Optional(metadata)
  },
  { $id: "AssetUpload", additionalProperties: false }
);
export type AssetUploadData = Static<typeof assetUploadSchema>;
export const assetUploadValidator = getValidator(assetUploadSchema, dataValidator);

// ─── Patch ──────────────────────────────────────────────────────────────────
export const assetPatchSchema = Type.Partial(
  Type.Object({ filename: Type.String(), metadata }, { additionalProperties: false }),
  { $id: "AssetPatch" }
);
export type AssetPatch = Static<typeof assetPatchSchema>;
export const assetPatchValidator = getValidator(assetPatchSchema, dataValidator);
export const assetPatchResolver = resolve<Asset, HookContext<AssetService>>({});

// ─── Query ────────────────────────────────────────────────────────────────
export const assetQueryProperties = Type.Object({
  id: Type.String({ format: "uuid" }),
  ownerId: Type.String({ format: "uuid" }),
  filename: Type.String(),
  contentType: Type.String()
});
export const assetQuerySchema = Type.Intersect(
  [querySyntax(assetQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
);
export type AssetQuery = Static<typeof assetQuerySchema>;
export const assetQueryValidator = getValidator(assetQuerySchema, queryValidator);
export const assetQueryResolver = resolve<AssetQuery, HookContext<AssetService>>({});
