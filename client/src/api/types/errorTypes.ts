export type ValidationErrorCode =
  | "NotFound"
  | "UnuniqueResult"
  | "InvalidFormat"
  | "BusinessRuleViolated"
  | "OtherError";

export type ApiError = {
    type: 'network' | 'server' | 'validation' | 'unknown';
    code?: ValidationErrorCode;
    message?: string;
};