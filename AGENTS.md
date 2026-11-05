# AGENTS.md

Guidance for AI agents (and humans) working in this repository. `CLAUDE.md` imports this file. Package-level notes live in `apps/api/CLAUDE.md`, `ui/cinder/CLAUDE.md` and `ui/armature/CLAUDE.md`.

## 1. What this is

A monorepo demo of one deployable application:

- `apps/api` — FeathersJS 5 (Koa + Knex + Postgres, TypeBox). It is **also the web server**: it serves `apps/web/dist` as static files and falls back to `index.html` for client-side routes.
- `apps/web` — a Vite + React 19 SPA (react-router 7, TanStack Query through the sdk). In dev it runs on :5173 and calls the API on :3030 (CORS). In production it is same-origin, served by the API.
- `ui/*` and `packages/*` — in-repo libraries that mirror the author's SparkForge design system. They are **consumed as built `dist` output** through their `package.json` `exports`; turbo's `^build` dependency makes that work. Treat them as if they were published packages.

One container (`Dockerfile` at the root), one k8s deployment (`k8s/`), one image (`ghcr.io/malechite/game-library`).

### The domain

The app manages a personal video game collection (importable from a GAMEYE CSV export). **It is games-only**: consoles and other hardware are not tracked.

- **Reference data** — `platforms`, `categories`, `countries`, `releaseTypes`, `ownerships`, `genres`, `companies`. Each is a `{ id, name }` table with a unique name; nothing else stores those strings. One generic `LookupService` backs all seven paths (`apps/api/src/services/lookup/`).
- **Catalog** — `games`: one row per distinct release (title + platform + category + country + release type), shared by all users, with lookup foreign keys and `gameGenres` for the many-to-many genres. The category is not chosen in the UI: new entries default to `GAME_CATEGORY` ("Games", `services/game/game.shared.ts`).
- **Collection** — `collectionItems`: a user's physical copy of a catalog game (ownership, value, price paid, notes, `isFavorite`). Per user (`ownerId`); two copies of the same game are two rows.
- **Read model** — the `libraryItems` Postgres view joins an item with its game, lookup names and genre arrays. The read-only `library` service exposes it with normal Feathers query syntax, so filtering, sorting and pagination need no custom SQL. **Reads go through `library`; writes go through `collection-items` (the copy) and `games` (the catalog entry).**
- **Import** — `apps/api/src/import/`: `gameye-csv.ts` (pure parse + normalize) and `collection-importer.ts` (one transaction; upserts lookups and games, inserts items). Only rows in the "Games" category are imported; hardware rows come back in `skipped`. Reached by `POST /collection-items/import` and `pnpm import:collection <file>`.
- **Paging** — the library returns 100 items per page (`LIBRARY_PAGE_SIZE` in the API, `PAGE_SIZE` in the web app); keep the two in step.
- **Cover art** — `apps/api/src/covers/`: a background queue resolves box art (libretro thumbnails, no key; then IGDB when configured), stores it in object storage and sets `games.coverUrl`. The server only downloads from an allowlist of hosts.
- **External search** — IGDB, optional, behind `IGDB_CLIENT_ID` / `IGDB_CLIENT_SECRET`. Without them `catalog-search` returns local matches only.

## 2. Layout and dependency order

```
tooling/   eslint-config, typescript-config (tsconfig bases + tsup presets)
packages/  types → util → sdk
ui/        tokens, icon, armature → cinder → lattice
apps/      storybook (ui/*), api (types, web), web (ui/*, packages/*)
```

Build order: `types → (tokens, util, icon, armature, sdk) → cinder → lattice → storybook`; `types → api`; `(cinder, sdk, …) → web → api`. The api lists `@game-library/web` as a devDependency purely so `pnpm build` builds the SPA before the server.

## 3. Commands

| Command                                               | Notes                                                                                                                                           |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`                                        | Node 24 (`.nvmrc`), pnpm 10 via corepack                                                                                                        |
| `docker compose up -d postgres minio`                 | Postgres :5432 (`POSTGRES_PORT` to override), MinIO :9000/:9001. First boot also creates `game_library_test`                                    |
| `pnpm db:setup`                                       | `knex migrate:latest` + seed (`admin@game-library.dev` / `development`, super admin)                                                            |
| `pnpm import:collection <file.csv>`                   | Import a GAMEYE export for the admin (`--email <user>`, `--append`, `--no-covers`), then fetch covers                                           |
| `pnpm --filter @game-library/api covers:sync`         | Fetch cover art for games that have none (`--refresh` also replaces outdated matches)                                                           |
| `pnpm dev`                                            | api (nodemon + tsx), web (vite), libraries (tsup watch). Storybook excluded                                                                     |
| `pnpm dev:storybook`                                  | Same plus Storybook on :6006                                                                                                                    |
| `pnpm build` / `lint` / `typecheck` / `format:check`  | Turbo across the workspace. CI runs all four plus tests                                                                                         |
| `pnpm test`                                           | Root vitest projects: `unit` (packages/ui, node), `web` (jsdom), `storybook` (headless Chromium, needs `pnpm exec playwright install chromium`) |
| `pnpm test:api`                                       | API tests against a real Postgres (`NODE_ENV=test`, db `game_library_test`)                                                                     |
| `pnpm --filter @game-library/api bruno:check`         | Every `ApiServicePath` value must have a `bruno/<path>/` folder                                                                                 |
| `pnpm --filter @game-library/api migrate:make <name>` | New migration                                                                                                                                   |
| `pnpm --filter <pkg> <script>`                        | Run one package's script                                                                                                                        |

## 4. Formatting

Prettier is the source of truth (`.prettierrc`): **130 columns, double quotes, semicolons, no trailing commas, 2-space indent**. Run `pnpm format` before committing. ESLint (legacy `.eslintrc.cjs` per package, ESLint 8) adds `unused-imports`; unused variables and arguments must be prefixed `_`.

## 5. TypeScript and React conventions

- **`const` arrow functions only** — components, hooks, helpers, Feathers hooks. Implicit returns `=> (...)` for single-expression components.
- **Named exports.** Default exports only where a framework requires them (Storybook `meta`, config files, Redux slice reducers).
- **Props**: `export interface FooProps { … }` with a one-line `/** JSDoc */` on each field. Children via `PropsWithChildren<FooProps>`. No `React.FC`; cinder components don't use `forwardRef` (React 19 ref-as-prop).
- **Hooks**: `useX`, one per file, named `UseXOptions` / `UseXResult` interfaces when the shape isn't trivial. Hooks own logic, components render.
- **Enums over string unions for shared constants**: `ApiServicePath`, `AppRoute`, `Size`, `Intent`, `Gemstone` — PascalCase members with lowercase string values. Tiny closed sets local to one file may be unions.
- `import type { X }` / inline `type` imports for types. Barrel `index.ts` per package and per cinder component folder, grouped with `// Components`, `// Hooks` style comments.
- Comments explain _why_. JSDoc headers on exported hooks/components, `@example` blocks on public hooks. Section dividers in long files: `// ─── Section ───────────`.
- Client logs are prefixed with the component name: `console.error("[GameProvider] …")`. Server code uses the winston `logger`.
- Errors: throw `@feathersjs/errors` classes on the server (`BadRequest`, `Forbidden`, `NotFound`). Context hooks throw `"useX must be used within XProvider"`. Best-effort paths use an empty `catch {}` **with a comment** saying why.

## 6. Styling (Vanilla Extract)

- Styles live in a colocated `Name.css.ts`. Variants use `recipe()` from `@vanilla-extract/recipes` and export `type NameVariants = RecipeVariants<typeof nameRecipe>`.
- Semantic colors, spacing, radii and typography come from the theme contract `vars` (`@game-library/cinder/theme`). Brand colors and gradients come from `@game-library/tokens` (`colors.sapphire[300].hex`, `gradients.jasper.css`). Never hard-code hex values in components.
- **The brand color is one token**: `primaryGemstone` (with `primaryColor`, `primaryGradient`, `primaryGradientHover`) in `ui/tokens/src/semantic.ts`. Buttons, the light bar, focus rings and the theme's `primary` all derive from it — change it there, never by hard-wiring a gemstone into a component.
- Layout is composed from Armature primitives with declarative props (`<HStack center gap={3} padding={0}>`, `<Spacer />`), not class strings. No Tailwind.
- Theme classes (`defaultTheme` from armature, `darkTheme` from cinder) are applied to `<body>` once in `apps/web/src/main.tsx`.
- Cinder: folder per component (`Button/Button.tsx`, `Button.css.ts`, `Button.stories.tsx`, `index.ts`), root element carries `data-slot="button"`, class merging via `cn()`. Prop-driven component first; primitives in `NameComponents.tsx` with `*Root` suffix. `components/base/` holds single components; `components/blocks/` holds compositions of them (e.g. `FilterBar`).
- **Icons**: consumers pass icons by name (`icon="Plus"`, typed as `CinderIconType`). Names resolve through the icon registry, so an app must register every icon it uses in `apps/web/src/icons.ts` — that keeps the bundle to exactly those icons and makes an unregistered name a type error. Inside cinder, icons the library itself renders are imported directly from `@phosphor-icons/react` (e.g. `<XIcon />`), never by name.
- Motion is quiet and quick: wrap content in cinder's `FadeIn` to reveal it on scroll (armature's `useInView` underneath), and honor `prefers-reduced-motion`.

## 7. Feathers API conventions (`apps/api`)

- **Four-file service pattern** in `src/services/<name>/`: `<name>.class.ts` (KnexService + `getOptions`), `<name>.schema.ts` (TypeBox schemas, validators, resolvers), `<name>.shared.ts` (`xMethods`), `<name>.ts` (`app.use(ApiServicePath.X, …)`, hooks, `declare module` augmentation).
- **Hook order**: `around.all` → `resolveExternal`, `resolveResult`; `before.all` → `validateQuery`, `resolveQuery`; per method → `authenticate("jwt")`, scoping (`limitToOwner`, `limitToSelf`, `requireSuperAdmin`, `internalOnly`), `validateData`, `resolveData`. Open registration: `users.create` has no auth.
- **Ownership**: `ownerId` is forced from `params.user.id` in the data resolver on create; reads/writes are scoped with `limitToOwner()`. Users can only touch their own row (`limitToSelf`); listing users is super-admin only.
- **Custom HTTP endpoints** (not Feathers methods) are listed in `src/routes.ts`, each mapping a route to a custom service method so that method's hooks (auth, validation, audit) still run: `POST /assets/upload`, `POST /collection-items/import`, `GET /library/summary`, `POST /games/covers/sync`. They are registered **before** `rest()`; the SPA fallback (`src/spa.ts`) is registered **after** it.
- **Read models**: when a list needs joins, create a Postgres view with uniquely named columns and put a read-only `KnexService` on it (see `library`), rather than hand-building joins per request. Override `createQuery` only for what the adapter can't express (array membership, `NULLS LAST`).
- **Shared shapes**: services with an identical shape share one implementation registered per path (the lookups). Don't copy four files seven times.
- **Outbound fetches** go only to allowlisted hosts (`covers/cover-service.ts`); never fetch a client-supplied URL unchecked.
- **Config**: node-config layers (`config/default.json`, `config/<NODE_ENV>.json`, `config/custom-environment-variables.json`). Read via `app.get(...)`; do not read `process.env` inside services.
- **Migrations**: `src/db/migrations/000N_<table>.ts`, `export async function up/down`, uuid PKs (`uuid_generate_v4()`), camelCase columns, `createdAt`/`updatedAt` with `knex.fn.now()`, explicit FKs with `onDelete`, singular file names / plural table names (`users`).
- **Audit**: `hooks/audit-log.ts` writes a row for every external service call. Don't bypass it.
- **Never let compiled `.js` land in `src/`** — tsx resolves `.js` before `.ts` and silently runs stale code. The build emits to `lib/` only.
- Bruno (`bruno/`, OpenCollection YAML) is the runnable API spec. Folder name = `ApiServicePath` value; one `.yml` per method (`create-*`, `list-*`, `get-*`, `patch-*`, `remove-*`); bearer `{{accessToken}}`; capture ids in `after-response` scripts.

## 8. SDK conventions (`packages/sdk`)

- Source-only package (`main: src/index.ts`), consumed by the web app through Vite.
- `client/services/<name>.ts` hand-mirrors the server service: `XData`, `XPatch`, `XQuery`, `XService`, `xMethods`. Register it in `client/index.ts` (`ServiceTypes` + `client.use`).
- `hooks/<name>/useX.ts`, one hook per file, re-exported from `hooks/<name>/index.ts` and `hooks/index.ts`. Query keys: `[resource]`, `[resource, idOrQuery]`; mutations invalidate `[resource]`. Paginated reads return the full `Paginated<T>` envelope with `placeholderData: keepPreviousData`.
- Every hook guards on `client` (`enabled: !!client`) because the provider creates the Feathers client in an effect.
- Auth tokens live in `localStorage` under `feathers-jwt` (Feathers auth-client default). Custom routes go through `apiRequest()` in `core/request.ts`, which adds the token and serializes nested queries.

## 9. New entity checklist (one change, never split across PRs)

1. Migration in `apps/api/src/db/migrations/`.
2. `ApiServicePath` value + `ApiX` interface in `packages/types/src/api.types.ts`.
3. Four service files in `apps/api/src/services/<name>/` + `app.configure(x)` in `services/index.ts`.
4. Bruno folder `apps/api/bruno/<path>/` (`folder.yml` + one request per method); `pnpm --filter @game-library/api bruno:check` passes.
5. SDK mirror: `packages/sdk/src/client/services/<name>.ts`, registration in `client/index.ts`, hooks in `hooks/<name>/`.
6. Web: page under `apps/web/src/pages/`, route in `routes.ts` + `App.tsx`, nav item in `AppHeader` if top-level.
7. Tests: API behaviour beyond plain CRUD gets a test in `apps/api/test/`; new cinder components get a story (stories are also the Storybook browser tests).

## 10. Testing

- Vitest everywhere. Root `vitest.config.ts` defines the `unit`, `web` and `storybook` projects; `apps/api/vitest.config.ts` is run separately (`pnpm test:api`) because it needs Postgres.
- Test files: `*.test.ts` / `*.test.tsx` next to the source or under `__tests__/` (packages, web) and `test/` (api). `describe("<subject>")`, `it("does X")`.
- Component tests use Testing Library + jsdom with `vitest.setup.components.ts` (polyfills for ResizeObserver, matchMedia, getAnimations).
- CI (`.github/workflows/ci.yml`): format:check → build → lint → typecheck; tests with a Postgres service container; Docker image on push to `main`.

## 11. Git

- Conventional prefixes: `feat:`, `fix:`, `chore:`, `ci:`, `docs:`; scope in parentheses when useful (`fix(api): …`).
- Never commit `.env`, `lib/`, `dist/`, `*.tsbuildinfo`.
