export interface ILoginResponse {
  id: number;
}

export interface IRegisterResponse {
  userId: string;
  tokenPair: {
    authToken: string;
    authExpiry: number;
    refreshToken: string;
    refreshExpiry: number;
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
