import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import type { ApiError } from './types/errorTypes';
import type { ApiResponse, Validator } from './types/apiTypes';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

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

const validate = <T>(data: T, validator?: Validator<T>): ApiError | null => {
  return validator ? validator(data) : null;
};

const request = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
  validator?: Validator<T>
): Promise<ApiResponse<T>> => {
  try {
    let res;
    if (method === 'get' || method === 'delete') {
      res = method === 'get' ? await api.get<T>(url, config) : await api.delete<T>(url, config);
    } else {
      res = method === 'post' ? await api.post<T>(url, body, config) : await api.put<T>(url, body, config);
    }

    const validationError = validate(res.data, validator);
    if (validationError) return { data: null, error: validationError };

    return { data: res.data };
  } catch (e) {
    return { data: null, error: handleApiError(e) };
  }
};

export const apiClient = {
  get<T>(url: string, config?: AxiosRequestConfig, validator?: Validator<T>) {
    return request<T>('get', url, undefined, config, validator);
  },
  delete<T>(url: string, config?: AxiosRequestConfig, validator?: Validator<T>) {
    return request<T>('delete', url, undefined, config, validator);
  },
  post<T>(url: string, body: unknown, config?: AxiosRequestConfig, validator?: Validator<T>) {
    return request<T>('post', url, body, config, validator);
  },
  put<T>(url: string, body: unknown, config?: AxiosRequestConfig, validator?: Validator<T>) {
    return request<T>('put', url, body, config, validator);
  },
};
