import { api } from "~/lib/api-clients";
import type { Item } from "./types";

export const getItems = async () => {
  // GET /items へのリクエスト
  const response = await api.get<Item[]>("/items");
  return response.data;
};