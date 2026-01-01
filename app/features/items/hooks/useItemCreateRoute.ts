import { redirect, type ClientActionFunctionArgs } from "react-router";
import { createItem } from "../api";
import { isAxiosError } from "axios";

export const useItemCreateRouteHandlers = {
  // ClientActionFunctionArgsは React Router の clientAction に渡される引数の型
  clientAction: async ({ request }: ClientActionFunctionArgs) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const priceStr = formData.get("price") as string;
    const description = formData.get("description") as string;

    try {
      await createItem({
        name,
        price: Number(priceStr),
        description,
      });

      return redirect("/items");
    } catch (error) {
      // 400 Bad Request の場合 (入力値不備など)
      // サーバーからのエラーメッセージを表示して、ユーザーに修正を促す
      if (isAxiosError(error) && error.response?.status === 400) {
        return {
          success: false,
          message: "登録に失敗しました",
        };
      } else {
        // その他のエラー (500エラーやネットワークエラーなど)
        // ここでは処理せず再スローし、上位の ErrorBoundary でキャッチさせる
        throw error;
      }
    }
  },
};
