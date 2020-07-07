import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import {
  IAddressLocation,
  ICreateAccountRequest,
  IFacebookOauthRequest,
  IGoogleOauthRequest,
} from 'shared/types/requests/auth';
import { IFacebookOauthResponse, IGoogleOauthResponse } from 'shared/types/responses/auth';
import { IUser } from 'shared/types/models/user';
import { IGoogleAddressSuggestion } from 'shared/view/redux-form/CountryField/CountryField';

export interface IReduxState {
  communications: {
    login: ICommunication;
    resetPassword: ICommunication;
    recoveryPassword: ICommunication;
    createAccount: ICommunication;
    createPassword: ICommunication;
    putFacebookOauthToken: ICommunication;
    putGoogleOauthToken: ICommunication;
    checkEmailFree: ICommunication;
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
  token: string;
  password: string;
  passwordRepeat: string;
}

export interface ICreateAccountForm {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  address: IGoogleAddressSuggestion;
}

export interface ICreateAccountValues extends Omit<ICreateAccountForm, 'address'> {
  address: IAddressLocation;
}

export interface ICreatePasswordForm {
  password: string;
  passwordRepeat: string;
}

export interface ICreatePasswordActionProps {
  password: string;
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

export type ICreateAccount = IAction<'AUTH:CREATE_ACCOUNT', ICreateAccountRequest>;
export type ICreateAccountSuccess = IAction<'AUTH:CREATE_ACCOUNT_SUCCESS', IUser>;
export type ICreateAccountFailed = IPlainFailAction<'AUTH:CREATE_ACCOUNT_FAILED'>;

export type ICreatePassword = IAction<'AUTH:CREATE_PASSWORD', ICreatePasswordActionProps>;
export type ICreatePasswordSuccess = IPlainAction<'AUTH:CREATE_PASSWORD_SUCCESS'>;
export type ICreatePasswordFailed = IPlainFailAction<'AUTH:CREATE_PASSWORD_FAILED'>;

export type IPutFacebookOauthToken = IAction<'AUTH:PUT_FACEBOOK_OAUTH_TOKEN', IFacebookOauthRequest>;
export type IPutFacebookOauthTokenSuccess = IAction<'AUTH:PUT_FACEBOOK_OAUTH_TOKEN_SUCCESS', IFacebookOauthResponse>;
export type IPutFacebookOauthTokenFailed = IPlainFailAction<'AUTH:PUT_FACEBOOK_OAUTH_TOKEN_FAILED'>;

export type IPutGoogleOauthToken = IAction<'AUTH:PUT_GOOGLE_OAUTH_TOKEN', IGoogleOauthRequest>;
export type IPutGoogleOauthTokenSuccess = IAction<'AUTH:PUT_GOOGLE_OAUTH_TOKEN_SUCCESS', IGoogleOauthResponse>;
export type IPutGoogleOauthTokenFailed = IPlainFailAction<'AUTH:PUT_GOOGLE_OAUTH_TOKEN_FAILED'>;

export type ICheckEmailFree = IAction<'AUTH:CHECK_EMAIL_FREE', string>;
export type ICheckEmailFreeSuccess = IAction<'AUTH:CHECK_EMAIL_FREE_SUCCESS', boolean>;
export type ICheckEmailFreeFailed = IPlainFailAction<'AUTH:CHECK_EMAIL_FREE_FAILED'>;

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
  | IPutFacebookOauthToken
  | IPutFacebookOauthTokenSuccess
  | IPutFacebookOauthTokenFailed
  | IPutGoogleOauthToken
  | IPutGoogleOauthTokenSuccess
  | IPutGoogleOauthTokenFailed
  | ICheckEmailFree
  | ICheckEmailFreeSuccess
  | ICheckEmailFreeFailed;
