import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { RouteComponentProps, withRouter } from 'react-router';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { AuthLayout } from '../../components';
import routes from 'modules/routes';

import './LoginFormLayout.scss';

interface IFeatureProps {
  authFeatureEntry: AuthFeatureEntry;
}

const b = block('login-form-layout');

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class LoginFormLayout extends React.Component<TProps> {
  public render() {
    const {
      authFeatureEntry: { containers },
    } = this.props;
    const { LoginForm } = containers;
    return (
      <div className={b()}>
        <AuthLayout>
          <LoginForm onSignUpRequest={this.handleSignUpRequest} />
        </AuthLayout>
      </div>
    );
  }

  @bind
  private handleSignUpRequest() {
    this.props.history.push(routes.auth.register.getPath());
  }
}

const withFeatures = withAsyncFeatures({
  authFeatureEntry: authFeatureLoadEntry,
})(LoginFormLayout);
const i18nConnected = i18nConnect(withFeatures);

export default withRouter(i18nConnected);
