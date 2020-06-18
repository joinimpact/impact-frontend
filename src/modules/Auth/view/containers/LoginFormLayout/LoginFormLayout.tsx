import React from 'react';
import block from 'bem-cn';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Logo } from 'shared/view/elements';

import './LoginFormLayout.scss';

interface IFeatureProps {
  authFeatureEntry: AuthFeatureEntry;
}

const b = block('login-form-layout');

type TProps = IFeatureProps & ITranslateProps;

class LoginFormLayout extends React.Component<TProps> {
  public render() {
    const {
      authFeatureEntry: { containers },
    } = this.props;
    const { LoginForm } = containers;
    return (
      <div className={b()}>
        <div className={b('caption')}>
          <Logo/>
        </div>
        <LoginForm />
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  authFeatureEntry: authFeatureLoadEntry,
})(LoginFormLayout);
const i18nConnected = i18nConnect(withFeatures);

export default i18nConnected;
