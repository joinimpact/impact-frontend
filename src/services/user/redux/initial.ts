import * as NS from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';
// import { mockUser } from 'shared/defaults/mocks';

const initial: NS.IReduxState = {
	communications: {
		logout: initialCommunicationField,
		loadTags: initialCommunicationField,
		loadUserTags: initialCommunicationField,
		loadUser: initialCommunicationField,
		loadInvitedOrganization: initialCommunicationField,
	},
	data: {
		isAuthorized: false,
		isAuthRequested: false,
		logoutRequested: false,
		tags: [],
		userTags: [],
		currentViewMode: 'npo',

		currentUser: null,
		// currentUser: mockUser, // TODO: REMOVE BEFORE COMMIT!
		inviteProps: null,
		inviteOrganization: null,
	},
};

export default initial;
