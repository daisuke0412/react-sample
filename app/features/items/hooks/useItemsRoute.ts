import { queryClient } from "~/lib/query-client";
import { getItemsQueryOptions } from "../api";

export const useItemsRouteHandlers = {
  clientLoader: async () => {
    // 画面初期表示時点のクエリキー（name=""）と同じクエリキーでfetchQueryを実行する
    // これにより、初期表示時のデータ取得を待機できる
    await queryClient.fetchQuery(
      getItemsQueryOptions("")
    );
    
    return null;
  },
};