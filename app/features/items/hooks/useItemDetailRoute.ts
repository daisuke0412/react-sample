import type { ClientLoaderFunctionArgs, ClientActionFunctionArgs } from "react-router";
import { getItem, updateItem } from "../api";

export const useItemDetailRouteHandlers = {
  // データ取得
  clientLoader: async ({ params }: ClientLoaderFunctionArgs) => {
    // URLパラメータからIDを取得
    const id = params.id;
    if (!id) throw new Error("IDが指定されていません");

    const item = await getItem(id);
    if (!item) throw new Response("商品が見つかりません", { status: 404, statusText: "Not Found" });

    return { item };
  },

  // データ更新
  clientAction: async ({ request, params }: ClientActionFunctionArgs) => {
    const id = params.id;
    if (!id) throw new Error("IDが指定されていません");

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const priceStr = formData.get("price") as string;
    const description = formData.get("description") as string;

    try {
      await updateItem(id, {
        name,
        price: Number(priceStr),
        description,
      });
      return { success: true };
    } catch (e) {
      return { success: false, message: "更新に失敗しました" };
    }
  },
};
