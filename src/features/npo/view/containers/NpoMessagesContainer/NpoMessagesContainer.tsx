import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { IndexRange } from 'react-virtualized';
import { bindActionCreators, Dispatch } from 'redux';
import { IAppReduxState } from 'shared/types/app';
import { IConversationMessageResponseItem, IConversationResponse } from 'shared/types/responses/chat';
import { ICommunication } from 'shared/types/redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { ChatComponent, EnterMessageComponent, UserAvatar } from 'shared/view/components';
import { Button, Image, Preloader } from 'shared/view/elements';
import { selectors as npoSelectors } from 'services/npo';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

import './NpoMessagesContainer.scss';

interface IStateProps {
  currentOrganization: IOrganizationsResponseItem | null;
  loadConversationsCommunication: ICommunication;
  setCurrentConversationCommunication: ICommunication;
  currentConversation: IConversationResponseItem | null;
  conversationItem: IConversationResponse | null;
  currentConversationMessages: IConversationMessageResponseItem[];
  messagesCount: number;
}

interface IActionProps {
  loadConversations: typeof actions.loadConversations;
  sendMessage: typeof actions.sendMessage;
  chatSubscribe: typeof actions.chatSubscribe;
  chatUnsubscribe: typeof actions.chatUnsubscribe;
  fetchChatHistory: typeof actions.fetchChatHistory;
}

const b = block('npo-messages-container');

type TProps = IStateProps & IActionProps & ITranslateProps;

class NpoMessagesContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
      loadConversationsCommunication: selectors.selectCommunication(state, 'loadConversations'),
      setCurrentConversationCommunication: selectors.selectCommunication(state, 'setCurrentConversation'),
      currentConversation: selectors.selectCurrentConversation(state),
      currentConversationMessages: selectors.selectCurrentConversationMessages(state),
      conversationItem: selectors.selectConversationItem(state),
      messagesCount: selectors.selectTotalMessagesCount(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadConversations: actions.loadConversations,
      sendMessage: actions.sendMessage,
      chatSubscribe: actions.chatSubscribe,
      chatUnsubscribe: actions.chatUnsubscribe,
      fetchChatHistory: actions.fetchChatHistory,
    }, dispatch);
  }

  public componentDidMount() {
    this.props.loadConversations();
    this.props.chatSubscribe();
  }

  public componentWillUnmount() {
    this.props.chatUnsubscribe();
  }

  public render() {
    return (
      <div className={b()}>
        <div className={b('content-top')}>
          {this.renderTopContent()}
        </div>
        <div className={b('content-bottom')}>
          {this.renderBottomContent()}
        </div>
      </div>
    );
  }

  @bind
  private renderTopContent() {
    const { translate: t, setCurrentConversationCommunication } = this.props;
    const currentConversation = this.props.currentConversation || {} as IConversationResponseItem;

    return (
      <>
        <div className={b('conversation-bar')}>
          <div className={b('conversation-bar-left-part')}>
            <div className={b('conversation-bar-avatar')}>
              {currentConversation.profilePicture > '' ? (
                <Image src={currentConversation.profilePicture}/>
              ) : (
                <UserAvatar firstName={currentConversation.name}/>
              )}
            </div>
            <div className={b('conversation-bar-name')}>
              {currentConversation.name}
            </div>
          </div>
          <div className={b('conversation-bar-right-part')}>
            <div className={b('conversation-bar-actions')}>
              <Button color="grey">
                {t('USER-CHAT-CONTAINER:ACTION:VIEW-PROFILE')}
              </Button>
              <div className={b('tri-dot-button')}>
                <i className="zi zi-dots-horizontal-triple"/>
              </div>
            </div>
          </div>
        </div>
        <Preloader isShow={setCurrentConversationCommunication.isRequesting} position="relative" size={14}>
          <ChatComponent
            messages={this.props.currentConversationMessages}
            userId={this.props.currentOrganization!.creatorId}
            currentConversation={this.props.currentConversation!}
            avatarUrl={this.props.currentOrganization!.profilePicture}
            totalMessagesCount={this.props.currentConversationMessages.length}
            // totalMessagesCount={this.props.messagesCount}
            onLoadMoreRows={this.handleRequestMoreMessages}
          />
        </Preloader>
      </>
    );
  }

  @bind
  private renderBottomContent() {
    // const { conversationItem } = this.props;
    return (
      <>
        {/*<div className={b('invite-block')}>
        </div>*/}
        <div className={b('message-editor')}>
          <EnterMessageComponent
            currentConversation={this.props.currentConversation}
            onSend={this.handleSendMessage}
          />
        </div>
      </>
    );
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
    // console.log('[handleRequestMoreMessages]', params);
    this.props.fetchChatHistory({
      startIndex: params.startIndex,
      stopIndex: params.stopIndex,
    });
    return Promise.resolve();
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  NpoMessagesContainer.mapStateToProps,
  NpoMessagesContainer.mapDispatch,
)(NpoMessagesContainer);
export default i18nConnect<{}>(withRedux);
