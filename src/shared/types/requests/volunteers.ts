export interface ISaveVolunteerAreasOfInterestRequest {
  areas: string[];
}

export interface ISaveUserTagsRequestItem {
  name: string;
}

export interface ISaveUserTagsReqest {
  tags: ISaveUserTagsRequestItem[];
}

export interface IRequestOpportunityMembershipRequest {
  message: string;
}

export interface IBrowseOpportunitiesRequest {
  textQuery?: string;
  ageRange?: {
    age: number;
  };
  commitmentRange?: {
    min: number;
    max: number;
  };
}
