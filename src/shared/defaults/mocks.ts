import moment from 'moment';
import { ICreateAccountRequest } from 'shared/types/requests/auth';
import { IUser } from 'shared/types/models/user';
import { ICreateAccountValues } from 'features/auth/namespace';
import { IEventResponseItem } from 'shared/types/responses/events';
import { ILocation } from 'shared/types/responses/shared';

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
    placeId: 'ChIJPZDrEzLsZIgRoNrpodC5P30',
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
  since: '2020-07-01',
};

export const mockCreateAccountForm: ICreateAccountValues = {
  firstName: mockCreateAccountRequest.firstName,
  lastName: mockCreateAccountRequest.lastName,
  email: mockCreateAccountRequest.email,
  address: mockCreateAccountRequest.location,
  birthday: mockCreateAccountRequest.dateOfBirth,
};

export const mockLocation: ILocation = {
  city: {
    longName: 'Keystone',
    shortName: 'Keystone',
  },
  country: {
    longName: 'United States',
    shortName: 'US',
  },
  state: {
    longName: 'South Dakota',
    shortName: 'SD',
  },
  streetAddress: {
    longName: '64 Presidential Trail, Keystone, SD 57751, USA',
    shortName: '64 Presidential Trail, Keystone, SD 57751, USA',
  },
};

export const mockEvents: IEventResponseItem[] = [
  {
    title: 'Birds watching',
    description: 'Birds watching description',
    hours: 100,
    id: '1282712434502537216',
    location: mockLocation,
    opportunityId: '1282712434502537216',
    schedule: {
      dateOnly: false,
      from: moment().utc().startOf('week').format(),
      singleDate: false,
      to: moment().utc().endOf('week').format(),
    },
  },
  {
    title: 'Opportunity title 123456',
    description: 'Opportunity title 123456 DESCRIPTION',
    hours: 40,
    id: '1283138309131866112',
    location: mockLocation,
    opportunityId: '1283138309131866112',
    schedule: {
      dateOnly: false,
      from: moment().utc().startOf('week').format(),
      singleDate: false,
      to: moment().utc().endOf('week').format(),
    },
  },
];
