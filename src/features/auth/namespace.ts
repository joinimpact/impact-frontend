import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communications: {
    login: ICommunication;
    resetPassword: ICommunication;
    recoveryPassword: ICommunication;
    createAccount: ICommunication;
    createPassword: ICommunication;
    createOrganization: ICommunication;
    uploadOrgLogo: ICommunication;
  };
  data: {};
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IForgotPasswordForm {
  email: string;
}

export interface IResetPasswordForm {
  password: string;
  passwordRepeat: string;
}

export interface ICreateAccountForm {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  address: string;
}

export interface ICreatePasswordForm {
  password: string;
  passwordRepeat: string;
}

export interface ICreatePasswordActionProps {
  password: string;
}

export interface ICreateNewOrganizationForm {
  organizationName: string;
  website: string;
  address: string;
  description: string;
}

export type ILogin = IAction<'AUTH:LOGIN', ILoginPayload>;
export type ILoginSuccess = IPlainAction<'AUTH:LOGIN_SUCCESS'>;
export type ILoginFailed = IPlainFailAction<'AUTH:LOGIN_FAILED'>;

export type IRecoveryPassword = IAction<'AUTH:RECOVERY_PASSWORD', IForgotPasswordForm>;
export type IRecoveryPasswordSuccess = IPlainAction<'AUTH:RECOVERY_PASSWORD_SUCCESS'>;
export type IRecoveryPasswordFailed = IPlainFailAction<'AUTH:RECOVERY_PASSWORD_FAILED'>;

export type IResetPassword = IAction<'AUTH:RESET_PASSWORD', IResetPasswordForm>;
export type IResetPasswordSuccess = IPlainAction<'AUTH:RESET_PASSWORD_SUCCESS'>;
export type IResetPasswordFailed = IPlainFailAction<'AUTH:RESET_PASSWORD_FAILED'>;

export type ICreateAccount = IAction<'AUTH:CREATE_ACCOUNT', ICreateAccountForm>;
export type ICreateAccountSuccess = IPlainAction<'AUTH:CREATE_ACCOUNT_SUCCESS'>;
export type ICreateAccountFailed = IPlainFailAction<'AUTH:CREATE_ACCOUNT_FAILED'>;

export type ICreatePassword = IAction<'AUTH:CREATE_PASSWORD', ICreatePasswordActionProps>;
export type ICreatePasswordSuccess = IPlainAction<'AUTH:CREATE_PASSWORD_SUCCESS'>;
export type ICreatePasswordFailed = IPlainFailAction<'AUTH:CREATE_PASSWORD_FAILED'>;

export type ICreateOrganization = IAction<'AUTH:CREATE_ORGANIZATION', ICreateNewOrganizationForm>;
export type ICreateOrganizationSuccess = IPlainAction<'AUTH:CREATE_ORGANIZATION_SUCCESS'>;
export type ICreateOrganizationFailed = IPlainFailAction<'AUTH:CREATE_ORGANIZATION_FAILED'>;

export type IUploadOrgLogo = IAction<'AUTH:UPLOAD_ORG_LOGO', File>;
export type IUploadOrgLogoSuccess = IPlainAction<'AUTH:UPLOAD_ORG_LOGO_SUCCESS'>;
export type IUploadOrgLogoFailed = IPlainFailAction<'AUTH:UPLOAD_ORG_LOGO_FAILED'>;

export type Action =
  | ILogin
  | ILoginSuccess
  | ILoginFailed
  | IRecoveryPassword
  | IRecoveryPasswordSuccess
  | IRecoveryPasswordFailed
  | IResetPassword
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | ICreateAccount
  | ICreateAccountSuccess
  | ICreateAccountFailed
  | ICreatePassword
  | ICreatePasswordSuccess
  | ICreatePasswordFailed
  | ICreateOrganization
  | ICreateOrganizationSuccess
  | ICreateOrganizationFailed
  | IUploadOrgLogo
  | IUploadOrgLogoSuccess
  | IUploadOrgLogoFailed;
