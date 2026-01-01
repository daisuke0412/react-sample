import { Paper, Box, Typography, Chip, TextField, Button } from "@mui/material";
import { Link } from "react-router";
import { useItemDetail } from "../hooks/useItemDetail";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, type ItemInput } from "../schema";
import { useEffect } from "react";

export function ItemDetailPage() {
  const { item, isEditing, isSubmitting, handleEditStart, handleEditCancel, mutateAsync, errorMessage } = useItemDetail();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemInput>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });

  // 編集モード開始時やアイテムデータ変更時にフォームの初期値を設定
  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        price: item.price,
        description: item.description,
      });
    }
  }, [item, isEditing, reset]);

  if (!item) {
    return <Typography>読み込み中...</Typography>;
  }

  const onSubmit = async (data: ItemInput) => {
    await mutateAsync(data);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      {/* ヘッダー部分（タイトル・ステータス） */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h1">商品詳細</Typography>
        <Chip label={item.status === "on_sale" ? "販売中" : "売り切れ"} />
      </Box>

      {/* エラーメッセージ表示 */}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      {isEditing ? (
        // 編集モード: フォームを表示
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="商品名"
            required
            fullWidth
            disabled={isSubmitting}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="価格"
            type="number"
            required
            fullWidth
            disabled={isSubmitting}
            error={!!errors.price}
            helperText={errors.price?.message}
            {...register("price")}
          />
          <TextField
            label="説明"
            multiline
            rows={4}
            fullWidth
            disabled={isSubmitting}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register("description")}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button onClick={handleEditCancel} disabled={isSubmitting}>キャンセル</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>保存</Button>
          </Box>
        </Box>
      ) : (
        // 閲覧モード: テキストを表示
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <Typography variant="caption">商品名</Typography>
            <Typography variant="body1">{item.name}</Typography>
          </Box>
          <Box>
            <Typography variant="caption">価格</Typography>
            <Typography variant="body1">¥{item.price.toLocaleString()}</Typography>
          </Box>
          <Box>
            <Typography variant="caption">説明</Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>{item.description}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button component={Link} to="/items">一覧へ戻る</Button>
            <Button variant="contained" onClick={handleEditStart}>編集</Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
}