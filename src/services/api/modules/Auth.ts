import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ILoginCredentials } from 'shared/types/models/auth';
import { ILoginResponse } from 'shared/types/responses/auth';
import { IResetPasswordRequest } from 'shared/types/requests/auth';

class AuthApi extends BaseApi {
  @bind
  public async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
    const response = await this.actions.post<ILoginResponse>(`/authorize`, credentials);
    return response.data;
  }

  @bind
  public async logout(): Promise<void> {
    await this.actions.post('/logout');
  }

  @bind
  public async resetPassword(request: IResetPasswordRequest): Promise<void> {
    await this.actions.post('/reset-password', request);
  }
}

export default AuthApi;
