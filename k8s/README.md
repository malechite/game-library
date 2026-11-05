# Game Library Kubernetes Manifests

K8s manifests for the Game Library application: one deployment (Feathers API serving the built web SPA) plus Postgres. Managed by ArgoCD via the `malechite-apps` ApplicationSet; secrets come from 1Password through ExternalSecrets.

## Structure

| File                       | Purpose                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `external-secrets.yaml`    | ExternalSecrets pulling DB + app secrets from 1Password            |
| `postgres-pv.yaml`         | PersistentVolume + PersistentVolumeClaim for Postgres data         |
| `postgres-deployment.yaml` | Postgres 16 deployment                                             |
| `postgres-service.yaml`    | Postgres ClusterIP service (`game-library-db:5432`)                |
| `api-configmap.yaml`       | Non-secret app config (origins, S3 endpoints, bucket)              |
| `api-deployment.yaml`      | Feathers API + SPA (runs migrate → seed → `node lib`)              |
| `api-service.yaml`         | ClusterIP service (80 → 3030)                                      |
| `api-ingress.yaml`         | Traefik ingress with cert-manager TLS (`game-library.everhart.io`) |
| `kustomization.yaml`       | Kustomize manifest                                                 |

ArgoCD sync waves: secrets (1) → app (2) → database (3).

## Required 1Password Items (K8s - Everhart vault)

### `game-library` item

- `FEATHERS_SECRET` — JWT signing secret
- `S3_ACCESS_KEY_ID` — MinIO access key
- `S3_SECRET_ACCESS_KEY` — MinIO secret key
- `IGDB_CLIENT_ID` — Twitch application client ID (IGDB game search + cover art)
- `IGDB_CLIENT_SECRET` — Twitch application client secret

### `game-library-db` item

- `POSTGRES_PASSWORD` — DB password
- `GAME_LIBRARY_DB_URL` — Full connection string (`postgres://game_library:...@game-library-db:5432/game_library_db`)

## Endpoints

- **App + API:** https://game-library.everhart.io
- **DB:** internal (`game-library-db:5432`)

## Image

CI pushes `ghcr.io/malechite/game-library:{sha,latest}` from the root `Dockerfile`; the deployment pulls `:latest` with `imagePullPolicy: Always`.
