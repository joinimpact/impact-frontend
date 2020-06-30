import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
  communications: {
    login: initialCommunicationField,
    resetPassword: initialCommunicationField,
    recoveryPassword: initialCommunicationField,
    createAccount: initialCommunicationField,
    createPassword: initialCommunicationField,

    putFacebookOauthToken: initialCommunicationField,
    putGoogleOauthToken: initialCommunicationField,
  },
  data: {
  }
};

export default initialState;
