import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communications']>({
  login: makeCommunicationReducer<
    NS.ILogin,
    NS.ILoginSuccess,
    NS.ILoginFailed>(
    'AUTH:LOGIN',
    'AUTH:LOGIN_SUCCESS',
    'AUTH:LOGIN_FAILED',
    initial.communications.login,
  ),
  resetPassword: makeCommunicationReducer<
    NS.IResetPassword,
    NS.IResetPasswordSuccess,
    NS.IResetPasswordFailed
    >(
      'AUTH:RESET_PASSWORD',
      'AUTH:RESET_PASSWORD_SUCCESS',
      'AUTH:RESET_PASSWORD_FAILED',
    initial.communications.resetPassword,
  ),
});
