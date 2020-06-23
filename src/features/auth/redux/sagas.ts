import { IDependencies } from 'shared/types/app';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import { getErrorMsg } from 'services/api';

const loginType: NS.ILogin['type'] = 'AUTH:LOGIN';
const resetPassowrdType: NS.IResetPassword['type'] = 'AUTH:RESET_PASSWORD';
const recoveryPasswordType: NS.IRecoveryPassword['type'] = 'AUTH:RECOVERY_PASSWORD';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(loginType, executeLogin, deps),
      takeLatest(resetPassowrdType, executeResetPassword, deps),
      takeLatest(recoveryPasswordType, executeRecoveryPassword, deps),
    ]);
  };
}

function* executeLogin({ api }: IDependencies, { payload }: NS.ILogin) {
  try {
    const { email, password } = payload;
    yield call(api.auth.login, {
      email,
      password,
    });
    yield put(actions.loginSuccess());
  } catch (error) {
    yield put(actions.loginFailed(getErrorMsg(error)));
  }
}

function* executeRecoveryPassword({ api }: IDependencies, { payload }: NS.IRecoveryPassword ) {
  try {
    const { email } = payload;
    yield call(api.auth.recoveryPassword, {
      email,
    });
    yield put(actions.recoveryPasswordComplete());
  } catch (error) {
    yield put(actions.recoveryPasswordFailed(getErrorMsg(error)));
  }
}

function* executeResetPassword({ api }: IDependencies, { payload }: NS.IResetPassword ) {
  try {
    const { password } = payload;
    yield call(api.auth.resetPassword, {
      password,
    });
    yield put(actions.resetPasswordComplete());
  } catch (error) {
    yield put(actions.resetPasswordFailed(getErrorMsg(error)));
  }
}
