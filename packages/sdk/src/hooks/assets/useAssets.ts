import { useQuery } from "@tanstack/react-query";
import { ApiServicePath } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { AssetQuery } from "../../client/services/asset";

export const useAssets = (query?: AssetQuery) => {
  const { client } = useGameLibraryApi();

  return useQuery({
    queryKey: ["assets", query],
    queryFn: () =>
      client!
        .service(ApiServicePath.Assets)
        .find({ query })
        .then((res) => res.data),
    enabled: !!client
  });
};
