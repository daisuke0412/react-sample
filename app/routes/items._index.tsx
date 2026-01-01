import { useItemsRouteHandlers } from "~/features/items/hooks/useItemsRoute";
import { ItemsPage } from "~/features/items/pages/ItemsPage";

// Loaderをエクスポートすることで、React Routerがデータ取得を管理
export const clientLoader = useItemsRouteHandlers.clientLoader;

export default function ItemsPageRoute() {
  return <ItemsPage />;
}