import type { Params } from "@feathersjs/feathers";
import { ApiServicePath } from "@game-library/types";
import type { Application } from "./declarations";

/**
 * Custom HTTP routes.
 *
 * Feathers REST only exposes the standard service methods, so anything else —
 * an upload, an import, a summary — is mapped here from a plain HTTP route to a
 * custom service method. Each call passes the parsed authentication and a
 * `provider`, so the method's own hooks (`authenticate("jwt")`, validation,
 * the audit log) run exactly as they would for a normal service call.
 *
 * Must be registered BEFORE rest(): a path like `/assets/upload` would
 * otherwise be read by the service router as `GET /assets/:id`.
 */

interface RouteContext {
  method: string;
  path: string;
  status: number;
  body: unknown;
  query: Record<string, unknown>;
  request: { body: unknown };
  feathers?: Params;
}

interface CustomRoute {
  method: "GET" | "POST";
  path: string;
  /** HTTP status on success. */
  status: number;
  /** Message used when the thrown error carries none. */
  failure: string;
  handle: (ctx: RouteContext, params: Params) => Promise<unknown>;
}

const customRoutes = (app: Application): CustomRoute[] => [
  {
    method: "POST",
    path: `/${ApiServicePath.Assets}/upload`,
    status: 201,
    failure: "Upload failed",
    handle: (ctx, params) => app.service(ApiServicePath.Assets).upload(ctx.request.body as never, params as never)
  },
  {
    method: "POST",
    path: `/${ApiServicePath.CollectionItems}/import`,
    status: 201,
    failure: "Import failed",
    handle: (ctx, params) => app.service(ApiServicePath.CollectionItems).import(ctx.request.body as never, params as never)
  },
  {
    method: "GET",
    path: `/${ApiServicePath.Library}/summary`,
    status: 200,
    failure: "Could not load the library summary",
    handle: (ctx, params) => app.service(ApiServicePath.Library).summary(ctx.query as never, params as never)
  },
  {
    // Re-run cover resolution for every game that still has no artwork.
    method: "POST",
    path: `/${ApiServicePath.Games}/covers/sync`,
    status: 202,
    failure: "Could not start the cover sync",
    handle: (_ctx, params) => app.service(ApiServicePath.Games).syncCovers({}, params as never)
  }
];

export const routes = (app: Application) => {
  const table = customRoutes(app);

  app.use(async (ctx: RouteContext, next: () => Promise<unknown>) => {
    const route = table.find((candidate) => candidate.method === ctx.method && candidate.path === ctx.path);
    if (!route) return next();

    try {
      ctx.body = await route.handle(ctx, { ...ctx.feathers, provider: "rest" });
      ctx.status = route.status;
    } catch (error) {
      const err = error as { code?: number; message?: string };
      ctx.status = typeof err.code === "number" ? err.code : 500;
      ctx.body = { message: err.message ?? route.failure };
    }
  });
};
