import { ApiError } from './ApiError';

export type ErrorType = 'APP' | 'API' | 'VIEW';

export type ApiErrorInterceptor = (apiError: ApiError) => void;

export interface IServerError {
  code: string;
  message: string;
  key?: string;
}
