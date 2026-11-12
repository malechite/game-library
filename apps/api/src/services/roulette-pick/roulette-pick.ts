import { authenticate } from "@feathersjs/authentication";
import { hooks as schemaHooks } from "@feathersjs/schema";
import { ApiServicePath } from "@game-library/types";

import {
  roulettePickDataValidator,
  roulettePickQueryValidator,
  roulettePickResolver,
  roulettePickExternalResolver,
  roulettePickDataResolver,
  roulettePickQueryResolver
} from "./roulette-pick.schema";

import type { Application } from "../../declarations";
import { limitToOwner } from "../../hooks/scope";
import { RoulettePickService, getOptions } from "./roulette-pick.class";
import { roulettePickMethods } from "./roulette-pick.shared";

export * from "./roulette-pick.class";
export * from "./roulette-pick.schema";

export const roulettePick = (app: Application) => {
  app.use(ApiServicePath.RoulettePicks, new RoulettePickService(getOptions(app), app), {
    methods: roulettePickMethods,
    events: []
  });
  app.service(ApiServicePath.RoulettePicks).hooks({
    around: {
      all: [schemaHooks.resolveExternal(roulettePickExternalResolver), schemaHooks.resolveResult(roulettePickResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(roulettePickQueryValidator), schemaHooks.resolveQuery(roulettePickQueryResolver)],
      // Every user only ever sees and removes their own picks.
      find: [authenticate("jwt"), limitToOwner()],
      get: [authenticate("jwt"), limitToOwner()],
      // The service takes the owner from the caller and the game from the picked copy.
      create: [
        authenticate("jwt"),
        schemaHooks.validateData(roulettePickDataValidator),
        schemaHooks.resolveData(roulettePickDataResolver)
      ],
      remove: [authenticate("jwt"), limitToOwner()]
    },
    after: { all: [] },
    error: { all: [] }
  });
};

declare module "../../declarations" {
  interface ServiceTypes {
    [ApiServicePath.RoulettePicks]: RoulettePickService;
  }
}
