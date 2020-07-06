import { IRegisterResponse } from 'shared/types/responses/auth';
import { IUser } from 'shared/types/models/user';
import { ICreateAccountRequest } from 'shared/types/requests/auth';

export function convertRegistrationResponse(request: ICreateAccountRequest, response: IRegisterResponse): IUser {
  return {
    avatarUrl: null,
    firstName: request.firstName,
    lastName: request.lastName,
    since: '',
    userId: response.data.userId,
  };
}
