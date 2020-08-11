import WebSocketService from 'services/sockets/WebSocketService';
import { ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communications: {
    connect: ICommunication;
    reconnect: ICommunication;
  };
}

export interface IWebSocketProps {
  socket: WebSocketService;
}

export type IConnect = IPlainAction<'SOCKETS:CONNECT'>;
export type IConnectSuccess = IPlainAction<'SOCKETS:CONNECT_SUCCESS'>;
export type IConnectFailed = IPlainFailAction<'SOCKETS:CONNECT_FAILED'>;
export type IReconnect = IPlainAction<'SOCKETS:RECONNECT'>;
export type IReconnectSuccess = IPlainAction<'SOCKETS:RECONNECT_SUCCESS'>;
export type IReconnectFailed = IPlainFailAction<'SOCKETS:RECONNECT_FAILED'>;
export type IDisconnect = IPlainAction<'SOCKETS:DISCONNECT'>;

export type Action =
  | IConnect
  | IConnectSuccess
  | IConnectFailed
  | IReconnect
  | IReconnectSuccess
  | IReconnectFailed
  | IDisconnect;
