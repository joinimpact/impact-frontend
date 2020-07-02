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
  data: {
    userCreated: boolean;
    token: {
      authToken: string;
      authExpiry: number;
      refreshToken: string;
      refreshExpiry: number;
    };
  };
}

export interface IGoogleOauthResponse {
  data: {
    userCreated: boolean;
    token: {
      authToken: string;
      authExpiry: number;
      refreshToken: string;
      refreshExpiry: number;
    };
  };
}
