import { ErrorStatusCode } from "./status-code.type";

export interface Meta {
  timestamp?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export type ApiResponseSuccess<T> = {
  success: true;
  message: string;
  data: T;
  meta?: Meta;
  statusCode: 200;
};

export type ApiResponseError = {
  success: false;
  message: string;
  errors?: Record<string, string>;
  statusCode: ErrorStatusCode;
};

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;
