import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../../stores/user-store";
import { login as loginApi, logout as logoutApi } from "../api";

export interface UseAuthState {
  isSubmitting: boolean;
  onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
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
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data); // ストア更新
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
      clearUser(); // ストア更新
    },
    onError: (err) => {
      console.error("Logout failed", err);
    },
  });

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const userId = formData.get("userId") as string;
    const password = formData.get("password") as string;

    loginMutation.mutate({ userId, password });
  };

  return {
    isSubmitting: loginMutation.isPending,
    onLogin,
    error,
    onLogout: () => logoutMutation.mutate(),
  };
}