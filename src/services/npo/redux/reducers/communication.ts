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
  loadOpportunities: makeCommunicationReducer<
    NS.ILoadOpportunities,
    NS.ILoadOpportunitiesSuccess,
    NS.ILoadOpportunitiesFailed
    >(
    'NPO_SERVICE:LOAD_OPPORTUNITIES',
    'NPO_SERVICE:LOAD_OPPORTUNITIES_SUCCESS',
    'NPO_SERVICE:LOAD_OPPORTUNITIES_FAILED',
    initial.communications.loadOpportunities,
  ),
  requestNewOpportunityId: makeCommunicationReducer<
    NS.IRequestNewOpportunityId,
    NS.IRequestNewOpportunityIdSuccess,
    NS.IRequestNewOpportunityIdFailed
    >(
    'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID',
    'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID_SUCCESS',
    'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID_FAILED',
    initial.communications.requestNewOpportunityId,
  ),
  publishOpportunity: makeCommunicationReducer<
    NS.IPublishOpportunity,
    NS.IPublishOpportunitySuccess,
    NS.IPublishOpportunityFailed
    >(
    'NPO_SERVICE:PUBLISH_OPPORTUNITY',
    'NPO_SERVICE:PUBLISH_OPPORTUNITY_SUCCESS',
    'NPO_SERVICE:PUBLISH_OPPORTUNITY_FAILED',
    initial.communications.publishOpportunity,
  ),
  unpublishOpportunity: makeCommunicationReducer<
    NS.IUnpublishOpportunity,
    NS.IUnpublishOpportunitySuccess,
    NS.IUnpublishOpportunityFailed
    >(
    'NPO_SERVICE:UNPUBLISH_OPPORTUNITY',
    'NPO_SERVICE:UNPUBLISH_OPPORTUNITY_SUCCESS',
    'NPO_SERVICE:UNPUBLISH_OPPORTUNITY_FAILED',
    initial.communications.unpublishOpportunity,
  ),
  uploadOpportunityLogo: makeCommunicationReducer<
    NS.IUploadOpportunityLogo,
    NS.IUploadOpportunityLogoSuccess,
    NS.IUploadOpportunityLogoFailed
    >(
    'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO',
    'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO_SUCCESS',
    'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO_FAILED',
    initial.communications.uploadOpportunityLogo,
  ),
  loadSingleOpportunity: makeCommunicationReducer<
    NS.ILoadSingleOpportunity,
    NS.ILoadSingleOpportunitySuccess,
    NS.ILoadSingleOpportunityFailed
    >(
    'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY',
    'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY_SUCCESS',
    'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY_FAILED',
    initial.communications.loadSingleOpportunity,
  ),
  updateOpportunity: makeCommunicationReducer<
    NS.IUpdateOpportunity,
    NS.IUpdateOpportunitySuccess,
    NS.IUpdateOpportunityFailed
    >(
    'NPO_SERVICE:UPDATE_OPPORTUNITY',
    'NPO_SERVICE:UPDATE_OPPORTUNITY_SUCCESS',
    'NPO_SERVICE:UPDATE_OPPORTUNITY_FAILED',
    initial.communications.updateOpportunity,
  ),
} as ReducersMap<NS.IReduxState['communications']>);
