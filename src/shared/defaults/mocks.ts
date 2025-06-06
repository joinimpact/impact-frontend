import moment from 'moment';
import { IAddressLocation, ICreateAccountRequest } from 'shared/types/requests/auth';
import { IUser } from 'shared/types/models/user';
import { ICreateAccountValues } from 'features/auth/namespace';
import { ILocation } from 'shared/types/responses/shared';
import { IEvent } from 'shared/types/models/events';
import { convertEventResponseToEvent } from 'services/api/converters/events';
import { IMessage } from 'shared/types/models/notify';
import uuid from 'uuid';

export const mockServerLocation: IAddressLocation = {
	lat: 36.1626638,
	long: -86.7816016,
	description: 'Nashville, Теннесси, США',
	placeId: 'ChIJPZDrEzLsZIgRoNrpodC5P30',
};

export const mockCreateAccountRequest: ICreateAccountRequest = {
	dateOfBirth: '2003-07-28T00:00:00Z',
	firstName: 'First',
	lastName: 'Last',
	email: 'npo1@mailinator.com',
	// zipCode: '123123',
	location: mockServerLocation,
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
	school: '',
	tags: [],
	profile: [],
	location: mockServerLocation,
	lastOnline: '',
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

export const mockEvents: IEvent[] = [
	convertEventResponseToEvent({
		creatorId: '12312312312',
		title: 'Birds watching international with long title for to show how it will break the cell',
		description: 'Birds watching description',
		hours: 100,
		id: '1282712434502537216',
		location: mockLocation,
		opportunityId: '1282712434502537216',
		responses: {
			numCanAttend: 0,
			numCanNotAttend: 0,
			totalVolunteers: 0,
		},
		schedule: {
			dateOnly: false,
			from: moment().startOf('month').subtract(2, 'd').format(),
			singleDate: false,
			to: moment().endOf('week').subtract(1, 'd').format(),
		},
	}),
	convertEventResponseToEvent({
		creatorId: '12312312312',
		title: 'Opportunity title 123456',
		description: 'Opportunity title 123456 DESCRIPTION',
		hours: 40,
		id: '1283138309131866112',
		location: mockLocation,
		opportunityId: '1283138309131866112',
		responses: {
			numCanAttend: 0,
			numCanNotAttend: 0,
			totalVolunteers: 0,
		},
		schedule: {
			dateOnly: false,
			from: moment().startOf('week').subtract(2, 'd').format(),
			singleDate: false,
			to: moment().endOf('week').add(3, 'd').format(),
		},
	}),
	convertEventResponseToEvent({
		creatorId: '12312312312',
		title: 'One day action with very very very very long title',
		description: 'One day action description',
		hours: 40,
		id: '1283138309131833333',
		location: mockLocation,
		opportunityId: '128313830913133333',
		responses: {
			numCanAttend: 0,
			numCanNotAttend: 0,
			totalVolunteers: 0,
		},
		schedule: {
			dateOnly: false,
			from: moment().format(),
			singleDate: true,
			to: moment().format(),
		},
	}),
	convertEventResponseToEvent({
		creatorId: '12312312312',
		title: 'Happy birthday',
		description: 'Happy birthday event mock description',
		hours: 40,
		id: '128313830913444444',
		location: mockLocation,
		opportunityId: '128313830913144444',
		responses: {
			numCanAttend: 0,
			numCanNotAttend: 0,
			totalVolunteers: 0,
		},
		schedule: {
			dateOnly: false,
			from: moment().add(2, 'd').format(),
			singleDate: true,
			to: moment().add(2, 'd').format(),
		},
	}),
];

export const messagesMock: IMessage[] = [
	{
		type: 'WS_MESSAGE',
		id: uuid(),
		body: {
			body: {
				text: 'test2 sjdkajsdkjhaskjdhakjhsdkjhaskjhdkjahskdjhaskjdhksajhdkajshdkjhadkjhaskjhdksjhdkjsh',
			},
			conversationId: '1288469708902764544',
			edited: false,
			editedTimestamp: '0001-01-01T00:00:00Z',
			id: '1297127011927461888',
			senderId: '1296033373898149888',
			senderPerspective: 0,
			timestamp: '2020-08-22T11:02:33.755365735Z',
			type: 'MESSAGE_STANDARD',
		},
	},
	{
		type: 'WS_MESSAGE',
		id: uuid(),
		body: {
			body: {
				text: 'test3',
			},
			conversationId: '1288469708902764544',
			edited: false,
			editedTimestamp: '0001-01-01T00:00:00Z',
			id: '1297127011927461888',
			senderId: '1296033373898149888',
			senderPerspective: 0,
			timestamp: '2020-08-22T11:03:35.952361223Z',
			type: 'MESSAGE_STANDARD',
		},
	},
];
