// Production-safe knexfile (no ts-node required).
// In development, knex picks up knexfile.ts via ts-node. In production, the
// compiled JS migrations live in lib/db/migrations and this .js file is used.
process.env.ALLOW_CONFIG_MUTATIONS = "true";
const config = require("config");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  ...config.get("postgresql"),
  migrations: {
    directory: path.resolve(__dirname, isDev ? "src/db/migrations" : "lib/db/migrations"),
    extension: isDev ? "ts" : "js",
    loadExtensions: [`.${isDev ? "ts" : "js"}`]
  }
};
