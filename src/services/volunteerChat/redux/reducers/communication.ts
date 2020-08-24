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
    'VOLUNTEER_CHAT:LOAD_CONVERSATIONS',
    'VOLUNTEER_CHAT:LOAD_CONVERSATIONS_SUCCESS',
    'VOLUNTEER_CHAT:LOAD_CONVERSATIONS_FAILED',
    initial.communications.loadConversations,
  ),
  loadConversation: makeCommunicationReducer<
    NS.ILoadConversation,
    NS.ILoadConversationSuccess,
    NS.ILoadConversationFailed
    >(
    'VOLUNTEER_CHAT:LOAD_CONVERSATION',
    'VOLUNTEER_CHAT:LOAD_CONVERSATION_SUCCESS',
    'VOLUNTEER_CHAT:LOAD_CONVERSATION_FAILED',
    initial.communications.loadConversation,
  ),
  sendMessage: makeCommunicationReducer<
    NS.ISendMessage,
    NS.ISendMessageSuccess,
    NS.ISendMessageFailed
    >(
    'VOLUNTEER_CHAT:SEND_MESSAGE',
    'VOLUNTEER_CHAT:SEND_MESSAGE_SUCCESS',
    'VOLUNTEER_CHAT:SEND_MESSAGE_FAILED',
    initial.communications.sendMessage,
  ),
  setCurrentConversation: makeCommunicationReducer<
    NS.ISetCurrentConversation,
    NS.ISetCurrentConversationSuccess,
    NS.ISetCurrentConversationFailed
    >(
    'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION',
    'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION_SUCCESS',
    'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION_FAILED',
    initial.communications.setCurrentConversation,
  ),
  fetchChatHistory: makeCommunicationReducer<
    NS.IFetchChatHistory,
    NS.IFetchChatHistorySuccess,
    NS.IFetchChatHistoryFailed
    >(
    'VOLUNTEER_CHAT:FETCH_HISTORY',
    'VOLUNTEER_CHAT:FETCH_HISTORY_SUCCESS',
    'VOLUNTEER_CHAT:FETCH_HISTORY_FAILED',
    initial.communications.fetchChatHistory,
  ),
});
