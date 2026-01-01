import { api } from "~/lib/api-clients";
import type { CreateItemParams, Item } from "./types";

export const getItems = async () => {
  // GET /items へのリクエスト
  return await api.get<Item[]>("/items");
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