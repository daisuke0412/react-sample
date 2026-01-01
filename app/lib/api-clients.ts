import Axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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

const authRequestInterceptor = (config: any) => {
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
    // レスポンス全体ではなく、dataプロパティの中身だけを返す
    return response.data;
};

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(responseSuccessInterceptor);
