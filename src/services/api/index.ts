import { ApiError } from './ApiError';

export function getErrorMsg(error: any): string {
  if (isApiError(error) && error.errors) {
    return getApiError(error);
  }

  if (isApiError(error)) {
    return error.msg;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export function isApiError(error: ApiError | Error): error is ApiError {
  return (error as ApiError).type === 'API';
}

export function getApiError(error: ApiError) {
  return (error.errors || [])[0].msg;
}
