import { IUpdateOpportunityRequest } from 'shared/types/requests/npo';
import { IOpportunityResponse } from 'shared/types/responses/npo';

// tslint:disable-next-line:max-line-length
export function convertUpdateOpportunityRequestToResponseType(request: IUpdateOpportunityRequest, id: string, tags: string[]): IOpportunityResponse {
  return {
    id,
    organizationId: '',
    creatorId: '',
    title: request.title,
    description: request.description,
    public: false,
    profilePicture: '',
    colorIndex: 0,
    organization: {
      id: '',
      name: '',
      profilePicture: '',
    },
    location: {
      city: {
        shortName: 'Moscow',
        longName: 'MSK',
      },
      country: {
        shortName: 'Russia',
        longName: 'Russia'
      },
      state: {
        shortName: 'Moscow',
        longName: 'Moscow'
      },
    },
    tags: tags.map(tag => ({
      category: 0,
      id: '',
      name: tag,
    })),
    limits: {
      volunteersCap: {
        active: request.limits.volunteersCap.active,
        cap: request.limits.volunteersCap.cap,
      }
    },
    requirements: {
      ageLimit: {
        active: request.requirements.ageLimit.active,
        to: request.requirements.ageLimit.to,
        from: request.requirements.ageLimit.from,
      },
      expectedHours: {
        active: request.requirements.expectedHours.active,
        hours: request.requirements.expectedHours.hours,
      },
    },
    stats: {
      volunteersPending: 0,
      volunteersEnrolled: 0,
    },
  };
}
