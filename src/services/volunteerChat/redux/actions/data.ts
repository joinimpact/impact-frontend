import * as NS from '../../namespace';
import { IConversationMessageResponseItem, IConversationMessagesResponseExtended } from 'shared/types/responses/chat';

export function setCurrentConversationMessages(
	response: IConversationMessagesResponseExtended,
): NS.ISetCurrentConversationMessages {
	return { payload: response, type: 'VOLUNTEER_CHAT:SET_CURRENT_CONVERSATION_MESSAGES' };
}

export function resetCurrentConversationMessages(): NS.IResetCurrentConversationMessages {
	return { type: 'VOLUNTEER_CHAT:RESET_CURRENT_CONVERSATION_MESSAGES' };
}

export function addChatMessage(message: IConversationMessageResponseItem): NS.IAddChatMessage {
	return { payload: message, type: 'VOLUNTEER_CHAT:ADD_CHAT_MESSAGE' };
}
