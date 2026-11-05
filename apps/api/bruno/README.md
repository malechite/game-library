# Game Library API — Bruno Collection

Runnable spec for every endpoint `apps/api` exposes. Open this folder in [Bruno](https://www.usebruno.com/) (v3.1+, OpenCollection YAML format).

## Setup

1. Start the stack and seed the database:

   ```
   docker compose up -d postgres minio
   pnpm --filter @game-library/api db:setup
   pnpm --filter @game-library/api dev
   ```

2. Select the `local` environment (`environments/local.yml`). The seeded admin is
   `admin@game-library.dev` / `development` and carries the super-admin flag.

## Layout

```
bruno/
├── opencollection.yml
├── environments/{local,production}.yml
├── authentication/            ← login-as-admin, reauthenticate, logout
├── users/                     ← matches src/services/user/
├── assets/                    ← matches src/services/asset/   (+ POST /assets/upload)
├── audit/                     ← matches src/services/audit/   (super-admin only)
├── platforms/ categories/ countries/ release-types/ ownerships/ genres/ companies/
│                              ← the lookup tables, all served by src/services/lookup/
├── games/                     ← matches src/services/game/    (+ POST /games/covers/sync)
├── collection-items/          ← matches src/services/collection-item/ (+ POST /collection-items/import)
├── library/                   ← matches src/services/library/ (read-only; + GET /library/summary)
└── catalog-search/            ← matches src/services/catalog-search/
```

**Folder name = the service's `ApiServicePath` value** (e.g. `users`, `assets`), not the source folder name. Inside each folder, name requests after the Feathers method: `create-*.yml`, `list-*.yml`, `get-*.yml`, `patch-*.yml`, `remove-*.yml`. A `folder.yml` carries `info.name`, `info.type: folder`, and `info.seq`.

Custom routes that aren't Feathers methods get their own request file in the owning service's folder:

- `POST /assets/upload` — base64 JSON upload (`assets/upload-asset.yml`).
- `POST /collection-items/import` — import a GAMEYE CSV (`collection-items/import-collection.yml`). The request sends `replace: false` so running it never wipes a real library.
- `GET /library/summary` — totals for the (filtered) library (`library/library-summary.yml`).
- `POST /games/covers/sync` — queue cover-art resolution, super admin (`games/sync-covers.yml`).

## Adding a service

1. Add the value to `ApiServicePath` in `packages/types/src/api.types.ts`.
2. Create `bruno/<value>/folder.yml` plus one request per method.
3. Authenticated requests use `http.auth: { type: bearer, token: "{{accessToken}}" }`.
4. Capture ids downstream requests need in an `after-response` script:
   ```js
   bru.setEnvVar("userId", res.getBody().id);
   ```
5. Run `pnpm --filter @game-library/api bruno:check` to verify every service path has
   a folder (and no folder is orphaned).

## Suggested run order

1. `authentication/login-as-admin` (stores `accessToken` + `currentUserId`)
2. `users/create-user` → `list` → `get` → `patch` → `remove`
3. `assets/upload-asset` → `list` → `get` → `patch` → `remove`
4. `audit/list-audit-logs` → `get-audit-log`
5. Lookups: run each `list-*` (platforms, categories, countries, release-types, ownerships, genres,
   companies) to capture a real id per table (`platformId`, `genreId`, …). `create-*` makes a
   throwaway row (`newPlatformId`, …) that `patch-*` and `remove-*` then act on.
6. `games/create-game` → `list` → `get` → `patch`
7. `collection-items/create-collection-item` → `list` → `get` → `patch`
8. `library/list-library` → `get-library-item` → `library-summary`
9. `catalog-search/list-catalog-search`
10. Tidy up: `collection-items/remove-collection-item`, then `games/remove-game`
11. `authentication/reauthenticate` / `logout`

> Listing users is super-admin only; everyone else can only read, patch or remove
> their own account. Lookup `patch`/`remove`, `games/remove-game` and `games/sync-covers`
> are super-admin only too. A game can't be removed while a collection item references it.
