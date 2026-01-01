import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, "商品名は必須です"),
  price: z
    .number()
    .min(1, "価格は1円以上で入力してください")
    .int("価格は整数で入力してください"),
  description: z.string().optional(),
});

// スキーマから型を自動生成
export type ItemInput = z.infer<typeof itemSchema>;