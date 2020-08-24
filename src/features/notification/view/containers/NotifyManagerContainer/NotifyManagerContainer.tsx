import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { selectors as npoSelectors } from 'services/npo';
import { selectors as notifySelectors, actions as notifyActions } from 'services/notify';
import { IAppReduxState } from 'shared/types/app';
import { IMessage } from 'shared/types/models/notify';
import { NotifyMessage } from '../../components';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { actions as volunteerChatActions, selectors as volunteerChatSelectors } from 'services/volunteerChat';
import { actions as npoChatActions, selectors as npoChatSelectors } from 'services/npoChat';
import { selectors as userSelectors } from 'services/user';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
// import { messagesMock } from 'shared/defaults/mocks';

import './NotifyManagerContainer.scss';

interface IStateProps {
  isAuthorized: boolean;
  isNpoServiceReady: boolean;
  messages: IMessage[];
  conversations: IConversationResponseItem[];
  organizationOpportunities: IOpportunityResponse[];
  // volunteerConversations: IConversationResponseItem[];
  // npoConversations: IConversationResponseItem[];
  npoChatServiceReady: boolean;
  volunteerChatServiceReady: boolean;
}

interface IActionProps {
  loadVolunteerConversations: typeof volunteerChatActions.loadConversations;
  loadNpoConversations: typeof npoChatActions.loadConversations;
  addMessage: typeof notifyActions.addMessage;
  delMessage: typeof notifyActions.delMessage;
}

interface IState {
  currentMessages: IMessage[];
}

const MESSAGE_TIMEOUT_MS = 10000;
// const MESSAGE_TIMEOUT_MS = 5 * 60000;

const b = block('notify-manager-container');

type TProps = IStateProps & IActionProps;

class NotifyManagerContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    const npoConversations: IConversationResponseItem[] = npoChatSelectors.selectConversations(state);
    const volunteerConversations: IConversationResponseItem[] = volunteerChatSelectors.selectConversations(state);
    return {
      isAuthorized: userSelectors.selectIsAuthorized(state),
      isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
      messages: notifySelectors.selectMessages(state),
      organizationOpportunities: npoSelectors.selectOrganizationOpportunities(state),
      conversations: volunteerConversations.concat(npoConversations),
      npoChatServiceReady: npoChatSelectors.selectServiceIsReady(state),
      volunteerChatServiceReady: volunteerChatSelectors.selectServiceIsReady(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadVolunteerConversations: volunteerChatActions.loadConversations,
      loadNpoConversations: npoChatActions.loadConversations,
      addMessage: notifyActions.addMessage,
      delMessage: notifyActions.delMessage,
    }, dispatch);
  }

  public state: IState = {
    currentMessages: [],
  };

  public componentDidMount() {
    this.addMessages(this.props.messages);
    // this.setState({ currentMessages: [...this.props.messages] });
    /*setTimeout(() => {
      setInterval(() => {
        this.props.addMessage(messagesMock[0]);
      }, 5000);
    }, 1000);*/
  }

  public componentDidUpdate(prevProps: TProps) {
    const { messages } = this.props;
    if (prevProps.messages.length < messages.length) {
      // New message was added at bottom of list
      this.addMessages(messages.slice(prevProps.messages.length));
    }
  }

  public render() {
    const isConvReady = this.props.npoChatServiceReady && this.props.volunteerChatServiceReady;
    return (
      <div className={b()}>
        {isConvReady && (
          <>
            {this.state.currentMessages.map((message: IMessage, index: number) =>
              <NotifyMessage
                key={`message-${index}`}
                message={message}
                timeout={MESSAGE_TIMEOUT_MS}
                organizationOpportunities={this.props.organizationOpportunities}
                getConversationById={this.getConversationById}
                onClose={this.handleCloseMessage}
              />
            )}
          </>
        )}
      </div>
    );
  }

  @bind
  private getConversationById(conversationId: string): IConversationResponseItem | null {
    const { conversations } = this.props;
    const conversation = conversations.find(conv => conv.id === conversationId);
    return conversation || null;
  }

  @bind
  private addMessages(messages: IMessage[]) {
    this.setState({
      currentMessages: this.state.currentMessages.concat(messages)
    });
  }

  @bind
  private handleCloseMessage(message: IMessage) {
    this.setState({ currentMessages: this.state.currentMessages.filter(mes => mes.id !== message.id!) }, () => {
      this.props.delMessage(message.id!);
    });
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  NotifyManagerContainer.mapStateToProps,
  NotifyManagerContainer.mapDispatch,
)(NotifyManagerContainer);
export default withRedux;
