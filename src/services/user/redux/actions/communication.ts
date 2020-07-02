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

export const {
  execute: loadUserTags,
  completed: loadUserTagsComplete,
  failed: loadUserTagsFailed,
} = makeCommunicationActionCreators<
  NS.ILoadUserTags,
  NS.ILoadUserTagsSuccess,
  NS.ILoadUserTagsFailed
  >(
  'USER_SERVICE:LOAD_USER_TAGS',
  'USER_SERVICE:LOAD_USER_TAGS_SUCCESS',
  'USER_SERVICE:LOAD_USER_TAGS_FAILED',
);

