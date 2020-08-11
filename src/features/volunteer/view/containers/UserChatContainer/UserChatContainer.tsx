import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { selectors as userSelectors } from 'services/user';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { IConversationMessageResponseItem, IConversationResponse } from 'shared/types/responses/chat';
import { Button, Image, Preloader } from 'shared/view/elements';
import { ChatComponent, EnterMessageComponent, UserAvatar } from 'shared/view/components';
import { IUser } from 'shared/types/models/user';

import './UserChatContainer.scss';

interface IStateProps {
  currentUser: IUser | null;
  currentUserId: string | null;
  loadConversationsCommunication: ICommunication;
  setCurrentConversationCommunication: ICommunication;
  currentConversation: IConversationResponseItem | null;
  conversationItem: IConversationResponse | null;
  currentConversationMessages: IConversationMessageResponseItem[];
}

interface IActionProps {
  loadConversations: typeof actions.loadConversations;
  sendMessage: typeof actions.sendMessage;
  chatSubscribe: typeof actions.chatSubscribe;
  chatUnsubscribe: typeof actions.chatUnsubscribe;
}

const b = block('user-chat-container');

type TProps = IStateProps & IActionProps & ITranslateProps;

class UserChatContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
      currentUserId: userSelectors.selectCurrentUserId(state),
      loadConversationsCommunication: selectors.selectCommunication(state, 'loadConversations'),
      setCurrentConversationCommunication: selectors.selectCommunication(state, 'setCurrentConversation'),
      currentConversation: selectors.selectCurrentConversation(state),
      currentConversationMessages: selectors.selectCurrentConversationMessages(state),
      conversationItem: selectors.selectConversationItem(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadConversations: actions.loadConversations,
      sendMessage: actions.sendMessage,
      chatSubscribe: actions.chatSubscribe,
      chatUnsubscribe: actions.chatUnsubscribe,
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
            userId={this.props.currentUserId!}
            currentConversation={this.props.currentConversation!}
            currentUser={this.props.currentUser!}
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
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  UserChatContainer.mapStateToProps,
  UserChatContainer.mapDispatch,
)(UserChatContainer);
export default i18nConnect<{}>(withRedux);
