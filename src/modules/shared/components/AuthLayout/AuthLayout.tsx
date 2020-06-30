import React from 'react';
import block from 'bem-cn';
import { Link, Logo } from 'shared/view/elements';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import routes from 'modules/routes';

import './AuthLayout.scss';

interface IOwnProps {
  withoutLogo?: boolean;
}

const b = block('auth-layout');

type TProps = IOwnProps & ITranslateProps;

class AuthLayout extends React.PureComponent<TProps> {
  public render() {
    const { translateArray: ta, withoutLogo } = this.props;
    return (
      <div className={b()}>
        <div className={b('content', { 'without-logo': withoutLogo })}>
          {!withoutLogo && (
            <div className={b('content-left')}>
              <Link href={routes.auth.login.getPath()}>
                <div className={b('logo')}>
                  <Logo size={70}/>
                </div>
              </Link>
              <div className={b('name')}>
                {ta('AUTH-LAYOUT:STATIC:TEXT').map(row => (
                  <div className={b('name-row')}>
                    {row}
                  </div>
                ))}
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
