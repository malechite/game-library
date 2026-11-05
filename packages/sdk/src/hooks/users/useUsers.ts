import { useQuery } from "@tanstack/react-query";
import { ApiServicePath } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { UserQuery } from "../../client/services/user";

export const useUsers = (query?: UserQuery) => {
  const { client } = useGameLibraryApi();

  return useQuery({
    queryKey: ["users", query],
    queryFn: () =>
      client!
        .service(ApiServicePath.Users)
        .find({ query })
        .then((res) => res.data),
    enabled: !!client
  });
};
