import * as NS from '../../namespace';
import initial from '../initial';
import { makePartialFilledArray } from 'shared/helpers/chat';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
	switch (action.type) {
		case 'NPO_CHAT:LOAD_CONVERSATIONS_SUCCESS':
			return {
				...state,
				conversations: action.payload,
				serviceIsReady: true,
			};
		case 'NPO_CHAT:SET_CURRENT_CONVERSATION_MESSAGES':
			return {
				...state,
				// messages should have enough cells
				currentConversationMessages: makePartialFilledArray(
					action.payload.messages,
					action.payload.offset,
					state.currentConversationMessages,
					action.payload.totalResults,
				),
				totalMessagesCount: action.payload.totalResults,
			};
		case 'NPO_CHAT:FETCH_HISTORY_SUCCESS':
			return {
				...state,
				currentConversationMessages: [
					...makePartialFilledArray(
						action.payload.messages,
						action.payload.offset,
						state.currentConversationMessages,
						action.payload.totalResults,
					),
				],
				totalMessagesCount: action.payload.totalResults,
			};
		case 'NPO_CHAT:ADD_CHAT_MESSAGE':
			return {
				...state,
				currentConversationMessages: [...state.currentConversationMessages, action.payload],
			};
		case 'NPO_CHAT:SET_CURRENT_CONVERSATION':
			return {
				...state,
				conversationItem: null,
				currentConversation: action.payload,
				currentConversationMessages: [],
				// currentConversationOpportunity: state.organizationOpportunities.find(opportunity => opportunity.id === '0'),
			};
		case 'NPO_CHAT:RESET_CURRENT_CONVERSATION_MESSAGES':
			return {
				...state,
				currentConversationMessages: [],
			};
		case 'NPO_CHAT:LOAD_CONVERSATION_SUCCESS': {
			return {
				...state,
				conversationItem: action.payload,
			};
		}
		case 'NPO_CHAT:SET_CURRENT_CONVERSATION_OPPORTUNITY':
			return {
				...state,
				currentConversationOpportunity: action.payload,
			};
		case 'NPO_CHAT:RESET_CURRENT_CONVERSATION_OPPORTUNITY':
			return {
				...state,
				currentConversationOpportunity: null,
			};
	}
	return state;
}

export default dataReducer;
