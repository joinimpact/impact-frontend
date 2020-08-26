import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { NotifyChatMessage, NotifyTypeMessage } from 'features/notification/view/components/index';
import { IConversationMessageResponseItem } from 'shared/types/responses/chat';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IMessage } from 'shared/types/models/notify';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import Timer = NodeJS.Timer;

import './NotifyMessage.scss';

interface IOwnProps {
  message: IMessage;
  organizationOpportunities: IOpportunityResponse[];
  timeout: number;
  getConversationById(conversationId: string): IConversationResponseItem | null;
  onClose(message: IMessage): void;
}

const b = block('notify-message');

type TProps = IOwnProps & ITranslateProps;

class NotifyMessage extends React.PureComponent<TProps> {
  private timer: Timer | null = null;

  public componentDidMount() {
    const message = {...this.props.message};
    this.timer = setTimeout(() => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.props.onClose(message);
      }
    }, this.props.timeout);
  }

  public render() {
    return (
      <div className={b()}>
        <div className={b('cross')} onClick={this.handleCloseClicked}>
          <i className="zi zi-close"/>
        </div>
        {this.renderContent()}
      </div>
    );
  }

  @bind
  private renderContent() {
    const { message } = this.props;

    switch (message.type) {
      case 'WS_MESSAGE':
        return (
          <NotifyChatMessage
            message={message.body as IConversationMessageResponseItem}
            conversation={this.props.getConversationById(
              (message.body as IConversationMessageResponseItem).conversationId,
            )}
          />
        );
      case 'ERROR':
        return (
          <NotifyTypeMessage
            text={message.body as string}
            icon={'error'}
          />
        );
      case 'WARN':
        return (
          <NotifyTypeMessage
            text={message.body as string}
            icon={'warn'}
          />
        );
      case 'INFO':
        return (
          <NotifyTypeMessage
            text={message.body as string}
            icon={'info'}
          />
        );
    }

    return null;
  }

  @bind
  private handleCloseClicked() {
    this.props.onClose(this.props.message);
  }
}

export default i18nConnect<IOwnProps>(NotifyMessage);
