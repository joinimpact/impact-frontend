import * as NS from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initial: NS.IReduxState = {
  communications: {
    loadUserOrganizations: initialCommunicationField,
  },
  data: {
    currentOrganization: null,
    organizations: null,
    isServiceReady: false,
  },
};

export default initial;
