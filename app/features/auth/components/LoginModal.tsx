import type { JSX } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps): JSX.Element {
  const {
    isSubmitting,
    onLogin,
    error,
  } = useAuth(onClose);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>ログイン</DialogTitle>

      <form onSubmit={onLogin} noValidate>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField
              name="userId"
              label="社員番号"
              autoComplete="username"
              fullWidth
              required
            />
            <TextField
              name="password"
              label="パスワード"
              type="password"
              autoComplete="current-password"
              fullWidth
              required
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            キャンセル
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? '送信中...' : 'ログイン'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}