import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { connect } from 'react-redux';
import { Button, Image, Preloader } from 'shared/view/elements';
import { ChatLastMessageHint, CustomScrollbar, ErrorScreen, SearchInput, UserAvatar } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { actions as volunteerChatActions, selectors as volunteerChatSelectors } from 'services/volunteerChat';

import './UserChatConversationsContainer.scss';

interface IStateProps {
  loadConversationsCommunication: ICommunication;
  conversations: IConversationResponseItem[];
  currentConversation: IConversationResponseItem | null;
}

interface IActionProps {
  loadConversations: typeof volunteerChatActions.loadConversations;
  setCurrentConversation: typeof volunteerChatActions.setCurrentConversation;
}

const b = block('user-chat-conversations-container');

type TProps = IStateProps & IActionProps & ITranslateProps;

class UserChatConversationsContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadConversationsCommunication: volunteerChatSelectors.selectCommunication(state, 'loadConversations'),
      conversations: volunteerChatSelectors.selectConversations(state),
      currentConversation: volunteerChatSelectors.selectCurrentConversation(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadConversations: volunteerChatActions.loadConversations,
      setCurrentConversation: volunteerChatActions.setCurrentConversation,
    }, dispatch);
  }

  public componentDidMount() {
    this.props.loadConversations();
  }

  public render() {
    const { loadConversationsCommunication } = this.props;
    return (
      <div className={b()}>
        <Preloader isShow={loadConversationsCommunication.isRequesting} position="relative" size={14}>
          {this.renderContent()}
        </Preloader>
      </div>
    );
  }

  @bind
  private renderContent() {
    const { loadConversationsCommunication, translate: t } = this.props;

    if (loadConversationsCommunication.error) {
      return (<ErrorScreen title={t('USER-CHAT-CONTAINER:ERROR:LOAD-CONVERSATIONS-FAILED-TITLE')} message={loadConversationsCommunication.error}/>);
    }

    return (
      <>
        <div className={b('search-bar')}>
          <div className={b('search-bar-content')}>
            <SearchInput
              withSearchIcon
              onSearchRequested={this.handleSearchFieldChanged}
              placeholder={t('USER-CHAT-CONTAINER:PLACEHOLDER:SEARCH-PLACEHOLDER')}
              size={20}
            />
            <Button color="grey">
              {t('USER-CHAT-CONTAINER:ACTION:NEW')}
            </Button>
          </div>
        </div>
        <div className={b('conversations')}>
          <CustomScrollbar>
            <div className={b('conversations-content')}>
              {this.props.conversations.map(this.renderConversationRow)}
            </div>
          </CustomScrollbar>
        </div>
      </>
    );
  }

  @bind
  private renderConversationRow(conversation: IConversationResponseItem, index: number) {
    const currentConversation = this.props.currentConversation || {} as IConversationResponseItem;
    const isCurrent = conversation.id === currentConversation.id;
    return (
      <div
        className={b('conversation', { selected: isCurrent })}
        key={`conversation-${index}`}
        onClick={this.handleClickOnConversation.bind(this, conversation)}
      >
        <div className={b('conversation-image')}>
          {conversation.profilePicture > '' ? (
            <Image src={conversation.profilePicture}/>
          ) : (
            <UserAvatar firstName={conversation.name}/>
          )}
        </div>
        <div className={b('conversation-content')}>
          <div className={b('conversation-content-name')}>
            {conversation.name}
          </div>
          <div className={b('conversation-content-last-message')}>
            <ChatLastMessageHint message={conversation.lastMessage}/>
          </div>
        </div>
      </div>
    );
  }

  @bind
  private handleSearchFieldChanged(value: string) {
    console.log('[handleSearchFieldChanged] value: ', value);
  }

  @bind
  private handleClickOnConversation(conversation: IConversationResponseItem) {
    this.props.setCurrentConversation(conversation);
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  UserChatConversationsContainer.mapStateToProps,
  UserChatConversationsContainer.mapDispatch,
)(UserChatConversationsContainer);
export default i18nConnect<{}>(withRedux);
