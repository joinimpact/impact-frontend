import * as NS from '../../namespace';
import { initial } from '../initial';
import { makeCommunicationReducer } from 'shared/redux/communication';
import { combineReducers } from 'redux';

export default combineReducers<NS.IReduxState['communications']>({
  connect: makeCommunicationReducer<
    NS.IConnect,
    NS.IConnectSuccess,
    NS.IConnectFailed
    >(
    'SOCKETS:CONNECT',
    'SOCKETS:CONNECT_SUCCESS',
    'SOCKETS:CONNECT_FAILED',
    initial.communications.connect,
  ),
  reconnect: makeCommunicationReducer<
    NS.IReconnect,
    NS.IReconnectSuccess,
    NS.IReconnectFailed
    >(
    'SOCKETS:RECONNECT',
    'SOCKETS:RECONNECT_SUCCESS',
    'SOCKETS:RECONNECT_FAILED',
    initial.communications.reconnect,
  )
});
