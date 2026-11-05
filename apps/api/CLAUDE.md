# apps/api — agent guide

Scoped guidance for work inside `apps/api/`. Repo-wide conventions live in the root `AGENTS.md`.

## Shape

- Feathers 5 on Koa, Knex + Postgres, TypeBox schemas, JWT + local auth.
- `src/app.ts` wires: cors → static (`public`, the built web SPA) → errorHandler → parseAuthentication → bodyParser → custom routes (`src/routes.ts`) → postgresql → s3 → covers → `rest()` → SPA fallback → socketio → services → channels.
- Custom HTTP routes map to custom service methods (`POST /assets/upload`, `POST /collection-items/import`, `GET /library/summary`, `POST /games/covers/sync`). Add new ones to the table in `src/routes.ts`; they are registered **before** `rest()`. The SPA fallback (`src/spa.ts`) is registered **after** `rest()`.

## Domain map

| Path(s)                                                                                      | Source                      | Notes                                                                                                                        |
| -------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `platforms`, `categories`, `countries`, `release-types`, `ownerships`, `genres`, `companies` | `services/lookup/`          | One `LookupService` + schema for all seven; `lookups.ts` registers each. `create` is find-or-create by name                  |
| `games`                                                                                      | `services/game/`            | Shared catalog. `genreIds` is virtual (hooks sync `gameGenres`). `findOrCreate` is internal; `syncCovers` is a custom method |
| `collection-items`                                                                           | `services/collection-item/` | A user's copies, scoped with `limitToOwner()`. `create` takes `gameId` or a nested `game`. `import` is a custom method       |
| `library`                                                                                    | `services/library/`         | Read-only over the `libraryItems` view. `genreId` and `NULLS LAST` sorting are handled in `createQuery`; `summary` is custom |
| `catalog-search`                                                                             | `services/catalog-search/`  | Not a table: local `games` search plus IGDB when configured                                                                  |

- `src/import/` — `gameye-csv.ts` is pure (parse + normalize, unit-tested); `collection-importer.ts` does the transactional upsert.
- `src/covers/` — `libretro.ts` (title matching against libretro's box-art listings), `igdb.ts` (IGDB client, also used by `catalog-search`), `cover-service.ts` (queue, download allowlist, storage). Disabled in tests via `covers.enabled`.

## Services: the four-file pattern

`src/services/<name>/`

- `<name>.class.ts` — `class XService extends KnexService<...>` + `getOptions(app)`.
- `<name>.schema.ts` — TypeBox `xSchema`, `xDataSchema` (create), `xPatchSchema`, `xQuerySchema`, their validators and resolvers.
- `<name>.shared.ts` — `xMethods` (the methods the client may call).
- `<name>.ts` — `app.use(ApiServicePath.X, …)`, the hooks block, and the `declare module "../../declarations"` augmentation.

Hook order: `around.all` resolvers → `before.all` validate/resolve query → per method `authenticate("jwt")` → scoping (`limitToOwner`, `limitToSelf`, `requireSuperAdmin`) → validate/resolve data. Throw `@feathersjs/errors` classes; never return error objects.

## New entity checklist (one change, never split)

1. Migration in `src/db/migrations/000N_<table>.ts` (uuid PK via `uuid_generate_v4()`, camelCase columns, `createdAt`/`updatedAt` defaulting to `knex.fn.now()`).
2. `ApiServicePath` value + `ApiX` interface in `packages/types/src/api.types.ts`.
3. The four service files + `app.configure(x)` in `src/services/index.ts`.
4. Bruno folder `bruno/<path>/` with `folder.yml` and one `.yml` per method; `pnpm bruno:check` must pass.
5. SDK mirror: `packages/sdk/src/client/services/<name>.ts` + `packages/sdk/src/hooks/<name>/`.
6. A test in `test/` if the service has behaviour beyond plain CRUD.

## Bruno collection

`bruno/` (OpenCollection YAML, Bruno v3.1+) is the canonical runnable spec. Folder name = `ApiServicePath` value. Authenticated requests use `http.auth: { type: bearer, token: "{{accessToken}}" }`; capture ids via `after-response` scripts. See `bruno/README.md`.

## Gotchas

- Never let compiled `.js` land in `src/` — `tsx`/Node resolve `.js` over `.ts` and silently run stale code. The build emits to `lib/` only.
- Config is node-config: `config/default.json` → `config/<NODE_ENV>.json` → `config/custom-environment-variables.json`. Read with `app.get(...)`, not `process.env`, inside the app.
- `public` points at `../web/dist/`; build the web app before `pnpm start` or the SPA fallback has nothing to serve.
- Tests run against a real Postgres with `NODE_ENV=test` (`config/test.json`, database `game_library_test`, created by `docker/postgres-init.sql`).
- `postgresql.ts` parses `NUMERIC`/`BIGINT` to numbers and leaves `DATE` as a `YYYY-MM-DD` string. Money columns are `decimal(10,2)`.
- The knex CLI loads `knexfile.ts` through `ts-node` — keep it in devDependencies even though the app runs on `tsx`.
- A view-backed service must be changed in step with its view: adding a column to `libraryItems` means a new migration that recreates the view, plus the schema in `library.schema.ts`.
