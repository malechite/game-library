import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static, TSchema } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { GameService } from "./game.class";

const uuid = Type.String({ format: "uuid" });
const nullable = <T extends TSchema>(schema: T) => Type.Union([schema, Type.Null()]);
const price = Type.Number({ minimum: 0 });

// The writable fields, shared by the main, create and patch schemas.
const requiredFields = {
  title: Type.String({ minLength: 1, maxLength: 255 }),
  platformId: uuid
};

const optionalFields = {
  countryId: Type.Optional(nullable(uuid)),
  releaseTypeId: Type.Optional(nullable(uuid)),
  publisherId: Type.Optional(nullable(uuid)),
  developerId: Type.Optional(nullable(uuid)),
  metacritic: Type.Optional(nullable(Type.Integer({ minimum: 0, maximum: 100 }))),
  priceLoose: Type.Optional(nullable(price)),
  priceCib: Type.Optional(nullable(price)),
  priceNew: Type.Optional(nullable(price)),
  coverUrl: Type.Optional(nullable(Type.String({ maxLength: 1024 }))),
  coverAssetId: Type.Optional(nullable(uuid)),
  coverSourceUrl: Type.Optional(nullable(Type.String({ maxLength: 1024 }))),
  externalSource: Type.Optional(nullable(Type.String())),
  externalId: Type.Optional(nullable(Type.String())),
  // Not a column: the game's genres, kept in the `gameGenres` join table (see game.ts hooks).
  genreIds: Type.Optional(Type.Array(uuid))
};

// ─── Main schema ──────────────────────────────────────────────────────────
export const gameSchema = Type.Object(
  {
    id: uuid,
    ...requiredFields,
    categoryId: uuid,
    ...optionalFields,
    createdAt: Type.String(),
    updatedAt: Type.String()
  },
  { $id: "Game", additionalProperties: false }
);
export type Game = Static<typeof gameSchema>;
export const gameResolver = resolve<Game, HookContext<GameService>>({});
export const gameExternalResolver = resolve<Game, HookContext<GameService>>({});

// ─── Create ───────────────────────────────────────────────────────────────
/** The create fields on their own, for schemas that embed a game description (collection items). */
export const gameDataFields = {
  ...requiredFields,
  // Optional on create: the library is games-only, so the service files a new
  // entry under the "Games" category unless told otherwise (see game.ts).
  categoryId: Type.Optional(uuid),
  ...optionalFields
};
export const gameDataSchema = Type.Object(gameDataFields, { $id: "GameData", additionalProperties: false });
export type GameData = Static<typeof gameDataSchema>;
export const gameDataValidator = getValidator(gameDataSchema, dataValidator);
export const gameDataResolver = resolve<Game, HookContext<GameService>>({
  title: async (value) => value?.trim()
});

// ─── Patch ────────────────────────────────────────────────────────────────
export const gamePatchSchema = Type.Partial(gameDataSchema, { $id: "GamePatch" });
export type GamePatch = Static<typeof gamePatchSchema>;
export const gamePatchValidator = getValidator(gamePatchSchema, dataValidator);
export const gamePatchResolver = resolve<Game, HookContext<GameService>>({
  title: async (value) => value?.trim()
});

// ─── Query ────────────────────────────────────────────────────────────────
export const gameQueryProperties = Type.Pick(gameSchema, [
  "id",
  "title",
  "platformId",
  "categoryId",
  "countryId",
  "releaseTypeId",
  "publisherId",
  "developerId",
  "externalSource",
  "externalId",
  "createdAt"
]);
export const gameQuerySchema = Type.Intersect(
  [querySyntax(gameQueryProperties, { title: { $ilike: Type.String() } }), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
);
export type GameQuery = Static<typeof gameQuerySchema>;
export const gameQueryValidator = getValidator(gameQuerySchema, queryValidator);
export const gameQueryResolver = resolve<GameQuery, HookContext<GameService>>({});
