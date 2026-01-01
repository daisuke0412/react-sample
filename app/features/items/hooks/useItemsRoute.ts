import { queryClient } from "~/lib/query-client";
import { getItemsQueryOptions } from "../api";

export const useItemsRouteHandlers = {
  clientLoader: async () => {
    // fetchQuery はデータが stale (古い) 場合やキャッシュがない場合に再取得を行う
    // invalidateQueries でデータが stale になっている場合、ここで確実に再取得が走る
    await queryClient.fetchQuery(
      getItemsQueryOptions("")
    );
    
    return null;
  },
};