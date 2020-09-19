import * as NS from '../../namespace';
import makeCommunicationActionCreators from 'shared/redux/communication/makeCommunicationActionCreators';

export const {
	execute: loadConversations,
	completed: loadConversationsComplete,
	failed: loadConversationsFailed,
} = makeCommunicationActionCreators<NS.ILoadConversations, NS.ILoadConversationsSuccess, NS.ILoadConversationsFailed>(
	'VOLUNTEER_CHAT:LOAD_CONVERSATIONS',
	'VOLUNTEER_CHAT:LOAD_CONVERSATIONS_SUCCESS',
	'VOLUNTEER_CHAT:LOAD_CONVERSATIONS_FAILED',
);

export const {
	execute: loadConversation,
	completed: loadConversationComplete,
	failed: loadConversationFailed,
} = makeCommunicationActionCreators<NS.ILoadConversation, NS.ILoadConversationSuccess, NS.ILoadConversationFailed>(
	'VOLUNTEER_CHAT:LOAD_CONVERSATION',
	'VOLUNTEER_CHAT:LOAD_CONVERSATION_SUCCESS',
	'VOLUNTEER_CHAT:LOAD_CONVERSATION_FAILED',
);

export const {
	execute: sendMessage,
	completed: sendMessageComplete,
	failed: sendMessageFailed,
} = makeCommunicationActionCreators<NS.ISendMessage, NS.ISendMessageSuccess, NS.ISendMessageFailed>(
	'VOLUNTEER_CHAT:SEND_MESSAGE',
	'VOLUNTEER_CHAT:SEND_MESSAGE_SUCCESS',
	'VOLUNTEER_CHAT:SEND_MESSAGE_FAILED',
);

export const {
	execute: setCurrentConversation,
	completed: setCurrentConversationComplete,
	failed: setCurrentConversationFailed,
} = makeCommunicationActionCreators<
NS.ISetCurrentConversation,
NS.ISetCurrentConversationSuccess,
NS.ISetCurrentConversationFailed
>(
	'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION',
	'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION_SUCCESS',
	'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION_FAILED',
);

export const {
	execute: fetchChatHistory,
	completed: fetchChatHistoryComplete,
	failed: fetchChatHistoryFailed,
} = makeCommunicationActionCreators<NS.IFetchChatHistory, NS.IFetchChatHistorySuccess, NS.IFetchChatHistoryFailed>(
	'VOLUNTEER_CHAT:FETCH_HISTORY',
	'VOLUNTEER_CHAT:FETCH_HISTORY_SUCCESS',
	'VOLUNTEER_CHAT:FETCH_HISTORY_FAILED',
);
