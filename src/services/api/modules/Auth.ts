import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';
import { ILoginCredentials } from 'shared/types/models/auth';
import {
	IFacebookOauthResponse,
	IGoogleOauthResponse,
	ILoginResponse,
	IRegisterResponse,
	IResetPasswordResponse,
} from 'shared/types/responses/auth';
import {
	ICheckEmailFreeRequest,
	ICreateAccountRequest,
	ICreatePasswordRequest,
	IFacebookOauthRequest,
	IGoogleOauthRequest,
	IRecoveryPasswordRequest,
	IResetPasswordRequest,
} from 'shared/types/requests/auth';
import { IUser } from 'shared/types/models/user';
import { convertRegistrationResponse } from 'services/api/converters';

class AuthApi extends BaseApi {
	@bind
	public async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
		const response = await this.actions.post<ILoginResponse>('/api/v1/auth/login', credentials);
		return response.data;
	}

	@bind
	public async logout(): Promise<void> {
		await this.actions.post('/api/v1/auth/logout');
	}

	@bind
	public async resetPassword(token: string, request: IResetPasswordRequest): Promise<void> {
		await this.actions.post(`/api/v1/auth/password-resets/${token}/reset`, request);
	}

	@bind
	public async recoveryPassword(request: IRecoveryPasswordRequest): Promise<IResetPasswordResponse> {
		const response = await this.actions.post<IResetPasswordResponse>('/api/v1/auth/password-resets', request);
		return response.data;
	}

	@bind
	public async createAccount(request: ICreateAccountRequest): Promise<IUser> {
		const response = await this.actions.post<IRegisterResponse>('/api/v1/auth/register', request);
		return convertRegistrationResponse(request, response.data);
	}

	@bind
	public async createPassword(request: ICreatePasswordRequest): Promise<void> {
		await this.actions.post('/api/v1/create-password', request);
	}

	@bind
	public async putFacebookOauthCode(request: IFacebookOauthRequest): Promise<IFacebookOauthResponse> {
		const response = await this.actions.post<{ data: IFacebookOauthResponse }>('/api/v1/auth/oauth/facebook', request);
		return response.data.data;
	}

	@bind
	public async putGoogleOauthCode(request: IGoogleOauthRequest): Promise<IGoogleOauthResponse> {
		const response = await this.actions.post<{ data: IGoogleOauthResponse }>('/api/v1/auth/oauth/google', request);
		return response.data.data;
	}

	@bind
	public async checkEmailFree(request: ICheckEmailFreeRequest): Promise<boolean> {
		const response = await this.actions.post<any>('/api/v1/auth/validate-email', request);
		return response.data;
	}
}

export default AuthApi;
