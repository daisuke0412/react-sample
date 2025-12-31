
import type { Item, CreateItemParams } from "~/features/items/types";

// ※ 実アプリでは DB に格納されている想定
let items: Item[] = [
  {
    id: "item-001",
    name: "サンプル商品A",
    price: 1000,
    status: "on_sale",
    description: "使いやすさを追求した定番のアイテムです。オフィスや家庭で大活躍します。",
  },
  {
    id: "item-002",
    name: "サンプル商品B",
    price: 2500,
    status: "on_sale",
    description: "耐久性に優れたプレミアムモデル。長く愛用いただける一品です。",
  },
  {
    id: "item-003",
    name: "サンプル商品C",
    price: 1800,
    status: "sold_out",
    description: "期間限定の特別カラー。現在は在庫切れとなっております。",
  },
  {
    id: "item-004",
    name: "サンプル商品D",
    price: 3200,
    status: "on_sale",
    description: "最新の機能を搭載したハイエンドモデル。プロフェッショナルな現場にも対応。",
  },
  {
    id: "item-005",
    name: "サンプル商品E",
    price: 500,
    status: "sold_out",
    description: "お手頃価格のエントリーモデル。初めての方におすすめです。",
  },
];

// ===== 一覧取得（clientLoader で利用） =====
export async function getItems(): Promise<Item[]> {
  // 通信遅延の疑似再現
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return items;
}


// ===== 新規商品登録（clientAction で利用） =====
export async function createItem(params: CreateItemParams): Promise<Item> {
  // throw new Error("データの登録に失敗しました (500 Internal Server Error)");

  // 通信遅延の疑似再現
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newItem: Item = {
    id: `item-${Date.now()}`,
    name: params.name,
    price: params.price,
    status: "on_sale",
    description: params.description ?? "新規登録商品",
  };

  items = [...items, newItem];

  return newItem;
}