import { all, call, put, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import * as actions from '../redux/actions';
import * as NS from '../namespace';
import { getErrorMsg } from 'services/api';

const loadUserOrganizationsType: NS.ILoadUserOrganizations['type'] = 'NPO_SERVICE:LOAD_USER_ORGANIZATIONS';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(loadUserOrganizationsType, executeLoadUserOrganizations, deps),
    ]);
  };
}

function* executeLoadUserOrganizations({ api }: IDependencies) {
  try {
    const response = yield call(api.npo.loadUserOrganizations);
    yield put(actions.loadUserOrganizationsComplete(response.organizations));
  } catch (error) {
    yield put(actions.loadUserOrganizationsFailed(getErrorMsg(error)));
  }
}
