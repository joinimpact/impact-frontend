import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { IndexRange } from 'react-virtualized';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { IAppReduxState } from 'shared/types/app';
import {
  IConversationMessageResponseItem,
  IConversationResponse,
  IMembershipRequestResponse, IRequestHoursMessage,
} from 'shared/types/responses/chat';
import { ICommunication } from 'shared/types/redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { ChatComponent, ChatVolunteerInviteNotify, EnterMessageComponent, UserAvatar } from 'shared/view/components';
import { Button, Image, Preloader } from 'shared/view/elements';
import { selectors as npoSelectors, actions as npoActions } from 'services/npo';
import { selectors as userSelectors } from 'services/user';
import { IOpportunityResponse, IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { IConversationMember } from 'shared/types/models/chat';
import { TMessageRenderFunc } from 'shared/view/components/ChatMessage/ChatMessage';
import { NpoChatHoursRequestedMessage } from 'features/npo/view/containers/index';
import { IUser } from 'shared/types/models/user';
import { actions as npoChatActions, selectors as npoChatSelectors } from 'services/npoChat';
import routes from 'modules/routes';

import './NpoMessagesContainer.scss';

interface IStateProps {
  currentUser: IUser | null;
  currentOrganization: IOrganizationsResponseItem | null;
  loadSingleConversationCommunication: ICommunication;
  loadConversationsCommunication: ICommunication;
  setCurrentConversationCommunication: ICommunication;
  currentConversation: IConversationResponseItem | null;
  conversationItem: IConversationResponse | null;
  currentConversationMessages: IConversationMessageResponseItem[];
  messagesCount: number;
  currentConversationOpportunity: IOpportunityResponse | null | undefined;
  loadOpportunitiesCommunication: ICommunication;
  chatStatePrepareCommunication: ICommunication;
  acceptInviteCommunication: ICommunication;
  declineInviteCommunication: ICommunication;
}

interface IActionProps {
  loadOpportunities: typeof npoActions.loadOpportunities;
  loadConversations: typeof npoChatActions.loadConversations;
  sendMessage: typeof npoChatActions.sendMessage;
  chatSubscribe: typeof actions.chatSubscribe;
  chatUnsubscribe: typeof actions.chatUnsubscribe;
  fetchChatHistory: typeof npoChatActions.fetchChatHistory;
  chatStatePrepare: typeof npoChatActions.chatStatePrepare;
  acceptConversationInvite: typeof actions.acceptConversationInvite;
  declineConversationInvite: typeof actions.declineConversationInvite;
}

const b = block('npo-messages-container');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IStateProps & IActionProps & ITranslateProps & TRouteProps;

class NpoMessagesContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
      loadSingleConversationCommunication: npoChatSelectors.selectCommunication(state, 'loadConversation'),
      loadConversationsCommunication: npoChatSelectors.selectCommunication(state, 'loadConversations'),
      setCurrentConversationCommunication: npoChatSelectors.selectCommunication(state, 'setCurrentConversation'),
      currentConversation: npoChatSelectors.selectCurrentConversation(state),
      currentConversationMessages: npoChatSelectors.selectCurrentConversationMessages(state),
      conversationItem: npoChatSelectors.selectConversationItem(state),
      messagesCount: npoChatSelectors.selectTotalMessagesCount(state),
      currentConversationOpportunity: npoChatSelectors.selectCurrentConversationOpportunity(state),
      loadOpportunitiesCommunication: npoSelectors.selectCommunication(state, 'loadOpportunities'),
      chatStatePrepareCommunication: npoChatSelectors.selectCommunication(state, 'chatStatePrepare'),
      acceptInviteCommunication: selectors.selectCommunication(state, 'acceptConversationInvite'),
      declineInviteCommunication: selectors.selectCommunication(state, 'declineConversationInvite'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        loadOpportunities: npoActions.loadOpportunities,
        loadConversations: npoChatActions.loadConversations,
        sendMessage: npoChatActions.sendMessage,
        chatSubscribe: actions.chatSubscribe,
        chatUnsubscribe: actions.chatUnsubscribe,
        fetchChatHistory: npoChatActions.fetchChatHistory,
        chatStatePrepare: npoChatActions.chatStatePrepare,
        acceptConversationInvite: actions.acceptConversationInvite,
        declineConversationInvite: actions.declineConversationInvite,
      },
      dispatch,
    );
  }

  public componentDidMount() {
    this.props.chatStatePrepare();
    this.props.chatSubscribe();
  }

  public componentWillUnmount() {
    this.props.chatUnsubscribe();
  }

  public render() {
    return (
      <div className={b()}>
        <div className={b('content-top')}>{this.renderTopContent()}</div>
        <div className={b('content-bottom')}>{this.renderBottomContent()}</div>
      </div>
    );
  }

  @bind
  private renderTopContent() {
    const { translate: t, chatStatePrepareCommunication } = this.props;
    const currentConversation = this.props.currentConversation || ({} as IConversationResponseItem);

    return (
      <>
        <div className={b('conversation-bar')}>
          <div className={b('conversation-bar-left-part')}>
            <div className={b('conversation-bar-avatar')}>
                {this.renderConversationAvatar()}
            </div>
            <div className={b('conversation-bar-name')}>{currentConversation.name}</div>
          </div>
          <div className={b('conversation-bar-right-part')}>
            <div className={b('conversation-bar-actions')}>
              <Button color="grey" onClick={this.handleViewUserProfile}>
                {t('USER-CHAT-CONTAINER:ACTION:VIEW-PROFILE')}
              </Button>
              <div className={b('tri-dot-button')}>
                <i className="zi zi-dots-horizontal-triple" />
              </div>
            </div>
          </div>
        </div>
        <Preloader isShow={chatStatePrepareCommunication.isRequesting} position="relative" size={14}>
          {this.props.conversationItem && (
            <ChatComponent
              messages={this.props.currentConversationMessages}
              currentConversation={this.props.currentConversation!}
              me={this.me}
              interlocutor={this.interlocutor}
              totalMessagesCount={this.props.currentConversationMessages.length}
              // totalMessagesCount={this.props.messagesCount}
              onLoadMoreRows={this.handleRequestMoreMessages}
              messageRender={this.messageRender}
            />
          )}
        </Preloader>
      </>
    );
  }

  @bind
  private renderConversationAvatar() {
    const { currentConversation } = this.props;

    if (!currentConversation) {
      return null;
    }

    if (currentConversation!.profilePicture) {
      return <Image src={currentConversation!.profilePicture} />;
    }

    return (
      <UserAvatar firstName={currentConversation!.name} />
    );
  }

  @bind
  private messageRender(message: IConversationMessageResponseItem, messageOwner: IConversationMember, originalRender: TMessageRenderFunc) {
    switch (message.type) {
      case 'MESSAGE_HOURS_REQUESTED':
        return (
          <NpoChatHoursRequestedMessage
            message={message.body as IRequestHoursMessage}
            messageOwner={messageOwner}
            currentConversation={this.props.currentConversation!}
          />
        );
    }

    return originalRender(message);
  }

  private get me(): IConversationMember {
    const {
      // currentOrganization,
      currentUser
    } = this.props;

    return {
      // id: currentOrganization!.id,
      // avatarUrl: currentOrganization!.profilePicture,
      // name: currentOrganization!.name,
      id: currentUser!.userId,
      avatarUrl: currentUser!.avatarUrl,
      name: `${currentUser!.firstName} ${currentUser!.lastName}`,
    };
  }

  private get interlocutor(): IConversationMember {
    const { conversationItem } = this.props;
    return {
      id: conversationItem!.creatorId,
      avatarUrl: conversationItem!.profilePicture,
      name: conversationItem!.name,
    };
  }

  @bind
  private renderBottomContent() {
    return (
      <>
        {this.renderChatVolunteerInviteNotify()}
        <div className={b('message-editor')}>
          <EnterMessageComponent currentConversation={this.props.currentConversation} onSend={this.handleSendMessage} />
        </div>
      </>
    );
  }

  @bind
  private renderChatVolunteerInviteNotify() {
    const {
      conversationItem,
      currentOrganization,
      currentConversationOpportunity,
      chatStatePrepareCommunication,
    } = this.props;

    const currentConversation = this.props.currentConversation || ({} as IConversationResponseItem);

    if (
      chatStatePrepareCommunication.isLoaded &&
      conversationItem &&
      conversationItem.membershipRequests &&
      conversationItem.membershipRequests.length
    ) {
      return (
        <ChatVolunteerInviteNotify
          onAccept={this.handleAcceptInvite}
          onDecline={this.handleDeclineVolunteerInvite}
          acceptCommunication={this.props.acceptInviteCommunication}
          declineCommunication={this.props.declineInviteCommunication}
          membershipRequest={conversationItem.membershipRequests[0]}
          currentConversationOpportunity={currentConversationOpportunity}
          currentOrganization={currentOrganization!}
          currentConversation={currentConversation}
          conversationItem={conversationItem}
        />
      );
    }

    return null;
  }

  @bind
  private handleAcceptInvite(opportunity: IOpportunityResponse, membership: IMembershipRequestResponse) {
    this.props.acceptConversationInvite({
      userId: membership.volunteerID,
      opportunityId: opportunity.id,
    });
  }

  @bind
  private handleDeclineVolunteerInvite(opportunity: IOpportunityResponse, membership: IMembershipRequestResponse) {
    this.props.declineConversationInvite({
      userId: membership.volunteerID,
      opportunityId: opportunity.id,
    });
  }

  @bind
  private handleSendMessage(message: string) {
    this.props.sendMessage({
      message,
      conversationId: this.props.currentConversation!.id,
    });
  }

  @bind
  private handleRequestMoreMessages(params: IndexRange) {
    this.props.fetchChatHistory({
      startIndex: params.startIndex,
      stopIndex: params.stopIndex,
    });
    return Promise.resolve();
  }

  @bind
  private handleViewUserProfile() {
    const currentConversation = this.props.currentConversation || ({} as IConversationResponseItem);

    this.props.history.push(`${routes.dashboard.user.profile.view.getPath()}/${currentConversation.creatorId}`);
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  NpoMessagesContainer.mapStateToProps,
  NpoMessagesContainer.mapDispatch,
)(NpoMessagesContainer);
export default i18nConnect<{}>(withRouter(withRedux));
