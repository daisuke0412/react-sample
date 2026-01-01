import { QueryClient, type DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    // ウィンドウがフォーカスされたときに再フェッチしない
    refetchOnWindowFocus: false,
    // エラー時に再試行しない
    retry: false,
    // データが古くなったとみなされるまでの時間（ミリ秒）。ここでは1分
    staleTime: 1000 * 60,
  },
  mutations: {
    // ミューテーション（更新系）のエラー時に再試行しない
    retry: false,
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({ defaultOptions: queryConfig });