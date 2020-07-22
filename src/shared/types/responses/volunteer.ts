import { IOpportunityResponse } from 'shared/types/responses/npo';

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
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  profile: string[]; // What we will have there in future?
  tags: string[];
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
