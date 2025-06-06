import { ILocation, IServerResponseLocation } from 'shared/types/responses/shared';

export interface ICreateOrganizationResponse {
	organizationId: string;
}

export interface IUploadNPOLogoResponse {
	profilePicture: string;
	success: boolean;
}

export interface INPOTagItem {
	id: string;
	name: string;
}

export interface INPOTagsResponse {
	tags: INPOTagItem[];
}

export interface IOrganizationsResponseItem {
	creatorId: string;
	description: string;
	id: string;
	name: string;
	location: ILocation;
	profile: string[];
	profilePicture: string;
	tags: string[];
	websiteURL: string;
}

export interface IServerOrganizationResponseItem extends Omit<IOrganizationsResponseItem, 'tags'> {
	tags: IOrganizationsResponseItem[];
}

export interface IUserOrganizationsResponse {
	organizations: IOrganizationsResponseItem[];
}

export interface IServerUserOrganizationsResponse {
	organizations: IServerOrganizationResponseItem[];
}

export interface INewOpportunityResponse {
	success: boolean;
	opportunityId: string;
}

export interface IOpportunityTagItem {
	category: number;
	id: string;
	name: string;
}

export interface IOpportunityResponse {
	id: string;
	organizationId: string;
	creatorId: string;
	profilePicture: string;
	title: string;
	description: string;
	public: boolean;
	colorIndex: number;
	tags: IOpportunityTagItem[];
	location: IServerResponseLocation;
	organization: {
		id: string;
		name: string;
		profilePicture: string;
	};
	stats: {
		volunteersEnrolled: number;
		volunteersPending: number;
	};
	requirements: {
		ageLimit: {
			active: boolean;
			from: number;
			to: number;
		};
		expectedHours: {
			active: boolean;
			hours: number;
		};
	};
	limits: {
		volunteersCap: {
			active: boolean;
			cap: number;
		};
	};
}

export interface IUploadOpportunityLogoResponse {
	profilePicture: string;
	success: boolean;
}

export interface IAbstractVolunteer {
	id: string;
	profilePicture: string;
	firstName: string;
	lastName: string;
}

export interface IPendingVolunteerResponseItem extends IAbstractVolunteer {
	accepted: boolean;
	opportunityId: string;
	volunteerID: string;
	createdAt: string;
}

export interface IVolunteerResponseItem extends IAbstractVolunteer {
	inviterId: string;
	permissionsFlag: number;
	createdAt: string;
	joinedAt: string;
}

export interface IInvitedVolunteerResponseItem extends IAbstractVolunteer {
	accepted: boolean;
	emailOnly: boolean;
	inviteeEmail: string;
	inviteeId: string;
	inviterId: string;
	opportunityId: string;
	createdAt: string;
	joinedAt: string;
}

export interface IVolunteersResponse {
	pending: IPendingVolunteerResponseItem[];
	volunteers: IVolunteerResponseItem[];
	invited: IInvitedVolunteerResponseItem[];
}

export interface IEventResponsesResponse {
	eventId: string;
	firstName: string;
	id: string;
	lastName: string;
	profilePicture: string;
	response: number;
	userId: string;
}

export interface IOpportunitySummary {
	id: string;
	title: string;
}

export type IWithOpportunity<T> = T & {
	opportunity: IOpportunitySummary;
};

export interface IOrganizationVolunteersResponse {
	pending: IWithOpportunity<IPendingVolunteerResponseItem>[];
	volunteers: IWithOpportunity<IVolunteerResponseItem>[];
	invited: IWithOpportunity<IInvitedVolunteerResponseItem>[];
}
