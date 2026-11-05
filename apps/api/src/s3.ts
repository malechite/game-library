import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
  PutBucketPolicyCommand
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import type { Application } from "./declarations";
import { logger } from "./logger";

export interface S3Config {
  endpoint: string;
  /**
   * Browser-facing base URL for stored objects. The `endpoint` is the address the
   * API uses to talk to the store (internal cluster DNS in prod, e.g.
   * http://minio:9000), which isn't reachable from the browser. Set
   * this to the public host (e.g. https://storage.example.com) so the URLs we hand
   * to clients resolve. Falls back to `endpoint` when unset (local dev).
   */
  publicEndpoint?: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface UploadResult {
  key: string;
  url: string;
  contentType: string;
  size: number;
}

/**
 * Thin wrapper over the AWS S3 SDK configured for MinIO (path-style addressing).
 * Works against any S3-compatible store.
 */
export class S3Service {
  private client: S3Client;
  private bucket: string;
  private publicEndpoint: string;

  constructor(config: S3Config) {
    this.bucket = config.bucket;
    // URLs handed to the browser use the public endpoint; fall back to the
    // internal endpoint for local dev where they're the same host.
    this.publicEndpoint = (config.publicEndpoint || config.endpoint).replace(/\/$/, "");

    this.client = new S3Client({
      endpoint: config.endpoint,
      region: config.region || "us-east-1",
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      },
      forcePathStyle: true, // required for MinIO
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED"
    });
  }

  /** Create the bucket if it doesn't exist and make objects publicly readable (dev convenience). */
  async ensureBucket(): Promise<void> {
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: this.bucket }));
      return;
    } catch {
      // bucket missing — create it below
    }

    try {
      await this.client.send(new CreateBucketCommand({ Bucket: this.bucket }));
      await this.client.send(
        new PutBucketPolicyCommand({
          Bucket: this.bucket,
          Policy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: { AWS: ["*"] },
                Action: ["s3:GetObject"],
                Resource: [`arn:aws:s3:::${this.bucket}/*`]
              }
            ]
          })
        })
      );
      logger.info(`Created object storage bucket "${this.bucket}"`);
    } catch (error) {
      logger.warn("Could not create/configure storage bucket: %O", error);
    }
  }

  async upload(buffer: Buffer, contentType: string, filename?: string): Promise<UploadResult> {
    const extension = filename && filename.includes(".") ? filename.substring(filename.lastIndexOf(".")) : "";
    const key = `${randomUUID()}${extension}`;

    await this.client.send(new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: buffer, ContentType: contentType }));

    return { key, url: this.getUrl(key), contentType, size: buffer.length };
  }

  async delete(key: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }

  async get(key: string): Promise<Buffer> {
    const response = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
    const bytes = await response.Body?.transformToByteArray();
    if (!bytes) throw new Error(`Failed to retrieve object: ${key}`);
    return Buffer.from(bytes);
  }

  getUrl(key: string): string {
    return `${this.publicEndpoint}/${this.bucket}/${key}`;
  }
}

export const s3 = (app: Application) => {
  const config = app.get("s3" as never) as S3Config | undefined;
  if (!config) {
    throw new Error("S3 configuration is missing");
  }
  const service = new S3Service(config);
  app.set("s3Client", service);
  // Best-effort bucket bootstrap for local dev.
  void service.ensureBucket();
};

declare module "./declarations" {
  interface Configuration {
    s3Client: S3Service;
  }
}
