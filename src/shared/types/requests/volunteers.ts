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
