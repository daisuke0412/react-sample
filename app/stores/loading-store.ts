import { create } from "zustand";

type LoadingStore = {
  /** 現在実行中の非同期処理の数 */
  loadingCount: number;
  /** ローディング中かどうか（loadingCount > 0 の場合に true） */
  isLoading: boolean;
  /** ローディングを開始する（カウントを増やす） */
  startLoading: () => void;
  /** ローディングを終了する（カウントを減らす） */
  endLoading: () => void;
};

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  loadingCount: 0,
  isLoading: false,
  startLoading: () => {
    const next = get().loadingCount + 1;
    set({ loadingCount: next, isLoading: true });
  },
  endLoading: () => {
    const next = get().loadingCount - 1;
    // カウントがマイナスにならないように制御し、0になったらローディング終了とする
    const adjustedCount = next < 0 ? 0 : next;
    set({
      loadingCount: adjustedCount,
      isLoading: adjustedCount > 0,
    });
  },
}));