"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiAsset } from "@game-library/types";
import { fileToBase64 } from "@game-library/util";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

export interface UploadAssetInput {
  file: File;
  metadata?: Record<string, unknown>;
}

/**
 * Upload a file to the asset service. Uses a raw request to `POST /assets/upload`
 * (a Koa route on the API) rather than a Feathers method, sending the JWT the
 * auth client has stored. Returns the persisted asset (with its public `url`).
 */
export const useUploadAsset = () => {
  const { client, host } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiAsset, Error, UploadAssetInput>({
    mutationFn: async ({ file, metadata }) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      const fileData = await fileToBase64(file);
      const token = await client.authentication.getAccessToken();
      const res = await fetch(`${host}/assets/upload`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          fileData,
          ...(metadata ? { metadata } : {})
        })
      });
      if (!res.ok) {
        throw new Error(`Upload failed (${res.status})`);
      }
      return (await res.json()) as ApiAsset;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    }
  });
};
