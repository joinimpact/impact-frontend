import { IDependencies } from 'shared/types/app';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import * as selectors from './selectors';
import { getErrorMsg } from 'services/api';
import { actions as npoActions, selectors as npoSelectors } from 'services/npo';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { IConversationMessagesResponseExtended } from 'shared/types/responses/chat';
import { calcPageNumberByReverseIndex, findConversationOpportunity } from 'shared/helpers/chat';
import { CHAT_FRAME_SIZE } from 'shared/types/constants';

const loadConversationsType: NS.ILoadConversations['type'] = 'NPO_CHAT:LOAD_CONVERSATIONS';
const setCurrentConversationType: NS.ISetCurrentConversation['type'] = 'NPO_CHAT:SET_CURRENT_CONVERSATION';
const loadConversationType: NS.ILoadConversation['type'] = 'NPO_CHAT:LOAD_CONVERSATION';
const sendMessageType: NS.ISendMessage['type'] = 'NPO_CHAT:SEND_MESSAGE';

const fetchChatHistoryType: NS.IFetchChatHistory['type'] = 'NPO_CHAT:FETCH_HISTORY';
const chatStatePrepareType: NS.IChatStatePrepare['type'] = 'NPO_CHAT:CHAT_STATE_PREPARE';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      // Chat injection
      takeLatest(loadConversationsType, executeLoadConversations, deps),
      takeEvery(setCurrentConversationType, executeSetCurrentConversation, deps),
      takeLatest(loadConversationType, executeLoadConversation, deps),
      takeEvery(sendMessageType, executeSendMessage, deps),
      takeEvery(fetchChatHistoryType, executeFetchChatHistory, deps),
      takeEvery(chatStatePrepareType, executeChatPrepareState, deps),
    ]);
  };
}

function* executeLoadConversations({ api }: IDependencies) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    const currentConversation = yield select(selectors.selectCurrentConversation);
    const conversations = yield call(api.npo.loadConversations, orgId);
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
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    const response: IConversationMessagesResponseExtended = yield call(
      api.npo.loadConversationMessages,
      orgId,
      payload.id,
    );
    yield put(actions.setCurrentConversationMessages(response));
    yield put(actions.loadConversation(payload.id));
    yield put(actions.setCurrentConversationComplete());
  } catch (error) {
    yield put(actions.setCurrentConversationFailed(getErrorMsg(error)));
  }
}

export function* executeLoadConversation({ api }: IDependencies, { payload }: NS.ILoadConversation) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    const conversationItem = yield call(api.npo.loadConversation, orgId, payload);
    yield put(actions.loadConversationComplete(conversationItem));
    const organizationOpportunities = yield select(npoSelectors.selectOrganizationOpportunities);
    const conversationOpportunity: IOpportunityResponse | undefined = findConversationOpportunity(
      organizationOpportunities,
      conversationItem,
    );
    if (conversationOpportunity) {
      yield put(actions.setCurrentConversationOpportunity(conversationOpportunity));
    }
  } catch (error) {
    yield put(actions.loadConversationFailed(getErrorMsg(error)));
  }
}

function* executeSendMessage({ api }: IDependencies, { payload }: NS.ISendMessage) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    yield call(api.npo.sendMessage, orgId, payload.conversationId, payload.message);
    yield put(actions.sendMessageComplete());
  } catch (error) {
    yield put(actions.sendMessageFailed(getErrorMsg(error)));
  }
}

function* executeFetchChatHistory({ api }: IDependencies, { payload }: NS.IFetchChatHistory) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    const currentConversation = yield select(selectors.selectCurrentConversation);
    const totalMessagesCount = yield select(selectors.selectTotalMessagesCount);
    const { startIndex, stopIndex } = payload;
    const leftPageNumber = calcPageNumberByReverseIndex(stopIndex, totalMessagesCount, CHAT_FRAME_SIZE);
    const rightPageNumber = calcPageNumberByReverseIndex(startIndex, totalMessagesCount, CHAT_FRAME_SIZE);

    for (let i = leftPageNumber; i <= rightPageNumber; i++) {
      const response: IConversationMessagesResponseExtended = yield call(
        api.npo.loadConversationMessages,
        orgId,
        currentConversation.id,
        i,
      );

      yield put(actions.fetchChatHistoryComplete(response));
    }

    /*const response: IConversationMessagesResponseExtended =
      yield call(api.volunteer.loadConversationMessages, userId, currentConversation.id);

    yield put(actions.fetchChatHistoryComplete(response));*/
  } catch (error) {
    yield put(actions.fetchChatHistoryFailed(getErrorMsg(error)));
  }
}

function* executeChatPrepareState(dependencies: IDependencies) {
  try {
    yield put(actions.loadConversations());
    yield put(npoActions.loadOpportunities());
    yield put(actions.chatStatePrepareComplete());
  } catch (error) {
    yield put(actions.chatStatePrepareFailed(getErrorMsg(error)));
  }
}

