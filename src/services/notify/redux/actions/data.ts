import * as NS from '../../namespace';
import { IMessage } from 'shared/types/models/notify';

export function addMessage(message: IMessage): NS.IAddMessage {
	return { payload: message, type: 'NOTIFY_SERVICE:ADD_MESSAGE' };
}

export function delMessage(messageId: string): NS.IDelMessage {
	return { payload: messageId, type: 'NOTIFY_SERVICE:REMOVE_MESSAGE' };
}

export function subscribeToSocket(): NS.ISubscribeToSocket {
	return { type: 'NOTIFY_SERVICE:SUBSCRIBE_TO_SOCKET' };
}

export function unsubscribeFromSocket(): NS.IUnsubscribeFromSocket {
	return { type: 'NOTIFY_SERVICE:UNSUBSCRIBE_FROM_SOCKET' };
}
