import "dotenv/config";
import { ApiServicePath } from "@game-library/types";
import { app } from "../app";
import { logger } from "../logger";

/** Local-dev / first-deploy accounts. The first entry is granted super-admin. */
const SEED_USERS = [
  {
    email: "admin@game-library.dev",
    password: "development",
    name: "Admin"
  }
];

const SUPER_ADMIN_EMAIL = SEED_USERS[0]!.email;

/**
 * Idempotent seed: creates any missing seed users through the service (so the
 * password is hashed by the normal resolver) and grants the super-admin flag.
 * Safe to run on every deploy — the k8s container runs migrate + seed on boot.
 */
const seed = async () => {
  const db = app.get("postgresqlClient");

  for (const user of SEED_USERS) {
    const existing = await db("users").where({ email: user.email }).first();
    if (existing) {
      logger.info(`Seed user already exists: ${user.email}`);
      continue;
    }
    try {
      await app.service(ApiServicePath.Users).create(user, {});
      logger.info(`Seeded user: ${user.email}`);
    } catch {
      // Another replica may have created the user concurrently (unique email).
      // Tolerate the race instead of crashing the boot sequence.
      logger.warn(`Seed user create raced for ${user.email}; continuing`);
    }
  }

  await db("users").where({ email: SUPER_ADMIN_EMAIL }).update({ isSuperAdmin: true });

  await db.destroy();
};

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
