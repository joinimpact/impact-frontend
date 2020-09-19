import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/redux/communication';

export const { execute: connect, completed: connectComplete, failed: connectFailed } = makeCommunicationActionCreators<
NS.IConnect,
NS.IConnectSuccess,
NS.IConnectFailed
>('SOCKETS:CONNECT', 'SOCKETS:CONNECT_SUCCESS', 'SOCKETS:CONNECT_FAILED');

export const {
	execute: reconnect,
	completed: reconnectComplete,
	failed: reconnectFailed,
} = makeCommunicationActionCreators<NS.IReconnect, NS.IReconnectSuccess, NS.IReconnectFailed>(
	'SOCKETS:RECONNECT',
	'SOCKETS:RECONNECT_SUCCESS',
	'SOCKETS:RECONNECT_FAILED',
);
