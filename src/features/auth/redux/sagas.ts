import { IDependencies } from 'shared/types/app';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import { actions as userActions } from 'services/user';
import { getErrorMsg } from 'services/api';
import { IUser } from 'shared/types/models/user';
import routes from 'modules/routes';
import { push } from 'connected-react-router';

const loginType: NS.ILogin['type'] = 'AUTH:LOGIN';
const resetPasswordType: NS.IResetPassword['type'] = 'AUTH:RESET_PASSWORD';
const recoveryPasswordType: NS.IRecoveryPassword['type'] = 'AUTH:RECOVERY_PASSWORD';
const createAccountType: NS.ICreateAccount['type'] = 'AUTH:CREATE_ACCOUNT';
const createPasswordType: NS.ICreatePassword['type'] = 'AUTH:CREATE_PASSWORD';

const putFacebookOauthTokenType: NS.IPutFacebookOauthToken['type'] = 'AUTH:PUT_FACEBOOK_OAUTH_TOKEN';
const putGoogleOauthTokenType: NS.IPutGoogleOauthToken['type'] = 'AUTH:PUT_GOOGLE_OAUTH_TOKEN';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(loginType, executeLogin, deps),
      takeLatest(resetPasswordType, executeResetPassword, deps),
      takeLatest(recoveryPasswordType, executeRecoveryPassword, deps),
      takeLatest(createAccountType, executeCreateAccount, deps),
      takeLatest(createPasswordType, executeCreatePassword, deps),
      takeLatest(putFacebookOauthTokenType, executePutFacebookOauthToken, deps),
      takeLatest(putGoogleOauthTokenType, executePutGoogleOauthToken, deps),
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
    yield put(push(routes.dashboard.user.getPath()));
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

function* executeCreateAccount({ api }: IDependencies, { payload }: NS.ICreateAccount) {
  try {
    const response: IUser = yield call(api.auth.createAccount, payload);
    yield put(actions.createAccountComplete(response));
    yield put(userActions.setCurrentUser(response));
    yield put(userActions.setAuthorizedStatus(true));
  } catch (error) {
    console.error(error);
    yield put(actions.createAccountFailed(getErrorMsg(error)));
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

function* executeCreatePassword({ api }: IDependencies, { payload }: NS.ICreatePassword) {
  try {
    yield call(api.auth.createPassword, {
      password: payload.password,
    });
    yield put(actions.createPasswordComplete());
  } catch (error) {
    yield put(actions.createPasswordFailed(getErrorMsg(error)));
  }
}

function* executePutFacebookOauthToken({ api }: IDependencies, { payload }: NS.IPutFacebookOauthToken) {
  try {
    const response = yield call(api.auth.putFacebookOauthCode, payload);
    yield put(actions.putFacebookOauthTokenComplete(response));
  } catch (error) {
    yield put(actions.putFacebookOauthTokenFailed(getErrorMsg(error)));
  }
}

function* executePutGoogleOauthToken({ api }: IDependencies, { payload }: NS.IPutGoogleOauthToken) {
  try {
    const response = yield call(api.auth.putGoogleOauthCode, payload);
    yield put(actions.putGoogleOauthTokenComplete(response));
  } catch (error) {
    yield put(actions.putGoogleOauthTokenFailed(getErrorMsg(error)));
  }
}
