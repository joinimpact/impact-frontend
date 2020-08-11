import WebSocketServiceContainer from './view/WebSocketServiceContainer';
import WebSocketService from './WebSocketService';
import * as namespace from './namespace';
import { actions, selectors, reducer, getSaga } from './redux';
import { IReduxEntry } from 'shared/types/app';

export { WebSocketServiceContainer, WebSocketService, namespace, actions, selectors };

export const reduxEntry: IReduxEntry = {
  reducers: { socketsService: reducer },
  sagas: [getSaga],
};
