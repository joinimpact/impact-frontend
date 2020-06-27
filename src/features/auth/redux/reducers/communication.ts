import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communications']>({
  login: makeCommunicationReducer<
    NS.ILogin,
    NS.ILoginSuccess,
    NS.ILoginFailed>(
    'AUTH:LOGIN',
    'AUTH:LOGIN_SUCCESS',
    'AUTH:LOGIN_FAILED',
    initial.communications.login,
  ),
  recoveryPassword: makeCommunicationReducer<
    NS.IRecoveryPassword,
    NS.IRecoveryPasswordSuccess,
    NS.IRecoveryPasswordFailed
    >(
    'AUTH:RECOVERY_PASSWORD',
    'AUTH:RECOVERY_PASSWORD_SUCCESS',
    'AUTH:RECOVERY_PASSWORD_FAILED',
    initial.communications.recoveryPassword,
  ),
  resetPassword: makeCommunicationReducer<
    NS.IResetPassword,
    NS.IResetPasswordSuccess,
    NS.IResetPasswordFailed
    >(
      'AUTH:RESET_PASSWORD',
      'AUTH:RESET_PASSWORD_SUCCESS',
      'AUTH:RESET_PASSWORD_FAILED',
    initial.communications.resetPassword,
  ),
  createAccount: makeCommunicationReducer<
    NS.ICreateAccount,
    NS.ICreateAccountSuccess,
    NS.ICreateAccountFailed
    >(
      'AUTH:CREATE_ACCOUNT',
      'AUTH:CREATE_ACCOUNT_SUCCESS',
      'AUTH:CREATE_ACCOUNT_FAILED',
    initial.communications.createAccount,
  ),
  createPassword: makeCommunicationReducer<
    NS.ICreatePassword,
    NS.ICreatePasswordSuccess,
    NS.ICreatePasswordFailed
    >(
      'AUTH:CREATE_PASSWORD',
    'AUTH:CREATE_PASSWORD_SUCCESS',
    'AUTH:CREATE_PASSWORD_FAILED',
    initial.communications.createPassword,
  ),
  createOrganization: makeCommunicationReducer<
    NS.ICreateOrganization,
    NS.ICreateOrganizationSuccess,
    NS.ICreateOrganizationFailed
    >(
      'AUTH:CREATE_ORGANIZATION',
      'AUTH:CREATE_ORGANIZATION_SUCCESS',
      'AUTH:CREATE_ORGANIZATION_FAILED',
    initial.communications.createOrganization,
  ),
  uploadOrgLogo: makeCommunicationReducer<
    NS.IUploadOrgLogo,
    NS.IUploadOrgLogoSuccess,
    NS.IUploadOrgLogoFailed
    >(
      'AUTH:UPLOAD_ORG_LOGO',
      'AUTH:UPLOAD_ORG_LOGO_SUCCESS',
      'AUTH:UPLOAD_ORG_LOGO_FAILED',
    initial.communications.uploadOrgLogo,
  ),
  saveOrganizationTags: makeCommunicationReducer<
    NS.ISaveOrganizationTags,
    NS.ISaveOrganizationTagsSuccess,
    NS.ISaveOrganizationTagsFailed
    >(
      'AUTH:SAVE_ORGANIZATION_TAGS',
      'AUTH:SAVE_ORGANIZATION_TAGS_SUCCESS',
      'AUTH:SAVE_ORGANIZATION_TAGS_FAILED',
    initial.communications.saveOrganizationTags,
  ),
  saveOrganizationMembers: makeCommunicationReducer<
    NS.ISaveOrganizationMembers,
    NS.ISaveOrganizationMembersSuccess,
    NS.ISaveOrganizationMembersFailed
    >(
      'AUTH:SAVE_ORGANIZATION_MEMBERS',
      'AUTH:SAVE_ORGANIZATION_MEMBERS_SUCCESS',
      'AUTH:SAVE_ORGANIZATION_MEMBERS_FAILED',
    initial.communications.saveOrganizationMembers,
  )
});
