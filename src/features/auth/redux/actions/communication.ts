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
  execute: putFacebookOauthToken,
  completed: putFacebookOauthTokenComplete,
  failed: putFacebookOauthTokenFailed,
} = makeCommunicationActionCreators<
  NS.IPutFacebookOauthToken,
  NS.IPutFacebookOauthTokenSuccess,
  NS.IPutFacebookOauthTokenFailed
  >(
  'AUTH:PUT_FACEBOOK_OAUTH_TOKEN',
  'AUTH:PUT_FACEBOOK_OAUTH_TOKEN_SUCCESS',
  'AUTH:PUT_FACEBOOK_OAUTH_TOKEN_FAILED',
);

export const {
  execute: putGoogleOauthToken,
  completed: putGoogleOauthTokenComplete,
  failed: putGoogleOauthTokenFailed,
} = makeCommunicationActionCreators<
  NS.IPutGoogleOauthToken,
  NS.IPutGoogleOauthTokenSuccess,
  NS.IPutGoogleOauthTokenFailed
  >(
  'AUTH:PUT_GOOGLE_OAUTH_TOKEN',
  'AUTH:PUT_GOOGLE_OAUTH_TOKEN_SUCCESS',
  'AUTH:PUT_GOOGLE_OAUTH_TOKEN_FAILED',
);

export const {
  execute: checkEmailFree,
  completed: checkEmailFreeComplete,
  failed: checkEmailFreeFailed,
} = makeCommunicationActionCreators<
  NS.ICheckEmailFree,
  NS.ICheckEmailFreeSuccess,
  NS.ICheckEmailFreeFailed
  >(
    'AUTH:CHECK_EMAIL_FREE',
    'AUTH:CHECK_EMAIL_FREE_SUCCESS',
    'AUTH:CHECK_EMAIL_FREE_FAILED',
);
