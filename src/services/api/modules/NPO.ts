import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import {
  ICreateOrganizationRequest,
  ISaveOrganizationMembersRequest,
  ISaveOrganizationTagsRequest,
} from 'shared/types/requests/auth';
import {
  ICreateOrganizationResponse,
  INewOpportunityResponse,
  INPOTagsResponse,
  IOpportunityResponse,
  IUploadNPOLogoResponse,
  IUserOrganizationsResponse,
  IVolunteersResponse,
} from 'shared/types/responses/npo';
import {
  ICreateNewEventRequest,
  ILoadOpportunitiesRequestParams,
  IUpdateOpportunityRequest,
} from 'shared/types/requests/npo';
import { IAbstractFileResponse, ISuccessResponse } from 'shared/types/responses/shared';
import { IEventResponseItem } from 'shared/types/responses/events';

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
    const response = await this.uploadFileToEndpoint(
      `/api/v1/organizations/${orgId}/profile-picture`,
      file,
      setUploadProgress,
    );
    return response;
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

  @bind
  public async loadUserOrganizations(): Promise<IUserOrganizationsResponse> {
    const response = await this.actions.get<{ data: IUserOrganizationsResponse }>('/api/v1/users/me/organizations');
    return response.data.data;
  }

  @bind
  public async requestNewOpportunityId(orgId: string): Promise<INewOpportunityResponse> {
    const response = await this.actions.post<{ data: INewOpportunityResponse }>(
      `/api/v1/organizations/${orgId}/opportunities`,
    );
    return response.data.data;
  }

  @bind
  public async updateOpportunity(opportunityId: string, request: IUpdateOpportunityRequest): Promise<void> {
    await this.actions.patch<{ data: ISuccessResponse }>(`/api/v1/opportunities/${opportunityId}`, request);
  }

  @bind
  public async updateOpportunityTags(opportunityId: string, tags: string[]): Promise<void> {
    await this.actions.post(`/api/v1/opportunities/${opportunityId}/tags`, {
      tags: tags.map(tag => ({
        name: tag,
      })),
    });
  }

  @bind
  public async uploadOpportunityLogo(
    opportunityId: string,
    file: File,
    setUploadProgress: (progress: number) => void,
  ): Promise<IUploadNPOLogoResponse> {
    const response = await this.uploadFileToEndpoint(
      `/api/v1/opportunities/${opportunityId}/profile-picture`,
      file,
      setUploadProgress,
    );
    return response;
  }

  @bind
  public async uploadFileToEndpoint(
    url: string,
    file: File,
    setUploadProgress: (progress: number) => void,
  ): Promise<IAbstractFileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.actions.post<{ data: IAbstractFileResponse }>(url, formData, {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const percent = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadProgress(percent);
      },
    } as any);
    return response.data.data;
  }

  @bind
  public async loadOpportunities(
    orgId: string,
    params: ILoadOpportunitiesRequestParams,
  ): Promise<IOpportunityResponse[]> {
    const response = await this.actions.get<{ data: { opportunities: IOpportunityResponse[] } }>(
      `/api/v1/organizations/${orgId}/opportunities`,
      params,
    );
    // TODO: REMOVE FILTER WHEN API WILL BE FIXED
    // Filter all opportunities without title
    return response.data.data.opportunities.filter(
      opportunity => opportunity.title > '' || opportunity.profilePicture > '',
    );
    // return response.data.data.opportunities;
  }

  @bind
  public async loadOpportunity(opportunityId: string): Promise<IOpportunityResponse> {
    const response = await this.actions.get<{ data: IOpportunityResponse }>(`/api/v1/opportunities/${opportunityId}`);
    return response.data.data;
  }

  @bind
  public async deleteOpportunity(opportunityId: string): Promise<void> {
    await this.actions.del<ISuccessResponse>(`/api/v1/opportunities/${opportunityId}`);
  }

  @bind
  public async publishOpportunity(opportunityId: string): Promise<void> {
    await this.actions.post(`/api/v1/opportunities/${opportunityId}/publish`);
  }

  @bind
  public async unpublishOpportunity(opportunityId: string): Promise<void> {
    await this.actions.post(`/api/v1/opportunities/${opportunityId}/unpublish`);
  }

  @bind
  public async loadOpportunityVolunteers(opportunityId: string): Promise<IVolunteersResponse> {
    const response = await this.actions.get<{ data: IVolunteersResponse }>(
      `/api/v1/opportunities/${opportunityId}/volunteers`,
    );
    return response.data.data;
  }

  @bind
  public async acceptInvitation(opportunityId: string, userId: string): Promise<void> {
    await this.actions.post(`/api/v1/opportunities/${opportunityId}/volunteers/${userId}/accept`);
  }

  @bind
  public async declineInvitation(opportunityId: string, userId: string): Promise<void> {
    await this.actions.post(`/api/v1/opportunities/${opportunityId}/volunteers/${userId}/decline`);
  }

  @bind
  public async createNewEvent(opportunityId: string, request: ICreateNewEventRequest): Promise<void> {
    await this.actions.post(`/api/v1/opportunities/${opportunityId}/events`, request);
  }

  @bind
  public async loadOpportunityEvents(opportunityId: string): Promise<IEventResponseItem[]> {
    const response = await this.actions.get<{ data: { events: IEventResponseItem[] } }>(
      `/api/v1/opportunities/${opportunityId}/events`,
    );
    return response.data.data.events;
  }
}

export default NPOApi;
