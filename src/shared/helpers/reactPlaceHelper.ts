import { IAddressLocation } from 'shared/types/requests/auth';
import { IGoogleAddressSuggestion } from 'shared/view/redux-form/CountryField/CountryField';
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

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
