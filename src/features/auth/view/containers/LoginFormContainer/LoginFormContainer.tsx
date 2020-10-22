import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';

import config from 'config';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Icon, Link, Error } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';
import routes from 'modules/routes';
import { IFacebookResponse } from 'shared/types/models/facebook';
import { IAppReduxState } from 'shared/types/app';
import { loginFormEntry } from '../../../redux/reduxFormEntries';
import * as NS from '../../../namespace';
import { required, validateEmail } from 'shared/helpers/validators';

import './LoginFormContainer.scss';
import { InputBaseField } from 'shared/view/redux-form';
import { InjectedFormProps, reduxForm } from 'redux-form';

const b = block('login-form');

interface IOwnProps {
	onSignUpRequest(): void;
}

interface IStateProps {
	putFacebookOauthTokenCommunication: ICommunication;
	putGoogleOauthTokenCommunication: ICommunication;
	loginCommunication: ICommunication;
}

interface IActionProps {
	login: typeof actions.login;
	putFacebookOauthToken: typeof actions.putFacebookOauthToken;
	putGoogleOauthToken: typeof actions.putGoogleOauthToken;
}

interface IState {
	menuIsOpen: boolean;
}

interface IGoogleRenderProps {
	onClick: () => void;
	disabled?: boolean;
}

interface IFacebookRenderProps {
	onClick: () => void;
	isDisabled?: boolean;
	isProcessin?: boolean;
	isSdkLoaded?: boolean;
}

type TRouteProps = RouteComponentProps<{}>;
type TProps = IOwnProps &
IActionProps &
IStateProps &
ITranslateProps &
TRouteProps &
InjectedFormProps<NS.ILoginForm, IOwnProps & ITranslateProps>;

const { name, fieldNames } = loginFormEntry;

class LoginFormContainer extends React.Component<TProps, IState> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			putFacebookOauthTokenCommunication: selectors.selectCommunication(state, 'putFacebookOauthToken'),
			putGoogleOauthTokenCommunication: selectors.selectCommunication(state, 'putGoogleOauthToken'),
			loginCommunication: selectors.selectCommunication(state, 'login'),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				login: actions.login,
				putFacebookOauthToken: actions.putFacebookOauthToken,
				putGoogleOauthToken: actions.putGoogleOauthToken,
			},
			dispatch,
		);
	}

	public state: IState = {
		menuIsOpen: false,
	};

	public render() {
		const {
			translate: t,
			putFacebookOauthTokenCommunication,
			putGoogleOauthTokenCommunication,
			loginCommunication,
			error,
		} = this.props;

		return (
			<div className={b()}>
				<div className={b('main-wrapper')}>
					<div className={b('header-wrapper')}>
						<h3 className={b('header')}>{t('LOGIN-FORM:STATIC:FORM-HEADER')}</h3>
						<p className={b('description')}>{t('LOGIN-FORM:STATIC:FORM-DESCRIPTION')}</p>
					</div>
					<form onSubmit={this.handleLoginSubmit} className={b('form')}>
						<div className={b('field')}>
							<span className={b('input-label')}>{t('LOGIN-FORM:STATIC:EMAIL')}</span>
							<InputBaseFieldWrapper
								component={InputBaseField}
								name={fieldNames.email}
								placeholder={t('LOGIN-FORM:STATIC:EMAIL-PLACEHOLDER')}
								type="email"
								validate={[required, validateEmail]}
								autoFocus
							/>
						</div>
						<div className={b('field')}>
							<span className={b('input-label')}>{t('LOGIN-FORM:STATIC:PASSWORD')}</span>
							<InputBaseFieldWrapper
								component={InputBaseField}
								name={fieldNames.password}
								placeholder={t('LOGIN-FORM:STATIC:PASSWORD-PLACEHOLDER')}
								type="password"
								validateOnChange
								validate={[required]}
							/>
						</div>

						{error && (
							<div className={b('error')}>
								<Error>{error}</Error>
							</div>
						)}

						{loginCommunication.error && (
							<div className={b('error')}>
								<Error>{loginCommunication.error}</Error>
							</div>
						)}

						<div className={b('actions')}>
							<div className={b('actions-left')}>
								<GoogleLogin
									clientId={config.googleId}
									// buttonText="Login"
									redirectUri={'/auth/google-auth'}
									render={this.renderGoogleButton}
									onSuccess={this.handleGoogleSuccess}
									onFailure={this.handelGoogleFailure}
									cookiePolicy={'single_host_origin'}
								/>
								<FacebookLogin
									appId={config.facebookId}
									autoLoad={false}
									fields="name,email,picture"
									render={this.renderFacebookButton}
									callback={this.handleFacebookCallback}
								/>
							</div>
							<div className={b('actions-right')}>
								<Button color="blue" minWidth={true} isShowPreloader={loginCommunication.isRequesting}>
									{t('SHARED:BUTTONS:LOGIN')}
								</Button>
							</div>
						</div>
					</form>

					{putFacebookOauthTokenCommunication && putFacebookOauthTokenCommunication.error && (
						<div className={b('error')}>
							<Error>{putFacebookOauthTokenCommunication.error}</Error>
						</div>
					)}

					{putGoogleOauthTokenCommunication && putGoogleOauthTokenCommunication.error && (
						<div className={b('error')}>
							<Error>{putGoogleOauthTokenCommunication.error}</Error>
						</div>
					)}
				</div>
				<Link href={routes.auth.forgot.getPath()}>
					<div className={b('footer')}>
						<i className="zi zi-link" />
						<span className={b('forgot-password-span')}>{t('LOGIN-WITH-EMAIL-CONTAINER:LINK:FORGOT-PASSWORD')}</span>
					</div>
				</Link>
			</div>
		);
	}

	@bind
	private handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
		const { handleSubmit, login } = this.props;

		handleSubmit(async (data) => {
			login({
				password: data.password,
				email: data.email,
			});
		})(e);
	}

	@bind
	private renderGoogleButton(props: IGoogleRenderProps) {
		return (
			<Button className={b('google-button')} type="button" color="transparent" size="large" onClick={props.onClick}>
				<Icon className={b('google-icon')} src={require('shared/view/images/google-inline.svg')} />
			</Button>
		);
	}

	@bind
	private renderFacebookButton(props: IFacebookRenderProps) {
		return (
			<Button className={b('facebook-button')} type="button" color="transparent" size="large" onClick={props.onClick}>
				<Icon className={b('facebook-icon')} src={require('shared/view/images/facebook-inline.svg')} />
			</Button>
		);
	}

	@bind
	private handleGoogleSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
		// private handleGoogleSuccess(response: IGoogleResponse) {
		// console.log('Google OAuth response: ', JSON.stringify(response, null, 2));
		if (response && (response as GoogleLoginResponse).accessToken) {
			this.props.putGoogleOauthToken({
				token: (response as GoogleLoginResponse).accessToken,
			});
		}
	}

	@bind
	private handelGoogleFailure(error: any) {
		// console.log('error: ', error);
	}

	@bind
	private handleFacebookCallback(response: IFacebookResponse) {
		// const code = JSON.parse(atob(response.signedRequest.split('.')[1])).code;

		this.props.putFacebookOauthToken({
			token: response.accessToken,
		});
	}

	/* @bind
  private handleGoToLoginWithEmail(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.props.history.push(routes.auth['login-with-email'].getPath());
  }*/
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps & IOwnProps>(
	LoginFormContainer.mapStateToProps,
	LoginFormContainer.mapDispatch,
)(LoginFormContainer);
const withForm = reduxForm<NS.ILoginForm, IOwnProps & ITranslateProps>({
	form: name,
})(withRouter(withRedux));
export default i18nConnect<IOwnProps>(withForm);
