import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { TUserType } from 'shared/types/app';

import './SelectUserType.scss';

interface IOwnProps {
  onUserTypeSelected(userType: TUserType): void;
}

const b = block('select-user-type');

type TProps = IOwnProps & ITranslateProps;

class SelectUserType extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('caption')}>
          {t('SIGN-UP-FORM-CONTAINER:STATIC:SELECT-USER-TYPE-CAPTION')}
        </div>
        <div className={b('row')}>
          <div className={b('volunteer')} onClick={this.handleSelectUserType.bind(this, 'volunteer')}>
            {t('SIGN-UP-FORM-CONTAINER:STATIC:VOLUNTEER-TYPE').toUpperCase()}
          </div>
          <div className={b('nonprofit')} onClick={this.handleSelectUserType.bind(this, 'npo')}>
            {t('SIGN-UP-FORM-CONTAINER:STATIC:NONPROFIT-TYPE').toUpperCase()}
          </div>
        </div>
      </div>
    );
  }

  @bind
  private handleSelectUserType(userType: TUserType) {
    this.props.onUserTypeSelected(userType);
  }
}

export default i18nConnect<IOwnProps>(SelectUserType);
