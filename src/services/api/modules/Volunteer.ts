import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ISaveVolunteerPersonalInfoRequest } from 'shared/types/requests/auth';
import {
  IBrowseRecommendedOpportunitiesResponse,
  ILoadUserTagsResponse,
  IRequestOpportunityMembershipResponse,
  ITagsResponse,
  IUploadUserLogoResponse,
  IUserProfileResponse,
} from 'shared/types/responses/volunteer';
import {
  converServerUser,
  convertTagsResponseToStringsArray,
  convertUserTagsToRequest,
} from 'services/api/converters/volunteer';
import {
  IBrowseOpportunitiesRequest,
  IRequestOpportunityMembershipRequest,
  ISaveVolunteerAreasOfInterestRequest,
} from 'shared/types/requests/volunteers';
import { IUser } from 'shared/types/models/user';
import { IOpportunityResponse } from 'shared/types/responses/npo';

class VolunteerApi extends BaseApi {
  @bind
  public async saveVolunteerPersonalInfo(userId: string, request: ISaveVolunteerPersonalInfoRequest): Promise<void> {
    await this.actions.patch(`/api/v1/users/${userId}`, request);
  }

  @bind
  public async uploadVolunteerLogo(
    userId: string,
    file: File,
    setUploadProgress: (progress: number) => void,
  ): Promise<IUploadUserLogoResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.actions.post<{ data: IUploadUserLogoResponse }>(
      `/api/v1/users/${userId}/profile-picture`,
      formData,
      {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(percent);
        },
      } as any,
    );

    return response.data.data;
  }

  @bind
  public async saveVolunteerAreasOfInterest(
    userId: string,
    request: ISaveVolunteerAreasOfInterestRequest,
  ): Promise<void> {
    await this.actions.post(`/api/v1/users/${userId}/tags`, convertUserTagsToRequest(request));
  }

  @bind
  public async loadTags(): Promise<string[]> {
    const response = await this.actions.get<{ data: ITagsResponse }>(`/api/v1/tags`);

    if (!response.data.data.tags.length) {
      // This is mock data, we need to delete it after release
      return [
        'Advocacy & Human Rights',
        'Animals',
        'Arts and Culture',
        'Children and Youth',
        'Community',
        'Computers and Technology',
        'Education and Literacy',
        'Health and Medicine',
        'Seniors',
        'Board Development',
        'Crisis Support',
        'Disaster Relief',
        'Emergency and Safety',
        'Employment',
        'Environment',
        'Faith-Based',
        'Homeless and Housing',
        'Hunger',
        'Immigrants and Refugees',
        'International',
        'Justice and Legal',
        'LGBTQ+',
        'Media and Broadcasting',
        'People with Disabilities',
        'Politics',
        'Race and Ethnicity',
        'Sports and Recreation',
        'Veterans and Military Families',
        'Women',
      ];
    }
    return convertTagsResponseToStringsArray(response.data.data);
  }

  @bind
  public async loadUserTags(userId: string): Promise<ILoadUserTagsResponse> {
    const response = await this.actions.get<ILoadUserTagsResponse>(`/api/v1/users/${userId}/tags`);
    return response.data;
  }

  @bind
  public async loadUser(): Promise<IUser> {
    const response = await this.actions.get<{ data: IUserProfileResponse }>('/api/v1/users/me');
    return converServerUser(response.data.data);
  }

  @bind
  public async applyForOpportunity(
    opportunityId: string,
    request: IRequestOpportunityMembershipRequest,
  ): Promise<IRequestOpportunityMembershipResponse> {
    const response = await this.actions.post<{ data: IRequestOpportunityMembershipResponse }>(
      `/api/v1/opportunities/${opportunityId}/request`,
      request,
    );
    return response.data.data;
  }

  @bind
  public async browseOpportunities(request: IBrowseOpportunitiesRequest): Promise<IOpportunityResponse[]> {
    const response = await this.actions.post<{ data: { opportunities: IOpportunityResponse[] } }>(
      `/api/v1/browse/query`,
      request,
    );
    return response.data.data.opportunities;
  }

  @bind
  public async browseOpportunitiesWithoutFilters(): Promise<IBrowseRecommendedOpportunitiesResponse> {
    const response = await this.actions.get<{ data: IBrowseRecommendedOpportunitiesResponse }>('/api/v1/browse');
    return response.data.data;
  }

  @bind
  public async loadOpportunities(userId: string): Promise<IOpportunityResponse[]> {
    const response = await this.actions.get<{ data: { opportunities: IOpportunityResponse[] } }>(
      `/api/v1/users/${userId}/opportunities`,
    );
    return response.data.data.opportunities;
  }
}

export default VolunteerApi;
