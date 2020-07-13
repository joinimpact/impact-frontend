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
  },
  data: {
    uploadLogoProgress: null,
    currentOpportunity: null,
    uploadOpportunityLogoProgress: null,
    organizationOpportunities: [],
  }
};

export default initialState;
