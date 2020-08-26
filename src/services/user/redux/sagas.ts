import { all, takeEvery, call, select, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as NS from '../namespace';
import * as actions from './actions';
import * as selectors from './selectors';
import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'services/api';
import routes from 'modules/routes';
import { IUser } from 'shared/types/models/user';
import resetAppState from 'shared/redux/actions';
import { IInviteProps } from 'shared/types/models/auth';

const setUserAuthorizedType: NS.ISetUserAuthorized['type'] = 'USER_SERVICE:SET_AUTHORIZED_STATUS';
const logoutType: NS.ILogout['type'] = 'USER_SERVICE:LOGOUT';
const loadTags: NS.ILoadTags['type'] = 'USER_SERVICE:LOAD_TAGS';
const loadUserTagsType: NS.ILoadUserTags['type'] = 'USER_SERVICE:LOAD_USER_TAGS';
const loadUserType: NS.ILoadUser['type'] = 'USER_SERVICE:LOAD';
const loadInvitedOrganization: NS.ILoadInvitedOrganization['type'] = 'USER_SERVICE:LOAD_INVITED_ORGANIZATION';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeEvery(setUserAuthorizedType, executeSetUserAuthorized, deps),
      takeEvery(logoutType, executeLogout, deps),
      takeLatest(loadTags, executeLoadTags, deps),
      takeLatest(loadUserTagsType, executeLoadUserTags, deps),
      takeLatest(loadUserType, executeLoadUser, deps),
      takeEvery(loadInvitedOrganization, executeLoadInvitedOrganization, deps),
    ]);
  };
}

function* executeSetUserAuthorized({ api }: IDependencies, { payload }: NS.ISetUserAuthorized) {
  const isAuthorized = yield select(selectors.selectIsAuthorized);
  if (isAuthorized && !payload) {
    // User was authorized
    yield put(push(routes.auth.login.getPath()));
  }
}

function* executeLogout({ api }: IDependencies) {
  try {
    yield call(api.auth.logout);
    yield put(actions.logoutComplete());
    yield put(push(routes.auth.login.getPath()));
    yield put(resetAppState());
  } catch (error) {
    yield put(actions.logoutFailed(getErrorMsg(error)));
  }
}

function* executeLoadTags({ api }: IDependencies) {
  try {
    const response: string[] = yield call(api.volunteer.loadTags);
    yield put(actions.loadTagsComplete(response));
  } catch (error) {
    console.error(error);
    yield put(actions.loadTagsFailed(getErrorMsg(error)));
  }
}

function* executeLoadUserTags({ api }: IDependencies) {
  try {
    const userId = yield select(selectors.selectCurrentUserId);
    const response: string[] = yield call(api.volunteer.loadUserTags, userId);
    yield put(actions.loadUserTagsComplete(response));
  } catch (error) {
    console.error(error);
    yield put(actions.loadUserTagsFailed(getErrorMsg(error)));
  }
}

function* executeLoadUser({ api }: IDependencies) {
  try {
    const isAuthorized = yield select(selectors.selectIsAuthorized);
    const response: IUser = yield call(api.volunteer.loadUser);
    yield put(actions.loadUserComplete(response));
    if (!isAuthorized) {
      yield put(actions.setAuthorizedStatus(true));
    }
    yield put(actions.setUserAuthRequested(true));
  } catch (error) {
    yield put(actions.loadUserFailed(getErrorMsg(error)));
    yield put(actions.setUserAuthRequested(true));
  }
}

function* executeLoadInvitedOrganization({ api }: IDependencies) {
  try {
    const invitedProps: IInviteProps | null = yield select(selectors.selectInviteProps);
    if (invitedProps) {
      const organization = yield call(api.npo.loadOrganization, invitedProps.organizationId);
      yield put(actions.loadInvitedOrganizationComplete(organization));
    }
  } catch (error) {
    yield put(actions.loadInvitedOrganizationFailed(getErrorMsg(error)));
  }
}
