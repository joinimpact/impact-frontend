import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IUser } from 'shared/types/models/user';
import { TUserType } from 'shared/types/app';
import { IInviteProps } from 'shared/types/models/auth';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

export interface IReduxState {
  communications: {
    logout: ICommunication;
    loadUser: ICommunication;
    loadTags: ICommunication;
    loadUserTags: ICommunication;
    loadInvitedOrganization: ICommunication;
  };
  data: {
    isAuthorized: boolean;
    isAuthRequested: boolean;
    logoutRequested: boolean;
    currentUser: IUser | null;
    userTags: string[];
    tags: string[];
    currentViewMode: TUserType;
    inviteProps: IInviteProps | null;
    inviteOrganization: IOrganizationsResponseItem | null;
  };
}

export type IRequestLogout = IPlainAction<'USER_SERVICE:REQUEST_LOGOUT'>;
export type IResetRequestLogout = IPlainAction<'USER_SERVICE:RESET_REQUEST_LOGOUT'>;

export type ILogout = IPlainAction<'USER_SERVICE:LOGOUT'>;
export type ILogoutSuccess = IPlainAction<'USER_SERVICE:LOGOUT_SUCCESS'>;
export type ILogoutFailed = IPlainFailAction<'USER_SERVICE:LOGOUT_FAILED'>;

export type ISetUserAuthorized = IAction<'USER_SERVICE:SET_AUTHORIZED_STATUS', boolean>;
export type ISetUserAuthRequested = IAction<'USER_SERVICE:SET_USER_AUTH_REQUESTED', boolean>;

export type ISetCurrentUser = IAction<'USER_SERVICE:SET_CURRENT_USER', IUser>;

export type ILoadTags = IPlainAction<'USER_SERVICE:LOAD_TAGS'>;
export type ILoadTagsSuccess = IAction<'USER_SERVICE:LOAD_TAGS_SUCCESS', string[]>;
export type ILoadTagsFailed = IPlainFailAction<'USER_SERVICE:LOAD_TAGS_FAILED'>;

export type ILoadUserTags = IPlainAction<'USER_SERVICE:LOAD_USER_TAGS'>;
export type ILoadUserTagsSuccess = IAction<'USER_SERVICE:LOAD_USER_TAGS_SUCCESS', string[]>;
export type ILoadUserTagsFailed = IPlainFailAction<'USER_SERVICE:LOAD_USER_TAGS_FAILED'>;

export type ILoadUser = IPlainAction<'USER_SERVICE:LOAD'>;
export type ILoadUserSuccess = IAction<'USER_SERVICE:LOAD_SUCCESS', IUser>;
export type ILoadUserFailed = IPlainFailAction<'USER_SERVICE:LOAD_FAILED'>;

export type IUpdateUserLogo = IAction<'USER_SERVICE:UPDATE_USER_LOGO', string>;

export type ISetCurrentViewMode = IAction<'USER_SERVICE:SET_CURRENT_VIEW_MODE', TUserType>;

export type ISetInviteProps = IAction<'USER_SERVICE:SET_INVITE_PROPS', IInviteProps>;

export type ILoadInvitedOrganization = IPlainAction<'USER_SERVICE:LOAD_INVITED_ORGANIZATION'>;
export type ILoadInvitedOrganizationSuccess = IAction<
  'USER_SERVICE:LOAD_INVITED_ORGANIZATION_SUCCESS',
  IOrganizationsResponseItem
>;
export type ILoadInvitedOrganizationFailed = IPlainFailAction<'USER_SERVICE:LOAD_INVITED_ORGANIZATION_FAILED'>;

export type IResetInviteProps = IPlainAction<'USER_SERVICE:RESET_INVITE_PROPS'>;

export type Action =
  | ISetUserAuthorized
  | ISetUserAuthRequested
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
  | ILoadTagsFailed
  | IUpdateUserLogo
  | ISetCurrentViewMode
  | ISetInviteProps
  | IResetInviteProps
  | ILoadInvitedOrganization
  | ILoadInvitedOrganizationSuccess
  | ILoadInvitedOrganizationFailed;
