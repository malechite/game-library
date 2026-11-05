/**
 * Fetch cover art for every catalog game that has none, then exit.
 *
 *   pnpm --filter @game-library/api covers:sync [--refresh]
 *
 * The same work the API does in the background after an import; useful to
 * resume an interrupted run or after adding IGDB credentials.
 */
import "dotenv/config";
import { app } from "../src/app";
import { logger } from "../src/logger";

const main = async () => {
  const db = app.get("postgresqlClient");
  const covers = app.get("coverService");

  // --refresh: also replace covers the current matcher would choose differently.
  if (process.argv.includes("--refresh")) {
    logger.info(`Reset ${await covers.resetOutdated()} outdated covers`);
  }

  const queued = await covers.enqueueMissing({ force: true });
  logger.info(`Queued ${queued} games for cover resolution`);
  while (covers.active) await new Promise((resolve) => setTimeout(resolve, 1000));

  const [{ missing }] = (await db("games").whereNull("coverUrl").count({ missing: "*" })) as Array<{ missing: number }>;
  logger.info(`Done — ${missing} games still have no artwork`);
  await db.destroy();
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
