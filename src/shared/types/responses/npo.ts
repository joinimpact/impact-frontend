export interface ICreateOrganizationResponse {
  organizationId: string;
}

export interface IUploadNPOLogoResponse {
  profilePicture: string;
  success: boolean;
}

export interface INPOTagItem {
  id: string;
  name: string;
}

export interface INPOTagsResponse {
  tags: INPOTagItem[];
}

export interface IOrganizationsResponseItem {
  creatorId: string;
  description: string;
  id: string;
  name: string;
  profile: string[];
  profilePicture: string;
  tags: string[];
  websiteURL: string;
}

export interface IUserOrganizationsResponse {
  organizations: IOrganizationsResponseItem[];
}

export interface INewOpportunityResponse {
  success: boolean;
  opportunityId: string;
}

export interface IOpportunityTagItem {
  category: number;
  id: string;
  name: string;
}

export interface IOpportunityResponse {
  id: string;
  organizationId: string;
  creatorId: string;
  profilePicture: string;
  title: string;
  description: string;
  public: boolean;
  tags: IOpportunityTagItem[];
  stats: {
    volunteersEnrolled: number;
    volunteersPending: number;
  };
  requirements: {
    ageLimit: {
      active: boolean;
      from: number;
      to: number;
    };
    expectedHours: {
      active: boolean;
      hours: number;
    };
  };
  limits: {
    volunteersCap: {
      active: boolean;
      cap: number;
    };
  };
}

export interface IUploadOpportunityLogoResponse {
  profilePicture: string;
  success: boolean;
}
