import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';
import { IConversationMessageResponseItem, IConversationResponse } from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { ICommunication } from 'shared/types/redux';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
	return state.volunteerChat;
}

export function selectCommunication(
	state: IAppReduxState,
	action: keyof NS.IReduxState['communications'],
): ICommunication {
	return getFeatureState(state).communications[action];
}

export function selectConversations(state: IAppReduxState): IConversationResponseItem[] {
	return getFeatureState(state).data.conversations;
}

export function selectCurrentConversation(state: IAppReduxState): IConversationResponseItem | null {
	return getFeatureState(state).data.currentConversation;
}

export function selectCurrentConversationMessages(state: IAppReduxState): IConversationMessageResponseItem[] {
	return getFeatureState(state).data.currentConversationMessages;
}

export function selectConversationItem(state: IAppReduxState): IConversationResponse | null {
	return getFeatureState(state).data.conversationItem;
}

export function selectTotalMessagesCount(state: IAppReduxState): number {
	return getFeatureState(state).data.totalMessagesCount;
}

export function selectServiceIsReady(state: IAppReduxState): boolean {
	return getFeatureState(state).data.serviceIsReady;
}
