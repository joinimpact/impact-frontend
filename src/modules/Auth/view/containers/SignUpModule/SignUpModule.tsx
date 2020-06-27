import React from 'react';
import block from 'bem-cn';
import { RouteComponentProps, withRouter } from 'react-router';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';
import { AuthLayout } from 'modules/Auth/view/components';
import { bind } from 'decko';
import { TUserType } from 'shared/types/app';
import routes from 'modules/routes';

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
  private handleSignUpFinish(userType: TUserType) {
    switch (userType) {
      case 'nonprofit':
        this.props.history.push(routes.dashboard.organization['registration-done'].getPath());
        break;
      case 'volunteer':
        this.props.history.push(routes.dashboard.user['registration-done'].getPath());
    }
  }
}

const withFeatures = withAsyncFeatures({
  authFeatureEntry: authFeatureLoadEntry,
})(SignUpModule);

const i18nConnected = i18nConnect(withFeatures);

export default withRouter(i18nConnected);
