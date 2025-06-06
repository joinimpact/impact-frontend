import { ILocation } from 'shared/types/responses/shared';

export interface IEventResponseItem {
	creatorId: string;
	title: string;
	description: string;
	hours: number;
	id: string;
	location: ILocation;
	opportunityId: string;
	responses: {
		numCanAttend: number;
		numCanNotAttend: number;
		totalVolunteers: number;
	};
	schedule: {
		dateOnly: boolean;
		from: string;
		singleDate: boolean;
		to: string;
	};
	// User namespace section
	userResponse?: {
		eventId: string;
		id: string;
		response: number;
		userId: string;
	};
}
