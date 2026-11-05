import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiCollectionItem } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

/** Remove a copy from the signed-in user's collection (the catalog game stays). */
export const useDeleteCollectionItem = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiCollectionItem, Error, string>({
    mutationFn: async (id) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      return client.service(ApiServicePath.CollectionItems).remove(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
    }
  });
};
