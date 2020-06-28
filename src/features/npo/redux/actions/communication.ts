import * as NS from '../../namespace';
import makeCommunicationActionCreators from 'shared/redux/communication/makeCommunicationActionCreators';

export const {
  execute: createNewOrganization,
  completed: createNewOrganizationComplete,
  failed: createNewOrganizationFailed
} = makeCommunicationActionCreators<
  NS.ICreateOrganization,
  NS.ICreateOrganizationSuccess,
  NS.ICreateOrganizationFailed
  >(
  'NPO:CREATE_ORGANIZATION',
  'NPO:CREATE_ORGANIZATION_SUCCESS',
  'NPO:CREATE_ORGANIZATION_FAILED',
);

export const {
  execute: uploadOrgLogo,
  completed: uploadOrgLogoComplete,
  failed: uploadOrgLogoFailed,
} = makeCommunicationActionCreators<
  NS.IUploadOrgLogo,
  NS.IUploadOrgLogoSuccess,
  NS.IUploadOrgLogoFailed
  >(
  'NPO:UPLOAD_ORG_LOGO',
  'NPO:UPLOAD_ORG_LOGO_SUCCESS',
  'NPO:UPLOAD_ORG_LOGO_FAILED',
);

export const {
  execute: saveOrganizationTags,
  completed: saveOrganizationTagsComplete,
  failed: saveOrganizationTagsFailed,
} = makeCommunicationActionCreators<
  NS.ISaveOrganizationTags,
  NS.ISaveOrganizationTagsSuccess,
  NS.ISaveOrganizationTagsFailed
  >(
  'NPO:SAVE_ORGANIZATION_TAGS',
  'NPO:SAVE_ORGANIZATION_TAGS_SUCCESS',
  'NPO:SAVE_ORGANIZATION_TAGS_FAILED',
);

export const {
  execute: saveOrganizationMembers,
  completed: saveOrganizationMembersComplete,
  failed: saveOrganizationMembersFailed,
} = makeCommunicationActionCreators<
  NS.ISaveOrganizationMembers,
  NS.ISaveOrganizationMembersSuccess,
  NS.ISaveOrganizationMembersFailed
  >(
  'NPO:SAVE_ORGANIZATION_MEMBERS',
  'NPO:SAVE_ORGANIZATION_MEMBERS_SUCCESS',
  'NPO:SAVE_ORGANIZATION_MEMBERS_FAILED',
);
