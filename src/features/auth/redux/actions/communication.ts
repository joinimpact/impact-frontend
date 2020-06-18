import * as NS from '../../namespace';
import makeCommunicationActionCreators from 'shared/redux/communication/makeCommunicationActionCreators';

export const {
  execute: login,
  completed: loginSuccess,
  failed: loginFailed,
} = makeCommunicationActionCreators<
  NS.ILogin,
  NS.ILoginSuccess,
  NS.ILoginFailed
  >(
    'AUTH:LOGIN',
  'AUTH:LOGIN_SUCCESS',
  'AUTH:LOGIN_FAILED',
);
