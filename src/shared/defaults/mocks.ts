import { ICreateAccountRequest } from 'shared/types/requests/auth';
import { IUser } from 'shared/types/models/user';
import { ICreateAccountForm } from 'features/auth/namespace';

export const mockCreateAccountRequest: ICreateAccountRequest = {
  dateOfBirth: '2003-07-28T00:00:00Z',
  firstName: 'First',
  lastName: 'Last',
  email: 'alice@mailinator.com',
  zipCode: '123123',
  password: 'password',
};

export const mockUser: IUser = {
  avatarUrl: '/static/demo-avatar.png',
  lastName: 'Last',
  firstName: 'First',
  userId: '123123123123',
  since: '2020-07-01'
};

export const mockCreateAccountForm: ICreateAccountForm = {
  firstName: mockCreateAccountRequest.firstName,
  lastName: mockCreateAccountRequest.lastName,
  email: mockCreateAccountRequest.email,
  address: mockCreateAccountRequest.zipCode,
  birthday: mockCreateAccountRequest.dateOfBirth,
};
