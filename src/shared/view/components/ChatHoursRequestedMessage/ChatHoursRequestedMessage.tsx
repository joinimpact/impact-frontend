import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IRequestHoursMessage } from 'shared/types/responses/chat';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { IConversationMember } from 'shared/types/models/chat';
import { ICommunication } from 'shared/types/redux';
import { Button } from 'shared/view/elements';

import './ChatHoursRequestedMessage.scss';

interface IOwnProps {
  acceptCommunication?: ICommunication;
  declineCommunication?: ICommunication;
  messageOwner: IConversationMember;
  message: IRequestHoursMessage;
  currentConversation: IConversationResponseItem;
  onAccept?(): void;
  onDecline?(): void;
}

const b = block('chat-hours-requested-message');

type TStatus = 'accepted' | 'declined' | 'pending';
type TProps = IOwnProps & ITranslateProps;

class ChatHoursRequestedMessage extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, message } = this.props;
    const shouldRenderActions = this.shouldRenderActions;

    return (
      <div className={b()}>
        <div className={b('top')}>
          {t('CHAT-HOURS-REQUESTED-MESSAGE:TITLE:REQUEST-HOURS-VALIDATION', {
            userName: this.props.messageOwner.name,
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
          {!shouldRenderActions && (
            <div className={b('row')}>
              <div className={b('row-label')}>{t('CHAT-HOURS-REQUESTED-MESSAGE:LABEL:STATUS')}</div>
              <div className={b('row-value')}>{this.statusLabel} {message.accepted && (<i className="zi zi-checkmark"/>)}</div>
            </div>
          )}
        </div>
        {shouldRenderActions && this.renderActions()}
      </div>
    );
  }

  @bind
  private renderActions() {
    const { translate: t, acceptCommunication, declineCommunication } = this.props;

    return (
      <div className={b('actions')}>
        <Button color="grey" onClick={this.props.onDecline} isShowPreloader={declineCommunication!.isRequesting}>
          {t('CHAT-HOURS-REQUESTED-MESSAGE:ACTION:DECLINE')}
        </Button>
        <Button color="blue" onClick={this.props.onAccept} isShowPreloader={acceptCommunication!.isRequesting}>
          {t('CHAT-HOURS-REQUESTED-MESSAGE:ACTION:ACCEPT')}
        </Button>
      </div>
    );
  }

  private get shouldRenderActions() {
    const { onAccept, onDecline } = this.props;
    return this.status === 'pending' && onAccept && onDecline;
  }

  private get status(): TStatus {
    const { message } = this.props;

    if (message.accepted) {
      return 'accepted';
    }

    if (message.declined) {
      return 'declined';
    }

    return 'pending';
  }

  private get statusLabel(): string {
    const { translate: t } = this.props;
    const status: TStatus = this.status;
    switch (status) {
      case 'accepted':
        return t('CHAT-HOURS-REQUESTED-MESSAGE:STATUS:ACCEPTED');
      case 'declined':
        return t('CHAT-HOURS-REQUESTED-MESSAGE:STATUS:DECLINED');
      case 'pending':
        return t('CHAT-HOURS-REQUESTED-MESSAGE:STATUS:PENDING');
    }

    return status;
  }
}

export default i18nConnect<IOwnProps>(ChatHoursRequestedMessage);
