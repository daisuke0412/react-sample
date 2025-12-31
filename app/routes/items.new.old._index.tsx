import { useState } from "react";
import { useNavigate } from "react-router";
import { createItem } from "~/features/items/mock-api";

export default function ItemCreatePage() {
  const navigate = useNavigate();
  // 1. state管理が大量に必要
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      // 2. 送信処理をコンポーネントの中に書く
      await createItem({ name, price });
      navigate("/items");
    } catch (e) {
      setError("失敗しました");
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <button onClick={handleSubmit}>
        登録
      </button>
    </div>
  );
}
