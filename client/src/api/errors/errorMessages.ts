import { type ValidationErrorCode } from "../types/errorTypes";

export const networkErrorMessages = {
  default: "通信エラーが発生しました。もう一度お試しください。",
} as const;

export const serverErrorMessages = {
  default: "サーバー側でエラーが発生しました。",
} as const;

export const validationErrorMessages: Record<ValidationErrorCode, string> = {
  NotFound: "データが見つかりません。",
  UnuniqueResult: "複数のデータが返ってきました。",
  InvalidFormat: "データ形式が不正です。",
  BusinessRuleViolated: "ビジネスルールを満たしていません。",
  OtherError: "不明なバリデーションエラーが発生しました。",
};