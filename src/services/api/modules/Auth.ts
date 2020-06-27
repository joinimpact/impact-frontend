import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ILoginCredentials } from 'shared/types/models/auth';
import { ILoginResponse } from 'shared/types/responses/auth';
import {
  ICreateAccountRequest,
  ICreateOrganizationRequest,
  ICreatePasswordRequest,
  IRecoveryPasswordRequest,
  IResetPasswordRequest, ISaveOrganizationMembersRequest,
  ISaveOrganizationTagsRequest, ISaveVolunteerAreasOfInterestRequest, ISaveVolunteerPersonalInfoRequest,
} from 'shared/types/requests/auth';

class AuthApi extends BaseApi {
  @bind
  public async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
    try {
      const response = await this.actions.post<ILoginResponse>(`/api/v1/auth/login`, credentials);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return {
      id: Math.floor(Math.random() * 10000),
    };
  }

  @bind
  public async logout(): Promise<void> {
    try {
      await this.actions.post('/api/v1/logout');
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async resetPassword(request: IResetPasswordRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/reset-password', request);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async recoveryPassword(request: IRecoveryPasswordRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/recovery-password', request);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async createOrganization(request: ICreateOrganizationRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/create-organization');
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async createAccount(request: ICreateAccountRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/create-account', request);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async createPassword(request: ICreatePasswordRequest): Promise<void> {
    try {
      await this.actions.post('/api/v1/create-password', request);
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

export default AuthApi;
