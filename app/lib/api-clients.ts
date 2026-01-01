import Axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { useLoadingStore } from "~/stores/loading-store";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const getLoadingStore = () => useLoadingStore.getState();

// Axiosのメソッドがデータを直接返すように型定義を拡張
export interface ApiClient extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

export const api = Axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
}) as ApiClient;

const requestInterceptor = (config: any) => {
  // ローディング開始
  getLoadingStore().startLoading();

  // ログ出力
  console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);

  // APIアクセスキーの付与
  const apiAccessKey = import.meta.env.VITE_API_ACCESS_KEY;
  if (apiAccessKey) {
    config.headers.Authorization = `Bearer ${apiAccessKey}`;
  }
  return config;
};

const responseSuccessInterceptor = (response: any) => {
  // ローディング終了
  getLoadingStore().endLoading();
  return response.data;
};

const responseErrorInterceptor = (error: any) => {
  // ローディング終了
  getLoadingStore().endLoading();
  return Promise.reject(error);
};

// Interceptorの登録
api.interceptors.request.use(requestInterceptor, (error) => {
  // リクエスト設定時にエラーが発生した場合（送信前）、ローディングを終了させる
  getLoadingStore().endLoading();
  return Promise.reject(error);
});
api.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);