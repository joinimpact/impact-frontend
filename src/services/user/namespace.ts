import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IUser } from 'shared/types/models/user';
import { IUserProfileResponse } from 'shared/types/responses/volunteer';

export interface IReduxState {
  communications: {
    logout: ICommunication;
    loadUser: ICommunication;
    loadTags: ICommunication;
    loadUserTags: ICommunication;
  };
  data: {
    isAuthorized: boolean;
    isAuthRequested: boolean;
    logoutRequested: boolean;
    currentUser: IUser | null;
    userTags: string[];
    tags: string[];
  };
}

export type IRequestLogout = IPlainAction<'USER_SERVICE:REQUEST_LOGOUT'>;
export type IResetRequestLogout = IPlainAction<'USER_SERVICE:RESET_REQUEST_LOGOUT'>;

export type ILogout = IPlainAction<'USER_SERVICE:LOGOUT'>;
export type ILogoutSuccess = IPlainAction<'USER_SERVICE:LOGOUT_SUCCESS'>;
export type ILogoutFailed = IPlainFailAction<'USER_SERVICE:LOGOUT_FAILED'>;

export type ISetUserAuthorized = IAction<'USER_SERVICE:SET_AUTHORIZED_STATUS', boolean>;

export type ISetCurrentUser = IAction<'USER_SERVICE:SET_CURRENT_USER', IUser>;

export type ILoadTags = IPlainAction<'USER_SERVICE:LOAD_TAGS'>;
export type ILoadTagsSuccess = IAction<'USER_SERVICE:LOAD_TAGS_SUCCESS', string[]>;
export type ILoadTagsFailed = IPlainFailAction<'USER_SERVICE:LOAD_TAGS_FAILED'>;

export type ILoadUserTags = IPlainAction<'USER_SERVICE:LOAD_USER_TAGS'>;
export type ILoadUserTagsSuccess = IAction<'USER_SERVICE:LOAD_USER_TAGS_SUCCESS', string[]>;
export type ILoadUserTagsFailed = IPlainFailAction<'USER_SERVICE:LOAD_USER_TAGS_FAILED'>;

export type ILoadUser = IPlainAction<'USER_SERVICE:LOAD'>;
export type ILoadUserSuccess = IAction<'USER_SERVICE:LOAD_SUCCESS', IUserProfileResponse>;
export type ILoadUserFailed = IPlainFailAction<'USER_SERVICE:LOAD_FAILED'>;

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
  | ILoadUserTagsFailed
  | ILoadUser
  | ILoadUserSuccess
  | ILoadUserFailed
  | ILoadTags
  | ILoadTagsSuccess
  | ILoadTagsFailed;
