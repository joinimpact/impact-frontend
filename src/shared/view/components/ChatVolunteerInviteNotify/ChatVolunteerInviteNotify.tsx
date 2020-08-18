import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IConversationResponse, IMembershipRequestResponse } from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { Button } from 'shared/view/elements';
import { IOpportunityResponse, IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { ICommunication } from 'shared/types/redux';

import './ChatVolunteerInviteNotify.scss';

interface IOwnProps {
  acceptCommunication: ICommunication;
  declineCommunication: ICommunication;
  membershipRequest: IMembershipRequestResponse;
  currentConversationOpportunity: IOpportunityResponse | null | undefined;
  conversationItem: IConversationResponse;
  currentConversation: IConversationResponseItem;
  currentOrganization: IOrganizationsResponseItem;
  onAccept(opportunity: IOpportunityResponse, membership: IMembershipRequestResponse): void;
  onDecline(opportunity: IOpportunityResponse, membership: IMembershipRequestResponse): void;
}

const b = block('chat-volunteer-invite-notify');

type TProps = IOwnProps & ITranslateProps;

class ChatVolunteerInviteNotify extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, currentConversation, currentConversationOpportunity, membershipRequest } = this.props;

    return (
      <div className={b()}>
        <div className={b('left')}>
          {t('NPO-MESSAGES-CONTAINER:TEXT:USER-APPLIED', {
            user: currentConversation!.name,
          })}
          {currentConversationOpportunity && (
            <>
              <div className={b('org-name')}>{currentConversationOpportunity.title}</div>
              <div className={b('org-cap')}>
                {t('NPO-MESSAGES-CONTAINER:TEXT:ENROLLED-STATS', {
                  enrolled: currentConversationOpportunity.stats.volunteersEnrolled,
                  cap: currentConversationOpportunity.limits.volunteersCap.cap,
                })}
              </div>
            </>
          )}
        </div>
        <div className={b('right')}>
          {currentConversationOpportunity && (
            <>
              <Button
                color="blue"
                isShowPreloader={this.props.acceptCommunication.isRequesting}
                onClick={this.props.onAccept.bind(this, currentConversationOpportunity, membershipRequest)}
              >
                {t('NPO-MESSAGES-CONTAINER:ACTION:ACCEPT')}
              </Button>
              <Button
                color="grey"
                isShowPreloader={this.props.declineCommunication.isRequesting}
                onClick={this.props.onDecline.bind(this, currentConversationOpportunity, membershipRequest)}
              >
                {t('NPO-MESSAGES-CONTAINER:ACTION:CLOSE')}
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(ChatVolunteerInviteNotify);
