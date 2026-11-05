import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Application } from "./declarations";
import { logger } from "./logger";

interface KoaLikeContext {
  method: string;
  path: string;
  body: unknown;
  type: string;
  accepts: (...types: string[]) => string | false;
  set: (field: string, value: string) => void;
}

/** Paths that are never SPA routes, even though no Feathers service owns them. */
const RESERVED_PREFIXES = ["/socket.io"];

/**
 * Single-page-app fallback: for a GET that wants HTML and that no static file
 * or Feathers service answered, respond with the SPA's `index.html` so
 * client-side routes (e.g. `/profile`) deep-link and refresh correctly.
 *
 * Registered after `rest()`. Feathers' services middleware calls `next()` for
 * unmatched paths, and the error handler only raises NotFound when `ctx.body`
 * is still undefined — so API 404s (JSON clients) keep working unchanged.
 *
 * The index is re-read on every request outside production so a fresh
 * `vite build` is picked up without restarting the API.
 */
export const spaFallback = (app: Application) => {
  const indexPath = path.resolve(app.get("public"), "index.html");
  const cacheIndex = process.env.NODE_ENV === "production";
  let cached: string | null = null;

  const loadIndex = async (): Promise<string | null> => {
    if (cached) return cached;
    try {
      const html = await readFile(indexPath, "utf8");
      if (cacheIndex) cached = html;
      return html;
    } catch {
      return null;
    }
  };

  return async (ctx: KoaLikeContext, next: () => Promise<unknown>) => {
    const lastSegment = ctx.path.slice(ctx.path.lastIndexOf("/") + 1);
    const looksLikeFile = lastSegment.includes(".");
    const reserved = RESERVED_PREFIXES.some((prefix) => ctx.path.startsWith(prefix));

    if (ctx.method !== "GET" || ctx.body !== undefined || looksLikeFile || reserved || !ctx.accepts("html")) {
      return next();
    }

    const html = await loadIndex();
    if (!html) {
      logger.warn(`SPA fallback: no index.html at ${indexPath} (build apps/web first)`);
      return next();
    }

    ctx.type = "html";
    ctx.set("Cache-Control", "no-cache");
    ctx.body = html;
  };
};
