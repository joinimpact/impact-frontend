import * as NS from '../../namespace';

export function setAuthorizedStatus(isAuthorized: boolean): NS.ISetUserAuthorized {
  return { type: 'USER_SERVICE:SET_AUTHORIZED_STATUS', payload: isAuthorized };
}

export function requestLogout(): NS.IRequestLogout {
  return { type: 'USER_SERVICE:REQUEST_LOGOUT' };
}

export function resetRequestLogout(): NS.IResetRequestLogout {
  return { type: 'USER_SERVICE:RESET_REQUEST_LOGOUT' };
}
