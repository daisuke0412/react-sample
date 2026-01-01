import { api } from "~/lib/api-clients";
import type { Item } from "./types";

export const getItems = async () => {
  // GET /items へのリクエスト
  return await api.get<Item[]>("/items");
};