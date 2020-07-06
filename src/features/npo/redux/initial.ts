import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initialState: IReduxState = {
  communications: {
    createOrganization: initialCommunicationField,
    uploadOrgLogo: initialCommunicationField,
    saveOrganizationTags: initialCommunicationField,
    saveOrganizationMembers: initialCommunicationField,
    loadOrganizationTags: initialCommunicationField,
  },
  data: {
    uploadLogoProgress: null,
  }
};

export default initialState;
