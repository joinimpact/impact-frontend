export interface IResetPasswordRequest {
  password: string;
}

export interface IRecoveryPasswordRequest {
  email: string;
}

export interface ICreatePasswordRequest {
  password: string;
}

export interface ICreateAccountRequest {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  address: string;
}
