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
  websiteURL: string;
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

export interface ISaveOrganizationTagsRequestItem {
  name: string;
}

export interface ISaveOrganizationTagsRequest {
  tags: ISaveOrganizationTagsRequestItem[];
}

export interface ISaveOrganizationMemnbersRequestItem {
  email: string;
}

export interface ISaveOrganizationMembersRequest {
  members: ISaveOrganizationMemnbersRequestItem[];
}

export interface ISaveVolunteerPersonalInfoRequest {
  firstName: string;
  lastName: string;
  email: string;
  address: IAddressLocation;
  birthday: string;
  school: string;
}

export interface IFacebookOauthRequest {
  token: string;
}

export interface IGoogleOauthRequest {
  token: string;
}

export interface ICheckEmailFreeRequest {
  email: string;
}
