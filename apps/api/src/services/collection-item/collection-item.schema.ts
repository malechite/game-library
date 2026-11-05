import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static, TSchema } from "@feathersjs/typebox";
import { CollectionStatus } from "@game-library/types";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import { gameDataFields } from "../game/game.schema";
import type { CollectionItemService } from "./collection-item.class";

const uuid = Type.String({ format: "uuid" });
const nullable = <T extends TSchema>(schema: T) => Type.Union([schema, Type.Null()]);
const amount = Type.Number({ minimum: 0 });
const condition = Type.String({ maxLength: 255 });

// The fields a user can set on their copy, shared by the create and patch schemas.
const editableFields = {
  ownershipId: Type.Optional(nullable(uuid)),
  status: Type.Optional(Type.Enum(CollectionStatus)),
  value: Type.Optional(nullable(amount)),
  pricePaid: Type.Optional(nullable(amount)),
  priceSold: Type.Optional(nullable(amount)),
  itemCondition: Type.Optional(nullable(condition)),
  boxCondition: Type.Optional(nullable(condition)),
  manualCondition: Type.Optional(nullable(condition)),
  otherCondition: Type.Optional(nullable(condition)),
  notes: Type.Optional(nullable(Type.String())),
  acquiredAt: Type.Optional(nullable(Type.String({ format: "date" }))),
  isFavorite: Type.Optional(Type.Boolean())
};

// ─── Main schema ──────────────────────────────────────────────────────────
export const collectionItemSchema = Type.Object(
  {
    id: uuid,
    ownerId: uuid,
    gameId: uuid,
    ...editableFields,
    createdAt: Type.String(),
    updatedAt: Type.String()
  },
  { $id: "CollectionItem", additionalProperties: false }
);
export type CollectionItem = Static<typeof collectionItemSchema>;
export const collectionItemResolver = resolve<CollectionItem, HookContext<CollectionItemService>>({});
export const collectionItemExternalResolver = resolve<CollectionItem, HookContext<CollectionItemService>>({});

// ─── Create ───────────────────────────────────────────────────────────────
// Point at an existing catalog game (`gameId`) or describe one (`game`); the
// service finds or creates the catalog entry for the latter.
export const collectionItemDataSchema = Type.Object(
  {
    ownerId: Type.Optional(uuid),
    gameId: Type.Optional(uuid),
    // Anonymous copy of the game create fields (no `$id`, so it doesn't clash with the GameData schema).
    game: Type.Optional(Type.Object(gameDataFields, { additionalProperties: false })),
    ...editableFields
  },
  { $id: "CollectionItemData", additionalProperties: false }
);
export type CollectionItemData = Static<typeof collectionItemDataSchema>;
export const collectionItemDataValidator = getValidator(collectionItemDataSchema, dataValidator);
export const collectionItemDataResolver = resolve<CollectionItem, HookContext<CollectionItemService>>({
  // Never trust a client-supplied owner: an authenticated caller always owns what they create.
  ownerId: async (value, _data, context) => (context.params as { user?: { id?: string } }).user?.id ?? value
});

// ─── Patch ────────────────────────────────────────────────────────────────
// A copy can't change owner or become a different game — only its own details.
export const collectionItemPatchSchema = Type.Object(editableFields, { $id: "CollectionItemPatch", additionalProperties: false });
export type CollectionItemPatch = Static<typeof collectionItemPatchSchema>;
export const collectionItemPatchValidator = getValidator(collectionItemPatchSchema, dataValidator);
export const collectionItemPatchResolver = resolve<CollectionItem, HookContext<CollectionItemService>>({});

// ─── Import (CSV over HTTP) ─────────────────────────────────────────────────
export const collectionImportSchema = Type.Object(
  {
    csv: Type.String({ minLength: 1, description: "Contents of a GAMEYE collection export" }),
    replace: Type.Optional(Type.Boolean({ description: "Replace the existing collection (default true)" }))
  },
  { $id: "CollectionImport", additionalProperties: false }
);
export type CollectionImportData = Static<typeof collectionImportSchema>;
export const collectionImportValidator = getValidator(collectionImportSchema, dataValidator);

// ─── Query ────────────────────────────────────────────────────────────────
export const collectionItemQueryProperties = Type.Pick(collectionItemSchema, [
  "id",
  "ownerId",
  "gameId",
  "ownershipId",
  "status",
  "value",
  "acquiredAt",
  "createdAt"
]);
export const collectionItemQuerySchema = Type.Intersect(
  [querySyntax(collectionItemQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
);
export type CollectionItemQuery = Static<typeof collectionItemQuerySchema>;
export const collectionItemQueryValidator = getValidator(collectionItemQuerySchema, queryValidator);
export const collectionItemQueryResolver = resolve<CollectionItemQuery, HookContext<CollectionItemService>>({});
