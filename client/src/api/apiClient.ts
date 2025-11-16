// features/stepq/api/apiClient.ts
import axios, { AxiosError } from 'axios';

// 共通Axiosインスタンス
const api = axios.create({
  baseURL: 'http://localhost:3001', // import.meta.env.VITE_API_BASE_URL || 'https://api.example.com', // TODO: URLを設定する
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// APIレスポンスの型
export type ApiResponse<T> = {
  data: T | null;
  error?: string;
};

// 共通エラーハンドリング関数
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    return err.response?.data?.message || err.message;
  }
  return 'Unexpected error occurred';
};

// GET / POST / PUT / DELETE のラッパ
export const apiClient = {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const res = await api.get<T>(url);
      return { data: res.data };
    } catch (e) {
      return { data: null, error: handleApiError(e) };
    }
  },

  async post<T>(url: string, body: unknown): Promise<ApiResponse<T>> {
    try {
      const res = await api.post<T>(url, body);
      return { data: res.data };
    } catch (e) {
      return { data: null, error: handleApiError(e) };
    }
  },
};