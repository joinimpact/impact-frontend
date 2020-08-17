import React from 'react';
import block from 'bem-cn';
import { IVolunteerRequestProfileMessage } from 'shared/types/responses/chat';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Image } from 'shared/view/elements';
import { UserAvatar } from 'shared/view/components';
import { IOpportunityTagItem } from 'shared/types/responses/npo';

import './VolunteerRequestProfileMessage.scss';

interface IOwnProps {
  message: IVolunteerRequestProfileMessage;
}

const b = block('volunteer-request-profile-message');

type TProps = IOwnProps & ITranslateProps;

class VolunteerRequestProfileMessage extends React.PureComponent<TProps> {
  public render() {
    const { message, translate: t } = this.props;

    return (
      <div className={b()}>
        <div className={b('block')}>
          <div className={b('block-row')}>
            <div className={b('block-row-content')}>
              <div className={b('user')}>
                <div className={b('user-avatar')}>
                  {message.profilePicture > '' ? (
                    <Image src={message.profilePicture}/>
                  ) : (
                    <UserAvatar firstName={message.firstName} lastName={message.lastName}/>
                  )}
                </div>

                <div className={b('user-name')}>
                  {message.firstName} {message.lastName}
                </div>
              </div>

              {message.location && (
                <div className={b('user-location')}>
                  {message.location.city.longName}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={b('block', { control: true })}>
          <div className={b('block-title')}>
            {t('VOLUNTEER-REQUEST-PROFILE-MESSAGE:BLOCK:OVERVIEW')}
          </div>
          <div className={b('block-collapser')}>
            <i className="zi zi-cheveron-down"/>
          </div>
        </div>

        <div className={b('block')}>
          <div className={b('block-row')}>
            <div className={b('label')}>
              {t('VOLUNTEER-REQUEST-PROFILE-MESSAGE:LABEL:STUDENT-AT')}
            </div>
            <div className={b('value')}>
              not yet implemented
            </div>
          </div>

          {(message.tags.length > 0) ? (
            <div className={b('block-row')}>
              <div className={b('label')}>
                {t('VOLUNTEER-REQUEST-PROFILE-MESSAGE:LABEL:AREA-OF-INTEREST')}
              </div>
              <div className={b('value')}>
                <div className={b('tags')}>
                  {message.tags.map((tag: IOpportunityTagItem, index: number) => {
                    return (
                      <div className={b('tags-value')} key={`tag-${index}`}>
                        {tag.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          <div className={b('block-row')}>
            <div className={b('label')}>
              {t('VOLUNTEER-REQUEST-PROFILE-MESSAGE:LABEL:PAST-EXPERIENCE', {
                num: message.previousExperience ? message.previousExperience.count : 0,
              })}
            </div>
            <div className={b('value')}>
              <Button color="grey">
                {t('VOLUNTEER-REQUEST-PROFILE-MESSAGE:BLOCK:VIEW-FULL-PROFILE')}
              </Button>
            </div>
          </div>
        </div>

        <div className={b('block', { control: true })}>
          <div className={b('block-title')}>
            {t('VOLUNTEER-REQUEST-PROFILE-MESSAGE:BLOCK:ADDITIONAL-QUESTION')}
          </div>
          <div className={b('block-collapser')}>
            <i className="zi zi-cheveron-down"/>
          </div>
        </div>

        <div className={b('block')}>
          <div className={b('block-row')}>
            <div className={b('label')}>
              {t('VOLUNTEER-REQUEST-PROFILE-MESSAGE:LABEL:MESSAGE')}
            </div>
            <div className={b('value')}>
              {message.message}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(VolunteerRequestProfileMessage);
