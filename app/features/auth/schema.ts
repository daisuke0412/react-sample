import { z } from "zod";

export const loginSchema = z.object({
  userId: z.string().min(1, "社員番号は必須です"),
  password: z.string().min(1, "パスワードは必須です"),
});

export type LoginInput = z.infer<typeof loginSchema>;