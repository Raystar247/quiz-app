import { type ApiError } from "../types/errorTypes";
import {
  networkErrorMessages,
  serverErrorMessages,
  validationErrorMessages,
} from "./errorMessages";

export const errorHandler = (error: ApiError): string => {
  switch (error.type) {
    case "network":
      return networkErrorMessages.default;

    case "server":
      return serverErrorMessages.default;

    case "validation":
      // 特殊なエラーメッセージを出力したい場合
      if (error.code == "OtherError" && error.message) {
        return error.message;
      }
      if (error.code && validationErrorMessages[error.code]) {
        return validationErrorMessages[error.code];
      }
      return "バリデーションエラーが発生しました。";

    default:
      return error.message || "不明なエラーが発生しました。";
  }
};