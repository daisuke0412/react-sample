// src/mock/mock-item.ts
// ==================================================
// 商品データ用のモック実装（clientLoader / clientAction 用）
// ==================================================

import type { Item } from "~/features/items/types";

// ===== 疑似DB（メモリ上） =====
// ※ 実アプリでは DB / API に置き換わる想定
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
  // throw new Error("データの取得に失敗しました (500 Internal Server Error)");
  
  // 通信遅延の疑似再現
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return items;
}

export async function getItem(id: string): Promise<Item | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return items.find((item) => item.id === id);
}

// ===== 新規商品登録（clientAction で利用） =====
export async function createItem(params: {
  name: string;
  price: number;
  description?: string;
}): Promise<Item> {
  // throw new Error("データの登録に失敗しました (500 Internal Server Error)");

  // 通信遅延の疑似再現
  await new Promise((resolve) => setTimeout(resolve, 500));

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

// ===== 商品更新（clientAction で利用） =====
export async function updateItem(id: string, params: {
  name?: string;
  price?: number;
  description?: string;
}): Promise<Item> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) throw new Error("Item not found");

  const updatedItem = {
    ...items[index],
    ...params,
  };

  items = [
    ...items.slice(0, index),
    updatedItem,
    ...items.slice(index + 1),
  ];

  return updatedItem;
}

