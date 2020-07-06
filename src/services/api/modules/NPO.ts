import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import {
  ICreateOrganizationRequest,
  ISaveOrganizationMembersRequest,
  ISaveOrganizationTagsRequest,
} from 'shared/types/requests/auth';

class NPOApi extends BaseApi {
  @bind
  public async createOrganization(request: ICreateOrganizationRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/organizations');
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async uploadOrgLogo(file: File, setUploadProgress: (progress: number) => void): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.actions.post<{ data: string[] }>('/api/v1/org/logo', formData, {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const percent = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadProgress(percent);
      },
    } as any);
    return response.data.data[0];
  }

  @bind
  public async saveOrganizationTags(request: ISaveOrganizationTagsRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/save-organization-tags', request);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async saveOrganizationMembers(request: ISaveOrganizationMembersRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/save-organization-members');
    } catch (error) {
      console.error(error);
    }
    return;
  }
}

export default NPOApi;
