import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { ReducersMap } from 'shared/types/redux';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers({
  loadUserOrganizations: makeCommunicationReducer<
    NS.ILoadUserOrganizations,
    NS.ILoadUserOrganizationsSuccess,
    NS.ILoadUserOrganizationsFailed
    >(
    'NPO_SERVICE:LOAD_USER_ORGANIZATIONS',
    'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_SUCCESS',
    'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_FAILED',
    initial.communications.loadUserOrganizations,
  ),
} as ReducersMap<NS.IReduxState['communications']>);
