import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
	switch (action.type) {
		case 'USER_SERVICE:SET_AUTHORIZED_STATUS': {
			return {
				...state,
				isAuthorized: action.payload,
			};
		}
		case 'USER_SERVICE:SET_USER_AUTH_REQUESTED':
			return {
				...state,
				isAuthRequested: action.payload,
			};
		case 'USER_SERVICE:LOGOUT_SUCCESS':
			return {
				...state,
				isAuthorized: false,
				logoutRequested: false,
			};
		case 'USER_SERVICE:REQUEST_LOGOUT':
			return { ...state, logoutRequested: true };
		case 'USER_SERVICE:RESET_REQUEST_LOGOUT':
			return { ...state, logoutRequested: false };
		case 'USER_SERVICE:SET_CURRENT_USER':
			return { ...state, currentUser: action.payload };
		case 'USER_SERVICE:LOAD_TAGS_SUCCESS':
			return { ...state, tags: action.payload };
		case 'USER_SERVICE:LOAD_USER_TAGS_SUCCESS':
			return { ...state, userTags: action.payload };
		case 'USER_SERVICE:LOAD_SUCCESS':
			return {
				...state,
				currentUser: action.payload,
				userTags: action.payload.tags,
			};
		case 'USER_SERVICE:UPDATE_USER_LOGO':
			if (state.currentUser) {
				return {
					...state,
					currentUser: {
						...state.currentUser,
						avatarUrl: action.payload,
					},
				};
			}
			return state;
		case 'USER_SERVICE:SET_CURRENT_VIEW_MODE':
			return {
				...state,
				currentViewMode: action.payload,
			};
		case 'USER_SERVICE:SET_INVITE_PROPS':
			return {
				...state,
				inviteProps: action.payload,
			};
		case 'USER_SERVICE:RESET_INVITE_PROPS':
			return {
				...state,
				inviteProps: null,
				inviteOrganization: null,
			};
		case 'USER_SERVICE:LOAD_INVITED_ORGANIZATION_SUCCESS':
			return {
				...state,
				inviteOrganization: action.payload,
			};
	}
	return state;
}

export default dataReducer;
