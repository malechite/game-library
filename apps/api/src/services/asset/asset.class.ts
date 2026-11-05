import type { Params } from "@feathersjs/feathers";
import { KnexService } from "@feathersjs/knex";
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex";

import type { Application } from "../../declarations";
import type { S3Service } from "../../s3";
import type { Asset, AssetData, AssetPatch, AssetQuery, AssetUploadData } from "./asset.schema";

export type { Asset, AssetData, AssetPatch, AssetQuery, AssetUploadData };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AssetParams extends KnexAdapterParams<AssetQuery> {}

export class AssetService<ServiceParams extends Params = AssetParams> extends KnexService<
  Asset,
  AssetData,
  AssetParams,
  AssetPatch
> {
  private s3: S3Service;

  constructor(options: KnexAdapterOptions, s3: S3Service) {
    super(options);
    this.s3 = s3;
  }

  /** Custom method: upload a base64 file to object storage and persist its record. */
  async upload(data: AssetUploadData, params?: ServiceParams): Promise<Asset> {
    const buffer = Buffer.from(data.fileData, "base64");
    const result = await this.s3.upload(buffer, data.contentType, data.filename);
    const ownerId = (params as { user?: { id?: string } } | undefined)?.user?.id;

    // `_create` bypasses the service hooks (we've already validated the upload).
    return this._create(
      {
        ...(ownerId ? { ownerId } : {}),
        filename: data.filename,
        contentType: data.contentType,
        size: result.size,
        key: result.key,
        url: result.url,
        ...(data.metadata ? { metadata: data.metadata } : {})
      } as AssetData,
      params
    );
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get("paginate"),
  Model: app.get("postgresqlClient"),
  name: "assets"
});
