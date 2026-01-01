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
  // items...
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