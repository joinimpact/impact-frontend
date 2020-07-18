import { ErrorType, IServerError } from 'services/api/namespace';

// tslint:disable:max-classes-per-file

export function isErrorStatus(status: number): boolean {
  return status >= 400;
}

export class AppError extends Error {
  public type: ErrorType;

  constructor(msg?: string, type?: ErrorType) {
    super(msg);
    this.type = type || 'APP';
  }
}

export class ApiError extends AppError {
  public status: number;
  public errors: IServerError[];
  public msg: string;

  constructor(status: number, errors: IServerError[], msg: string) {
    super(`API error ${msg}`, 'API');
    this.status = status;
    this.errors = errors;
    this.msg = msg;
  }
}
