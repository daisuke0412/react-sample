import { getItems } from "../api";

export const useItemsRouteHandlers = {
  clientLoader: async () => {
    return await getItems();
  },
};