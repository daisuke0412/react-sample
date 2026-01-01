import { Box, TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import type { FormEvent } from "react";

type ItemSearchProps = {
  onSearch: (name: string) => void;
};

export function ItemSearch({ onSearch }: ItemSearchProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    onSearch(name);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', gap: 1, maxWidth: 300 }}>
      <TextField
        name="name"
        label="商品名で検索"
        size="small"
        fullWidth
        placeholder="検索キーワードを入力"
        sx={{ bgcolor: "background.paper" }}
      />
      <Button type="submit" variant="contained">
        <SearchIcon />
      </Button>
    </Box>
  );
}
