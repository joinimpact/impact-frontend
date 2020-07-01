import * as NS from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initial: NS.IReduxState = {
  communication: {
    logout: initialCommunicationField,
  },
  data: {
    isAuthorized: false,
    isAuthRequested: true,
    logoutRequested: false,
    currentUser: null,
  },
};

export default initial;
