import type { Params } from "@feathersjs/feathers";
import { KnexService } from "@feathersjs/knex";
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex";
import { ApiServicePath } from "@game-library/types";

import type { Application } from "../../declarations";
import type { Game, GameData, GamePatch, GameQuery } from "./game.schema";
import { GAME_CATEGORY } from "./game.shared";

export type { Game, GameData, GamePatch, GameQuery };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameParams extends KnexAdapterParams<GameQuery> {}

export class GameService<ServiceParams extends Params = GameParams> extends KnexService<
  Game,
  GameData,
  ServiceParams,
  GamePatch
> {
  private app: Application;
  private gameCategoryId: Promise<string> | null = null;

  constructor(options: KnexAdapterOptions, app: Application) {
    super(options);
    this.app = app;
  }

  /**
   * Internal helper (not exposed to clients): return the catalog game matching
   * `data`'s natural key — title, platform, category, country, release type —
   * creating it through the service (so genres and cover lookup run) if absent.
   */
  async findOrCreate(data: GameData): Promise<{ game: Game; created: boolean }> {
    const categoryId = data.categoryId ?? (await this.defaultCategoryId());
    const query = this.app
      .get("postgresqlClient")("games")
      .where({ title: data.title.trim(), platformId: data.platformId, categoryId });
    for (const key of ["countryId", "releaseTypeId"] as const) {
      if (data[key]) query.where(key, data[key]);
      else query.whereNull(key);
    }

    const service = this.app.service(ApiServicePath.Games);
    const existing: { id: string } | undefined = await query.first("id");
    if (existing) return { game: await service.get(existing.id), created: false };
    return { game: await service.create({ ...data, categoryId }), created: true };
  }

  /**
   * Id of the "Games" category, created on first use and then remembered. New
   * catalog entries are filed under it when the caller doesn't name a category.
   */
  defaultCategoryId(): Promise<string> {
    if (!this.gameCategoryId) {
      // The lookup's create is find-or-create, so this is safe on every start.
      this.gameCategoryId = this.app
        .service(ApiServicePath.Categories)
        .create({ name: GAME_CATEGORY })
        .then((category) => category.id)
        .catch((error) => {
          this.gameCategoryId = null;
          throw error;
        });
    }
    return this.gameCategoryId;
  }

  /** Custom method (super admin): queue cover resolution for every game still missing artwork. */
  async syncCovers(_data: Record<string, never>, _params?: ServiceParams): Promise<{ queued: number }> {
    return { queued: await this.app.get("coverService").enqueueMissing({ force: true }) };
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get("paginate"),
  Model: app.get("postgresqlClient"),
  name: "games"
});
