import * as NS from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initial: NS.IReduxState = {
  communications: {
    logout: initialCommunicationField,
    loadTags: initialCommunicationField,
  },
  data: {
    isAuthorized: false,
    isAuthRequested: true,
    logoutRequested: false,
    currentUser: null,
    tags: [],

    // TODO: REMOVE BEFORE COMMIT!
    // currentUser: mockUser,
  },
};

export default initial;
