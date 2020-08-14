import React from 'react';
import block from 'bem-cn';
import { IVolunteerRequestAcceptance } from 'shared/types/responses/chat';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button } from 'shared/view/elements';

import './ChatVolunteerRequestAcceptance.scss';

interface IOwnProps {
  message: IVolunteerRequestAcceptance;
}

const b = block('chat-volunteer-request-acceptance');

type TProps = IOwnProps & ITranslateProps;

class ChatVolunteerRequestAcceptance extends React.PureComponent<TProps> {
  public render() {
    const { message, translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('left')}>
          <div className={b('ok-icon')}>
            <i className="zi zi-checkmark"/>
          </div>
        </div>
        <div className={b('right')}>
          <div className={b('right-top')}>
            {t('CHAT-VOLUNTEER-REQUEST-ACCEPTANCE:TITLE:ACCEPTED-BY', {
              userName: (
                <div key="translate-piece" className={b('acceptance-user-name')}>
                  {`${message.accepter.firstName} ${message.accepter.lastName}`}
                </div>
              )
            })}
          </div>
          <div className={b('right-body')}>
            {t('CHAT-VOLUNTEER-REQUEST-ACCEPTANCE:CONTENT:ADDED', {
              userName: message.volunteer.firstName,
              opportunityTitle: message.opportunityTitle,
            })}
          </div>
          <div className={b('right-actions')}>
            <Button color="grey">
              {t('CHAT-VOLUNTEER-REQUEST-ACCEPTANCE:ACTION:VIEW-VOLUNTEER-IN-OPPORTUNITY')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(ChatVolunteerRequestAcceptance);
