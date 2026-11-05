import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiCollectionItem } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { CollectionItemData } from "../../client/services/collection-item";

/**
 * Add a copy to the signed-in user's collection. Pass `gameId` for a game
 * already in the catalog, or `game` to create the catalog entry in the same call.
 */
export const useCreateCollectionItem = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiCollectionItem, Error, CollectionItemData>({
    mutationFn: async (data) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      return client.service(ApiServicePath.CollectionItems).create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
      // A new game may have introduced a new catalog entry.
      queryClient.invalidateQueries({ queryKey: [ApiServicePath.Games] });
    }
  });
};
