export interface IResetPasswordRequest {
  password: string;
}

export interface IRecoveryPasswordRequest {
  email: string;
}

export interface IAddressLocation {
  lat: number;
  long: number;
  placeId: string;
  description: string;
}

export interface ICreateOrganizationRequest {
  name: string;
  website: string;
  location: IAddressLocation;
  description: string;
}

export interface ICreatePasswordRequest {
  password: string;
}

export interface ICreateAccountRequest {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  zipCode?: string;
  location: IAddressLocation;
  password: string;
}

export interface ISaveOrganizationTagsRequest {
  tags: string[];
}

export interface ISaveOrganizationMembersRequest {
  members: string[];
}

export interface ISaveVolunteerPersonalInfoRequest {
  fullName: string;
  email: string;
  address: IAddressLocation;
  birthday: string;
  school: string;
}

export interface IFacebookOauthRequest {
  code: string;
}

export interface IGoogleOauthRequest {
  code: string;
}
