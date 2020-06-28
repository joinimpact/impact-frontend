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
