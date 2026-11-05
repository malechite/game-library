process.env.ALLOW_CONFIG_MUTATIONS = "true";
import config from "config";
import path from "path";

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  ...config.get("postgresql"),
  migrations: {
    directory: path.resolve(__dirname, isDev ? "src/db/migrations" : "lib/db/migrations"),
    extension: isDev ? "ts" : "js",
    loadExtensions: [`.${isDev ? "ts" : "js"}`]
  }
};
