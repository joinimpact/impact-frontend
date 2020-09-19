import { ITagsResponse, IUserProfileResponse } from 'shared/types/responses/volunteer';
import { ISaveUserTagsReqest, ISaveVolunteerAreasOfInterestRequest } from 'shared/types/requests/volunteers';
import { IUser } from 'shared/types/models/user';
import { serverCountryToAddressLocation } from 'shared/helpers/reactPlaceHelper';

export function convertTagsResponseToStringsArray(response: ITagsResponse): string[] {
	return response.tags.map((tag) => tag.name);
}

export function convertUserTagsToRequest(tags: ISaveVolunteerAreasOfInterestRequest): ISaveUserTagsReqest {
	return {
		tags: tags.tags.map((tag) => ({
			name: tag,
		})),
	};
}

export async function convertServerUser(response: IUserProfileResponse): Promise<IUser> {
	const schoolField = response.profile.find((field) => field.field === 'school');
	return {
		userId: response.id,
		firstName: response.firstName,
		lastName: response.lastName,
		dateOfBirth: response.dateOfBirth,
		email: response.email,
		since: response.since,
		lastOnline: response.lastOnline,
		avatarUrl: response.profilePicture,
		location: response.location ? await serverCountryToAddressLocation(response.location) : response.location,
		profile: response.profile,
		tags: response.tags.map((tag) => tag.name),
		school: schoolField ? schoolField.value : '',
	};
}
