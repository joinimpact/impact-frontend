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
});
