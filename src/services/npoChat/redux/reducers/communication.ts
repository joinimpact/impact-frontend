import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communications']>({
  loadConversations: makeCommunicationReducer<
    NS.ILoadConversations,
    NS.ILoadConversationsSuccess,
    NS.ILoadConversationsFailed
    >(
    'NPO_CHAT:LOAD_CONVERSATIONS',
    'NPO_CHAT:LOAD_CONVERSATIONS_SUCCESS',
    'NPO_CHAT:LOAD_CONVERSATIONS_FAILED',
    initial.communications.loadConversations,
  ),
  loadConversation: makeCommunicationReducer<
    NS.ILoadConversation,
    NS.ILoadConversationSuccess,
    NS.ILoadConversationFailed
    >(
    'NPO_CHAT:LOAD_CONVERSATION',
    'NPO_CHAT:LOAD_CONVERSATION_SUCCESS',
    'NPO_CHAT:LOAD_CONVERSATION_FAILED',
    initial.communications.loadConversation,
  ),
  sendMessage: makeCommunicationReducer<
    NS.ISendMessage,
    NS.ISendMessageSuccess,
    NS.ISendMessageFailed
    >(
    'NPO_CHAT:SEND_MESSAGE',
    'NPO_CHAT:SEND_MESSAGE_SUCCESS',
    'NPO_CHAT:SEND_MESSAGE_FAILED',
    initial.communications.sendMessage,
  ),
  setCurrentConversation: makeCommunicationReducer<
    NS.ISetCurrentConversation,
    NS.ISetCurrentConversationSuccess,
    NS.ISetCurrentConversationFailed
    >(
    'NPO_CHAT:SET_CURRENT_CONVERSATION',
    'NPO_CHAT:SET_CURRENT_CONVERSATION_SUCCESS',
    'NPO_CHAT:SET_CURRENT_CONVERSATION_FAILED',
    initial.communications.setCurrentConversation,
  ),
  fetchChatHistory: makeCommunicationReducer<
    NS.IFetchChatHistory,
    NS.IFetchChatHistorySuccess,
    NS.IFetchChatHistoryFailed
    >(
    'NPO_CHAT:FETCH_HISTORY',
    'NPO_CHAT:FETCH_HISTORY_SUCCESS',
    'NPO_CHAT:FETCH_HISTORY_FAILED',
    initial.communications.fetchChatHistory,
  ),
  chatStatePrepare: makeCommunicationReducer<
    NS.IChatStatePrepare,
    NS.IChatStatePrepareSuccess,
    NS.IChatStatePrepareFailed
    >(
      'NPO_CHAT:CHAT_STATE_PREPARE',
      'NPO_CHAT:CHAT_STATE_PREPARE_SUCCESS',
      'NPO_CHAT:CHAT_STATE_PREPARE_FAILED',
    initial.communications.chatStatePrepare,
  ),
});
