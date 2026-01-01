import { getItems } from "../mock-api";

export const useItemsRouteHandlers = {
  clientLoader: async () => {
    const items = await getItems();
    return { items };
  },
};