import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communications']>({
  createOrganization: makeCommunicationReducer<
    NS.ICreateOrganization,
    NS.ICreateOrganizationSuccess,
    NS.ICreateOrganizationFailed
    >(
      'NPO:CREATE_ORGANIZATION',
      'NPO:CREATE_ORGANIZATION_SUCCESS',
      'NPO:CREATE_ORGANIZATION_FAILED',
    initial.communications.createOrganization,
  ),
  uploadOrgLogo: makeCommunicationReducer<
    NS.IUploadOrgLogo,
    NS.IUploadOrgLogoSuccess,
    NS.IUploadOrgLogoFailed
    >(
      'NPO:UPLOAD_ORG_LOGO',
      'NPO:UPLOAD_ORG_LOGO_SUCCESS',
      'NPO:UPLOAD_ORG_LOGO_FAILED',
    initial.communications.uploadOrgLogo,
  ),
  saveOrganizationTags: makeCommunicationReducer<
    NS.ISaveOrganizationTags,
    NS.ISaveOrganizationTagsSuccess,
    NS.ISaveOrganizationTagsFailed
    >(
      'NPO:SAVE_ORGANIZATION_TAGS',
      'NPO:SAVE_ORGANIZATION_TAGS_SUCCESS',
      'NPO:SAVE_ORGANIZATION_TAGS_FAILED',
    initial.communications.saveOrganizationTags,
  ),
  saveOrganizationMembers: makeCommunicationReducer<
    NS.ISaveOrganizationMembers,
    NS.ISaveOrganizationMembersSuccess,
    NS.ISaveOrganizationMembersFailed
    >(
      'NPO:SAVE_ORGANIZATION_MEMBERS',
      'NPO:SAVE_ORGANIZATION_MEMBERS_SUCCESS',
      'NPO:SAVE_ORGANIZATION_MEMBERS_FAILED',
    initial.communications.saveOrganizationMembers,
  ),
  loadOrganizationTags: makeCommunicationReducer<
    NS.ILoadOrganizationTags,
    NS.ILoadOrganizationTagsSuccess,
    NS.ILoadOrganizationTagsFailed
    >(
      'NPO:LOAD_ORGANIZATION_TAGS',
      'NPO:LOAD_ORGANIZATION_TAGS_SUCCESS',
      'NPO:LOAD_ORGANIZATION_TAGS_FAILED',
    initial.communications.loadOrganizationTags,
  ),
  updateOpportunity: makeCommunicationReducer<
    NS.IUpdateOpportunity,
    NS.IUpdateOpportunitySuccess,
    NS.IUpdateOpportunityFailed
    >(
      'NPO:UPDATE_OPPORTUNITY',
      'NPO:UPDATE_OPPORTUNITY_SUCCESS',
      'NPO:UPDATE_OPPORTUNITY_FAILED',
    initial.communications.updateOpportunity,
  ),
  requestNewOpportunityId: makeCommunicationReducer<
    NS.IRequestNewOpportunityId,
    NS.IRequestNewOpportunityIdSuccess,
    NS.IRequestNewOpportunityIdFailed
    >(
      'NPO:REQUEST_NEW_OPPORTUNITY_ID',
      'NPO:REQUEST_NEW_OPPORTUNITY_ID_SUCCESS',
      'NPO:REQUEST_NEW_OPPORTUNITY_ID_FAILED',
    initial.communications.requestNewOpportunityId,
  ),
  uploadOpportunityLogo: makeCommunicationReducer<
    NS.IUploadOpportunityLogo,
    NS.IUploadOpportunityLogoSuccess,
    NS.IUploadOpportunityLogoFailed
    >(
      'NPO:UPLOAD_OPPORTUNITY_LOGO',
      'NPO:UPLOAD_OPPORTUNITY_LOGO_SUCCESS',
      'NPO:UPLOAD_OPPORTUNITY_LOGO_FAILED',
    initial.communications.uploadOpportunityLogo,
  ),
});
