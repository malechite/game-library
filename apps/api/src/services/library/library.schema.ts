import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static, TSchema } from "@feathersjs/typebox";
import { CollectionStatus } from "@game-library/types";

import type { HookContext } from "../../declarations";
import { queryValidator } from "../../validators";
import type { LibraryService } from "./library.class";

const uuid = Type.String({ format: "uuid" });
const nullable = <T extends TSchema>(schema: T) => Type.Union([schema, Type.Null()]);

// ─── Main schema ──────────────────────────────────────────────────────────
// A row of the `libraryItems` view: a collection item with its game and every
// lookup name joined in. Read-only — writes go through `collection-items` / `games`.
export const libraryItemSchema = Type.Object(
  {
    id: uuid,
    ownerId: uuid,
    gameId: uuid,
    status: Type.Enum(CollectionStatus),
    ownershipId: nullable(uuid),
    ownershipName: nullable(Type.String()),
    value: nullable(Type.Number()),
    pricePaid: nullable(Type.Number()),
    priceSold: nullable(Type.Number()),
    itemCondition: nullable(Type.String()),
    boxCondition: nullable(Type.String()),
    manualCondition: nullable(Type.String()),
    otherCondition: nullable(Type.String()),
    notes: nullable(Type.String()),
    acquiredAt: nullable(Type.String()),
    createdAt: Type.String(),
    updatedAt: Type.String(),
    title: Type.String(),
    platformId: uuid,
    platformName: Type.String(),
    categoryId: uuid,
    categoryName: Type.String(),
    countryId: nullable(uuid),
    countryName: nullable(Type.String()),
    releaseTypeId: nullable(uuid),
    releaseTypeName: nullable(Type.String()),
    publisherId: nullable(uuid),
    publisherName: nullable(Type.String()),
    developerId: nullable(uuid),
    developerName: nullable(Type.String()),
    metacritic: nullable(Type.Number()),
    priceLoose: nullable(Type.Number()),
    priceCib: nullable(Type.Number()),
    priceNew: nullable(Type.Number()),
    coverUrl: nullable(Type.String()),
    genreIds: Type.Array(uuid),
    genreNames: Type.Array(Type.String()),
    isFavorite: Type.Boolean()
  },
  { $id: "LibraryItem", additionalProperties: false }
);
export type LibraryItem = Static<typeof libraryItemSchema>;
export const libraryItemResolver = resolve<LibraryItem, HookContext<LibraryService>>({});
export const libraryItemExternalResolver = resolve<LibraryItem, HookContext<LibraryService>>({});

// ─── Query ────────────────────────────────────────────────────────────────
// Filterable / sortable columns. `title[$ilike]` is the search box; `genreId`
// is not a column (genres are an array on the row) and is handled by the class.
export const libraryQueryProperties = Type.Pick(libraryItemSchema, [
  "id",
  "ownerId",
  "gameId",
  "status",
  "ownershipId",
  "platformId",
  "categoryId",
  "countryId",
  "releaseTypeId",
  "publisherId",
  "developerId",
  "title",
  "platformName",
  "value",
  "metacritic",
  "acquiredAt",
  "createdAt",
  "isFavorite"
]);
export const libraryQuerySchema = Type.Intersect(
  [
    querySyntax(libraryQueryProperties, { title: { $ilike: Type.String() } }),
    Type.Object({ genreId: Type.Optional(uuid) }, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export type LibraryQuery = Static<typeof libraryQuerySchema>;
export const libraryQueryValidator = getValidator(libraryQuerySchema, queryValidator);
export const libraryQueryResolver = resolve<LibraryQuery, HookContext<LibraryService>>({});
