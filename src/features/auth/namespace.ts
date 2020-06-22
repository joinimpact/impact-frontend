import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communications: {
    login: ICommunication;
    resetPassword: ICommunication;
  };
  data: {};
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IForgotPasswordForm {
  email: string;
}

export type ILogin = IAction<'AUTH:LOGIN', ILoginPayload>;
export type ILoginSuccess = IPlainAction<'AUTH:LOGIN_SUCCESS'>;
export type ILoginFailed = IPlainFailAction<'AUTH:LOGIN_FAILED'>;

export type IResetPassword = IAction<'AUTH:RESET_PASSWORD', IForgotPasswordForm>;
export type IResetPasswordSuccess = IPlainAction<'AUTH:RESET_PASSWORD_SUCCESS'>;
export type IResetPasswordFailed = IPlainFailAction<'AUTH:RESET_PASSWORD_FAILED'>;

export type Action =
  | ILogin
  | ILoginSuccess
  | ILoginFailed
  | IResetPassword
  | IResetPasswordSuccess
  | IResetPasswordFailed;
