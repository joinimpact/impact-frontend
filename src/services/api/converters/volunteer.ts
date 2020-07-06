import { ITagsResponse, IUserProfileResponse } from 'shared/types/responses/volunteer';
import { ISaveUserTagsReqest, ISaveVolunteerAreasOfInterestRequest } from 'shared/types/requests/volunteers';
import { IUser } from 'shared/types/models/user';

export function convertTagsResponseToStringsArray(response: ITagsResponse): string[] {
  return response.tags.map(tag => tag.name);
}

export function convertUserTagsToRequest(tags: ISaveVolunteerAreasOfInterestRequest): ISaveUserTagsReqest {
  return {
    tags: tags.areas.map(tag => ({
      name: tag,
    }))
  };
}

export function converServerUser(response: IUserProfileResponse): IUser {
  return {
    userId: response.id,
    firstName: response.firstName,
    lastName: response.lastName,
    since: '',
    avatarUrl: '/static/demo-avatar.png',
  };
}
