import { api } from "~/lib/api-clients";
import type { CreateItemParams, Item } from "./types";
import { itemKeys } from "./query-keys";
import { queryOptions } from "@tanstack/react-query";

export const getItems = async (name?: string) => {
  // params オプションでクエリパラメータを渡す
  return await api.get<Item[]>("/items", {
    params: { name },
  });
};
export const getItem = async (id: string) => {
  // GET /items/:id へのリクエスト
  return await api.get<Item>(`/items/${id}`);
};

export const createItem = async (newItem: CreateItemParams) => {
  // POST /items へのリクエスト
  return await api.post<Item>("/items", newItem);
};

// Partial<Item> は、Item型のすべてのプロパティを任意（Optional）
// これにより、更新したい項目だけを含むオブジェクトを渡すことができる
export const updateItem = async (id: string, item: Partial<Item>) => {
  // PUT /items/:id へのリクエスト
  return await api.put<Item>(`/items/${id}`, item);
};

export const getItemsQueryOptions = (name?: string) => {
  return queryOptions({
    queryKey: itemKeys.list(name),
    queryFn: () => getItems(name),
  });
};
