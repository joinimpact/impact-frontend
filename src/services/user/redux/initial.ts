import * as NS from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';
// import { mockUser } from 'shared/defaults/mocks';

const initial: NS.IReduxState = {
  communications: {
    logout: initialCommunicationField,
    loadTags: initialCommunicationField,
    loadUserTags: initialCommunicationField,
    loadUser: initialCommunicationField,
  },
  data: {
    isAuthorized: false,
    isAuthRequested: true,
    logoutRequested: false,
    tags: [],
    userTags: [],

    currentUser: null,
    // currentUser: mockUser, // TODO: REMOVE BEFORE COMMIT!
  },
};

export default initial;
