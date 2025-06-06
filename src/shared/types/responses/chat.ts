import { IOpportunityTagItem } from 'shared/types/responses/npo';
import { ILocation } from 'shared/types/responses/shared';

export type TMessageType =
	| 'MESSAGE_STANDARD'
	| 'MESSAGE_VOLUNTEER_REQUEST_PROFILE'
	| 'MESSAGE_VOLUNTEER_REQUEST_ACCEPTANCE'
	| 'MESSAGE_EVENT_CREATED'
	| 'MESSAGE_HOURS_REQUESTED'
	| 'MESSAGE_HOURS_ACCEPTED'
	| 'MESSAGE_HOURS_DECLINED';

export interface IVolunteerProfileField {
	field: string;
	id?: string;
	privacy: number;
	value: string;
}

export interface IVolunteerRequestProfileMessage {
	dateOfBirth: string;
	firstName: string;
	lastName: string;
	location: ILocation;
	message: string;
	previousExperience: {
		count: number;
	};
	profile: IVolunteerProfileField[];
	profilePicture: string;
	tags: IOpportunityTagItem[];
	userId: string;
}

export interface IStandardMessage {
	text: string;
}

export interface IRequestHoursMessage {
	accepted: boolean;
	declined: boolean;
	description: string;
	id: string;
	opportunityId: string;
	requestedHours: number;
	volunteerId: string;
}

export interface IConversationMessageResponseItem {
	id: string;
	body: object;
	conversationId: string;
	edited: boolean;
	editedTimestamp: string;
	senderId: string;
	senderPerspective: number;
	timestamp: string;
	sender: {
		firstName: string;
		lastName: string;
		profilePicture: string;
	};
	type: TMessageType;
}

export interface IConversationMessagesResponse {
	messages: IConversationMessageResponseItem[];
	pages: number;
	totalResults: number;
}

export interface IConversationMessagesResponseExtended extends IConversationMessagesResponse {
	page: number;
	perPage: number;
	offset: number;
}

export interface IMembershipRequestResponse {
	accepted: boolean;
	id: string;
	opportunityId: string;
	volunteerID: string;
}

export interface IAcceptanceMember {
	firstName: string;
	id: string;
	lastName: string;
}

export interface IVolunteerRequestAcceptance {
	accepter: IAcceptanceMember;
	opportunityId: string;
	opportunityTitle: string;
	volunteer: IAcceptanceMember;
}

export interface IConversationResponse {
	creatorId: string;
	id: string;
	lastMessage: IConversationMessageResponseItem;
	membershipRequests: IMembershipRequestResponse[];
	name: string;
	organizationID: string;
	profilePicture: string;
	type: number;
	unreadCount: number;
}
