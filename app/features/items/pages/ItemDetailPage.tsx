import { Paper, Box, Typography, Chip, TextField, Button } from "@mui/material";
import { Form, Link } from "react-router";
import { useItemDetail } from "../hooks/useItemDetail";

export function ItemDetailPage() {
  const { item, isEditing, isSubmitting, handleEditStart, handleEditCancel, errorMessage } = useItemDetail();

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
        <Form method="post" noValidate>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              name="name"
              label="商品名"
              defaultValue={item.name}
              disabled={isSubmitting}
            />
            <TextField
              name="price"
              label="価格"
              type="number"
              defaultValue={item.price}
              disabled={isSubmitting}
            />
            <TextField
              name="description"
              label="説明"
              multiline
              rows={4}
              defaultValue={item.description}
              disabled={isSubmitting}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={handleEditCancel}>キャンセル</Button>
              <Button type="submit" variant="contained">保存</Button>
            </Box>
          </Box>
        </Form>
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