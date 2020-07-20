import * as NS from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initial: NS.IReduxState = {
  communications: {
    loadEvents: initialCommunicationField,
  },
};

export default initial;
