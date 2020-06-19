import React from 'react';
import block from 'bem-cn';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import config from 'config/config';
import * as NS from '../../../namespace';
import * as actions from '../../../redux/actions';
import { loginFormEntry } from '../../../redux/reduxFormEntries';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { InputBaseField } from 'shared/view/redux-form';
import { required, validateEmail } from 'shared/helpers/validators';
import { Button, Error, Icon, Link, Menu } from 'shared/view/elements';

import routes from 'modules/routes';

import './LoginForm.scss';

const b = block('login-form');

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

const { name, fieldNames } = loginFormEntry;

type TProps = IActionProps & ITranslateProps & InjectedFormProps<NS.ILoginForm, ITranslateProps>;


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
    const { error, translate: t } = this.props;
    return (
      <div className={b()}>
        <form onSubmit={this.handleLoginSubmit} className={b('form').toString()}>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.email}
              placeholder={t('LOGIN-FORM:STATIC:EMAIL')}
              type="email"
              validate={[required, validateEmail]}
              autoFocus
            />
          </div>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.password}
              placeholder={t('LOGIN-FORM:STATIC:PASSWORD')}
              type="password"
              validate={[required]}
            />
          </div>

          <div className={b('links')}>
            <Link href={routes.auth.restore.getPath()}>
              {t('LOGIN-FORM:LINK:RESTORE-PASSWORD')}
            </Link>
          </div>

          {error && (
            <div className={b('error')}>
              <Error>{error}</Error>
            </div>
          )}

          <div className={b('actions')}>
            <Button color="grey" isShowPreloader={false}>
              {t('SHARED:BUTTONS:LOGIN')}
            </Button>
          </div>

          <div className={b('external-sign-in')}>
            <div className={b('external-sign-in-caption')}>
              {t('LOGIN-FORM:STATIC:SIGN-IN-WITH')}
            </div>
            <div>
              <GoogleLogin
                clientId={config.googleId}
                // buttonText="Login"
                render={this.renderGoogleIcon}
                onSuccess={this.handleGoogleSuccess}
                onFailure={this.handelGoogleFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div>
              <FacebookLogin
                appId={config.facebookId}
                autoLoad={false}
                fields="name,email,picture"
                render={this.renderFacebookIcon}
                callback={this.handleFacebookCallback} />
            </div>
          </div>

          <div className={b('spacer')}>
            <hr/>
          </div>

          <div className={b('actions')}>
            <Menu
              btn={(
                <Button color="blue" size="large">
                  {t('LOGIN-FORM:BUTTON:CREATE-ACCOUNT')}
                </Button>
              )}
              isOpen={this.state.menuIsOpen}
              onBtnClicked={this.handleMenuBtnClicked}
              onOutsideClicked={this.handleMenuOutsideClicked}
            >
              <div className={b('menu-content')}>
                <div className={b('menu-item')} onClick={this.handleCreateAccountVolunteer}>
                  {t('LOGIN-FORM:MENU-ITEM:VOLUNTEER')}
                </div>
                <div className={b('menu-item')} onClick={this.handleCreateAccountNonprofitOrganization}>
                  {t('LOGIN-FORM:MENU-ITEM:NONPROFIT-ORGANIZATION')}
                </div>
              </div>
            </Menu>
          </div>
        </form>
      </div>
    );
  }

  @bind
  private handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, login } = this.props;

    handleSubmit(async data => {
      login({
        password: data.password,
        email: data.email,
      });
    })(e);
  }

  @bind
  private renderGoogleIcon(props: IGoogleRenderProps) {
    return (
      <div className={b('google-icon')} onClick={props.onClick}>
        <Icon
          src={require('shared/view/images/google-inline.svg')}
        />
      </div>
    );
  }

  @bind
  private renderFacebookIcon(props: IFacebookRenderProps) {
    return (
      <div className={b('facebook-icon')} onClick={props.onClick}>
        <Icon
          src={require('shared/view/images/facebook-inline.svg')}
        />
      </div>
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

  @bind
  private handleMenuBtnClicked() {
    this.setState({ menuIsOpen: true });
  }

  @bind
  private handleMenuOutsideClicked() {
    this.setState({ menuIsOpen: false  });
  }

  @bind
  private handleCreateAccountVolunteer() {
    console.log('[handleCreateAccountVolunteer]');
  }

  @bind
  private handleCreateAccountNonprofitOrganization() {
    console.log('[handleCreateAccountNonprofitOrganization]');
  }
}

const withRedux = connect<null, IActionProps, ITranslateProps>(null, LoginForm.mapDispatch)(LoginForm);
const withForm = reduxForm<NS.ILoginForm, ITranslateProps>({
  form: name,
})(withRedux);
const i18nConnected = i18nConnect(withForm);
export default i18nConnected;
