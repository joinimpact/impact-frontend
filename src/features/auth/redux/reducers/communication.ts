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
  ),
  saveVolunteerPersonalInformation: makeCommunicationReducer<
    NS.ISaveVolunteerPersonalInfo,
    NS.ISaveVolunteerPersonalInfoSuccess,
    NS.ISaveVolunteerPersonalInfoFailed
    >(
      'AUTH:SAVE_VOLUNTEER_PERSONAL_INFO',
      'AUTH:SAVE_VOLUNTEER_PERSONAL_INFO_SUCCESS',
      'AUTH:SAVE_VOLUNTEER_PERSONAL_INFO_FAILED',
    initial.communications.saveVolunteerPersonalInformation,
  ),
  uploadVolunteerLogo: makeCommunicationReducer<
    NS.IUploadVolunteerLogo,
    NS.IUploadVolunteerLogoSuccess,
    NS.IUploadVolunteerLogoFailed
    >(
      'AUTH:UPLOAD_VOLUNTEER_LOGO',
      'AUTH:UPLOAD_VOLUNTEER_LOGO_SUCCESS',
      'AUTH:UPLOAD_VOLUNTEER_LOGO_FAILED',
    initial.communications.uploadVolunteerLogo,
  ),
  saveVolunteerAreasOfInterest: makeCommunicationReducer<
    NS.ISaveVolunteerAreaOfIntetest,
    NS.ISaveVolunteerAreaOfIntetestSuccess,
    NS.ISaveVolunteerAreaOfIntetestFailed
    >(
    'AUTH:SAVE_VOLUNTEER_AREA_OF_INTEREST',
    'AUTH:SAVE_VOLUNTEER_AREA_OF_INTEREST_SUCCESS',
    'AUTH:SAVE_VOLUNTEER_AREA_OF_INTEREST_FAILED',
    initial.communications.saveVolunteerAreasOfInterest,
  ),
});
