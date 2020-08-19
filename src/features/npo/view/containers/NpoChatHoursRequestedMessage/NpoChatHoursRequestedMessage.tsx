import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { ChatHoursRequestedMessage } from 'shared/view/components';
import { IConversationMember } from 'shared/types/models/chat';
import { IRequestHoursMessage } from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';
import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { bind } from 'decko';

interface IOwnProps {
  messageOwner: IConversationMember;
  message: IRequestHoursMessage;
  currentConversation: IConversationResponseItem;
}

interface IStateProps {
  acceptHoursCommunication: ICommunication;
  declineHoursCommunication: ICommunication;
}

interface IActionProps {
  acceptHours: typeof actions.acceptHours;
  declineHours: typeof actions.declineHours;
}

type TProps = IOwnProps & IStateProps & IActionProps;

class NpoChatHoursRequestedMessage extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      acceptHoursCommunication: selectors.selectCommunication(state, 'acceptHours'),
      declineHoursCommunication: selectors.selectCommunication(state, 'declineHours'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      acceptHours: actions.acceptHours,
      declineHours: actions.declineHours,
    }, dispatch);
  }

  public render() {
    return (
      <ChatHoursRequestedMessage
        messageOwner={this.props.messageOwner}
        message={this.props.message}
        currentConversation={this.props.currentConversation}
        onAccept={this.handleAcceptHours}
        onDecline={this.handleDeclineHours}
        acceptCommunication={this.props.acceptHoursCommunication}
        declineCommunication={this.props.declineHoursCommunication}
      />
    );
  }

  @bind
  private handleAcceptHours() {
    this.props.acceptHours({
      organizationId: this.props.currentConversation.organizationId,
      requestId: this.props.message.id,
    });
  }

  @bind
  private handleDeclineHours() {
    this.props.declineHours({
      organizationId: this.props.currentConversation.organizationId,
      requestId: this.props.message.id,
    });
  }
}

const withRedux = connect<IStateProps, IActionProps, IOwnProps>(
  NpoChatHoursRequestedMessage.mapStateToProps,
  NpoChatHoursRequestedMessage.mapDispatch,
)(NpoChatHoursRequestedMessage);
export default withRedux;
