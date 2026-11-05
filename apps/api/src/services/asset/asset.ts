import { authenticate } from "@feathersjs/authentication";
import { hooks as schemaHooks } from "@feathersjs/schema";
import { ApiServicePath } from "@game-library/types";

import {
  assetDataValidator,
  assetPatchValidator,
  assetQueryValidator,
  assetUploadValidator,
  assetResolver,
  assetExternalResolver,
  assetDataResolver,
  assetPatchResolver,
  assetQueryResolver
} from "./asset.schema";

import type { Application, HookContext } from "../../declarations";
import { AssetService, getOptions } from "./asset.class";
import { assetMethods } from "./asset.shared";
import { limitToOwner } from "../../hooks/scope";
import { stringifyJsonb } from "../../hooks/jsonb";

export * from "./asset.class";
export * from "./asset.schema";

/** Before remove: delete the underlying object from storage too. */
const deleteFromStorage = async (context: HookContext): Promise<void> => {
  const { id, service, params, app } = context;
  if (id === null || id === undefined) return;
  const existing = await (service as AssetService).get(id, params).catch(() => null);
  if (existing?.key) {
    await app
      .get("s3Client")
      .delete(existing.key)
      .catch(() => undefined);
  }
};

export const asset = (app: Application) => {
  app.use(ApiServicePath.Assets, new AssetService(getOptions(app), app.get("s3Client")), {
    methods: assetMethods,
    events: []
  });
  app.service(ApiServicePath.Assets).hooks({
    around: {
      all: [schemaHooks.resolveExternal(assetExternalResolver), schemaHooks.resolveResult(assetResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(assetQueryValidator), schemaHooks.resolveQuery(assetQueryResolver)],
      find: [authenticate("jwt"), limitToOwner()],
      get: [authenticate("jwt"), limitToOwner()],
      create: [
        authenticate("jwt"),
        schemaHooks.validateData(assetDataValidator),
        stringifyJsonb("metadata"),
        schemaHooks.resolveData(assetDataResolver)
      ],
      patch: [
        authenticate("jwt"),
        limitToOwner(),
        schemaHooks.validateData(assetPatchValidator),
        stringifyJsonb("metadata"),
        schemaHooks.resolveData(assetPatchResolver)
      ],
      remove: [authenticate("jwt"), limitToOwner(), deleteFromStorage],
      upload: [authenticate("jwt"), schemaHooks.validateData(assetUploadValidator)]
    },
    after: { all: [] },
    error: { all: [] }
  });
};

declare module "../../declarations" {
  interface ServiceTypes {
    [ApiServicePath.Assets]: AssetService;
  }
}
