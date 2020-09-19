import * as NS from '../../namespace';
import initial from '../initial';
import { makePartialFilledArray } from 'shared/helpers/chat';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
	switch (action.type) {
		case 'VOLUNTEER_CHAT:LOAD_CONVERSATIONS_SUCCESS':
			return {
				...state,
				conversations: action.payload,
				serviceIsReady: true,
			};
		case 'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION_MESSAGES':
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
		case 'VOLUNTEER_CHAT:FETCH_HISTORY_SUCCESS':
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
		case 'VOLUNTEER_CHAT:ADD_CHAT_MESSAGE':
			return {
				...state,
				currentConversationMessages: [...state.currentConversationMessages, action.payload],
			};
		case 'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION':
			return {
				...state,
				currentConversation: action.payload,
				currentConversationMessages: [],
			};
		case 'VOLUNTEER_CHAT:RESET_CURRENT_CONVERSATION_MESSAGES':
			return {
				...state,
				currentConversationMessages: [],
			};
		case 'VOLUNTEER_CHAT:LOAD_CONVERSATION_SUCCESS': {
			return {
				...state,
				conversationItem: action.payload,
			};
		}
	}
	return state;
}

export default dataReducer;
