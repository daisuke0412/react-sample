import { useItemCreate } from "../hooks/useItemCreate";
import { Box, Button, TextField, Alert, Paper, Typography } from "@mui/material";
import type { CreateItemParams } from "../types";

export function ItemCreatePage() {
  const { mutateAsync, isSubmitting, errorMessage } = useItemCreate();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newItem: CreateItemParams = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
    };

    await mutateAsync(newItem);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
        商品作成
      </Typography>
      
      {/* エラーメッセージの表示 */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          name="name"
          label="商品名"
          required
          fullWidth
          disabled={isSubmitting}
        />
        <TextField
          name="price"
          label="価格"
          type="number"
          required
          fullWidth
          disabled={isSubmitting}
        />
        <TextField
          name="description"
          label="商品説明"
          multiline
          rows={4}
          fullWidth
          disabled={isSubmitting}
        />
        
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            href="/items"
            disabled={isSubmitting}
          >
            キャンセル
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "登録中..." : "登録"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}