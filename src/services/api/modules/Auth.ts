import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ILoginCredentials } from 'shared/types/models/auth';
import { ILoginResponse } from 'shared/types/responses/auth';

class AuthApi extends BaseApi {
  @bind
  public async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
    const response = await this.actions.post<ILoginResponse>(`/authorize`, credentials);
    return response.data;
  }
}

export default AuthApi;
