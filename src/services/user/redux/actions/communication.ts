import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/redux/communication';

export const {
  execute: logout,
  completed: logoutComplete,
  failed: logoutFailed
} = makeCommunicationActionCreators<
  NS.ILogout,
  NS.ILogoutSuccess,
  NS.ILogoutFailed
  >(
  'USER_SERVICE:LOGOUT',
  'USER_SERVICE:LOGOUT_SUCCESS',
  'USER_SERVICE:LOGOUT_FAILED',
);
