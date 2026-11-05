import { useQuery } from "@tanstack/react-query";
import { ApiServicePath, type ApiUser } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

export const useUser = (id: string | undefined) => {
  const { client } = useGameLibraryApi();

  return useQuery<ApiUser>({
    queryKey: ["users", id],
    queryFn: () => client!.service(ApiServicePath.Users).get(id!),
    enabled: !!client && !!id
  });
};
