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
    loadUserEnrolledOpportunities: initialCommunicationField,
    browseOpportunitiesWithFilters: initialCommunicationField,
    loadUserEvents: initialCommunicationField,
    attendEvent: initialCommunicationField,
    declineEvent: initialCommunicationField,
    getMyEventResponse: initialCommunicationField,
  },
  data: {
    uploadLogoProgress: null,
    currentOpportunity: null,
    applyOpportunityId: null,
    currentRecommendOpportunities: null,
    filteredOpportunities: [],
    inUserAreaOpportunities: [],
    inUserInterestsOpportunities: {},
    currentEnrolledOpportunities: [],
    userEvents: [],
    myResponseToEvent: null,
  },
  ui: {
    shareOpportunityVisible: false,
  }
};

export default initialState;
