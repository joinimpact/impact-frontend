import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communications']>({
	login: makeCommunicationReducer<NS.ILogin, NS.ILoginSuccess, NS.ILoginFailed>(
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
	resetPassword: makeCommunicationReducer<NS.IResetPassword, NS.IResetPasswordSuccess, NS.IResetPasswordFailed>(
		'AUTH:RESET_PASSWORD',
		'AUTH:RESET_PASSWORD_SUCCESS',
		'AUTH:RESET_PASSWORD_FAILED',
		initial.communications.resetPassword,
	),
	createAccount: makeCommunicationReducer<NS.ICreateAccount, NS.ICreateAccountSuccess, NS.ICreateAccountFailed>(
		'AUTH:CREATE_ACCOUNT',
		'AUTH:CREATE_ACCOUNT_SUCCESS',
		'AUTH:CREATE_ACCOUNT_FAILED',
		initial.communications.createAccount,
	),
	createPassword: makeCommunicationReducer<NS.ICreatePassword, NS.ICreatePasswordSuccess, NS.ICreatePasswordFailed>(
		'AUTH:CREATE_PASSWORD',
		'AUTH:CREATE_PASSWORD_SUCCESS',
		'AUTH:CREATE_PASSWORD_FAILED',
		initial.communications.createPassword,
	),
	putFacebookOauthToken: makeCommunicationReducer<
	NS.IPutFacebookOauthToken,
	NS.IPutFacebookOauthTokenSuccess,
	NS.IPutFacebookOauthTokenFailed
	>(
		'AUTH:PUT_FACEBOOK_OAUTH_TOKEN',
		'AUTH:PUT_FACEBOOK_OAUTH_TOKEN_SUCCESS',
		'AUTH:PUT_FACEBOOK_OAUTH_TOKEN_FAILED',
		initial.communications.putFacebookOauthToken,
	),
	putGoogleOauthToken: makeCommunicationReducer<
	NS.IPutGoogleOauthToken,
	NS.IPutGoogleOauthTokenSuccess,
	NS.IPutGoogleOauthTokenFailed
	>(
		'AUTH:PUT_GOOGLE_OAUTH_TOKEN',
		'AUTH:PUT_GOOGLE_OAUTH_TOKEN_SUCCESS',
		'AUTH:PUT_GOOGLE_OAUTH_TOKEN_FAILED',
		initial.communications.putGoogleOauthToken,
	),
	checkEmailFree: makeCommunicationReducer<NS.ICheckEmailFree, NS.ICheckEmailFreeSuccess, NS.ICheckEmailFreeFailed>(
		'AUTH:CHECK_EMAIL_FREE',
		'AUTH:CHECK_EMAIL_FREE_SUCCESS',
		'AUTH:CHECK_EMAIL_FREE_FAILED',
		initial.communications.checkEmailFree,
	),
});
