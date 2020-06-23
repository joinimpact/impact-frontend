import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communications: {
    login: ICommunication;
    resetPassword: ICommunication;
    recoveryPassword: ICommunication;
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

export interface IResetPasswordForm {
  password: string;
  passwordRepeat: string;
}

export type ILogin = IAction<'AUTH:LOGIN', ILoginPayload>;
export type ILoginSuccess = IPlainAction<'AUTH:LOGIN_SUCCESS'>;
export type ILoginFailed = IPlainFailAction<'AUTH:LOGIN_FAILED'>;

export type IRecoveryPassword = IAction<'AUTH:RECOVERY_PASSWORD', IForgotPasswordForm>;
export type IRecoveryPasswordSuccess = IPlainAction<'AUTH:RECOVERY_PASSWORD_SUCCESS'>;
export type IRecoveryPasswordFailed = IPlainFailAction<'AUTH:RECOVERY_PASSWORD_FAILED'>;

export type IResetPassword = IAction<'AUTH:RESET_PASSWORD', IResetPasswordForm>;
export type IResetPasswordSuccess = IPlainAction<'AUTH:RESET_PASSWORD_SUCCESS'>;
export type IResetPasswordFailed = IPlainFailAction<'AUTH:RESET_PASSWORD_FAILED'>;

export type Action =
  | ILogin
  | ILoginSuccess
  | ILoginFailed
  | IRecoveryPassword
  | IRecoveryPasswordSuccess
  | IRecoveryPasswordFailed
  | IResetPassword
  | IResetPasswordSuccess
  | IResetPasswordFailed;
