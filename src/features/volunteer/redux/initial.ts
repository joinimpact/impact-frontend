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
    requestHours: initialCommunicationField,
    deleteAccount: initialCommunicationField,
    loadUser: initialCommunicationField,
    loadUserOpportunities: initialCommunicationField,
    acceptInvitation: initialCommunicationField,
    declineInvitation: initialCommunicationField,
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
    currentEnrolledOpportunitiesHash: {},
    userEvents: [],
    myResponseToEvent: null,
    loadedUser: null,
    loadedUserOpportunities: [],
    hoursRequest: null,
  },
  ui: {
    shareOpportunityVisible: false,
    deleteAccountVisible: false,
  }
};

export default initialState;
