import { useItemCreate } from "../hooks/useItemCreate";
import { Box, Button, TextField, Alert, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, type ItemInput } from "../schema";

export function ItemCreatePage() {
  const { mutateAsync, isSubmitting, errorMessage } = useItemCreate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemInput>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });


  const onSubmit = async (data: ItemInput) => {
    await mutateAsync(data);
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
          {...register("price", { valueAsNumber: true })}
        />
        <TextField
          label="商品説明"
          multiline
          rows={4}
          fullWidth
          disabled={isSubmitting}
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register("description")}
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