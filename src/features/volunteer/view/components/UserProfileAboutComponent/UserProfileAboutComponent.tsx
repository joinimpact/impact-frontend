import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IUser } from 'shared/types/models/user';

import './UserProfileAboutComponent.scss';

interface IOwnProps {
  user: IUser;
}

const b = block('user-profile-about-component');

type TProps = IOwnProps & ITranslateProps;

class UserProfileAboutComponent extends React.PureComponent<TProps> {
  public render() {
    const { user, translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('row')}>
          <div className={b('label')}>
            {t('USER-PROFILE-ABOUT-COMPONENT:LABEL:LOCATION')}
          </div>
          <div className={b('value')}>
            {Boolean(user.location) ? user.location.description : null}
          </div>
        </div>

        {Boolean(user.school) && (
          <div className={b('row')}>
            <div className={b('label')}>
              {t('USER-PROFILE-ABOUT-COMPONENT:LABEL:SCHOOL')}
            </div>
            <div className={b('value')}>
              {user.school}
            </div>
          </div>
        )}

        {Boolean(user.email) && (
          <div className={b('row')}>
            <div className={b('label')}>
              {t('USER-PROFILE-ABOUT-COMPONENT:LABEL:CONTACT')}
            </div>
            <div className={b('value')}>
              {user.email}
            </div>
          </div>
        )}

        <div className={b('row')}>
          <div className={b('label')}>
            {t('USER-PROFILE-ABOUT-COMPONENT:LABEL:AREAS-OF-INTEREST')}
          </div>
          <div className={b('value')}>
            <div className={b('tags')}>
              {user.tags.map((tag: string, index: number) => (
                <div className={b('tag')} key={`tag-${index}`}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(UserProfileAboutComponent);
