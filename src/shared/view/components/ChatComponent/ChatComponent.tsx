import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import moment from 'moment';
import { IConversationMessageResponseItem } from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { IUser } from 'shared/types/models/user';
import { ChatDaySeparator, ChatMessage, CustomScrollbar } from 'shared/view/components';

import './ChatComponent.scss';

interface IOwnProps {
  userId: string;
  messages: IConversationMessageResponseItem[];
  currentConversation: IConversationResponseItem;
  currentUser: IUser;
}

const b = block('chat-component');

type TProps = IOwnProps;

class ChatComponent extends React.PureComponent<TProps> {
  public render() {
    return (
      <div className={b()}>
        <div className={b('content')}>
          <CustomScrollbar scrolledToBottom>
            {this.renderMessages()}
          </CustomScrollbar>
        </div>
      </div>
    );
  }

  @bind
  private renderMessages() {
    const { messages, userId, currentConversation, currentUser } = this.props;
    const res = [];
    const dayFormat = 'YYYY=MM-DD';
    let prevDate: moment.Moment | null = null;

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const nextMessage = messages[i - 1];
      const messageDate = moment(message.timestamp);
      if (!prevDate) {
        prevDate = messageDate.clone();
      }

      if (prevDate.format(dayFormat) !== messageDate.format(dayFormat)) {
        const dayStr = messageDate.format(dayFormat);
        res.push(
          <ChatDaySeparator
            key={`day-sep-${dayStr}`}
            day={messageDate}
          />
        );

        prevDate = messageDate.clone();
      }

      res.push(
        <ChatMessage
          key={`message-${i}`}
          isMine={userId === message.senderId}
          currentConversation={currentConversation}
          message={message}
          currentUser={currentUser}
          showAvatar={!nextMessage || message.senderId !== nextMessage.senderId}
        />
      );
    }

    return res;
  }
}

export default ChatComponent;
