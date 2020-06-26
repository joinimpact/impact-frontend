import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
  communications: {
    search: initialCommunicationField,
  },
  data: {},
};

export default initialState;
