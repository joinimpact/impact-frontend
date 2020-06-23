import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
  communications: {
    login: initialCommunicationField,
    resetPassword: initialCommunicationField,
    recoveryPassword: initialCommunicationField,
  },
  data: {
  }
};

export default initialState;
