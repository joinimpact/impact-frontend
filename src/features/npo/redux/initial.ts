import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
	communications: {
		createOrganization: initialCommunicationField,
		updateOrganization: initialCommunicationField,
		uploadOrgLogo: initialCommunicationField,
		uploadEditableOrgLogo: initialCommunicationField,
		saveOrganizationTags: initialCommunicationField,
		saveEditableOrganizationTags: initialCommunicationField,
		saveOrganizationMembers: initialCommunicationField,
		saveEditableOrganizationMembers: initialCommunicationField,
		loadOrganizationTags: initialCommunicationField,
		loadOpportunitiesWithEvents: initialCommunicationField,
		deleteOpportunity: initialCommunicationField,
		loadOpportunityVolunteers: initialCommunicationField,
		acceptInvitation: initialCommunicationField,
		declineInvitation: initialCommunicationField,
		editEvent: initialCommunicationField,
		deleteEvent: initialCommunicationField,
		loadEventResponses: initialCommunicationField,
		acceptConversationInvite: initialCommunicationField,
		declineConversationInvite: initialCommunicationField,
		acceptHours: initialCommunicationField,
		declineHours: initialCommunicationField,
		loadOrganizationMembers: initialCommunicationField,
		loadOrganizationVolunteers: initialCommunicationField,
	},
	data: {
		uploadLogoProgress: null,
		deleteOpportunityId: null,
		currentOrganizationVolunteer: null,
		inviteVolunteersOpportunityId: null,
		opportunitiesWithEvents: [],
		currentEditEvent: null,
		currentEventResponses: [],
		editableOrganization: null,
		createNewOrganizationResponse: null,
		organizationMembers: null,
		organizationVolunteers: null,
	},
	modal: {
		showDeleteOpportunityConfirmation: false,
		createNewEvent: false,
		inviteTeamMembers: false,
	},
};

export default initialState;
