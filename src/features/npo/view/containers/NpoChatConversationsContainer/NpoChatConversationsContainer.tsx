import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { Button, Image, Preloader } from 'shared/view/elements';
import { ChatLastMessageHint, CustomScrollbar, ErrorScreen, SearchInput, UserAvatar } from 'shared/view/components';

import './NpoChatConversationsContainer.scss';

interface IStateProps {
  loadConversationsCommunication: ICommunication;
  conversations: IConversationResponseItem[];
  currentConversation: IConversationResponseItem | null;
}

interface IActionProps {
  loadConversations: typeof actions.loadConversations;
  setCurrentConversation: typeof actions.setCurrentConversation;
}

const b = block('npo-chat-conversations-container');

type TProps = IStateProps & IActionProps & ITranslateProps;

class NpoChatConversationsContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadConversationsCommunication: selectors.selectCommunication(state, 'loadConversations'),
      conversations: selectors.selectConversations(state),
      currentConversation: selectors.selectCurrentConversation(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadConversations: actions.loadConversations,
      setCurrentConversation: actions.setCurrentConversation,
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
      return (<ErrorScreen title={t('NPO-CHAT-CONVERSATIONS-CONTAINER:ERROR:LOAD-CONVERSATIONS-FAILED-TITLE')} message={loadConversationsCommunication.error}/>);
    }

    return (
      <>
        <div className={b('search-bar')}>
          <div className={b('search-bar-content')}>
            <SearchInput
              withSearchIcon
              onSearchRequested={this.handleSearchFieldChanged}
              placeholder={t('NPO-CHAT-CONVERSATIONS-CONTAINER:PLACEHOLDER:SEARCH-PLACEHOLDER')}
              size={20}
            />
            <Button color="grey">
              {t('NPO-CHAT-CONVERSATIONS-CONTAINER:ACTION:NEW')}
            </Button>
          </div>
        </div>
        <div className={b('conversations')}>
          <CustomScrollbar>
            {this.props.conversations.map(this.renderConversationRow)}
          </CustomScrollbar>
        </div>
      </>
    );
  }

  @bind
  private renderConversationRow(conversation: IConversationResponseItem, index: number) {
    const currentConversation = this.props.currentConversation || {} as IConversationResponseItem;
    const isCurrent = conversation.id === currentConversation.id;

    /*console.log('currentConversation: id: ', currentConversation.id,
      'organizationId: ', currentConversation.organizationId);*/

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
            <ChatLastMessageHint message={conversation.lastMessage || ''}/>
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
  NpoChatConversationsContainer.mapStateToProps,
  NpoChatConversationsContainer.mapDispatch,
)(NpoChatConversationsContainer);
export default i18nConnect<{}>(withRedux);
