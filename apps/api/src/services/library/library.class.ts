import { NotAuthenticated } from "@feathersjs/errors";
import { KnexService } from "@feathersjs/knex";
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex";
import type { ApiLibrarySummary } from "@game-library/types";

import type { Application } from "../../declarations";
import type { LibraryItem, LibraryQuery } from "./library.schema";

export type { LibraryItem, LibraryQuery };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LibraryParams extends KnexAdapterParams<LibraryQuery> {}

/** Items per library page; the service's default and maximum `$limit`. */
export const LIBRARY_PAGE_SIZE = 100;

/**
 * Read-only service over the `libraryItems` view. Because the view flattens the
 * joins into uniquely named columns, the stock Knex adapter can filter, sort
 * and paginate it with ordinary Feathers query syntax.
 */
export class LibraryService<ServiceParams extends LibraryParams = LibraryParams> extends KnexService<
  LibraryItem,
  never,
  ServiceParams,
  never
> {
  private app: Application;

  constructor(options: KnexAdapterOptions, app: Application) {
    super(options);
    this.app = app;
  }

  createQuery(params: ServiceParams = {} as ServiceParams) {
    // `genreId` isn't a column, so keep it away from the adapter's WHERE builder.
    const { genreId, ...query } = (params.query ?? {}) as LibraryQuery;
    const builder = super.createQuery({ ...params, query });

    if (genreId) builder.whereRaw('?::uuid = ANY("genreIds")', [genreId]);

    // Re-apply the sort with NULLS LAST (Postgres puts nulls first on DESC, which
    // would lead "highest value" with unpriced games), then break ties by title
    // and id so pages stay stable.
    const sort = (query.$sort ?? {}) as Record<string, number>;
    builder.clearOrder();
    for (const [column, direction] of Object.entries(sort)) {
      builder.orderByRaw(`?? ${direction === 1 ? "ASC" : "DESC"} NULLS LAST`, [column]);
    }
    if (!("title" in sort)) builder.orderBy("title", "asc");
    builder.orderBy("id", "asc");

    return builder;
  }

  /**
   * Custom method: totals for the caller's library under the given filters,
   * plus cover-sync progress so the UI knows when to refresh artwork.
   */
  async summary(query: LibraryQuery, params?: ServiceParams): Promise<ApiLibrarySummary> {
    const ownerId = (params as { user?: { id?: string } } | undefined)?.user?.id;
    if (!ownerId) throw new NotAuthenticated("The library summary requires a signed-in user");

    // Totals ignore paging and ordering; always scoped to the caller.
    const { $limit: _limit, $skip: _skip, $sort: _sort, $select: _select, ...filters } = query as Record<string, unknown>;
    const builder = this.createQuery({ query: { ...filters, ownerId }, paginate: false } as unknown as ServiceParams);

    const row: { count: number; totalValue: number; missingCovers: number } | undefined = await builder
      .clearSelect()
      .clearOrder()
      .select(
        this.Model.raw(
          'count(*)::int AS "count", COALESCE(sum("value"), 0)::float AS "totalValue", ' +
            '(count(*) FILTER (WHERE "coverUrl" IS NULL))::int AS "missingCovers"'
        )
      )
      .first();

    return {
      count: row?.count ?? 0,
      totalValue: row?.totalValue ?? 0,
      missingCovers: row?.missingCovers ?? 0,
      coverSyncActive: this.app.get("coverService").active
    };
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: { default: LIBRARY_PAGE_SIZE, max: Math.max(LIBRARY_PAGE_SIZE, app.get("paginate")?.max ?? 0) },
  Model: app.get("postgresqlClient"),
  name: "libraryItems"
});
