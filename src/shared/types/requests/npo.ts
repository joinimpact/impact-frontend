export interface IUpdateOpportunityRequest {
  title: string;
  description: string;
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

export interface ILoadOpportunitiesRequestParams {
  limit: number;
  page: number;
  query?: string;
}
