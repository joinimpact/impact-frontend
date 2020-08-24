import * as NS from '../../namespace';
import { IConversationMessageResponseItem, IConversationMessagesResponseExtended } from 'shared/types/responses/chat';
import { IOpportunityResponse } from 'shared/types/responses/npo';

export function setCurrentConversationMessages(
  response: IConversationMessagesResponseExtended,
): NS.ISetCurrentConversationMessages {
  return { payload: response, type: 'NPO_CHAT:SET_CURRENT_CONVERSATION_MESSAGES' };
}

export function resetCurrentConversationMessages(): NS.IResetCurrentConversationMessages {
  return { type: 'NPO_CHAT:RESET_CURRENT_CONVERSATION_MESSAGES' };
}

export function addChatMessage(message: IConversationMessageResponseItem): NS.IAddChatMessage {
  return { payload: message, type: 'NPO_CHAT:ADD_CHAT_MESSAGE' };
}

export function setCurrentConversationOpportunity(
  payload: IOpportunityResponse,
): NS.ISetCurrentConversationOpportunity {
  return { payload, type: 'NPO_CHAT:SET_CURRENT_CONVERSATION_OPPORTUNITY' };
}

export function resetCurrentConversationOpportunity(): NS.IResetCurrentConversationOpportunity {
  return { type: 'NPO_CHAT:RESET_CURRENT_CONVERSATION_OPPORTUNITY' };
}
