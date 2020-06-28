import * as NS from '../namespace';
import { makeReduxFormEntry } from 'shared/util/redux';

export const loginFormEntry = makeReduxFormEntry<NS.ILoginForm>('loginForm', ['email', 'password']);

export const forgotPasswordFormEntry = makeReduxFormEntry<NS.IForgotPasswordForm>('forgotPassword', ['email']);

export const resetPasswordFormEntry = makeReduxFormEntry<NS.IResetPasswordForm>('resetPassword', [
  'password',
  'passwordRepeat',
]);

export const createNewAccountFormEntry = makeReduxFormEntry<NS.ICreateAccountForm>('createAccount', [
  'firstName',
  'lastName',
  'email',
  'birthday',
  'address',
]);

export const createPasswordFormEntry = makeReduxFormEntry<NS.ICreatePasswordForm>('createPassword', [
  'password',
  'passwordRepeat',
]);
