import { useNavigate, useRevalidator } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getItemsQueryOptions } from "../api";

export function useItems() {
  // clientLoaderの戻り値を型安全に取得
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [searchName, setSearchName] = useState("");

  // useQuery 実行
  // 戻り値として、データ(data)や状態(status)を含む実行結果オブジェクトが返される
  const result = useQuery(getItemsQueryOptions(searchName));

  // 実行結果オブジェクトから必要なデータを取り出す
  const { data } = result;

  const handleRefresh = () => {
    revalidator.revalidate();
  };

  const handleItemClick = (id: string) => () => {
    navigate(`/items/${id}`);
  };

  const handleSearch = (name: string) => {
    setSearchName(name);
  };

  return {
    headerProps: {
      onRefresh: handleRefresh,
    },
    listProps: {
      items: data || [],
      onItemClick: handleItemClick,
    },
    searchProps: {
      onSearch: handleSearch,
    },
  };
}
