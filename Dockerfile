# Game Library — single deployable: the Feathers API serving the built web SPA.
#
# Stages:
#   pruner    → `turbo prune` the monorepo down to what @game-library/api needs
#               (which, via its devDependency on @game-library/web, includes the SPA
#               and every ui/* + packages/* library).
#   installer → install the pruned lockfile.
#   builder   → turbo build (libraries → web → api).
#   runner    → copy the built tree and run `node lib` from apps/api.
FROM node:24-alpine AS base
RUN corepack enable

# --- Prune the monorepo to only what the api (and its SPA) needs ---
FROM base AS pruner
RUN npm install -g turbo@^2
WORKDIR /app
COPY . .
RUN turbo prune @game-library/api --docker

# --- Install dependencies from the pruned lockfile ---
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile

# --- Build libraries, the SPA, then the api ---
FROM installer AS builder
WORKDIR /app
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=@game-library/api

# --- Runtime ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
WORKDIR /app/apps/api
EXPOSE 3030
# k8s overrides the command to run migrate + seed first; plain `docker run` just serves.
CMD ["node", "lib"]
