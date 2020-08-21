import { IRegisterResponse } from 'shared/types/responses/auth';
import { IUser } from 'shared/types/models/user';
import { ICreateAccountRequest } from 'shared/types/requests/auth';

export function convertRegistrationResponse(request: ICreateAccountRequest, response: IRegisterResponse): IUser {
  return {
    avatarUrl: null,
    firstName: request.firstName,
    lastName: request.lastName,
    userId: response.data.userId,
    email: request.email,
    dateOfBirth: request.dateOfBirth,
    since: '',
    lastOnline: '',
    school: '',
    profile: [],
    tags: [],
    location: request.location,
  };
}
