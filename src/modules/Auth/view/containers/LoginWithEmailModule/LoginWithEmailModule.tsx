import React from 'react';
import block from 'bem-cn';
import { AuthLayout } from 'modules/Auth/view/components';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';

import './LoginWithEmailModule.scss';

interface IFeatureProps {
  authFeatureEntry: AuthFeatureEntry;
}

const b = block('login-with-email-module');

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class LoginWithEmailModule extends React.PureComponent<TProps> {
  public render() {
    const {
      authFeatureEntry: { containers },
    } = this.props;
    const { LoginWithEmailContainer } = containers;
    return (
      <div className={b()}>
        <AuthLayout>
          <LoginWithEmailContainer/>
        </AuthLayout>
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  authFeatureEntry: authFeatureLoadEntry,
})(LoginWithEmailModule);

const i18nConnected = i18nConnect(withFeatures);

export default withRouter(i18nConnected);
