import { useQuery } from "@tanstack/react-query";
import { ApiServicePath, type ApiGame } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

/** A single catalog game by id (includes `genreIds`). Disabled until an id is given. */
export const useGame = (id: string | undefined) => {
  const { client } = useGameLibraryApi();

  return useQuery<ApiGame>({
    queryKey: [ApiServicePath.Games, id],
    queryFn: () => client!.service(ApiServicePath.Games).get(id!),
    enabled: !!client && !!id
  });
};
