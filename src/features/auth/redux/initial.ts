import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
  communications: {
    login: initialCommunicationField,
  },
  data: {
  }
};

export default initialState;
