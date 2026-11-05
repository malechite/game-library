import { NotAuthenticated } from "@feathersjs/errors";
import type { Params } from "@feathersjs/feathers";
import { KnexService } from "@feathersjs/knex";
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex";
import type { ApiImportResult } from "@game-library/types";

import type { Application } from "../../declarations";
import { importCollection } from "../../import/collection-importer";
import type {
  CollectionItem,
  CollectionItemData,
  CollectionItemPatch,
  CollectionItemQuery,
  CollectionImportData
} from "./collection-item.schema";

export type { CollectionItem, CollectionItemData, CollectionItemPatch, CollectionItemQuery, CollectionImportData };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CollectionItemParams extends KnexAdapterParams<CollectionItemQuery> {}

export class CollectionItemService<ServiceParams extends Params = CollectionItemParams> extends KnexService<
  CollectionItem,
  CollectionItemData,
  ServiceParams,
  CollectionItemPatch
> {
  private app: Application;

  constructor(options: KnexAdapterOptions, app: Application) {
    super(options);
    this.app = app;
  }

  /** Custom method: import a GAMEYE CSV export into the calling user's collection. */
  async import(data: CollectionImportData, params?: ServiceParams): Promise<ApiImportResult> {
    const ownerId = (params as { user?: { id?: string } } | undefined)?.user?.id;
    if (!ownerId) throw new NotAuthenticated("Importing a collection requires a signed-in user");

    return importCollection(this.app, ownerId, data.csv, { replace: data.replace });
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get("paginate"),
  Model: app.get("postgresqlClient"),
  name: "collectionItems"
});
