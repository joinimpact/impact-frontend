import { IOpportunityResponse } from 'shared/types/responses/npo';
import { IConversationMessageResponseItem, IVolunteerProfileField } from 'shared/types/responses/chat';
import { IServerResponseLocation, IServerResponseTagItem } from 'shared/types/responses/shared';

export interface IUserTagItemResponse {
  id: string;
  name: string;
}

export interface IUploadUserLogoResponse {
  profilePicture: string;
  success: boolean;
}

export interface ILoadUserTagsResponse {
  tags: IUserTagItemResponse[];
}

export interface ILoadTagsResponse {
  tags: ITagItemResponse[];
}

export interface ITagItemResponse {
  Model: {
    id: number;
  };
  category: number;
  name: string;
}

export interface ITagsResponse {
  tags: ITagItemResponse[];
}

export interface IUserProfileResponse {
  id: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  since?: string;
  lastOnline: string;
  location: IServerResponseLocation;
  profile: IVolunteerProfileField[];
  tags: IServerResponseTagItem[];
  profilePicture: string;
}

export interface IRequestOpportunityMembershipResponse {
  conversationId: string;
  success: boolean;
}

export interface IBrowseRecommendedSectionResponseItem {
  name: string;
  tag: string;
  opportunities: IOpportunityResponse[];
}

export interface IBrowseRecommendedOpportunitiesResponse {
  sections: IBrowseRecommendedSectionResponseItem[];
}

export interface IEventUserResponse {
  eventId: string;
  id: string;
  response: number; // 1 or 2
  userId: string;
}

export interface IConversationResponseItem {
  creatorId: number;
  id: string;
  name: string;
  organizationId: string;
  profilePicture: string;
  type: number;
  lastMessage: IConversationMessageResponseItem;
  unreadCount: number;
}
