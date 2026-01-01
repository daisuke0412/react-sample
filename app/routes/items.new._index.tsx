import { useItemCreateRouteHandlers } from "~/features/items/hooks/useItemCreateRoute";
import { ItemCreatePage } from "~/features/items/pages/ItemCreatePage";

// Actionをエクスポートすることで、React Routerがデータ送信を管理
export const clientAction = useItemCreateRouteHandlers.clientAction;

export default function ItemCreatePageRoute() {
  return <ItemCreatePage />;
}