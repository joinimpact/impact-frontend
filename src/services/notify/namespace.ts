import { IAction, IPlainAction } from 'shared/types/redux';
import { IMessage } from 'shared/types/models/notify';

export interface IReduxState {
  data: {
    stack: IMessage[];
  };
}

export interface INotifyProps {
  notifyError(message: string): void;
  notifyWarn(message: string): void;
  notifyInfo(message: string): void;
  notifyMessage(message: IMessage): void;
}

export type IAddMessage = IAction<'NOTIFY_SERVICE:ADD_MESSAGE', IMessage>;
export type IDelMessage = IAction<'NOTIFY_SERVICE:REMOVE_MESSAGE', string>;

export type ISubscribeToSocket = IPlainAction<'NOTIFY_SERVICE:SUBSCRIBE_TO_SOCKET'>;
export type IUnsubscribeFromSocket = IPlainAction<'NOTIFY_SERVICE:UNSUBSCRIBE_FROM_SOCKET'>;

export type Action =
  | IAddMessage
  | IDelMessage
  | ISubscribeToSocket
  | IUnsubscribeFromSocket;
