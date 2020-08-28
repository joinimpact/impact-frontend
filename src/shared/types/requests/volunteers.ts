export interface ISaveVolunteerAreasOfInterestRequest {
  tags: string[];
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
  location?: {
    lat: number;
    long: number;
  };
  commitmentRange?: {
    min: number;
    max: number;
  };
}

export interface IRequestHoursRequest {
  hours: number;
  description: string;
}
