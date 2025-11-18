// apiClient.ts
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import type { ApiError } from './types/errorTypes';
import type { ApiResponse, Validator } from './types/apiTypes';

// Axiosインスタンス
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 共通エラーハンドリング
const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      type: 'network',
      message: err.response?.data?.message || err.message,
    };
  }
  return { type: 'network', message: 'Unexpected error occurred' };
};

// 共通バリデーションチェック
const validate = <T>(data: T, validator?: Validator<T>): ApiError | null => {
  return validator ? validator(data) : null;
};

// --- 内部専用関数 ---
const request = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  bodyOrConfig?: unknown | AxiosRequestConfig,
  configOrValidator?: AxiosRequestConfig | Validator<T>,
  maybeValidator?: Validator<T>
): Promise<ApiResponse<T>> => {
  try {
    let res;

    if (method === 'get' || method === 'delete') {
      const config = configOrValidator as AxiosRequestConfig | undefined;
      res = method === 'get' ? await api.get<T>(url, config) : await api.delete<T>(url, config);
    } else {
      const body = bodyOrConfig as unknown;
      const config = configOrValidator as AxiosRequestConfig | undefined;
      res = method === 'post' ? await api.post<T>(url, body, config) : await api.put<T>(url, body, config);
    }

    // バリデーション
    const validator = maybeValidator ?? (configOrValidator as Validator<T> | undefined);
    const validationError = validate(res.data, validator);
    if (validationError) return { data: null, error: validationError };

    return { data: res.data };
  } catch (e) {
    return { data: null, error: handleApiError(e) };
  }
};

// --- 外部向けapiClient ---
export const apiClient = {
  get<T>(url: string, config?: AxiosRequestConfig, validator?: Validator<T>) {
    return request<T>('get', url, config, validator);
  },

  post<T>(url: string, body: unknown, config?: AxiosRequestConfig, validator?: Validator<T>) {
    return request<T>('post', url, body, config, validator);
  },

  put<T>(url: string, body: unknown, config?: AxiosRequestConfig, validator?: Validator<T>) {
    return request<T>('put', url, body, config, validator);
  },

  delete<T>(url: string, config?: AxiosRequestConfig, validator?: Validator<T>) {
    return request<T>('delete', url, config, validator);
  },
};

