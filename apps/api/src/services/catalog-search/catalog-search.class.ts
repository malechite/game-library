import type { Params, ServiceInterface } from "@feathersjs/feathers";
import { ApiServicePath, type ApiCatalogResult, type ApiCatalogSearchResult, type ApiGame } from "@game-library/types";

import type { Application } from "../../declarations";
import { logger } from "../../logger";
import type { CatalogSearchQuery } from "./catalog-search.schema";

export type { CatalogSearchQuery };

export type CatalogSearchParams = Params<CatalogSearchQuery>;

const LOCAL_LIMIT = 10;

/** Escape LIKE wildcards so user text is matched literally. */
const likePattern = (text: string): string => `%${text.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;

/**
 * Powers the "Add game" search: matches already in our catalog first, then
 * results from the external game database (IGDB) when credentials are configured.
 */
export class CatalogSearchService<ServiceParams extends CatalogSearchParams = CatalogSearchParams> implements ServiceInterface<
  ApiCatalogSearchResult,
  never,
  ServiceParams
> {
  constructor(private app: Application) {}

  async find(params?: ServiceParams): Promise<ApiCatalogSearchResult> {
    const { q, platformId } = (params?.query ?? {}) as CatalogSearchQuery;
    const igdb = this.app.get("coverService").igdb;

    const local = (await this.app.service(ApiServicePath.Games).find({
      query: {
        title: { $ilike: likePattern(q.trim()) },
        ...(platformId ? { platformId } : {}),
        $sort: { title: 1 },
        $limit: LOCAL_LIMIT
      },
      paginate: false
    })) as unknown as ApiGame[];

    let external: ApiCatalogResult[] = [];
    if (igdb.configured) {
      try {
        const platform = platformId ? await this.app.service(ApiServicePath.Platforms).get(platformId) : null;
        external = await igdb.search(q, platform?.name);
      } catch (error) {
        // The external catalog is an enhancement — a failure there must not break local search.
        logger.warn("External catalog search failed: %O", error);
      }
    }

    return { local, external, provider: igdb.configured ? "igdb" : null };
  }
}
