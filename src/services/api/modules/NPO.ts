import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import {
  ICreateOrganizationRequest,
  ISaveOrganizationMembersRequest,
  ISaveOrganizationTagsRequest,
} from 'shared/types/requests/auth';
import {
  ICreateOrganizationResponse,
  IEventResponsesResponse,
  INewOpportunityResponse,
  INPOTagsResponse,
  IOpportunityResponse,
  IOrganizationsResponseItem,
  IServerOrganizationResponseItem,
  IServerUserOrganizationsResponse,
  IUploadNPOLogoResponse,
  IUserOrganizationsResponse,
  IVolunteersResponse,
} from 'shared/types/responses/npo';
import {
  IEventRequestItem,
  ILoadOpportunitiesRequestParams,
  IUpdateOpportunityRequest,
} from 'shared/types/requests/npo';
import { IAbstractFileResponse, ISuccessResponse } from 'shared/types/responses/shared';
import { IEventResponseItem } from 'shared/types/responses/events';
import {
  IConversationMessagesResponse,
  IConversationMessagesResponseExtended,
  IConversationResponse,
} from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { convertChatHistoryResponseToExtended } from 'services/api/converters/chat';
import { CHAT_FRAME_SIZE } from 'shared/types/constants';

class NPOApi extends BaseApi {
  @bind
  public async createOrganization(request: ICreateOrganizationRequest): Promise<ICreateOrganizationResponse> {
    const response = await this.actions.post<{ data: ICreateOrganizationResponse }>('/api/v1/organizations', request);
    return response.data.data;
  }

  @bind
  public async updateOrganization(organizationId: string, request: ICreateOrganizationRequest): Promise<void> {
    await this.actions.patch(`/api/v1/organizations/${organizationId}`, request);
  }

  @bind
  public async loadOrganization(organizationId: string): Promise<IOrganizationsResponseItem> {
    const response = await this.actions.get<{ data: IServerOrganizationResponseItem }>(
      `/api/v1/organizations/${organizationId}`,
    );
    return {
      ...response.data.data,
      tags: Array.isArray(response.data.data.tags)
        ? response.data.data.tags.map(tag => tag.name)
        : response.data.data.tags,
    };
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
    const response = await this.actions.get<{ data: IServerUserOrganizationsResponse }>(
      '/api/v1/users/me/organizations',
    );
    return {
      organizations: {
        ...response.data.data.organizations.map(org => {
          return {
            ...org,
            tags: Array.isArray(org.tags) ? org.tags.map(tag => tag.name) : org.tags,
          };
        }),
      },
    };
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
    params: ILoadOpportunitiesRequestParams | void,
  ): Promise<IOpportunityResponse[]> {
    const response = await this.actions.get<{ data: { opportunities: IOpportunityResponse[] } }>(
      `/api/v1/organizations/${orgId}/opportunities`,
      {
        page: params ? params.page : 0,
        limit: params ? params.limit : 100,
      } as ILoadOpportunitiesRequestParams,
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
  public async createNewEvent(opportunityId: string, request: IEventRequestItem): Promise<void> {
    await this.actions.post(`/api/v1/opportunities/${opportunityId}/events`, request);
  }

  @bind
  public async updateEvent(eventId: string, request: IEventRequestItem): Promise<void> {
    await this.actions.patch(`/api/v1/events/${eventId}`, request);
  }

  @bind
  public async loadOpportunityEvents(opportunityId: string): Promise<IEventResponseItem[]> {
    const response = await this.actions.get<{ data: { events: IEventResponseItem[] } }>(
      `/api/v1/opportunities/${opportunityId}/events`,
    );
    return response.data.data.events;
  }

  @bind
  public async deleteEvent(eventId: string): Promise<void> {
    await this.actions.del(`/api/v1/events/${eventId}`);
  }

  @bind
  public async loadEventResponses(eventId: string): Promise<IEventResponsesResponse[]> {
    const response = await this.actions.get<{ data: { responses: IEventResponsesResponse[] } }>(
      `/api/v1/events/${eventId}/responses`,
    );
    return response.data.data.responses;
  }

  @bind
  public async loadConversations(organizationId: string): Promise<IConversationResponseItem[]> {
    const response = await this.actions.get<{ data: { conversations: IConversationResponseItem[] } }>(
      `/api/v1/organizations/${organizationId}/conversations`,
    );
    return response.data.data.conversations;
  }

  @bind
  public async loadConversation(organizationId: string, conversationId: string): Promise<IConversationResponse> {
    const response = await this.actions.get<{ data: IConversationResponse }>(
      `/api/v1/organizations/${organizationId}/conversations/${conversationId}`,
    );
    return response.data.data;
  }

  @bind
  public async sendMessage(organizationId: string, conversationId: string, message: string): Promise<void> {
    await this.actions.post(`/api/v1/organizations/${organizationId}/conversations/${conversationId}/messages`, {
      body: {
        text: message,
      },
    });
  }

  @bind
  public async loadConversationMessages(
    organizationId: string,
    conversationId: string,
    page: number = 0,
    limit: number = CHAT_FRAME_SIZE,
  ): Promise<IConversationMessagesResponseExtended> {
    const response = await this.actions.get<{ data: IConversationMessagesResponse }>(
      `/api/v1/organizations/${organizationId}/conversations/${conversationId}/messages`,
      { page, limit },
    );
    // Sorting response messages by date end extends response with page and frameSize
    return convertChatHistoryResponseToExtended(response.data.data, page, limit);
  }

  @bind
  public async acceptHours(organizationId: string, requestId: string): Promise<void> {
    await this.actions.post(`/api/v1/organizations/${organizationId}/hours/requests/${requestId}/accept`);
  }

  @bind
  public async declineHours(organizationId: string, requestId: string): Promise<void> {
    await this.actions.post(`/api/v1/organizations/${organizationId}/hours/requests/${requestId}/decline`);
  }
}

export default NPOApi;
