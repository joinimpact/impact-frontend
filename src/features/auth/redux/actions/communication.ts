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

export const {
  execute: resetPassword,
  completed: resetPasswordComplete,
  failed: resetPasswordFailed,
} = makeCommunicationActionCreators<
  NS.IResetPassword,
  NS.IResetPasswordSuccess,
  NS.IResetPasswordFailed
  >(
  'AUTH:RESET_PASSWORD',
  'AUTH:RESET_PASSWORD_SUCCESS',
  'AUTH:RESET_PASSWORD_FAILED'
);
