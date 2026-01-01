import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createItem } from "../api";
import { itemKeys } from "../query-keys";
import { isAxiosError } from "axios";
import type { CreateItemParams } from "../types";

export function useItemCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // useMutation 実行
  // 戻り値として、データ(data)や状態(status)を含む実行結果オブジェクトや、実行関数が返される
  const mutation = useMutation({
    mutationFn: (newItem: CreateItemParams) => createItem(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
      navigate("/items");
    },
    // throwOnError=trueの場合、エラー時にErrorBoundaryに投げる
    throwOnError: (error) => {
      // 400エラー（バリデーションエラー）以外はErrorBoundaryに投げる
      if (isAxiosError(error) && error.response?.status === 400) {
        return false;
      }
      return true;
    },
  });

  // 実行結果オブジェクトから必要なデータと非同期実行関数を取り出す
  const { mutateAsync, isPending, error } = mutation;

  return {
    mutateAsync,
    isSubmitting: isPending,
    errorMessage: error?.toString(),
  };
}