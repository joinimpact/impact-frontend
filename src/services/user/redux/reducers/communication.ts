import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { ReducersMap } from 'shared/types/redux';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers({
	logout: makeCommunicationReducer<NS.ILogout, NS.ILogoutSuccess, NS.ILogoutFailed>(
		'USER_SERVICE:LOGOUT',
		'USER_SERVICE:LOGOUT_SUCCESS',
		'USER_SERVICE:LOGOUT_FAILED',
		initial.communications.logout,
	),
	loadUserTags: makeCommunicationReducer<NS.ILoadUserTags, NS.ILoadUserTagsSuccess, NS.ILoadUserTagsFailed>(
		'USER_SERVICE:LOAD_USER_TAGS',
		'USER_SERVICE:LOAD_USER_TAGS_SUCCESS',
		'USER_SERVICE:LOAD_USER_TAGS_FAILED',
		initial.communications.loadUserTags,
	),
	loadTags: makeCommunicationReducer<NS.ILoadTags, NS.ILoadTagsSuccess, NS.ILoadTagsFailed>(
		'USER_SERVICE:LOAD_TAGS',
		'USER_SERVICE:LOAD_TAGS_SUCCESS',
		'USER_SERVICE:LOAD_TAGS_FAILED',
		initial.communications.loadTags,
	),
	loadUser: makeCommunicationReducer<NS.ILoadUser, NS.ILoadUserSuccess, NS.ILoadUserFailed>(
		'USER_SERVICE:LOAD',
		'USER_SERVICE:LOAD_SUCCESS',
		'USER_SERVICE:LOAD_FAILED',
		initial.communications.loadUser,
	),
	loadInvitedOrganization: makeCommunicationReducer<
	NS.ILoadInvitedOrganization,
	NS.ILoadInvitedOrganizationSuccess,
	NS.ILoadInvitedOrganizationFailed
	>(
		'USER_SERVICE:LOAD_INVITED_ORGANIZATION',
		'USER_SERVICE:LOAD_INVITED_ORGANIZATION_SUCCESS',
		'USER_SERVICE:LOAD_INVITED_ORGANIZATION_FAILED',
		initial.communications.loadInvitedOrganization,
	),
} as ReducersMap<NS.IReduxState['communications']>);
