import { IOpportunityResponse } from 'shared/types/responses/npo';

export const emptyOpportunity: IOpportunityResponse = {
  id: '',
  creatorId: '',
  description: '',
  title: '',
  organizationId: '',
  profilePicture: '',
  tags: [],
  public: false,
  limits: {
    volunteersCap: {
      active: false,
      cap: 0,
    },
  },
  requirements: {
    ageLimit: {
      active: false,
      from: 0,
      to: 0,
    },
    expectedHours: {
      active: false,
      hours: 0,
    },
  },
  stats: {
    volunteersEnrolled: 0,
    volunteersPending: 0,
  },
};
