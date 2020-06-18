import * as NS from '../namespace';
import { makeReduxFormEntry } from 'shared/util/redux';

export const loginFormEntry = makeReduxFormEntry<NS.ILoginForm>('loginForm',
  ['email', 'password']);
