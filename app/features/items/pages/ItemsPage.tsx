import type { JSX } from "react";
import { ItemPageHeader } from "../components/ItemHeader";
import { ItemList } from "../components/ItemList";
import { useItems } from "../hooks/useItems";
import { ItemSearch } from "../components/ItemSearch";

export function ItemsPage(): JSX.Element {
  const { headerProps, listProps, searchProps } = useItems();
  return (
    <>
      <ItemPageHeader {...headerProps} />
      <ItemSearch {...searchProps} />
      <ItemList {...listProps} />
    </>
  );
}
