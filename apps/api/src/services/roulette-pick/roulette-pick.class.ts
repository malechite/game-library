import { NotAuthenticated, NotFound } from "@feathersjs/errors";
import type { Id, Paginated } from "@feathersjs/feathers";
import { KnexService } from "@feathersjs/knex";
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex";

import type { Application } from "../../declarations";
import type { RoulettePick, RoulettePickData, RoulettePickQuery } from "./roulette-pick.schema";

export type { RoulettePick, RoulettePickData, RoulettePickQuery };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RoulettePickParams extends KnexAdapterParams<RoulettePickQuery> {}

/** The table picks are written to; reads come from the `roulettePickItems` view. */
const PICKS_TABLE = "roulettePicks";

/**
 * A user's roulette history. Reads go through a stock Knex adapter over the
 * `roulettePickItems` view (so the joined title, platform and cover filter,
 * sort and paginate like any column); `create` and `remove` write to the
 * `roulettePicks` table and answer with the view row.
 */
export class RoulettePickService<ServiceParams extends RoulettePickParams = RoulettePickParams> {
  private app: Application;
  private items: KnexService<RoulettePick, never, ServiceParams, never>;

  constructor(options: KnexAdapterOptions, app: Application) {
    this.app = app;
    this.items = new KnexService<RoulettePick, never, ServiceParams, never>(options);
  }

  /** The caller's picks, newest first unless the query sorts otherwise. */
  async find(params?: ServiceParams): Promise<Paginated<RoulettePick> | RoulettePick[]> {
    const query = { $sort: { createdAt: -1 }, ...params?.query };
    return this.items.find({ ...params, query } as ServiceParams);
  }

  async get(id: Id, params?: ServiceParams): Promise<RoulettePick> {
    return this.items.get(id, params);
  }

  /** Log a pick of one of the caller's own copies. */
  async create(data: RoulettePickData, params?: ServiceParams): Promise<RoulettePick> {
    const ownerId = (params as { user?: { id?: string } } | undefined)?.user?.id;
    if (!ownerId) throw new NotAuthenticated("Logging a roulette pick requires a signed-in user");

    const knex = this.app.get("postgresqlClient");

    // Only a copy the caller owns can be picked; that copy also decides the game.
    const item: { gameId: string } | undefined = await knex("collectionItems")
      .where({ id: data.collectionItemId, ownerId })
      .first("gameId");
    if (!item) throw new NotFound(`No collection item found for id '${data.collectionItemId}'`);

    const [row]: Array<{ id: string }> = await knex(PICKS_TABLE)
      .insert({ ownerId, gameId: item.gameId, collectionItemId: data.collectionItemId })
      .returning("id");

    return this.items.get(row!.id);
  }

  /** Remove a pick from the history. `params.query` carries the owner scope, so someone else's pick is a 404. */
  async remove(id: Id, params?: ServiceParams): Promise<RoulettePick> {
    const pick = await this.items.get(id, params);
    await this.app.get("postgresqlClient")(PICKS_TABLE).where({ id: pick.id }).delete();
    return pick;
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get("paginate"),
  Model: app.get("postgresqlClient"),
  name: "roulettePickItems"
});
