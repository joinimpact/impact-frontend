import * as NS from '../../namespace';
import makeCommunicationActionCreators from 'shared/redux/communication/makeCommunicationActionCreators';

export const {
  execute: login,
  completed: loginSuccess,
  failed: loginFailed,
} = makeCommunicationActionCreators<
  NS.ILogin,
  NS.ILoginSuccess,
  NS.ILoginFailed
  >(
    'AUTH:LOGIN',
  'AUTH:LOGIN_SUCCESS',
  'AUTH:LOGIN_FAILED',
);

export const {
  execute: recoveryPassword,
  completed: recoveryPasswordComplete,
  failed: recoveryPasswordFailed,
} = makeCommunicationActionCreators<
  NS.IRecoveryPassword,
  NS.IRecoveryPasswordSuccess,
  NS.IRecoveryPasswordFailed
  >(
    'AUTH:RECOVERY_PASSWORD',
    'AUTH:RECOVERY_PASSWORD_SUCCESS',
    'AUTH:RECOVERY_PASSWORD_FAILED',
);

export const {
  execute: resetPassword,
  completed: resetPasswordComplete,
  failed: resetPasswordFailed,
} = makeCommunicationActionCreators<
  NS.IResetPassword,
  NS.IResetPasswordSuccess,
  NS.IResetPasswordFailed
  >(
  'AUTH:RESET_PASSWORD',
  'AUTH:RESET_PASSWORD_SUCCESS',
  'AUTH:RESET_PASSWORD_FAILED'
);

export const {
  execute: createAccount,
  completed: createAccountComplete,
  failed: createAccountFailed,
} = makeCommunicationActionCreators<
  NS.ICreateAccount,
  NS.ICreateAccountSuccess,
  NS.ICreateAccountFailed
  >(
    'AUTH:CREATE_ACCOUNT',
    'AUTH:CREATE_ACCOUNT_SUCCESS',
    'AUTH:CREATE_ACCOUNT_FAILED'
);

export const {
  execute: createPassword,
  completed: createPasswordComplete,
  failed: createPasswordFailed,
} = makeCommunicationActionCreators<
  NS.ICreatePassword,
  NS.ICreatePasswordSuccess,
  NS.ICreatePasswordFailed
  >(
    'AUTH:CREATE_PASSWORD',
    'AUTH:CREATE_PASSWORD_SUCCESS',
    'AUTH:CREATE_PASSWORD_FAILED',
);

export const {
  execute: createNewOrganization,
  completed: createNewOrganizationComplete,
  failed: createNewOrganizationFailed
} = makeCommunicationActionCreators<
  NS.ICreateOrganization,
  NS.ICreateOrganizationSuccess,
  NS.ICreateOrganizationFailed
  >(
  'AUTH:CREATE_ORGANIZATION',
  'AUTH:CREATE_ORGANIZATION_SUCCESS',
  'AUTH:CREATE_ORGANIZATION_FAILED',
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
  'AUTH:UPLOAD_ORG_LOGO',
  'AUTH:UPLOAD_ORG_LOGO_SUCCESS',
  'AUTH:UPLOAD_ORG_LOGO_FAILED',
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
  'AUTH:SAVE_ORGANIZATION_TAGS',
  'AUTH:SAVE_ORGANIZATION_TAGS_SUCCESS',
  'AUTH:SAVE_ORGANIZATION_TAGS_FAILED',
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
  'AUTH:SAVE_ORGANIZATION_MEMBERS',
  'AUTH:SAVE_ORGANIZATION_MEMBERS_SUCCESS',
  'AUTH:SAVE_ORGANIZATION_MEMBERS_FAILED',
);

export const {
  execute: saveVolunteerPersonalInfo,
  completed: saveVolunteerPersonalInfoComplete,
  failed: saveVolunteerPersonalInfoFailed,
} = makeCommunicationActionCreators<
  NS.ISaveVolunteerPersonalInfo,
  NS.ISaveVolunteerPersonalInfoSuccess,
  NS.ISaveVolunteerPersonalInfoFailed
  >(
  'AUTH:SAVE_VOLUNTEER_PERSONAL_INFO',
  'AUTH:SAVE_VOLUNTEER_PERSONAL_INFO_SUCCESS',
  'AUTH:SAVE_VOLUNTEER_PERSONAL_INFO_FAILED',
);

export const {
  execute: uploadVolunteerLogo,
  completed: uploadVolunteerLogoComplete,
  failed: uploadVolunteerLogoFailed,
} = makeCommunicationActionCreators<
  NS.IUploadVolunteerLogo,
  NS.IUploadVolunteerLogoSuccess,
  NS.IUploadVolunteerLogoFailed
  >(
  'AUTH:UPLOAD_VOLUNTEER_LOGO',
  'AUTH:UPLOAD_VOLUNTEER_LOGO_SUCCESS',
  'AUTH:UPLOAD_VOLUNTEER_LOGO_FAILED',
);

export const {
  execute: saveVolunteerAreasOfInterest,
  completed: saveVolunteerAreasOfInterestComplete,
  failed: saveVolunteerAreasOfInterestFailed,
} = makeCommunicationActionCreators<
  NS.ISaveVolunteerAreaOfIntetest,
  NS.ISaveVolunteerAreaOfIntetestSuccess,
  NS.ISaveVolunteerAreaOfIntetestFailed
  >(
  'AUTH:SAVE_VOLUNTEER_AREA_OF_INTEREST',
  'AUTH:SAVE_VOLUNTEER_AREA_OF_INTEREST_SUCCESS',
  'AUTH:SAVE_VOLUNTEER_AREA_OF_INTEREST_FAILED',
);
