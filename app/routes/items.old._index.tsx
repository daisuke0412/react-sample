import { useState, useEffect } from "react";
import { getItems } from "~/features/items/mock-api";
import type { Item } from "~/features/items/types";

export default function ItemsPage() {
  console.log("1. コンポーネントのレンダリング開始 (Loading状態)");
  // 1. 状態管理が面倒
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2. データ取得処理がコンポーネントに混ざる
    const fetchItems = async () => {
      console.log("2. useEffect: データ取得を開始します");
      const data = await getItems();
      console.log("3. useEffect: データ取得が完了しました -> State更新");
      setItems(data);
      setIsLoading(false);
    };
    fetchItems();
  }, []);

  // 3. データがない時の分岐が必要
  if (isLoading) {
    console.log("  - Loading表示中...");
    return <div>Loading...</div>;
  }

  console.log("4. データ表示 (再レンダリング)");
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}