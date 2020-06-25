import React from 'react';
import block from 'bem-cn';
import { RouteComponentProps, withRouter } from 'react-router';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';
import { AuthLayout } from 'modules/Auth/view/components';
import { bind } from 'decko';

interface IFeatureProps {
  authFeatureEntry: AuthFeatureEntry;
}

const b = block('sign-up-module');

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class SignUpModule extends React.PureComponent<TProps> {
  public render() {
    const {
      authFeatureEntry: { containers },
    } = this.props;
    const { SignUpFormContainer } = containers;
    return (
      <div className={b()}>
        <AuthLayout withoutLogo>
          <SignUpFormContainer onFinish={this.handleSignUpFinish}/>
        </AuthLayout>
      </div>
    );
  }

  @bind
  private handleSignUpFinish() {
    console.log('[handleSignUpFinish]');
  }
}

const withFeatures = withAsyncFeatures({
  authFeatureEntry: authFeatureLoadEntry,
})(SignUpModule);

const i18nConnected = i18nConnect(withFeatures);

export default withRouter(i18nConnected);
