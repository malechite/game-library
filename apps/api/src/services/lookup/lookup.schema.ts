import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { LookupService } from "./lookup.class";

// One schema for every lookup table (platforms, genres, companies, …): they
// all hold a unique `name` and nothing else.

// ─── Main schema ──────────────────────────────────────────────────────────
export const lookupSchema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    name: Type.String({ minLength: 1, maxLength: 255 }),
    createdAt: Type.String(),
    updatedAt: Type.String()
  },
  { $id: "Lookup", additionalProperties: false }
);
export type Lookup = Static<typeof lookupSchema>;
export const lookupResolver = resolve<Lookup, HookContext<LookupService>>({});
export const lookupExternalResolver = resolve<Lookup, HookContext<LookupService>>({});

// ─── Create ───────────────────────────────────────────────────────────────
export const lookupDataSchema = Type.Pick(lookupSchema, ["name"], { $id: "LookupData" });
export type LookupData = Static<typeof lookupDataSchema>;
export const lookupDataValidator = getValidator(lookupDataSchema, dataValidator);
export const lookupDataResolver = resolve<Lookup, HookContext<LookupService>>({
  name: async (value) => value?.trim()
});

// ─── Patch ────────────────────────────────────────────────────────────────
export const lookupPatchSchema = Type.Partial(lookupDataSchema, { $id: "LookupPatch" });
export type LookupPatch = Static<typeof lookupPatchSchema>;
export const lookupPatchValidator = getValidator(lookupPatchSchema, dataValidator);
export const lookupPatchResolver = resolve<Lookup, HookContext<LookupService>>({
  name: async (value) => value?.trim()
});

// ─── Query ────────────────────────────────────────────────────────────────
export const lookupQueryProperties = Type.Pick(lookupSchema, ["id", "name"]);
export const lookupQuerySchema = Type.Intersect(
  [
    // `name[$ilike]=%son%` powers type-ahead search (e.g. the company picker).
    querySyntax(lookupQueryProperties, { name: { $ilike: Type.String() } }),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export type LookupQuery = Static<typeof lookupQuerySchema>;
export const lookupQueryValidator = getValidator(lookupQuerySchema, queryValidator);
export const lookupQueryResolver = resolve<LookupQuery, HookContext<LookupService>>({});
