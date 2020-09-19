import { IDependencies } from 'shared/types/app';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import * as selectors from './selectors';
import { getErrorMsg } from 'services/api';
import { IConversationMessagesResponseExtended } from 'shared/types/responses/chat';
import { calcPageNumberByReverseIndex } from 'shared/helpers/chat';
import { CHAT_FRAME_SIZE } from 'shared/types/constants';
import { selectors as userSelectors } from 'services/user';

const loadConversationsType: NS.ILoadConversations['type'] = 'VOLUNTEER_CHAT:LOAD_CONVERSATIONS';
const setCurrentConversationType: NS.ISetCurrentConversation['type'] = 'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION';
const loadConversationType: NS.ILoadConversation['type'] = 'VOLUNTEER_CHAT:LOAD_CONVERSATION';
const sendMessageType: NS.ISendMessage['type'] = 'VOLUNTEER_CHAT:SEND_MESSAGE';
const fetchChatHistoryType: NS.IFetchChatHistory['type'] = 'VOLUNTEER_CHAT:FETCH_HISTORY';

export default function getSaga(deps: IDependencies) {
	return function* saga() {
		yield all([
			takeLatest(loadConversationsType, executeLoadConversations, deps),
			takeEvery(setCurrentConversationType, executeSetCurrentConversation, deps),
			takeLatest(loadConversationType, executeLoadConversation, deps),
			takeEvery(sendMessageType, executeSendMessage, deps),
			takeEvery(fetchChatHistoryType, executeFetchChatHistory, deps),
		]);
	};
}

function* executeLoadConversations({ api }: IDependencies) {
	try {
		const userId = yield select(userSelectors.selectCurrentUserId);
		const currentConversation = yield select(selectors.selectCurrentConversation);
		const conversations = yield call(api.volunteer.loadConversations, userId);
		yield put(actions.loadConversationsComplete(conversations));
		if (!currentConversation && conversations.length) {
			yield put(actions.setCurrentConversation(conversations[0]));
		}
	} catch (error) {
		yield put(actions.loadConversationsFailed(getErrorMsg(error)));
	}
}

function* executeSetCurrentConversation({ api }: IDependencies, { payload }: NS.ISetCurrentConversation) {
	try {
		const userId = yield select(userSelectors.selectCurrentUserId);
		const response: IConversationMessagesResponseExtended = yield call(
			api.volunteer.loadConversationMessages,
			userId,
			payload.id,
		);
		yield put(actions.setCurrentConversationMessages(response));
		yield put(actions.loadConversation(payload.id));
		yield put(actions.setCurrentConversationComplete());
	} catch (error) {
		yield put(actions.setCurrentConversationFailed(getErrorMsg(error)));
	}
}

function* executeLoadConversation({ api }: IDependencies, { payload }: NS.ILoadConversation) {
	try {
		const userId = yield select(userSelectors.selectCurrentUserId);
		const conversationItem = yield call(api.volunteer.loadConversation, userId, payload);
		yield put(actions.loadConversationComplete(conversationItem));
	} catch (error) {
		yield put(actions.loadConversationFailed(getErrorMsg(error)));
	}
}

function* executeSendMessage({ api }: IDependencies, { payload }: NS.ISendMessage) {
	try {
		const userId = yield select(userSelectors.selectCurrentUserId);
		yield call(api.volunteer.sendMessage, userId, payload.conversationId, payload.message);
		yield put(actions.sendMessageComplete());
	} catch (error) {
		yield put(actions.sendMessageFailed(getErrorMsg(error)));
	}
}

function* executeFetchChatHistory({ api }: IDependencies, { payload }: NS.IFetchChatHistory) {
	try {
		const userId = yield select(userSelectors.selectCurrentUserId);
		const currentConversation = yield select(selectors.selectCurrentConversation);
		const totalMessagesCount = yield select(selectors.selectTotalMessagesCount);
		const { startIndex, stopIndex } = payload;
		const leftPageNumber = calcPageNumberByReverseIndex(stopIndex, totalMessagesCount, CHAT_FRAME_SIZE);
		const rightPageNumber = calcPageNumberByReverseIndex(startIndex, totalMessagesCount, CHAT_FRAME_SIZE);

		for (let i = leftPageNumber; i <= rightPageNumber; i++) {
			const response: IConversationMessagesResponseExtended = yield call(
				api.volunteer.loadConversationMessages,
				userId,
				currentConversation.id,
				i,
			);

			yield put(actions.fetchChatHistoryComplete(response));
		}

		/* const response: IConversationMessagesResponseExtended =
      yield call(api.volunteer.loadConversationMessages, userId, currentConversation.id);

    yield put(actions.fetchChatHistoryComplete(response));*/
	} catch (error) {
		yield put(actions.fetchChatHistoryFailed(getErrorMsg(error)));
	}
}
