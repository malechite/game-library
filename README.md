# Game Library

A video game collection manager: import a GAMEYE export, browse it as tiles or a list, filter and sort it, and add or edit games. Built as a monorepo demo: a FeathersJS v5 API (Koa + Knex + Postgres) that also serves a Vite-built React SPA, on an in-repo design system and shared packages. One container, one deployment.

## Structure

```
apps/
  api/        Feathers API — auth, game catalog + per-user collection, CSV import, cover art,
              assets (S3/MinIO), audit log; serves apps/web/dist
  web/        Vite + React SPA — the library (tiles/list, filters, favorites, sort, add/edit/import)
  storybook/  Component gallery for the ui/* packages
ui/
  tokens/     Design tokens (gemstone color palette, gradients, semantic mappings)
  icon/       Phosphor-based icon system (SFIcon, GradientFill)
  armature/   Structural layout primitives (Box, Stack, Grid, text, theme contract)
  cinder/     React UI component library (Base UI + Vanilla Extract, shadcn-style)
  lattice/    Animated hex-grid background
packages/
  types/      Shared TypeScript types + the ApiServicePath enum
  util/       Shared utilities (date, color, event emitter, …)
  sdk/        Typed Feathers client + TanStack Query hooks + GameLibraryApiProvider
tooling/
  eslint-config/      Shared ESLint configs
  typescript-config/  Shared tsconfig bases + tsup presets
k8s/          Kustomize manifests (ArgoCD, ExternalSecrets, Traefik)
```

Dependency order: `types → (tokens, util, icon, armature, sdk) → cinder → lattice → storybook`; `types → api`; `(cinder, sdk, …) → web → api`.

## Quickstart

Requires Node 24 (`.nvmrc`), pnpm 10 (`corepack enable`) and Docker.

```sh
pnpm install
docker compose up -d postgres minio   # Postgres :5432 (POSTGRES_PORT=5433 if taken), MinIO :9000 (console :9001)
pnpm db:setup                          # migrate + seed (admin@game-library.dev / development)
pnpm dev                               # api on :3030, web on :5173, libraries in watch mode
```

Then sign in at http://localhost:5173 and import a collection, either from the UI (**Import CSV**) or the command line:

```sh
pnpm import:collection ./my-gameye-export.csv   # for admin@game-library.dev; --email <user>, --append, --no-covers
```

The import normalizes platforms, genres, companies and the rest into lookup tables, then fetches box art in the background and stores it in MinIO. Only games are imported; console and hardware rows in the export are skipped and reported. libretro thumbnails cover most retro platforms with no API key. For the "Add game" search and covers on newer platforms (PS3/PS4/PS5/Switch), create a Twitch application at https://dev.twitch.tv/console/apps and set `IGDB_CLIENT_ID` / `IGDB_CLIENT_SECRET` in `apps/api/.env` (see `apps/api/.env.example`); `pnpm --filter @game-library/api covers:sync` then fills the gaps.

Production shape (what the container does):

```sh
pnpm build                                  # libraries → web → api
pnpm --filter @game-library/api start       # serves API + SPA on :3030
```

## Commands

| Command                                              | What it does                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |
| `pnpm dev`                                           | Everything except Storybook, in watch mode                               |
| `pnpm dev:storybook`                                 | Same, plus Storybook on :6006                                            |
| `pnpm build` / `lint` / `typecheck` / `format:check` | Turbo across the workspace                                               |
| `pnpm test`                                          | Vitest: package unit tests, web component tests, Storybook browser tests |
| `pnpm test:api`                                      | API tests against Postgres (`game_library_test`)                         |
| `pnpm --filter @game-library/api bruno:check`        | Verify the Bruno collection covers every service path                    |
| `docker build -t game-library .`                     | Build the production image                                               |

See `AGENTS.md` for conventions and the new-entity checklist.
