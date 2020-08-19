import React from 'react';
import block from 'bem-cn';
import { IRequestHoursMessage } from 'shared/types/responses/chat';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';

import './ChatHoursRequestedMessage.scss';

interface IOwnProps {
  message: IRequestHoursMessage;
  currentConversation: IConversationResponseItem;
}

const b = block('chat-hours-requested-message');

type TProps = IOwnProps & ITranslateProps;

class ChatHoursRequestedMessage extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, message } = this.props;
    const status = !message.accepted && !message.declined ?
      t('CHAT-HOURS-REQUESTED-MESSAGE:STATUS:PENDING') :
      (message.accepted ?
        t('CHAT-HOURS-REQUESTED-MESSAGE:STATUS:ACCEPTED') :
        t('CHAT-HOURS-REQUESTED-MESSAGE:STATUS:DECLINED')
      );
    // console.log(this.props.currentConversation;
    return (
      <div className={b()}>
        <div className={b('top')}>
          {t('CHAT-HOURS-REQUESTED-MESSAGE:TITLE:REQUEST-HOURS-VALIDATION', {
            userName: 'Yuri Orlovsky',
          })}
        </div>
        <div className={b('content')}>
          <div className={b('row')}>
            <div className={b('row-label')}>{t('CHAT-HOURS-REQUESTED-MESSAGE:LABEL:HOURS')}</div>
            <div className={b('row-value')}>{message.requestedHours}</div>
          </div>
          <div className={b('row')}>
            <div className={b('row-label')}>{t('CHAT-HOURS-REQUESTED-MESSAGE:LABEL:DESCRIPTION')}</div>
            <div className={b('row-value')}>{message.description}</div>
          </div>
          <div className={b('row')}>
            <div className={b('row-label')}>{t('CHAT-HOURS-REQUESTED-MESSAGE:LABEL:STATUS')}</div>
            <div className={b('row-value')}>{status} {message.accepted && (<i className="zi zi-checkmark"/>)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(ChatHoursRequestedMessage);
