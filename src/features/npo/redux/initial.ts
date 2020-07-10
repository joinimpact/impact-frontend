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
    createNewOpportunity: initialCommunicationField,
    uploadOpportunityLogo: initialCommunicationField,
  },
  data: {
    uploadLogoProgress: null,
    currentOpportunity: null,
    uploadOpportunityLogoProgress: null,
  }
};

export default initialState;
