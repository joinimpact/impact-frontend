import { IDependencies } from 'shared/types/app';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import { getErrorMsg } from 'services/api';

const loginType: NS.ILogin['type'] = 'AUTH:LOGIN';
const resetPassowrdType: NS.IResetPassword['type'] = 'AUTH:RESET_PASSWORD';
const recoveryPasswordType: NS.IRecoveryPassword['type'] = 'AUTH:RECOVERY_PASSWORD';
const createOrganizationType: NS.ICreateOrganization['type'] = 'AUTH:CREATE_ORGANIZATION';
const createAccountType: NS.ICreateAccount['type'] = 'AUTH:CREATE_ACCOUNT';
const createPasswordType: NS.ICreatePassword['type'] = 'AUTH:CREATE_PASSWORD';
const uploadOrgLogoType: NS.IUploadOrgLogo['type'] = 'AUTH:UPLOAD_ORG_LOGO';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(loginType, executeLogin, deps),
      takeLatest(resetPassowrdType, executeResetPassword, deps),
      takeLatest(recoveryPasswordType, executeRecoveryPassword, deps),
      takeLatest(createOrganizationType, executeCreateOrganization, deps),
      takeLatest(createAccountType, executeCreateAccount, deps),
      takeLatest(createPasswordType, executeCreatePassword, deps),
      takeLatest(uploadOrgLogoType, executeUploadOrgLogo, deps),
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

function* executeCreateOrganization({ api }: IDependencies, { payload }: NS.ICreateOrganization) {
  try {
    yield call(api.auth.createOrganization, {
      name: payload.organizationName,
      address: payload.address,
      description: payload.description,
      website: payload.website,
    });
    yield put(actions.createNewOrganizationComplete());
  } catch (error) {
    yield put(actions.createNewOrganizationFailed(getErrorMsg(error)));
  }
}

function* executeCreateAccount({ api }: IDependencies, { payload }: NS.ICreateAccount) {
  try {
    yield call(api.auth.createAccount, {
      firstName: payload.firstName,
      lastName: payload.lastName,
      birthDate: payload.birthday,
      email: payload.email,
      address: payload.address,
    });
    yield put(actions.createAccountComplete());
  } catch (error) {
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

function* executeUploadOrgLogo({ api }: IDependencies, { payload }: NS.IUploadOrgLogo) {
  try {
    yield call(api.auth.uploadOrgLogo, payload, (progress: number) => {
      // console.log('progress: ', progress);
    });
    yield put(actions.uploadOrgLogoComplete());
  } catch (error) {
    yield put(actions.uploadOrgLogoFailed(getErrorMsg(error)));
  }
}
