import { IAddressLocation } from 'shared/types/requests/auth';
import { IGoogleAddressSuggestion } from 'shared/view/redux-form/CountryField/CountryField';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { IServerResponseLocation } from 'shared/types/responses/shared';

export async function serverCountryToAddressLocation(location: IServerResponseLocation): Promise<IAddressLocation> {
	try {
		const geocode = await geocodeByAddress(location.city.longName);
		const result = await getLatLng(geocode[0]);

		return {
			lat: result.lat,
			long: result.lng,
			placeId: geocode[0].place_id[0],
			description: geocode[0].formatted_address,
		};
	} catch (error) {
		console.error(error);
	}

	return {
		lat: 0,
		long: 0,
		placeId: '',
		description: '',
	};
}

export async function countryToAddressLocation(suggest: IGoogleAddressSuggestion): Promise<IAddressLocation> {
	try {
		// Getting latitude and longitude for location
		const geocode = await geocodeByPlaceId(suggest.place_id);
		const result = await getLatLng(geocode[0]);
		return {
			lat: result.lat,
			long: result.lng,
			placeId: suggest.place_id,
			description: suggest.description,
		};
	} catch (error) {
		console.error(error);
	}

	return {
		lat: 0,
		long: 0,
		placeId: suggest.place_id,
		description: suggest.description,
	};
}
