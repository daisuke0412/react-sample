import { useLoaderData } from "react-router";
import { getItems } from "~/features/items/mock-api";
import type { Item } from "~/features/items/types";

// 1. データ取得はコンポーネントの外（Router）に追い出す
export const clientLoader = async () => {
  console.log("1. clientLoader開始: データ取得を始めます");
  const items = await getItems();
  console.log("2. clientLoader終了: データ取得が完了しました");
  return { items };
};

export default function ItemsPage() {
  // 2. フックでデータを受け取るだけ
  const { items } = useLoaderData() as { items: Item[] };
  console.log("3. コンポーネントのレンダリング: データを受け取って表示します");

  // 3. ローディング分岐もuseEffectも不要
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
