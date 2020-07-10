import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/redux/communication';

export const {
  execute: loadUserOrganizations,
  completed: loadUserOrganizationsComplete,
  failed: loadUserOrganizationsFailed
} = makeCommunicationActionCreators<
  NS.ILoadUserOrganizations,
  NS.ILoadUserOrganizationsSuccess,
  NS.ILoadUserOrganizationsFailed
  >(
  'NPO_SERVICE:LOAD_USER_ORGANIZATIONS',
  'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_SUCCESS',
  'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_FAILED',
);

