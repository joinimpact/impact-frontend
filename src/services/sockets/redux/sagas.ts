import { all, call, put, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import * as actions from '../redux/actions';
import * as NS from '../namespace';

const connectType: NS.IConnect['type'] = 'SOCKETS:CONNECT';
const reconnectType: NS.IReconnect['type'] = 'SOCKETS:RECONNECT';
const disconnectType: NS.IDisconnect['type'] = 'SOCKETS:DISCONNECT';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(connectType, executeConnect, deps),
      takeLatest(reconnectType, executeReconnect, deps),
      takeLatest(disconnectType, executeDisconnect, deps),
    ]);
  };
}

function* executeConnect({ websocket }: IDependencies) {
  try {
    yield call(websocket.connect);
    yield put(actions.connectComplete());
  } catch (error) {
    if (error) {
      console.error(error);
      yield put(actions.connectFailed(error.message));
    }
  }
}

function* executeReconnect({ websocket }: IDependencies) {
  try {
    yield call(websocket.disconnect);
    yield call(websocket.connect);
    yield put(actions. reconnectComplete());
  } catch (error) {
    yield put(actions.reconnectFailed(error.message));
  }
}

function* executeDisconnect({ websocket }: IDependencies) {
  console.log('[executeDisconnect] websocket: ', websocket);
}
