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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../schema";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps): JSX.Element {
  const {
    isSubmitting: isMutationSubmitting,
    onLogin,
    error,
  } = useAuth(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const isSubmitting = isMutationSubmitting || isFormSubmitting;

  const onSubmit = (data: LoginInput) => {
    onLogin(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>ログイン</DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField
              label="社員番号"
              autoComplete="username"
              fullWidth
              required
              error={!!errors.userId}
              helperText={errors.userId?.message}
              {...register("userId")}
            />
            <TextField
              label="パスワード"
              type="password"
              autoComplete="current-password"
              fullWidth
              required
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
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
      </Box>
    </Dialog>
  );
}