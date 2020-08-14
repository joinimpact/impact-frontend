import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import {
  IConversationMessageResponseItem,
  IRequestHoursMessage,
  IStandardMessage, IVolunteerRequestAcceptance,
  IVolunteerRequestProfileMessage,
} from 'shared/types/responses/chat';
import { Image } from 'shared/view/elements';
import {
  ChatVolunteerRequestAcceptance,
  StandardMessage,
  UserAvatar,
  VolunteerRequestProfileMessage,
} from 'shared/view/components';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { IUser } from 'shared/types/models/user';
import { NBSP } from 'shared/types/constants';
import ChatHoursRequestedMessage from 'shared/view/components/ChatHoursRequestedMessage/ChatHoursRequestedMessage';

import './ChatMessage.scss';

interface IOwnProps {
  isMine: boolean;
  message: IConversationMessageResponseItem;
  currentConversation: IConversationResponseItem;
  currentUser: IUser;
  showAvatar?: boolean;
}

const b = block('chat-message');

type TProps = IOwnProps;

class ChatMessage extends React.PureComponent<TProps> {
  public render() {
    const { isMine } = this.props;
    return (
      <div className={b({ 'is-mine': isMine })}>
        {!isMine && (this.renderAvatar())}
        <div className={b('content')}>
          {this.renderMessage()}
        </div>
        {isMine && (this.renderAvatar())}
      </div>
    );
  }

  @bind
  private renderMessage() {
    const { message } = this.props;
    switch (message.type) {
      case 'MESSAGE_VOLUNTEER_REQUEST_PROFILE':
        return (
          <VolunteerRequestProfileMessage
            message={message.body as IVolunteerRequestProfileMessage}
          />
        );
      case 'MESSAGE_STANDARD':
        return (
          <StandardMessage message={message.body as IStandardMessage}/>
        );
      case 'MESSAGE_HOURS_ACCEPTED':
      case 'MESSAGE_HOURS_DECLINED':
      case 'MESSAGE_HOURS_REQUESTED':
        return (
          <ChatHoursRequestedMessage
            message={message.body as IRequestHoursMessage}
            currentConversation={this.props.currentConversation}
          />
        );
      case 'MESSAGE_VOLUNTEER_REQUEST_ACCEPTANCE':
        return (
          <ChatVolunteerRequestAcceptance
            message={message.body as IVolunteerRequestAcceptance}
          />
        );
      /*case 'MESSAGE_HOURS_ACCEPTED':
        console.log(message);
        return message.type;*/
      default:
        return message.type;
    }

    // return null;
  }

  @bind
  private renderAvatar() {
    const { showAvatar, isMine, currentUser, currentConversation } = this.props;

    if (!showAvatar) {
      return (<div className={b('avatar')}>{NBSP}</div>);
    }

    if (isMine) {
      return (
        <div className={b('avatar')}>
          {currentUser.avatarUrl ? (
            <Image src={currentUser.avatarUrl}/>
          ) : (
            <UserAvatar firstName={currentConversation.name}/>
          )}
        </div>
      );
    }

    return (
      <div className={b('avatar')}>
        {currentConversation.profilePicture ? (
          <Image src={currentConversation.profilePicture}/>
        ) : (
          <UserAvatar firstName={currentConversation.name}/>
        )}
      </div>
    );
  }
}

export default ChatMessage;
