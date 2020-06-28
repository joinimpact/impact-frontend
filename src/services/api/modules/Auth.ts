import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ILoginCredentials } from 'shared/types/models/auth';
import { ILoginResponse, IRegisterResponse } from 'shared/types/responses/auth';
import {
  ICreateAccountRequest,
  ICreatePasswordRequest,
  IRecoveryPasswordRequest,
  IResetPasswordRequest,
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
  public async createAccount(request: ICreateAccountRequest): Promise<IRegisterResponse> {
    const response = await this.actions.post<IRegisterResponse>('/api/v1/auth/register', request);
    return response.data;
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
}

export default AuthApi;
