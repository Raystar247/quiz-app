import type { ApiError } from "./errorTypes";

// APIのレスポンス型
export type ApiResponse<T> =
  | { data: T; error: undefined }
  | { data: T | null; error: ApiError };


export type Validator<T> = (data: T) => ApiError | null;