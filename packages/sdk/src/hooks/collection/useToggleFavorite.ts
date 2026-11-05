import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { Paginated } from "@feathersjs/feathers";
import { ApiServicePath, type ApiCollectionItem, type ApiLibraryItem } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

export interface ToggleFavoriteInput {
  id: string;
  /** The new state. */
  isFavorite: boolean;
}

type LibraryPage = Paginated<ApiLibraryItem>;
type Snapshot = Array<[QueryKey, LibraryPage | undefined]>;

const LIBRARY_LISTS = ["library", "list"] as const;

/**
 * Mark or unmark a copy as a favorite. Updates every cached library page
 * immediately so the heart responds on click, then reconciles with the server
 * (rolling back if the request fails).
 *
 * @example
 * const toggleFavorite = useToggleFavorite();
 * <button onClick={() => toggleFavorite.mutate({ id: item.id, isFavorite: !item.isFavorite })} />
 */
export const useToggleFavorite = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiCollectionItem, Error, ToggleFavoriteInput, { previous: Snapshot }>({
    mutationFn: async ({ id, isFavorite }) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      return client.service(ApiServicePath.CollectionItems).patch(id, { isFavorite });
    },
    onMutate: async ({ id, isFavorite }) => {
      // Don't let an in-flight refetch overwrite the optimistic state.
      await queryClient.cancelQueries({ queryKey: LIBRARY_LISTS });
      const previous = queryClient.getQueriesData<LibraryPage>({ queryKey: LIBRARY_LISTS });

      queryClient.setQueriesData<LibraryPage>({ queryKey: LIBRARY_LISTS }, (page) =>
        page ? { ...page, data: page.data.map((item) => (item.id === id ? { ...item, isFavorite } : item)) } : page
      );
      return { previous };
    },
    onError: (_error, _input, context) => {
      for (const [key, page] of context?.previous ?? []) queryClient.setQueryData(key, page);
    },
    onSettled: () => {
      // A favorites-only view may now have one item more or less.
      queryClient.invalidateQueries({ queryKey: ["library"] });
    }
  });
};
