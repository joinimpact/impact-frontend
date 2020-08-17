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
    loadConversation: initialCommunicationField,
    loadConversations: initialCommunicationField,
    sendMessage: initialCommunicationField,
    setCurrentConversation: initialCommunicationField,
    fetchChatHistory: initialCommunicationField,
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
    conversations: [],
    currentConversation: null,
    conversationItem: null,
    currentConversationMessages: [],
    totalMessagesCount: 0,
  },
  ui: {
    shareOpportunityVisible: false,
  }
};

export default initialState;
