import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiImportResult } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import { apiRequest } from "../../core/request";

export interface ImportCollectionInput {
  /** A GAMEYE collection export (.csv). */
  file: File;
  /** Replace the existing collection (default) rather than adding to it. */
  replace?: boolean;
}

/**
 * Import a GAMEYE CSV export into the signed-in user's collection. Uses the raw
 * `POST /collection-items/import` route (not a Feathers method). New lookup
 * values and catalog games are created as needed, so everything is refreshed.
 */
export const useImportCollection = () => {
  const { client, host } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiImportResult, Error, ImportCollectionInput>({
    mutationFn: async ({ file, replace = true }) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      const csv = await file.text();
      return apiRequest<ApiImportResult>(client, host, `/${ApiServicePath.CollectionItems}/import`, {
        method: "POST",
        body: { csv, replace }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
};
