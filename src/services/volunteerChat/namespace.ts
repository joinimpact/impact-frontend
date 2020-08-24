import {
  IConversationMessageResponseItem,
  IConversationMessagesResponseExtended,
  IConversationResponse,
} from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communications: {
    loadConversation: ICommunication;
    loadConversations: ICommunication;
    sendMessage: ICommunication;
    setCurrentConversation: ICommunication;
    fetchChatHistory: ICommunication;
  };
  data: {
    conversations: IConversationResponseItem[];
    currentConversation: IConversationResponseItem | null;
    conversationItem: IConversationResponse | null;
    currentConversationMessages: IConversationMessageResponseItem[];
    totalMessagesCount: number;
    serviceIsReady: boolean;
  };
}

export type ILoadConversations = IPlainAction<'VOLUNTEER_CHAT:LOAD_CONVERSATIONS'>;
export type ILoadConversationsSuccess = IAction<'VOLUNTEER_CHAT:LOAD_CONVERSATIONS_SUCCESS', IConversationResponseItem[]>;
export type ILoadConversationsFailed = IPlainFailAction<'VOLUNTEER_CHAT:LOAD_CONVERSATIONS_FAILED'>;

export type ILoadConversation = IAction<'VOLUNTEER_CHAT:LOAD_CONVERSATION', string>;
export type ILoadConversationSuccess = IAction<'VOLUNTEER_CHAT:LOAD_CONVERSATION_SUCCESS', IConversationResponse>;
export type ILoadConversationFailed = IPlainFailAction<'VOLUNTEER_CHAT:LOAD_CONVERSATION_FAILED'>;

export type ISetCurrentConversation = IAction<'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION', IConversationResponseItem>;
export type ISetCurrentConversationSuccess = IPlainAction<'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION_SUCCESS'>;
export type ISetCurrentConversationFailed = IPlainFailAction<'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION_FAILED'>;

export type ISetCurrentConversationMessages = IAction<
  'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION_MESSAGES',
  IConversationMessagesResponseExtended
  >;
export type IResetCurrentConversationMessages = IPlainAction<'VOLUNTEER_CHAT:RESET_CURRENT_CONVERSATION_MESSAGES'>;

export interface ISendMessageProps {
  conversationId: string;
  message: string;
}

export type ISendMessage = IAction<'VOLUNTEER_CHAT:SEND_MESSAGE', ISendMessageProps>;
export type ISendMessageSuccess = IPlainAction<'VOLUNTEER_CHAT:SEND_MESSAGE_SUCCESS'>;
export type ISendMessageFailed = IPlainFailAction<'VOLUNTEER_CHAT:SEND_MESSAGE_FAILED'>;

export type IAddChatMessage = IAction<'VOLUNTEER_CHAT:ADD_CHAT_MESSAGE', IConversationMessageResponseItem>;

interface IFetchChatHistoryProps {
  startIndex: number;
  stopIndex: number;
}

export type IFetchChatHistory = IAction<'VOLUNTEER_CHAT:FETCH_HISTORY', IFetchChatHistoryProps>;
export type IFetchChatHistorySuccess = IAction<
  'VOLUNTEER_CHAT:FETCH_HISTORY_SUCCESS',
  IConversationMessagesResponseExtended
  >;
export type IFetchChatHistoryFailed = IPlainFailAction<'VOLUNTEER_CHAT:FETCH_HISTORY_FAILED'>;


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
  | IFetchChatHistoryFailed;
