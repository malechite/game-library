import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiCollectionItem } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { CollectionItemPatch } from "../../client/services/collection-item";

export interface UpdateCollectionItemInput {
  id: string;
  data: CollectionItemPatch;
}

/** Edit the signed-in user's own copy (ownership, value, notes, …). */
export const useUpdateCollectionItem = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiCollectionItem, Error, UpdateCollectionItemInput>({
    mutationFn: async ({ id, data }) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      return client.service(ApiServicePath.CollectionItems).patch(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
    }
  });
};
