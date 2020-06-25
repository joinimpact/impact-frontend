import React from 'react';
import block from 'bem-cn';
import { RouteComponentProps, withRouter } from 'react-router';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';
import { AuthLayout } from 'modules/Auth/view/components';

import './ForgotPasswordModule.scss';

interface IFeatureProps {
  authFeatureEntry: AuthFeatureEntry;
}

const b = block('forgot-password-module');

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class ForgotPasswordModule extends React.PureComponent<TProps> {
  public render() {
    const {
      authFeatureEntry: { containers },
    } = this.props;
    const { ForgotPasswordContainer } = containers;
    return (
      <div className={b()}>
        <AuthLayout>
          <ForgotPasswordContainer />
        </AuthLayout>
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  authFeatureEntry: authFeatureLoadEntry,
})(ForgotPasswordModule);

const i18nConnected = i18nConnect(withFeatures);

export default withRouter(i18nConnected);
