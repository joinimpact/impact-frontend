import React from 'react';
import block from 'bem-cn';
import { Logo } from 'shared/view/elements';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './AuthLayout.scss';

interface IOwnProps {
  withoutLogo?: boolean;
}

const b = block('auth-layout');

type TProps = IOwnProps & ITranslateProps;

class AuthLayout extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, withoutLogo } = this.props;
    return (
      <div className={b()}>
        <div className={b('content', { 'without-logo': withoutLogo })}>
          {!withoutLogo && (
            <div className={b('content-left')}>
              <div className={b('logo')}>
                <Logo size={70}/>
              </div>
              <div className={b('name')}>
                {t('LOGIN-FORM:STATIC:TEXT')}
              </div>
            </div>
          )}
          <div className={b('content-right')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(AuthLayout);
