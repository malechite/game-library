import { useQuery } from "@tanstack/react-query";
import { ApiServicePath, type ApiLibraryItem } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

/**
 * One library item by its collection item id, with the game and lookup names
 * joined in. Idle until an id is given.
 *
 * @example
 * const { data: item } = useLibraryItem(winner?.id);
 */
export const useLibraryItem = (id?: string | null) => {
  const { client } = useGameLibraryApi();

  return useQuery<ApiLibraryItem>({
    queryKey: ["library", "item", id],
    queryFn: () => client!.service(ApiServicePath.Library).get(id!),
    enabled: !!client && !!id
  });
};
