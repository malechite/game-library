import { authenticate } from "@feathersjs/authentication";
import { BadRequest } from "@feathersjs/errors";
import { hooks as schemaHooks } from "@feathersjs/schema";
import { ApiServicePath } from "@game-library/types";

import {
  gameDataValidator,
  gamePatchValidator,
  gameQueryValidator,
  gameResolver,
  gameExternalResolver,
  gameDataResolver,
  gamePatchResolver,
  gameQueryResolver
} from "./game.schema";

import type { Application, HookContext } from "../../declarations";
import { isAllowedCoverUrl } from "../../covers/cover-service";
import { requireSuperAdmin } from "../../hooks/super-admin";
import { touchUpdatedAt } from "../../hooks/timestamps";
import { GameService, getOptions, type Game, type GameData } from "./game.class";
import { gameMethods } from "./game.shared";

export * from "./game.class";
export * from "./game.schema";

type GameContext = HookContext<GameService>;
type GenreParams = { genreIds?: string[] };

/** Results as a flat array, whether the call returned one game, a list or a page. */
const resultGames = (context: GameContext): Game[] => {
  const result = context.result as Game | Game[] | { data: Game[] } | undefined;
  if (!result) return [];
  if (Array.isArray(result)) return result;
  return "data" in result && Array.isArray(result.data) ? result.data : [result as Game];
};

/** The server only downloads cover art from known hosts (see covers/cover-service.ts). */
const validateCoverSource = async (context: GameContext): Promise<void> => {
  const source = (context.data as { coverSourceUrl?: string | null } | undefined)?.coverSourceUrl;
  if (source && !isAllowedCoverUrl(source)) {
    throw new BadRequest("coverSourceUrl must point at a supported cover art host");
  }
};

/** Before create: the library is games-only, so an entry without a category is filed under "Games". */
const defaultCategory = async (context: GameContext): Promise<void> => {
  const data = context.data as GameData;
  if (!data.categoryId) data.categoryId = await context.service.defaultCategoryId();
};

/** `genreIds` isn't a column: lift it off the data so the row write succeeds, and keep it for `syncGenres`. */
const stashGenres = async (context: GameContext): Promise<void> => {
  const { genreIds, ...rest } = context.data as { genreIds?: string[] };
  context.data = rest as typeof context.data;
  (context.params as GenreParams).genreIds = genreIds;
};

/** After create/patch: make the `gameGenres` rows match the submitted `genreIds`. */
const syncGenres = async (context: GameContext): Promise<void> => {
  const { genreIds } = context.params as GenreParams;
  const [game] = resultGames(context);
  if (!genreIds || !game) return;

  const db = context.app.get("postgresqlClient");
  await db.transaction(async (trx) => {
    await trx("gameGenres").where({ gameId: game.id }).delete();
    if (genreIds.length > 0) {
      await trx("gameGenres").insert([...new Set(genreIds)].map((genreId) => ({ gameId: game.id, genreId })));
    }
  });
};

/** After any read/write: attach each game's `genreIds` with a single query for the whole result. */
const populateGenres = async (context: GameContext): Promise<void> => {
  const games = resultGames(context);
  if (games.length === 0) return;

  const links: Array<{ gameId: string; genreId: string }> = await context.app
    .get("postgresqlClient")("gameGenres")
    .whereIn(
      "gameId",
      games.map((game) => game.id)
    )
    .select("gameId", "genreId");

  const byGame = new Map<string, string[]>();
  for (const link of links) byGame.set(link.gameId, [...(byGame.get(link.gameId) ?? []), link.genreId]);
  for (const game of games) game.genreIds = byGame.get(game.id) ?? [];
};

/** After create/patch: fetch box art in the background when the game has none. */
const enqueueCover = async (context: GameContext): Promise<void> => {
  const [game] = resultGames(context);
  if (game && !game.coverUrl) context.app.get("coverService").enqueue(game.id, { force: true });
};

export const game = (app: Application) => {
  app.use(ApiServicePath.Games, new GameService(getOptions(app), app), {
    methods: gameMethods,
    events: []
  });
  app.service(ApiServicePath.Games).hooks({
    around: {
      all: [schemaHooks.resolveExternal(gameExternalResolver), schemaHooks.resolveResult(gameResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(gameQueryValidator), schemaHooks.resolveQuery(gameQueryResolver)],
      find: [authenticate("jwt")],
      get: [authenticate("jwt")],
      // The catalog is shared and community-edited: any signed-in user may add or
      // correct a game (every change lands in the audit log). Deleting is admin-only.
      create: [
        authenticate("jwt"),
        schemaHooks.validateData(gameDataValidator),
        validateCoverSource,
        defaultCategory,
        stashGenres,
        schemaHooks.resolveData(gameDataResolver)
      ],
      patch: [
        authenticate("jwt"),
        schemaHooks.validateData(gamePatchValidator),
        validateCoverSource,
        stashGenres,
        touchUpdatedAt,
        schemaHooks.resolveData(gamePatchResolver)
      ],
      remove: [authenticate("jwt"), requireSuperAdmin],
      syncCovers: [authenticate("jwt"), requireSuperAdmin]
    },
    after: {
      find: [populateGenres],
      get: [populateGenres],
      create: [syncGenres, populateGenres, enqueueCover],
      patch: [syncGenres, populateGenres, enqueueCover]
    },
    error: { all: [] }
  });
};

declare module "../../declarations" {
  interface ServiceTypes {
    [ApiServicePath.Games]: GameService;
  }
}
