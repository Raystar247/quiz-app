import type { ApiError } from "./errorTypes";

export type ApiResponse<T> = {
    data: T | null;
    error?: ApiError
}

export type Validator<T> = (data: T) => ApiError | null;