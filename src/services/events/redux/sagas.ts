import { all, call, put, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import * as actions from '../redux/actions';
import * as NS from '../namespace';
import { getErrorMsg } from 'services/api';

const loadEventsType: NS.ILoadEvents['type'] = 'EVENT_SERVICE:LOAD_EVENTS';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(loadEventsType, executeLoadEvents, deps),
    ]);
  };
}

function* executeLoadEvents({ api }: IDependencies) {
  try {
    yield call(api.events.loadEvents);
    yield put(actions.loadEventsComplete());
  } catch (error) {
    yield put(actions.loadEventsFailed(getErrorMsg(error)));
  }
}
