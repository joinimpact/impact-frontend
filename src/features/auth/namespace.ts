import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communications: {
    login: ICommunication;
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

export type ILogin = IAction<'AUTH:LOGIN', ILoginPayload>;
export type ILoginSuccess = IPlainAction<'AUTH:LOGIN_SUCCESS'>;
export type ILoginFailed = IPlainFailAction<'AUTH:LOGIN_FAILED'>;

export type Action =
  | ILogin
  | ILoginSuccess
  | ILoginFailed;
