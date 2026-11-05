import { Type, getValidator, defaultAppConfiguration } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import { dataValidator } from "./validators";

/** Background cover-art resolution (libretro thumbnails, then IGDB). */
export const coversConfigSchema = Type.Object({
  /** Turn the fetcher off entirely (tests, offline work). */
  enabled: Type.Boolean(),
  /** How many covers to download at once. */
  concurrency: Type.Number()
});
export type CoversConfig = Static<typeof coversConfigSchema>;

/** IGDB (Twitch) credentials. Leave both empty to run without an external catalog. */
export const igdbConfigSchema = Type.Object({
  clientId: Type.String(),
  clientSecret: Type.String()
});
export type IgdbConfig = Static<typeof igdbConfigSchema>;

export const configurationSchema = Type.Intersect([
  defaultAppConfiguration,
  Type.Object({
    host: Type.String(),
    port: Type.Number(),
    public: Type.String(),
    covers: coversConfigSchema,
    igdb: igdbConfigSchema
  })
]);

export type ApplicationConfiguration = Static<typeof configurationSchema>;

export const configurationValidator = getValidator(configurationSchema, dataValidator);
