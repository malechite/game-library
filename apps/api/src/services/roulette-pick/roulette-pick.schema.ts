import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static, TSchema } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { RoulettePickService } from "./roulette-pick.class";

const uuid = Type.String({ format: "uuid" });
const nullable = <T extends TSchema>(schema: T) => Type.Union([schema, Type.Null()]);

// ─── Main schema ──────────────────────────────────────────────────────────
// A row of the `roulettePickItems` view: a pick with its game's title, platform and cover.
export const roulettePickSchema = Type.Object(
  {
    id: uuid,
    ownerId: uuid,
    gameId: uuid,
    collectionItemId: nullable(uuid),
    title: Type.String(),
    platformName: Type.String(),
    coverUrl: nullable(Type.String()),
    createdAt: Type.String(),
    updatedAt: Type.String()
  },
  { $id: "RoulettePick", additionalProperties: false }
);
export type RoulettePick = Static<typeof roulettePickSchema>;
export const roulettePickResolver = resolve<RoulettePick, HookContext<RoulettePickService>>({});
export const roulettePickExternalResolver = resolve<RoulettePick, HookContext<RoulettePickService>>({});

// ─── Create ───────────────────────────────────────────────────────────────
// A pick names the copy the roulette landed on; the owner and the catalog game
// are derived from it by the service, never taken from the client.
export const roulettePickDataSchema = Type.Object(
  { collectionItemId: uuid },
  { $id: "RoulettePickData", additionalProperties: false }
);
export type RoulettePickData = Static<typeof roulettePickDataSchema>;
export const roulettePickDataValidator = getValidator(roulettePickDataSchema, dataValidator);
export const roulettePickDataResolver = resolve<RoulettePickData, HookContext<RoulettePickService>>({});

// ─── Query ────────────────────────────────────────────────────────────────
export const roulettePickQueryProperties = Type.Pick(roulettePickSchema, [
  "id",
  "ownerId",
  "gameId",
  "collectionItemId",
  "createdAt"
]);
export const roulettePickQuerySchema = Type.Intersect(
  [querySyntax(roulettePickQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
);
export type RoulettePickQuery = Static<typeof roulettePickQuerySchema>;
export const roulettePickQueryValidator = getValidator(roulettePickQuerySchema, queryValidator);
export const roulettePickQueryResolver = resolve<RoulettePickQuery, HookContext<RoulettePickService>>({});
