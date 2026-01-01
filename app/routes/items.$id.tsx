import { useItemDetailRouteHandlers } from "~/features/items/hooks/useItemDetailRoute";
import { ItemDetailPage } from "~/features/items/pages/ItemDetailPage";

export const clientLoader = useItemDetailRouteHandlers.clientLoader;

export default function ItemDetailPageRoute() {
  return <ItemDetailPage />;
}