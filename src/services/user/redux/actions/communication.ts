import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/redux/communication';

export const { execute: logout, completed: logoutComplete, failed: logoutFailed } = makeCommunicationActionCreators<
NS.ILogout,
NS.ILogoutSuccess,
NS.ILogoutFailed
>('USER_SERVICE:LOGOUT', 'USER_SERVICE:LOGOUT_SUCCESS', 'USER_SERVICE:LOGOUT_FAILED');

export const {
	execute: loadUserTags,
	completed: loadUserTagsComplete,
	failed: loadUserTagsFailed,
} = makeCommunicationActionCreators<NS.ILoadUserTags, NS.ILoadUserTagsSuccess, NS.ILoadUserTagsFailed>(
	'USER_SERVICE:LOAD_USER_TAGS',
	'USER_SERVICE:LOAD_USER_TAGS_SUCCESS',
	'USER_SERVICE:LOAD_USER_TAGS_FAILED',
);

export const {
	execute: loadTags,
	completed: loadTagsComplete,
	failed: loadTagsFailed,
} = makeCommunicationActionCreators<NS.ILoadTags, NS.ILoadTagsSuccess, NS.ILoadTagsFailed>(
	'USER_SERVICE:LOAD_TAGS',
	'USER_SERVICE:LOAD_TAGS_SUCCESS',
	'USER_SERVICE:LOAD_TAGS_FAILED',
);

export const {
	execute: loadUser,
	completed: loadUserComplete,
	failed: loadUserFailed,
} = makeCommunicationActionCreators<NS.ILoadUser, NS.ILoadUserSuccess, NS.ILoadUserFailed>(
	'USER_SERVICE:LOAD',
	'USER_SERVICE:LOAD_SUCCESS',
	'USER_SERVICE:LOAD_FAILED',
);

export const {
	execute: loadInvitedOrganization,
	completed: loadInvitedOrganizationComplete,
	failed: loadInvitedOrganizationFailed,
} = makeCommunicationActionCreators<
NS.ILoadInvitedOrganization,
NS.ILoadInvitedOrganizationSuccess,
NS.ILoadInvitedOrganizationFailed
>(
	'USER_SERVICE:LOAD_INVITED_ORGANIZATION',
	'USER_SERVICE:LOAD_INVITED_ORGANIZATION_SUCCESS',
	'USER_SERVICE:LOAD_INVITED_ORGANIZATION_FAILED',
);
