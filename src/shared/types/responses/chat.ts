import { IOpportunityTagItem } from 'shared/types/responses/npo';

export type TMessageType =
  | 'MESSAGE_STANDARD'
  | 'MESSAGE_VOLUNTEER_REQUEST_PROFILE'
  | 'MESSAGE_VOLUNTEER_REQUEST_ACCEPTANCE'
  | 'MESSAGE_EVENT_CREATED'
  | 'MESSAGE_HOURS_REQUESTED'
  | 'MESSAGE_HOURS_ACCEPTED'
  | 'MESSAGE_HOURS_DECLINED';

export interface IVolunteerRequestProfileMessage {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  previousExperience: {
    count: number;
  };
  profile: string[];
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
  body: object;
  conversationId: string;
  edited: boolean;
  editedTimestamp: string;
  id: string;
  senderId: string;
  senderPerspective: number;
  timestamp: string;
  type: TMessageType;
}

export interface IMembershipRequestResponse {
  accepted: boolean;
  id: string;
  opportunityId: string;
  volunteerID: string;
}

export interface IConversationResponse {
  creatorId: number;
  id: string;
  lastMessage: IConversationMessageResponseItem;
  membershipRequests: IMembershipRequestResponse[];
  name: string;
  organizationID: string;
  profilePicture: string;
  type: number;
  unreadCount: number;
}
