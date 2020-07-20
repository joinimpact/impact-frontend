import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
  communications: {
    saveVolunteerPersonalInformation: initialCommunicationField,
    uploadVolunteerLogo: initialCommunicationField,
    saveVolunteerAreasOfInterest: initialCommunicationField,
    loadSingleOpportunity: initialCommunicationField,
    applyForOpportunity: initialCommunicationField,
    browseOpportunities: initialCommunicationField,
  },
  data: {
    uploadLogoProgress: null,
    currentOpportunity: null,
    applyOpportunityId: null,
  },
  ui: {
    shareOpportunityVisible: false,
  }
};

export default initialState;
