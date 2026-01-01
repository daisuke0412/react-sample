import { useLoaderData, useNavigate, useRevalidator } from "react-router";
import type { useItemsRouteHandlers } from "./useItemsRoute";

export function useItems() {
  // clientLoaderの戻り値を型安全に取得
  const items = useLoaderData<typeof useItemsRouteHandlers.clientLoader>();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const handleRefresh = () => {
    revalidator.revalidate();
  };

    const handleItemClick = (id: string) => () => {
    navigate(`/items/${id}`);
  };

  return {
    headerProps: {
      onRefresh: handleRefresh,
    },
    listProps: {
      items: items || [],
      onItemClick: handleItemClick,
    },
  };
}