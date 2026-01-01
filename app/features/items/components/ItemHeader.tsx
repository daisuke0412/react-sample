import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ItemPageHeaderProps {
  onRefresh: () => void;
}

export function ItemPageHeader({ onRefresh }: ItemPageHeaderProps) {
  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4" component="h1">
        アイテム管理
      </Typography>
      <Box>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onRefresh} sx={{ mr: 2 }}>
          更新
        </Button>
      </Box>
    </Box>
  );
}