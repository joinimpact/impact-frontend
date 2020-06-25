import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ILoginCredentials } from 'shared/types/models/auth';
import { ILoginResponse } from 'shared/types/responses/auth';
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
      const response = await this.actions.post<ILoginResponse>(`/auth/login`, credentials);
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
      await this.actions.post('/logout');
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async resetPassword(request: IResetPasswordRequest): Promise<void> {
    try {
      await this.actions.post('/reset-password', request);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async recoveryPassword(request: IRecoveryPasswordRequest): Promise<void> {
    try {
      await this.actions.post('/recovery-password', request);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async createAccount(request: ICreateAccountRequest): Promise<void> {
    try {
      await this.actions.post('/create-account', request);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  @bind
  public async createPassword(request: ICreatePasswordRequest): Promise<void> {
    try {
      await this.actions.post('/create-password', request);
    } catch (error) {
      console.error(error);
    }
    return;
  }
}

export default AuthApi;
