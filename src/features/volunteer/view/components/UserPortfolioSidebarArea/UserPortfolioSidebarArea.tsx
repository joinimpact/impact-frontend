import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button } from 'shared/view/elements';
import { IUser } from 'shared/types/models/user';

import './UserPortfolioSidebarArea.scss';

interface IOwnProps {
  user: IUser;
}

const b = block('user-portfolio-sidebar-area');

type TProps = IOwnProps & ITranslateProps;

class UserPortfolioSidebarArea extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, user } = this.props;
    return (
      <div className={b()}>
        <div className={b('avatar')}>
          {user.avatarUrl && (
            <img className={b('avatar-image')} src={user.avatarUrl}/>
          )}
        </div>
        <div className={b('user-name')}>
          {user.firstName} {user.lastName}
        </div>
        <div className={b('volunteered-since')}>
          {t('USER-PORTFOLIO-AREA:LABEL:VOLUNTEERED-SINCE', {
            year: user.since,
          })}
        </div>
        <div className={b('actions')}>
          <Button color="grey">
            {t('USER-PORTFOLIO-AREA:BUTTON:EDIT-PROFILE')}
          </Button>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(UserPortfolioSidebarArea);
