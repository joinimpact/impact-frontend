import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IUser } from 'shared/types/models/user';
import { ITagItemResponse } from 'shared/types/responses/volunteer';

export interface IReduxState {
  communications: {
    logout: ICommunication;
    loadTags: ICommunication;
  };
  data: {
    isAuthorized: boolean;
    isAuthRequested: boolean;
    logoutRequested: boolean;
    currentUser: IUser | null;
    tags: ITagItemResponse[];
  };
}

export type IRequestLogout = IPlainAction<'USER_SERVICE:REQUEST_LOGOUT'>;
export type IResetRequestLogout = IPlainAction<'USER_SERVICE:RESET_REQUEST_LOGOUT'>;

export type ILogout = IPlainAction<'USER_SERVICE:LOGOUT'>;
export type ILogoutSuccess = IPlainAction<'USER_SERVICE:LOGOUT_SUCCESS'>;
export type ILogoutFailed = IPlainFailAction<'USER_SERVICE:LOGOUT_FAILED'>;

export type ISetUserAuthorized = IAction<'USER_SERVICE:SET_AUTHORIZED_STATUS', boolean>;

export type ISetCurrentUser = IAction<'USER_SERVICE:SET_CURRENT_USER', IUser>;

export type ILoadUserTags = IPlainAction<'USER_SERVICE:LOAD_USER_TAGS'>;
export type ILoadUserTagsSuccess = IAction<'USER_SERVICE:LOAD_USER_TAGS_SUCCESS', ITagItemResponse[]>;
export type ILoadUserTagsFailed = IPlainFailAction<'USER_SERVICE:LOAD_USER_TAGS_FAILED'>;

export type Action =
  | ISetUserAuthorized
  | IRequestLogout
  | IResetRequestLogout
  | ILogout
  | ILogoutSuccess
  | ILogoutFailed
  | ISetCurrentUser
  | ILoadUserTags
  | ILoadUserTagsSuccess
  | ILoadUserTagsFailed;
