/**
 * Import a GAMEYE CSV export into a user's collection from the command line.
 *
 *   pnpm import:collection <file.csv> [--email admin@game-library.dev] [--append] [--no-covers]
 *
 * Uses the same importer as `POST /collection-items/import`. By default it
 * replaces the user's existing collection; `--append` adds to it instead.
 * Unless `--no-covers` is given, it then waits for box art to be fetched.
 */
import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { app } from "../src/app";
import { importCollection } from "../src/import/collection-importer";
import { logger } from "../src/logger";

const DEFAULT_EMAIL = "admin@game-library.dev";

const args = process.argv.slice(2);
const flag = (name: string): boolean => args.includes(name);
const option = (name: string): string | undefined => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};

const main = async () => {
  const file = args.find((arg, index) => !arg.startsWith("--") && args[index - 1] !== "--email");
  if (!file) throw new Error("Usage: import:collection <file.csv> [--email <user>] [--append] [--no-covers]");

  // pnpm runs the script from apps/api; resolve relative paths from where the user ran the command.
  const csv = await readFile(path.resolve(process.env.INIT_CWD ?? process.cwd(), file), "utf8");
  const email = option("--email") ?? DEFAULT_EMAIL;

  const db = app.get("postgresqlClient");
  const user: { id: string } | undefined = await db("users").where({ email }).first("id");
  if (!user) throw new Error(`No user with email ${email} — run \`pnpm db:setup\` first or pass --email`);

  const withCovers = !flag("--no-covers") && app.get("covers").enabled;
  const result = await importCollection(app, user.id, csv, { replace: !flag("--append"), covers: withCovers });
  logger.info(
    `Imported ${result.items} of ${result.rows} rows for ${email}: ` +
      `${result.gamesCreated} new catalog games, ${result.gamesExisting} already known, ${result.skipped.length} skipped`
  );
  for (const skipped of result.skipped) logger.warn(`  line ${skipped.line}: ${skipped.reason}`);

  if (withCovers) {
    const covers = app.get("coverService");
    logger.info("Fetching cover art (Ctrl+C to stop; `pnpm --filter @game-library/api covers:sync` resumes later)…");
    while (covers.active) await new Promise((resolve) => setTimeout(resolve, 1000));
    const [{ missing }] = (await db("games").whereNull("coverUrl").count({ missing: "*" })) as Array<{ missing: number }>;
    logger.info(`Cover art done — ${missing} games still have no artwork`);
  }

  await db.destroy();
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
