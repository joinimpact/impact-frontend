import { all, takeEvery, call, select, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as NS from '../namespace';
import * as actions from './actions';
import * as selectors from './selectors';
import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'services/api';
import routes from 'modules/routes';
import { ILoadTagsResponse } from 'shared/types/responses/volunteer';

const setUserAuthorizedType: NS.ISetUserAuthorized['type'] = 'USER_SERVICE:SET_AUTHORIZED_STATUS';
const logoutType: NS.ILogout['type'] = 'USER_SERVICE:LOGOUT';
const loadUserTagsType: NS.ILoadUserTags['type'] = 'USER_SERVICE:LOAD_USER_TAGS';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeEvery(setUserAuthorizedType, executeSetUserAuthorized, deps),
      takeEvery(logoutType, executeLogout, deps),
      takeLatest(loadUserTagsType, executeLoadUserTags, deps),
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
  } catch (error) {
    yield put(actions.logoutFailed(getErrorMsg(error)));
  }
}

function* executeLoadUserTags({ api }: IDependencies) {
  try {
    const userId: string | null = yield select(selectors.selectCurrentUserId);
    if (userId) {
      const response: ILoadTagsResponse = yield call(api.volunteer.loadUserTags, userId );
      yield put(actions.loadUserTagsComplete(response.tags));
    } else {
      console.error('UserId not found!');
      yield put(actions.loadUserTagsFailed('Internal error'));
    }
  } catch (error) {
    console.error(error);
    yield put(actions.loadUserTagsFailed(getErrorMsg(error)));
  }
}
