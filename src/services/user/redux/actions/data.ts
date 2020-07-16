import * as NS from '../../namespace';
import { IUser } from 'shared/types/models/user';
import { TUserType } from 'shared/types/app';

export function setAuthorizedStatus(isAuthorized: boolean): NS.ISetUserAuthorized {
  return { type: 'USER_SERVICE:SET_AUTHORIZED_STATUS', payload: isAuthorized };
}

export function requestLogout(): NS.IRequestLogout {
  return { type: 'USER_SERVICE:REQUEST_LOGOUT' };
}

export function resetRequestLogout(): NS.IResetRequestLogout {
  return { type: 'USER_SERVICE:RESET_REQUEST_LOGOUT' };
}

export function setCurrentUser(user: IUser): NS.ISetCurrentUser {
  return { payload: user, type: 'USER_SERVICE:SET_CURRENT_USER' };
}

export function updateUserLogo(logo: string): NS.IUpdateUserLogo {
  return { payload: logo, type: 'USER_SERVICE:UPDATE_USER_LOGO' };
}

export function setUserAuthRequested(isRequested: boolean): NS.ISetUserAuthRequested {
  return { payload: isRequested, type: 'USER_SERVICE:SET_USER_AUTH_REQUESTED' };
}

export function setCurrentViewMode(viewMode: TUserType): NS.ISetCurrentViewMode {
  return { payload: viewMode, type: 'USER_SERVICE:SET_CURRENT_VIEW_MODE' };
}
