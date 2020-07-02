import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ISaveVolunteerAreasOfInterestRequest, ISaveVolunteerPersonalInfoRequest } from 'shared/types/requests/auth';
import { ILoadTagsResponse, ITagsResponse } from 'shared/types/responses/volunteer';

class VolunteerApi extends BaseApi {
  @bind
  public async saveVolunteerPersonalInfo(request: ISaveVolunteerPersonalInfoRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/save-volunteer-personal-info', request);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async uploadVolunteerLogo(file: File, setUploadProgress: (progress: number) => void): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.actions.post<{ data: string[] }>('/api/v1/volunteer/logo', formData, {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const percent = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadProgress(percent);
      },
    } as any);

    return response.data.data[0];
  }

  @bind
  public async saveVolunteerAreasOfInterest(request: ISaveVolunteerAreasOfInterestRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/save-area-of-interests', request);
    } catch (error) {
      console.error(error);
    }
  }

  public async loadTags(): Promise<string[]> {
    const response = await this.actions.get<ITagsResponse>(`/api/v1/tags`);
    if (!response.data.data.tags.length) {
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
    return response.data.data.tags;
  }

  @bind
  public async loadUserTags(userId: string): Promise<ILoadTagsResponse> {
    try {
      const response = await this.actions.get<ILoadTagsResponse>(`/api/v1/users/${userId}/tags`);
      return response.data;
    } catch (error) {
      console.error(error);
    }

    return {
      tags: [
        { name: 'Advocacy & Human Rights', id: '123', },
        { name: 'Animals', id: '123', },
        { name: 'Faith-Based', id: '123', },
        { name: 'Immigrants and Refugees', id: '123', },
        { name: 'Justice and Legal', id: '123', },
        { name: 'LGBTQ+', id: '123', },
        { name: 'People with Disabilities', id: '123', },
        { name: 'Politics', id: '123', },
        { name: 'Veterans and Military Families', id: '123', },
        { name: 'Women', id: '123', },
      ],
    };
  }
}

export default VolunteerApi;
