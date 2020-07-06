import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import {
  ICreateOrganizationRequest,
  ISaveOrganizationMembersRequest,
  ISaveOrganizationTagsRequest,
} from 'shared/types/requests/auth';
import { ICreateOrganizationResponse, INPOTagsResponse, IUploadNPOLogoResponse } from 'shared/types/responses/npo';

class NPOApi extends BaseApi {
  @bind
  public async createOrganization(request: ICreateOrganizationRequest): Promise<ICreateOrganizationResponse> {
    const response = await this.actions.post<{ data: ICreateOrganizationResponse }>('/api/v1/organizations', request);
    return response.data.data;
  }

  @bind
  public async uploadOrgLogo(
    orgId: string,
    file: File,
    setUploadProgress: (progress: number) => void,
  ): Promise<IUploadNPOLogoResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.actions.post<{ data: IUploadNPOLogoResponse }>(
      `/api/v1/organizations/${orgId}/profile-picture`,
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
  public async loadOrganizationTags(orgId: string): Promise<INPOTagsResponse> {
    const response = await this.actions.get<INPOTagsResponse>(`/api/v1/organizations/${orgId}/tags`);
    return response.data;
  }

  @bind
  public async saveOrganizationTags(orgId: string, request: ISaveOrganizationTagsRequest): Promise<void> {
    await this.actions.post(`/api/v1/organizations/${orgId}/tags`, request);
  }

  @bind
  public async saveOrganizationMembers(orgId: string, request: ISaveOrganizationMembersRequest): Promise<void> {
    await this.actions.post(`/api/v1/organizations/${orgId}/invite`, request);
  }
}

export default NPOApi;
