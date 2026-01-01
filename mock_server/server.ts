import express, { type Request, type Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// CORS (Cross-Origin Resource Sharing) を有効化
// 異なるドメイン (Reactアプリ: localhost:5173) からのアクセスを許可する
app.use(cors());

// リクエストボディのJSONをパースして req.body でアクセスできるようにする
app.use(bodyParser.json());

// 商品データの型定義
interface Item {
  id: string;
  name: string;
  price: number;
  status: "on_sale" | "sold_out";
  description: string;
}

// インメモリデータストア
let items: Item[] = [
  { id: "1", name: "高級腕時計", price: 150000, status: "on_sale", description: "洗練されたデザインの高級腕時計です。" },
  { id: "2", name: "ワイヤレスイヤホン", price: 12000, status: "on_sale", description: "高音質でノイズキャンセリング機能付き。" },
  { id: "3", name: "高級腕時計 シルバーモデル", price: 160000, status: "on_sale", description: "クールなシルバーカラーの高級腕時計。" },
  { id: "4", name: "高級腕時計 ゴールドエディション", price: 250000, status: "sold_out", description: "豪華なゴールド仕様の限定モデル。" },
  { id: "5", name: "カジュアル腕時計", price: 5000, status: "on_sale", description: "普段使いに最適なカジュアルウォッチ。" },
  { id: "6", name: "ワイヤレスイヤホン Pro", price: 25000, status: "on_sale", description: "プロ仕様の音質を追求したハイエンドモデル。" },
  { id: "7", name: "ワイヤレスイヤホン Mini", price: 8000, status: "on_sale", description: "軽量コンパクトで持ち運びに便利。" },
  { id: "8", name: "スポーツ用ワイヤレスイヤホン", price: 15000, status: "on_sale", description: "防水機能付きで運動中も安心。" },
  { id: "9", name: "スマートフォン X", price: 98000, status: "on_sale", description: "最新機能を搭載したスタンダードモデル。" },
  { id: "10", name: "スマートフォン Pro", price: 128000, status: "sold_out", description: "大画面と高性能カメラを搭載したプロモデル。" },
  { id: "11", name: "スマートフォン ケース", price: 3000, status: "on_sale", description: "衝撃から守る耐久性の高いケース。" },
  { id: "12", name: "ゲーミングPC", price: 200000, status: "on_sale", description: "最新ゲームも快適に動作するハイスペックPC。" },
  { id: "13", name: "ゲーミングマウス", price: 8000, status: "on_sale", description: "精密な操作が可能な軽量マウス。" },
  { id: "14", name: "ゲーミングキーボード", price: 15000, status: "on_sale", description: "光るバックライト付きメカニカルキーボード。" },
  { id: "15", name: "オフィスチェア", price: 25000, status: "on_sale", description: "長時間のデスクワークでも疲れにくい設計。" },
  { id: "16", name: "ゲーミングチェア", price: 35000, status: "sold_out", description: "リクライニング機能付きで快適な座り心地。" },
  { id: "17", name: "コーヒーメーカー", price: 12000, status: "on_sale", description: "毎朝のコーヒーを美味しく淹れられます。" },
  { id: "18", name: "全自動コーヒーメーカー", price: 30000, status: "on_sale", description: "豆から挽ける全自動タイプ。" },
  { id: "19", name: "電気ケトル", price: 5000, status: "on_sale", description: "すぐにお湯が沸く便利なケトル。" },
  { id: "20", name: "オーブントースター", price: 8000, status: "on_sale", description: "パンが美味しく焼ける高機能トースター。" },
];

// GET /items
app.get('/items', (req: Request, res: Response) => {
  console.log('GET /items');
  res.json(items);
});

// GET /items/:id
app.get('/items/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(`GET /items/${id}`);
  const item = items.find((i) => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
});

// POST /items
app.post('/items', (req: Request, res: Response) => {
  console.log('POST /items', req.body);

  const newItem: Item = {
    id: String(Date.now()),
    ...req.body,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id
app.put('/items/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(`PUT /items/${id}`, req.body);
  const index = items.findIndex((i) => i.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
});

// DELETE /items/:id
app.delete('/items/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(`DELETE /items/${id}`);
  items = items.filter((i) => i.id !== id);
  res.status(204).send();
});

// サーバーを起動し、指定されたポートでリクエストを待機する
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});