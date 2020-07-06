export interface ILoginResponse {
  id: number;
}

export interface IRegisterResponse {
  data: {
    userId: string;
    authToken: string;
    authExpiry: number;
    refreshToken: string;
    refreshExpiry: number;
  };
}

export interface IResetPasswordResponse {
  data: {
    success: boolean;
  };
}

export interface IFacebookOauthResponse {
  userCreated: boolean;
  token: {
    authToken: string;
    authExpiry: number;
    refreshToken: string;
    refreshExpiry: number;
  };
}

export interface IGoogleOauthResponse {
  userCreated: boolean;
  token: {
    authToken: string;
    authExpiry: number;
    refreshToken: string;
    refreshExpiry: number;
  };
}
