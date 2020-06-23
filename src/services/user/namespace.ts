import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    logout: ICommunication;
  };
  data: {
    isAuthorized: boolean;
    isAuthRequested: boolean;
    logoutRequested: boolean;
  };
}

export type IRequestLogout = IPlainAction<'USER_SERVICE:REQUEST_LOGOUT'>;
export type IResetRequestLogout = IPlainAction<'USER_SERVICE:RESET_REQUEST_LOGOUT'>;

export type ILogout = IPlainAction<'USER_SERVICE:LOGOUT'>;
export type ILogoutSuccess = IPlainAction<'USER_SERVICE:LOGOUT_SUCCESS'>;
export type ILogoutFailed = IPlainFailAction<'USER_SERVICE:LOGOUT_FAILED'>;

export type ISetUserAuthorized = IAction<'USER_SERVICE:SET_AUTHORIZED_STATUS', boolean>;

export type Action =
  | ISetUserAuthorized
  | IRequestLogout
  | IResetRequestLogout
  | ILogout
  | ILogoutSuccess
  | ILogoutFailed;
