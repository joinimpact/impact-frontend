import * as NS from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initial: NS.IReduxState = {
  communications: {
    loadUserOrganizations: initialCommunicationField,
    loadOpportunities: initialCommunicationField,
    requestNewOpportunityId: initialCommunicationField,
    updateOpportunity: initialCommunicationField,
    uploadOpportunityLogo: initialCommunicationField,
    loadSingleOpportunity: initialCommunicationField,
    publishOpportunity: initialCommunicationField,
    unpublishOpportunity: initialCommunicationField,
  },
  data: {
    currentOrganization: null,
    organizations: null,
    isServiceReady: false,
    organizationOpportunities: [],
    currentOpportunity: null,
    uploadOpportunityLogoProgress: null,
  },
};

export default initial;
