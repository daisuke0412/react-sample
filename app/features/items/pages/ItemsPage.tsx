import { ItemPageHeader } from "../components/ItemHeader";
import { ItemList } from "../components/ItemList";
import { useItems } from "../hooks/useItems";

export function ItemsPage() {
  const { headerProps, listProps } = useItems();
  return (
    <>
      <ItemPageHeader {...headerProps} />
      <ItemList {...listProps} />
    </>
  );
}