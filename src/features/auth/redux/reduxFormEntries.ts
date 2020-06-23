import * as NS from '../namespace';
import { makeReduxFormEntry } from 'shared/util/redux';

export const loginFormEntry = makeReduxFormEntry<NS.ILoginForm>('loginForm',
  ['email', 'password']);

export const forgotPasswordFormEntry = makeReduxFormEntry<NS.IForgotPasswordForm>('forgotPassword', [
  'email',
]);

export const resetPasswordFormEntry = makeReduxFormEntry<NS.IResetPasswordForm>('resetPassword', [
  'password', 'passwordRepeat'
]);
