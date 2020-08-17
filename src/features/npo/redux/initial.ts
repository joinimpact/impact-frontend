import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
  communications: {
    createOrganization: initialCommunicationField,
    uploadOrgLogo: initialCommunicationField,
    saveOrganizationTags: initialCommunicationField,
    saveOrganizationMembers: initialCommunicationField,
    loadOrganizationTags: initialCommunicationField,
    requestNewOpportunityId: initialCommunicationField,
    updateOpportunity: initialCommunicationField,
    uploadOpportunityLogo: initialCommunicationField,
    loadOpportunities: initialCommunicationField,
    loadOpportunitiesWithEvents: initialCommunicationField,
    loadSingleOpportunity: initialCommunicationField,
    deleteOpportunity: initialCommunicationField,
    publicOpportunity: initialCommunicationField,
    unpublishOpportunity: initialCommunicationField,
    loadOpportunityVolunteers: initialCommunicationField,
    acceptInvitation: initialCommunicationField,
    declineInvitation: initialCommunicationField,
    editEvent: initialCommunicationField,
    deleteEvent: initialCommunicationField,
    loadEventResponses: initialCommunicationField,
    loadConversation: initialCommunicationField,
    loadConversations: initialCommunicationField,
    sendMessage: initialCommunicationField,
    setCurrentConversation: initialCommunicationField,
    fetchChatHistory: initialCommunicationField,
  },
  data: {
    uploadLogoProgress: null,
    currentOpportunity: null,
    uploadOpportunityLogoProgress: null,
    organizationOpportunities: [],
    deleteOpportunityId: null,
    currentOrganizationVolunteer: null,
    inviteVolunteersOpportunityId: null,
    opportunitiesWithEvents: [],
    currentEditEvent: null,
    currentEventResponses: [],
    conversations: [],
    currentConversation: null,
    conversationItem: null,
    currentConversationMessages: [],
    totalMessagesCount: 0,
  },
  modal: {
    showDeleteOpportunityConfirmation: false,
    createNewEvent: false,
  }
};

export default initialState;
