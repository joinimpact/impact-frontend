import {
	IConversationMessageResponseItem,
	IConversationMessagesResponseExtended,
	IConversationResponse,
} from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IOpportunityResponse } from 'shared/types/responses/npo';

export interface IReduxState {
	communications: {
		loadConversation: ICommunication;
		loadConversations: ICommunication;
		sendMessage: ICommunication;
		setCurrentConversation: ICommunication;
		fetchChatHistory: ICommunication;
		chatStatePrepare: ICommunication;
	};
	data: {
		conversations: IConversationResponseItem[];
		currentConversation: IConversationResponseItem | null;
		conversationItem: IConversationResponse | null;
		currentConversationMessages: IConversationMessageResponseItem[];
		totalMessagesCount: number;
		currentConversationOpportunity: IOpportunityResponse | null | undefined;
		serviceIsReady: boolean;
	};
}

export type ILoadConversations = IPlainAction<'NPO_CHAT:LOAD_CONVERSATIONS'>;
export type ILoadConversationsSuccess = IAction<'NPO_CHAT:LOAD_CONVERSATIONS_SUCCESS', IConversationResponseItem[]>;
export type ILoadConversationsFailed = IPlainFailAction<'NPO_CHAT:LOAD_CONVERSATIONS_FAILED'>;

export type ILoadConversation = IAction<'NPO_CHAT:LOAD_CONVERSATION', string>;
export type ILoadConversationSuccess = IAction<'NPO_CHAT:LOAD_CONVERSATION_SUCCESS', IConversationResponse>;
export type ILoadConversationFailed = IPlainFailAction<'NPO_CHAT:LOAD_CONVERSATION_FAILED'>;

export type ISetCurrentConversation = IAction<'NPO_CHAT:SET_CURRENT_CONVERSATION', IConversationResponseItem>;
export type ISetCurrentConversationSuccess = IPlainAction<'NPO_CHAT:SET_CURRENT_CONVERSATION_SUCCESS'>;
export type ISetCurrentConversationFailed = IPlainFailAction<'NPO_CHAT:SET_CURRENT_CONVERSATION_FAILED'>;

export type ISetCurrentConversationMessages = IAction<
'NPO_CHAT:SET_CURRENT_CONVERSATION_MESSAGES',
IConversationMessagesResponseExtended
>;
export type IResetCurrentConversationMessages = IPlainAction<'NPO_CHAT:RESET_CURRENT_CONVERSATION_MESSAGES'>;

export interface ISendMessageProps {
	conversationId: string;
	message: string;
}

export type ISendMessage = IAction<'NPO_CHAT:SEND_MESSAGE', ISendMessageProps>;
export type ISendMessageSuccess = IPlainAction<'NPO_CHAT:SEND_MESSAGE_SUCCESS'>;
export type ISendMessageFailed = IPlainFailAction<'NPO_CHAT:SEND_MESSAGE_FAILED'>;

export type IAddChatMessage = IAction<'NPO_CHAT:ADD_CHAT_MESSAGE', IConversationMessageResponseItem>;

interface IFetchChatHistoryProps {
	startIndex: number;
	stopIndex: number;
}

export type IFetchChatHistory = IAction<'NPO_CHAT:FETCH_HISTORY', IFetchChatHistoryProps>;
export type IFetchChatHistorySuccess = IAction<'NPO_CHAT:FETCH_HISTORY_SUCCESS', IConversationMessagesResponseExtended>;
export type IFetchChatHistoryFailed = IPlainFailAction<'NPO_CHAT:FETCH_HISTORY_FAILED'>;

export type IChatStatePrepare = IPlainAction<'NPO_CHAT:CHAT_STATE_PREPARE'>;
export type IChatStatePrepareSuccess = IPlainAction<'NPO_CHAT:CHAT_STATE_PREPARE_SUCCESS'>;
export type IChatStatePrepareFailed = IPlainFailAction<'NPO_CHAT:CHAT_STATE_PREPARE_FAILED'>;

export type ISetCurrentConversationOpportunity = IAction<
'NPO_CHAT:SET_CURRENT_CONVERSATION_OPPORTUNITY',
IOpportunityResponse
>;
export type IResetCurrentConversationOpportunity = IPlainAction<'NPO_CHAT:RESET_CURRENT_CONVERSATION_OPPORTUNITY'>;

export type Action =
	| ILoadConversations
	| ILoadConversationsSuccess
	| ILoadConversationsFailed
	| ILoadConversation
	| ILoadConversationSuccess
	| ILoadConversationFailed
	| ISetCurrentConversation
	| ISetCurrentConversationSuccess
	| ISetCurrentConversationFailed
	| ISetCurrentConversationMessages
	| IResetCurrentConversationMessages
	| ISendMessage
	| ISendMessageSuccess
	| ISendMessageFailed
	| IAddChatMessage
	| IFetchChatHistory
	| IFetchChatHistorySuccess
	| IFetchChatHistoryFailed
	| IChatStatePrepare
	| IChatStatePrepareSuccess
	| IChatStatePrepareFailed
	| ISetCurrentConversationOpportunity
	| IResetCurrentConversationOpportunity;
