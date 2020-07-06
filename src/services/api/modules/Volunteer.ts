import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ISaveVolunteerPersonalInfoRequest } from 'shared/types/requests/auth';
import {
  ILoadUserTagsResponse,
  ITagsResponse,
  IUploadUserLogoResponse,
  IUserProfileResponse,
} from 'shared/types/responses/volunteer';
import {
  converServerUser,
  convertTagsResponseToStringsArray,
  convertUserTagsToRequest,
} from 'services/api/converters/volunteer';
import { ISaveVolunteerAreasOfInterestRequest } from 'shared/types/requests/volunteers';
import { IUser } from 'shared/types/models/user';

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
    try {
      const response = await this.actions.get<ILoadUserTagsResponse>(`/api/v1/users/${userId}/tags`);
      return response.data;
    } catch (error) {
      console.error(error);
    }

    return {
      tags: [
        { name: 'Advocacy & Human Rights', id: '123' },
        { name: 'Animals', id: '123' },
        { name: 'Faith-Based', id: '123' },
        { name: 'Immigrants and Refugees', id: '123' },
        { name: 'Justice and Legal', id: '123' },
        { name: 'LGBTQ+', id: '123' },
        { name: 'People with Disabilities', id: '123' },
        { name: 'Politics', id: '123' },
        { name: 'Veterans and Military Families', id: '123' },
        { name: 'Women', id: '123' },
      ],
    };
  }

  @bind
  public async loadUser(): Promise<IUser> {
    const response = await this.actions.get<{ data: IUserProfileResponse }>('/api/v1/users/me');
    return converServerUser(response.data.data);
  }
}

export default VolunteerApi;
