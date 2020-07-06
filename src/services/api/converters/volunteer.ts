import { ITagsResponse } from 'shared/types/responses/volunteer';
import { ISaveUserTagsReqest, ISaveVolunteerAreasOfInterestRequest } from 'shared/types/requests/volunteers';

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
