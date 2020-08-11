import * as NS from '../../namespace';
import { IConversationMessageResponseItem } from 'shared/types/responses/chat';

export function setUploadLogoProgress(progress: number | null): NS.ISetUploadLogoProgress {
  return { payload: progress, type: 'VOLUNTEER:SET_UPLOAD_LOGO_PROGRESS' };
}

export function requestApplyOpportunity(opportunityId: string): NS.IRequestApplyOpportunity {
  return { payload: opportunityId, type: 'VOLUNTEER:REQUEST_APPLY_OPPORTUNITY' };
}

export function resetRequestApplyOpportunity(): NS.IResetRequestApplyOpportunity {
  return { type: 'VOLUNTEER:RESET_REQUEST_APPLY_OPPORTUNITY' };
}

export function showShareOpportunityModal(): NS.IShowShareOpportunityModal {
  return { type: 'VOLUNTEER:SHOW_OPPORTUNITY_MODAL' };
}

export function closeShareOpportunityModal(): NS.ICloseShareOpportunityModal {
  return { type: 'VOLUNTEER:CLOSE_SHARE_OPPORTUNITY_MODAL' };
}

export function resetMyResponseToEvent(): NS.IResetMyResponseToEvent {
  return { type: 'VOLUNTEER:RESET_MY_RESPONSE_TO_EVENT' };
}

export function setCurrentConversationMessages(
  messages: IConversationMessageResponseItem[],
): NS.ISetCurrentConversationMessages {
  return { payload: messages, type: 'VOLUNTEER:SET_CURRENT_CONVERSATION_MESSAGES' };
}

export function resetCurrentConversationMessages(): NS.IResetCurrentConversationMessages {
  return { type: 'VOLUNTEER:RESET_CURRENT_CONVERSATION_MESSAGES' };
}
