import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
	switch (action.type) {
		case 'NPO:SET_UPLOAD_ORGANIZATION_LOGO_PROGRESS':
			return {
				...state,
				uploadLogoProgress: action.payload,
			};
		case 'NPO:REQUEST_DELETE_OPPORTUNITY':
			return {
				...state,
				deleteOpportunityId: action.payload,
			};
		case 'NPO:RESET_REQUEST_DELETE_OPPORTUNITY':
			return {
				...state,
				deleteOpportunityId: null,
			};
		case 'NPO:DELETE_OPPORTUNITY_SUCCESS':
			return {
				...state,
				deleteOpportunityId: null,
			};
		case 'NPO:LOAD_OPPORTUNITY_VOLUNTEERS_SUCCESS':
			return {
				...state,
				currentOrganizationVolunteer: action.payload,
			};
		case 'NPO:REQUEST_INVITE_VOLUNTEERS':
			return {
				...state,
				inviteVolunteersOpportunityId: action.payload,
			};
		case 'NPO:SAVE_ORGANIZATION_MEMBERS_SUCCESS':
		case 'NPO:RESET_REQUEST_INVITE_VOLUNTEERS':
			return {
				...state,
				inviteVolunteersOpportunityId: null,
			};
		case 'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS_SUCCESS':
			return {
				...state,
				opportunitiesWithEvents: action.payload,
			};
		case 'NPO:REQUEST_EDIT_EVENT':
			return {
				...state,
				currentEditEvent: action.payload,
			};
		case 'NPO:EDIT_EVENT_SUCCESS':
		case 'NPO:RESET_EDIT_EVENT_REQUEST':
			return {
				...state,
				currentEditEvent: null,
			};
		case 'NPO:LOAD_EVENT_RESPONSES_SUCCESS':
			return {
				...state,
				currentEventResponses: action.payload,
			};
		case 'NPO:RESET_EVENT_RESPONSES':
			return {
				...state,
				currentEventResponses: [],
			};
		case 'NPO:CREATE_ORGANIZATION_SUCCESS': {
			return {
				...state,
				createNewOrganizationResponse: action.payload,
			};
		}
		case 'NPO:RESET_CREATE_NEW_ORGANIZATION_RESPONSE':
			return {
				...state,
				createNewOrganizationResponse: null,
			};
		case 'NPO:SET_CURRENT_EDITABLE_ORGANIZATION':
			return {
				...state,
				editableOrganization: action.payload,
			};
		case 'NPO:RESET_CURRENT_EDITABLE_ORGANIZATION':
			return {
				...state,
				editableOrganization: null,
			};
		case 'NPO:UPDATE_EDITABLE_ORGANIZATION_LOGO':
			return {
				...state,
				editableOrganization: {
					...state.editableOrganization!,
					profilePicture: action.payload,
				},
			};
		case 'NPO:LOAD_ORGANIZATION_MEMBERS_SUCCESS':
			return {
				...state,
				organizationMembers: action.payload,
			};
		case 'NPO:LOAD_ORGANIZATION_VOLUNTEERS_SUCCESS':
			return {
				...state,
				organizationVolunteers: action.payload,
			};
	}
	return state;
}

export default dataReducer;
