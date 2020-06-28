export interface IResetPasswordRequest {
  password: string;
}

export interface IRecoveryPasswordRequest {
  email: string;
}

export interface ICreateOrganizationRequest {
  name: string;
  website: string;
  address: string;
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
  zipCode: string;
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
  address: string;
  birthday: string;
  school: string;
}

export interface ISaveVolunteerAreasOfInterestRequest {
  areas: string[];
}
