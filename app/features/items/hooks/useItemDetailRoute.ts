import { queryClient } from "~/lib/query-client";
import type { ClientLoaderFunctionArgs } from "react-router";
import { getItemQueryOptions } from "../api";

export const useItemDetailRouteHandlers = {
  clientLoader: async ({ params }: ClientLoaderFunctionArgs) => {
    const id = params.id;
    if (!id) throw new Error("IDが指定されていません");

    await queryClient.ensureQueryData(getItemQueryOptions(id));
    
    return null;
  },
};

