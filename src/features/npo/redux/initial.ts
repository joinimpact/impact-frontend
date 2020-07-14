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
    loadSingleOpportunity: initialCommunicationField,
    deleteOpportunity: initialCommunicationField,
    publicOpportunity: initialCommunicationField,
    unpublishOpportunity: initialCommunicationField,
  },
  data: {
    uploadLogoProgress: null,
    currentOpportunity: null,
    uploadOpportunityLogoProgress: null,
    organizationOpportunities: [],
    deleteOpportunityId: null,
  },
  modal: {
    showDeleteOpportunityConfirmation: false,
  }
};

export default initialState;
