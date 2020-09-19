import { IOpportunityResponse } from 'shared/types/responses/npo';
import { IEvent } from 'shared/types/models/events';

export interface ISuccessResponse {
	success: boolean;
}

export interface IAbstractFileResponse {
	profilePicture: string;
	success: boolean;
}

export interface ILocation {
	city: {
		longName: string;
		shortName: string;
	};
	country: {
		longName: string;
		shortName: string;
	};
	state: {
		longName: string;
		shortName: string;
	};
	streetAddress: {
		longName: string;
		shortName: string;
	};
}

export interface IOpportunityWithEvents extends IOpportunityResponse {
	events: IEvent[];
}

export interface IServerResponseLocation {
	city: {
		longName: string;
		shortName: string;
	};
	country: {
		longName: string;
		shortName: string;
	};
	state: {
		longName: string;
		shortName: string;
	};
}

export interface IServerResponseTagItem {
	category: number;
	id: string;
	name: string;
}
