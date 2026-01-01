import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../../stores/user-store";
import { login as loginApi, logout as logoutApi } from "../api";
import type { LoginInput } from "../schema";

export interface UseAuthState {
  isSubmitting: boolean;
  onLogin: (data: LoginInput) => void;
  error: string | null;
  onLogout: () => void;
}

/**
 * 認証機能用のカスタムフック
 * @param onClose - ログインモーダルを閉じるコールバック関数（任意）
 * @returns 認証機能で使用する関数や状態を含むオブジェクト
 */
export function useAuth(onClose?: () => void): UseAuthState {
  const [error, setError] = useState<string | null>(null);
  
  // ストアからアクションを取得
  // 注: オブジェクトとしてまとめて取得すると再レンダリングの原因になるため、個別に取得します
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data); // ストア更新
      onClose?.();
      setError(null);
    },
    onError: (err) => {
      console.error(err);
      setError("社員番号、または、パスワードが正しくありません。");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout(); // ストア更新
    },
    onError: (err) => {
      console.error("Logout failed", err);
    },
  });

  const onLogin = (data: LoginInput) => {
    setError(null);
    loginMutation.mutate(data);
  };

  return {
    isSubmitting: loginMutation.isPending,
    onLogin,
    error,
    onLogout: () => logoutMutation.mutate(),
  };
}