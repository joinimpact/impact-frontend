import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ISaveVolunteerPersonalInfoRequest } from 'shared/types/requests/auth';
import {
  IBrowseRecommendedOpportunitiesResponse,
  IConversationResponseItem,
  IEventUserResponse,
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
  IBrowseOpportunitiesRequest, IRequestHoursRequest,
  IRequestOpportunityMembershipRequest,
  ISaveVolunteerAreasOfInterestRequest,
} from 'shared/types/requests/volunteers';
import { IUser } from 'shared/types/models/user';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { IEventResponseItem } from 'shared/types/responses/events';
import { CHAT_FRAME_SIZE, RESPONSE_ATTENDED, RESPONSE_DECLINED } from 'shared/types/constants';
import {
  IConversationMessagesResponse,
  IConversationMessagesResponseExtended,
  IConversationResponse,
} from 'shared/types/responses/chat';
import { convertChatHistoryResponseToExtended } from 'services/api/converters/chat';
// import { delay } from 'redux-saga';

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

  @bind
  public async loadEvents(userId: string): Promise<IEventResponseItem[]> {
    const response = await this.actions.get<{ data: { events: IEventResponseItem[] } }>(
      `/api/v1/users/${userId}/events`,
    );
    return response.data.data.events;
  }

  @bind
  public async attendEvent(userId: string, eventId: string): Promise<void> {
    await this.actions.put(`/api/v1/events/${eventId}/response`, {
      response: RESPONSE_ATTENDED,
    });
  }

  @bind
  public async declineEvent(userId: string, eventId: string): Promise<void> {
    await this.actions.put(`/api/v1/events/${eventId}/response`, {
      response: RESPONSE_DECLINED,
    });
  }

  @bind
  public async getMyResponseToEvent(eventId: string): Promise<IEventUserResponse> {
    const response = await this.actions.get<{ data: IEventUserResponse }>(`/api/v1/events/${eventId}/response`);
    return response.data.data;
  }

  @bind
  public async loadConversations(userId: string): Promise<IConversationResponseItem[]> {
    const response = await this.actions.get<{ data: { conversations: IConversationResponseItem[] } }>(
      `/api/v1/users/${userId}/conversations`,
    );
    return response.data.data.conversations;
  }

  @bind
  public async loadConversationMessages(
    userId: string,
    conversationId: string,
    page: number = 0,
    limit: number = CHAT_FRAME_SIZE,
  ): Promise<IConversationMessagesResponseExtended> {
    const response = await this.actions.get<{ data: IConversationMessagesResponse }>(
      `/api/v1/users/${userId}/conversations/${conversationId}/messages`,
      { page, limit }
    );
    // Sorting response messages by date end extends response with page and frameSize
    return convertChatHistoryResponseToExtended(response.data.data, page, limit);
  }

  @bind
  public async loadConversation(userId: string, conversationId: string): Promise<IConversationResponse> {
    const response = await this.actions.get<{ data: IConversationResponse }>(
      `/api/v1/users/${userId}/conversations/${conversationId}`,
    );
    return response.data.data;
  }

  @bind
  public async sendMessage(userId: string, conversationId: string, message: string): Promise<void> {
    await this.actions.post(`/api/v1/users/${userId}/conversations/${conversationId}/messages`, {
      body: {
        text: message,
      }
    });
  }

  @bind
  public async requestHours(organizationId: string, request: IRequestHoursRequest): Promise<void> {
    await this.actions.post(`/api/v1/organizations/${organizationId}/hours/requests`, request);
  }
}

export default VolunteerApi;
