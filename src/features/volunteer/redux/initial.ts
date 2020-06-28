import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
  communications: {
    saveVolunteerPersonalInformation: initialCommunicationField,
    uploadVolunteerLogo: initialCommunicationField,
    saveVolunteerAreasOfInterest: initialCommunicationField,
  },
  data: {
  }
};

export default initialState;
