import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { Form } from "react-router";
import { useItemCreate } from "../hooks/useItemCreate";

export function ItemCreatePage() {
  const { errorMessage, isSubmitting } = useItemCreate();

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
        商品作成
      </Typography>

      {errorMessage && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Form method="post" noValidate>
        {/* name属性が clientAction でデータを取得する際のキー */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            name="name"
            label="商品名"
            required
            disabled={isSubmitting}
            fullWidth
          />

          <TextField
            name="price"
            label="価格"
            type="number"
            required
            disabled={isSubmitting}
            fullWidth
          />

          <TextField
            name="description"
            label="説明"
            multiline
            rows={4}
            disabled={isSubmitting}
            fullWidth
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "登録中..." : "登録"}
            </Button>
          </Box>
        </Box>
      </Form>
    </Paper>
  );
}