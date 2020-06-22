import React from 'react';
import block from 'bem-cn';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import config from 'config/config';
import * as actions from '../../../redux/actions';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Icon, Link } from 'shared/view/elements';
import routes from 'modules/routes';

import './LoginForm.scss';

const b = block('login-form');

interface IOwnProps {
  onSignUpRequest(): void;
}

interface IActionProps {
  login: typeof actions.login;
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

type TProps = IOwnProps & IActionProps & ITranslateProps;

class LoginForm extends React.Component<TProps, IState> {
  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      login: actions.login,
    }, dispatch);
  }

  public state: IState = {
    menuIsOpen: false,
  };

  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('ext-auth-button')}>
          <GoogleLogin
            clientId={config.googleId}
            // buttonText="Login"
            render={this.renderGoogleButton}
            onSuccess={this.handleGoogleSuccess}
            onFailure={this.handelGoogleFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div className={b('ext-auth-button')}>
          <FacebookLogin
            appId={config.facebookId}
            autoLoad={false}
            fields="name,email,picture"
            render={this.renderFacebookButton}
            callback={this.handleFacebookCallback} />
        </div>
        <div className={b('spacer')}>
          <hr/>
        </div>
        <div className={b('actions')}>
          <Button
            className={b('sign-up-button')}
            color="blue"
            size="large"
            onClick={this.handleClickSignUpWithEmail}
          >
            {t('LOGIN-FORM:BUTTON:SIGN-IN-WITH-EMAIL')}
          </Button>
        </div>

        <div className={b('links')}>
          {t('LOGIN-FORM:LINK:LOG-IN-LEFT-PART', {
            link: (
              <Link className={b('login-link')} href={routes.auth['login-with-email'].getPath()}>
                {t('LOGIN-FORM:LINK:LOG-IN-RIGHT-PART')}
              </Link>
            )
          })}
        </div>
      </div>
    );
  }

  @bind
  private handleClickSignUpWithEmail() {
    this.props.onSignUpRequest();
  }

  @bind
  private renderGoogleButton(props: IGoogleRenderProps) {
    const { translate: t } = this.props;
    return (
      <Button className={b('google-button')} color="transparent" size="large" onClick={props.onClick}>
        {t('LOGIN-FORM:STATIC:SIGN-IN-WITH-GOOGLE')}
        <Icon
          className={b('google-icon')}
          src={require('shared/view/images/google-inline.svg')}
        />
      </Button>
    );
  }

  @bind
  private renderFacebookButton(props: IFacebookRenderProps) {
    const { translate: t } = this.props;
    return (
      <Button className={b('facebook-button')} color="transparent" size="large" onClick={props.onClick}>
        {t('LOGIN-FORM:STATIC:SIGN-IN-WITH-FACEBOOK')}
        <Icon
          className={b('facebook-icon')}
          src={require('shared/view/images/facebook-inline.svg')}
        />
      </Button>
    );
  }

  @bind
  private handleGoogleSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    console.log('response: ', response);
  }

  @bind
  private handelGoogleFailure(error: any) {
    console.log('error: ', error);
  }

  @bind
  private handleFacebookCallback(response: any) {
    console.log('[handleFacebookCallback] response: ', response);
  }
}

const withRedux = connect<null, IActionProps, ITranslateProps & IOwnProps>(null, LoginForm.mapDispatch)(LoginForm);
const i18nConnected = i18nConnect<IOwnProps>(withRedux);
export default i18nConnected;
