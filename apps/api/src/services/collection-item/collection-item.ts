import { authenticate } from "@feathersjs/authentication";
import { BadRequest } from "@feathersjs/errors";
import { hooks as schemaHooks } from "@feathersjs/schema";
import { ApiServicePath } from "@game-library/types";

import {
  collectionItemDataValidator,
  collectionItemPatchValidator,
  collectionItemQueryValidator,
  collectionImportValidator,
  collectionItemResolver,
  collectionItemExternalResolver,
  collectionItemDataResolver,
  collectionItemPatchResolver,
  collectionItemQueryResolver
} from "./collection-item.schema";

import type { Application, HookContext } from "../../declarations";
import { limitToOwner } from "../../hooks/scope";
import { touchUpdatedAt } from "../../hooks/timestamps";
import { CollectionItemService, getOptions, type CollectionItemData } from "./collection-item.class";
import { collectionItemMethods } from "./collection-item.shared";

export * from "./collection-item.class";
export * from "./collection-item.schema";

/**
 * Before create: turn a nested `game` description into a `gameId` by finding or
 * creating the shared catalog entry, so a client can add a brand-new game and
 * its copy in one call.
 */
const resolveGame = async (context: HookContext<CollectionItemService>): Promise<void> => {
  const { game, ...item } = context.data as CollectionItemData;

  if (game) {
    const { game: catalogGame } = await context.app.service(ApiServicePath.Games).findOrCreate(game);
    item.gameId = catalogGame.id;
  }
  if (!item.gameId) throw new BadRequest("Provide either `gameId` or `game`");

  context.data = item;
};

export const collectionItem = (app: Application) => {
  app.use(ApiServicePath.CollectionItems, new CollectionItemService(getOptions(app), app), {
    methods: collectionItemMethods,
    events: []
  });
  app.service(ApiServicePath.CollectionItems).hooks({
    around: {
      all: [schemaHooks.resolveExternal(collectionItemExternalResolver), schemaHooks.resolveResult(collectionItemResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(collectionItemQueryValidator), schemaHooks.resolveQuery(collectionItemQueryResolver)],
      // Every user only ever sees and edits their own copies.
      find: [authenticate("jwt"), limitToOwner()],
      get: [authenticate("jwt"), limitToOwner()],
      create: [
        authenticate("jwt"),
        schemaHooks.validateData(collectionItemDataValidator),
        resolveGame,
        schemaHooks.resolveData(collectionItemDataResolver)
      ],
      patch: [
        authenticate("jwt"),
        limitToOwner(),
        schemaHooks.validateData(collectionItemPatchValidator),
        touchUpdatedAt,
        schemaHooks.resolveData(collectionItemPatchResolver)
      ],
      remove: [authenticate("jwt"), limitToOwner()],
      import: [authenticate("jwt"), schemaHooks.validateData(collectionImportValidator)]
    },
    after: { all: [] },
    error: { all: [] }
  });
};

declare module "../../declarations" {
  interface ServiceTypes {
    [ApiServicePath.CollectionItems]: CollectionItemService;
  }
}
