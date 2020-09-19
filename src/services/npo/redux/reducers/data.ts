import * as NS from '../../namespace';
import initial from '../initial';
import { emptyOpportunity } from 'shared/defaults/npo';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
	switch (action.type) {
		case 'NPO_SERVICE:SET_CURRENT_ORGANIZATION':
			return {
				...state,
				currentOrganization: action.payload,
			};
		case 'NPO_SERVICE:UPDATE_ORGANIZATION_LOGO':
			if (state.currentOrganization) {
				return {
					...state,
					currentOrganization: {
						...state.currentOrganization,
						profilePicture: action.payload,
					},
				};
			}
			return state;
		case 'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_SUCCESS':
			return {
				...state,
				isServiceReady: true,
				organizations: action.payload,
				currentOrganization: state.currentOrganization || (action.payload || [])[0],
			};
		case 'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_FAILED':
			return {
				...state,
				isServiceReady: true,
			};
		case 'NPO_SERVICE:CHANGE_CURRENT_ORGANIZATION':
			return {
				...state,
				currentOrganization: action.payload,
			};
		case 'NPO_SERVICE:LOAD_OPPORTUNITIES_SUCCESS':
			return {
				...state,
				organizationOpportunities: action.payload,
			};
		case 'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID_SUCCESS':
			return {
				...state,
				currentOpportunity: {
					...emptyOpportunity,
					id: action.payload.opportunityId,
				},
			};
		case 'NPO_SERVICE:PUBLISH_OPPORTUNITY_SUCCESS':
			return {
				...state,
				currentOpportunity: state.currentOpportunity
					? {
						...state.currentOpportunity,
						public: true,
					  }
					: state.currentOpportunity,
				// Change publish state in current organizations frame (if exists)
				organizationOpportunities: state.organizationOpportunities
					? state.organizationOpportunities.map((opportunity) => {
						if (opportunity.id === action.payload) {
							return {
								...opportunity,
								public: true,
							};
						}
						return opportunity;
					  })
					: state.organizationOpportunities,
			};
		case 'NPO_SERVICE:UNPUBLISH_OPPORTUNITY_SUCCESS':
			return {
				...state,
				currentOpportunity: state.currentOpportunity
					? {
						...state.currentOpportunity,
						public: false,
					  }
					: state.currentOpportunity,
				// Change publish state in current organizations frame (if exists)
				organizationOpportunities: state.organizationOpportunities
					? state.organizationOpportunities.map((opportunity) => {
						if (opportunity.id === action.payload) {
							return {
								...opportunity,
								public: false,
							};
						}
						return opportunity;
					  })
					: state.organizationOpportunities,
			};
		case 'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO_SUCCESS':
			return {
				...state,
				currentOpportunity: {
					...(state.currentOpportunity || emptyOpportunity),
					profilePicture: action.payload,
				},
			};
		case 'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY_SUCCESS':
			return {
				...state,
				currentOpportunity: action.payload,
			};
		case 'NPO_SERVICE:UPDATE_OPPORTUNITY_SUCCESS':
			return {
				...state,
				currentOpportunity: {
					...action.payload,
					profilePicture: state.currentOpportunity
						? state.currentOpportunity.profilePicture
						: action.payload.profilePicture,
				},
			};
		case 'NPO_SERVICE:SET_UPLOAD_OPPORTUNITY_LOGO_PROGRESS':
			return {
				...state,
				uploadOpportunityLogoProgress: action.payload,
			};
	}
	return state;
}

export default dataReducer;
