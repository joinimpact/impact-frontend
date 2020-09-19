import * as NS from '../../namespace';
import makeCommunicationActionCreators from 'shared/redux/communication/makeCommunicationActionCreators';

export const {
	execute: loadConversations,
	completed: loadConversationsComplete,
	failed: loadConversationsFailed,
} = makeCommunicationActionCreators<NS.ILoadConversations, NS.ILoadConversationsSuccess, NS.ILoadConversationsFailed>(
	'NPO_CHAT:LOAD_CONVERSATIONS',
	'NPO_CHAT:LOAD_CONVERSATIONS_SUCCESS',
	'NPO_CHAT:LOAD_CONVERSATIONS_FAILED',
);

export const {
	execute: loadConversation,
	completed: loadConversationComplete,
	failed: loadConversationFailed,
} = makeCommunicationActionCreators<NS.ILoadConversation, NS.ILoadConversationSuccess, NS.ILoadConversationFailed>(
	'NPO_CHAT:LOAD_CONVERSATION',
	'NPO_CHAT:LOAD_CONVERSATION_SUCCESS',
	'NPO_CHAT:LOAD_CONVERSATION_FAILED',
);

export const {
	execute: sendMessage,
	completed: sendMessageComplete,
	failed: sendMessageFailed,
} = makeCommunicationActionCreators<NS.ISendMessage, NS.ISendMessageSuccess, NS.ISendMessageFailed>(
	'NPO_CHAT:SEND_MESSAGE',
	'NPO_CHAT:SEND_MESSAGE_SUCCESS',
	'NPO_CHAT:SEND_MESSAGE_FAILED',
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
	'NPO_CHAT:SET_CURRENT_CONVERSATION',
	'NPO_CHAT:SET_CURRENT_CONVERSATION_SUCCESS',
	'NPO_CHAT:SET_CURRENT_CONVERSATION_FAILED',
);

export const {
	execute: fetchChatHistory,
	completed: fetchChatHistoryComplete,
	failed: fetchChatHistoryFailed,
} = makeCommunicationActionCreators<NS.IFetchChatHistory, NS.IFetchChatHistorySuccess, NS.IFetchChatHistoryFailed>(
	'NPO_CHAT:FETCH_HISTORY',
	'NPO_CHAT:FETCH_HISTORY_SUCCESS',
	'NPO_CHAT:FETCH_HISTORY_FAILED',
);

export const {
	execute: chatStatePrepare,
	completed: chatStatePrepareComplete,
	failed: chatStatePrepareFailed,
} = makeCommunicationActionCreators<NS.IChatStatePrepare, NS.IChatStatePrepareSuccess, NS.IChatStatePrepareFailed>(
	'NPO_CHAT:CHAT_STATE_PREPARE',
	'NPO_CHAT:CHAT_STATE_PREPARE_SUCCESS',
	'NPO_CHAT:CHAT_STATE_PREPARE_FAILED',
);
