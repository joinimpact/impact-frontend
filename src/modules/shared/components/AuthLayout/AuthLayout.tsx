import React from 'react';
import block from 'bem-cn';
import { Link, Logo } from 'shared/view/elements';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './AuthLayout.scss';

interface IOwnProps {
  withoutLogo?: boolean;
}

const b = block('auth-layout');

type TProps = IOwnProps & ITranslateProps;

class AuthLayout extends React.PureComponent<TProps> {
  public render() {
    // const { translateArray: ta, withoutLogo } = this.props;
    const { translateArray: ta } = this.props;
    return (
      <div className={b()}>
        <div className={b('top-bar')}>
          <Link href="/">
            <div className={b('logo')}>
              <Logo />
            </div>
          </Link>
        </div>
        <div className={b('greeting-text')}>
          <div className={b('greeting-text-block')}>
            {ta('AUTH-LAYOUT:STATIC:TEXT').map((row: string, index: number) => (
              <div className={b('greeting-text-row')} key={`row-${index}`}>
                {row}
              </div>
            ))}
          </div>
        </div>
        <div className={b('content')}>
          <div className={b('content-body')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(AuthLayout);
