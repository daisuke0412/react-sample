import { Form, redirect, useActionData } from "react-router";
import type { ClientActionFunctionArgs } from "react-router";
import { createItem } from "~/features/items/mock-api";

// 1. 送信処理はここに書く（コンポーネントの外）
export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const price = formData.get("price");

  try {
    // 入力値は formData から取れるので state 不要
    await createItem({
      name: name as string,
      price: parseInt(price as string, 10)
    });
    return redirect("/items");
  } catch (e) {
    return { error: "失敗しました" };
  }
};

export default function ItemCreatePage() {
  const actionData = useActionData() as { error?: string };

  // 2. コンポーネントは「フォームの見た目」だけ
  return (
    <Form method="post">
      {actionData?.error && <p>{actionData.error}</p>}
      <input name="name" placeholder="商品名" />
      <input name="price" type="number" placeholder="価格" />
      <button type="submit">登録</button>
    </Form>
  );
}