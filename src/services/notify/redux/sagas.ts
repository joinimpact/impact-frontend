import { IDependencies } from 'shared/types/app';
import { all, put, race, take, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import * as NS from '../namespace';
import { eventChannel } from 'redux-saga';
import { MessageTypes } from 'shared/types/websocket';
import { IConversationMessageResponseItem } from 'shared/types/responses/chat';

const subscribeToSocketType: NS.ISubscribeToSocket['type'] = 'NOTIFY_SERVICE:SUBSCRIBE_TO_SOCKET';
const unsubscribeFromSocketType: NS.IUnsubscribeFromSocket['type'] = 'NOTIFY_SERVICE:UNSUBSCRIBE_FROM_SOCKET';

export default function getSaga(deps: IDependencies) {
	return function* saga() {
		yield all([takeEvery(subscribeToSocketType, executeSubscribeToSocket, deps)]);
	};
}

function* executeSubscribeToSocket({ websocket, translate: t }: IDependencies) {
	const channel = eventChannel((emitter) => {
		websocket.attachEventListener(MessageTypes.MESSAGE_SENT, emitter);

		return () => {
			websocket.removeEventListener(MessageTypes.MESSAGE_SENT, emitter);
		};
	});

	interface ITask {
		cancel?: NS.IUnsubscribeFromSocket;
		task?: IConversationMessageResponseItem;
	}

	try {
		while (true) {
			const { cancel, task }: ITask = yield race({
				task: take(channel),
				cancel: take(unsubscribeFromSocketType),
			});

			if (cancel) {
				channel.close();
				break;
			}

			if (task) {
				yield put(
					actions.addMessage({
						type: 'WS_MESSAGE',
						body: task,
					}),
				);
			}
		}
	} catch (error) {
		console.error(error);
	} finally {
		channel.close();
	}
}
