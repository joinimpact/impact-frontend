import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IConversationResponse } from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { Button } from 'shared/view/elements';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

import './ChatVolunteerInviteNotify.scss';

interface IOwnProps {
  onAccept(): void;
  onClose(): void;
  conversationItem: IConversationResponse;
  currentConversation: IConversationResponseItem;
  currentOrganization: IOrganizationsResponseItem;
}

const b = block('chat-volunteer-invite-notify');

type TProps = IOwnProps & ITranslateProps;

class ChatVolunteerInviteNotify extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, /*conversationItem, */currentConversation, currentOrganization } = this.props;

    // console.log('[ChatVolunteerInviteNotify] conversationItem: ', conversationItem);
    // console.log('[ChatVolunteerInviteNotify] currentConversation: ', currentConversation);
    return (
      <div className={b()}>
        <div className={b('left')}>
        {t('NPO-MESSAGES-CONTAINER:TEXT:USER-APPLIED', {
          user: currentConversation!.name
        })}
        <div className={b('org-name')}>
          {currentOrganization.name}
        </div>
        </div>
        <div className={b('right')}>
          <Button color="blue" onClick={this.props.onAccept}>
            {t('NPO-MESSAGES-CONTAINER:ACTION:ACCEPT')}
          </Button>
          <Button color="grey" onClick={this.props.onClose}>
            {t('NPO-MESSAGES-CONTAINER:ACTION:CLOSE')}
          </Button>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(ChatVolunteerInviteNotify);
