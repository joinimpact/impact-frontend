import React from 'react';
import block from 'bem-cn';
import moment from 'moment';
import { IConversationMessageResponseItem, IStandardMessage } from 'shared/types/responses/chat';

import './ChatAtoms.scss';
import { NBSP } from 'shared/types/constants';
// import { NBSP } from 'shared/types/constants';

interface IDaySeparatorProps {
  day: moment.Moment;
}

export const ChatDaySeparator: React.FC<IDaySeparatorProps> = (props: IDaySeparatorProps) => {
  const { day } = props;
  const b = block('chat-day-separator');

  return (
    <div className={b()}>
      <hr/>
      <div className={b('content')}>
        {day.format('DD MMMM')}
      </div>
    </div>
  );
};

interface IChatLastMessageHintProps {
  message: IConversationMessageResponseItem;
}

export const ChatLastMessageHint: React.FC<IChatLastMessageHintProps> = (props: IChatLastMessageHintProps) => {
  const { message } = props;
  const b = block('chat-last-message-hint');

  const renderContent = () => {
    switch (message.type) {
      case 'MESSAGE_STANDARD':
        return (message.body as IStandardMessage).text;
      case 'MESSAGE_VOLUNTEER_REQUEST_PROFILE':
        return 'Profile requested';
      case 'MESSAGE_VOLUNTEER_REQUEST_ACCEPTANCE':
        return 'Acceptance requested';
      case 'MESSAGE_EVENT_CREATED':
        return 'Event created';
      case 'MESSAGE_HOURS_ACCEPTED':
        return 'Hours accepted';
      case 'MESSAGE_HOURS_REQUESTED':
        return 'Hours requested';
    }
  };

  return (
    <div className={b()}>
      {renderContent()}
    </div>
  );
};

export const ChatMessageLoading: React.FC = () => {
  const b = block('chat-message-loading');

  return (
    <div className={b()}>
      <div className={b('content')}>
        <div className={b('content-shine-part')}>
          {NBSP}
        </div>
      </div>
    </div>
  );
};
