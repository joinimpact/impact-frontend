import { ICreateAccountRequest } from 'shared/types/requests/auth';
import { IUser } from 'shared/types/models/user';
import { ICreateAccountValues } from 'features/auth/namespace';

export const mockCreateAccountRequest: ICreateAccountRequest = {
  dateOfBirth: '2003-07-28T00:00:00Z',
  firstName: 'First',
  lastName: 'Last',
  email: 'npo1@mailinator.com',
  // zipCode: '123123',
  location: {
    lat: 36.1626638,
    long: -86.7816016,
    description: 'Nashville, Теннесси, США',
    placeId: 'ChIJPZDrEzLsZIgRoNrpodC5P30'
  },
  password: 'password',
};

export const mockUser: IUser = {
  email: mockCreateAccountRequest.email,
  dateOfBirth: mockCreateAccountRequest.dateOfBirth,
  avatarUrl: '/static/demo-avatar.png',
  lastName: 'Last',
  firstName: 'First',
  userId: '1280038341303079000',
  since: '2020-07-01'
};

export const mockCreateAccountForm: ICreateAccountValues = {
  firstName: mockCreateAccountRequest.firstName,
  lastName: mockCreateAccountRequest.lastName,
  email: mockCreateAccountRequest.email,
  address: mockCreateAccountRequest.location,
  birthday: mockCreateAccountRequest.dateOfBirth,
};
