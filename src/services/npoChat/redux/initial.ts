import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
  communications: {
    loadConversation: initialCommunicationField,
    loadConversations: initialCommunicationField,
    sendMessage: initialCommunicationField,
    setCurrentConversation: initialCommunicationField,
    fetchChatHistory: initialCommunicationField,
    chatStatePrepare: initialCommunicationField,
  },
  data: {
    conversations: [],
    currentConversation: null,
    conversationItem: null,
    currentConversationMessages: [],
    totalMessagesCount: 0,
    currentConversationOpportunity: null,
    serviceIsReady: false,
  },
};

export default initialState;
