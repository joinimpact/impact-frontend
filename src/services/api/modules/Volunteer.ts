import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ISaveVolunteerAreasOfInterestRequest, ISaveVolunteerPersonalInfoRequest } from 'shared/types/requests/auth';

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
}

export default VolunteerApi;
