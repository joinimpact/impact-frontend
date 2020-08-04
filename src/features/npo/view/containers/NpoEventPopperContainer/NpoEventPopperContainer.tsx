import React from 'react';
import { IEvent } from 'shared/types/models/events';
import { EventPopperComponent } from '../../components';
import { ICommunication } from 'shared/types/redux';
import * as actions from 'features/npo/redux/actions';
import { IAppReduxState } from 'shared/types/app';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as selectors from 'features/npo/redux/selectors';
import { bind } from 'decko';
import { IOpportunityWithEvents } from 'shared/types/responses/shared';

interface IOwnProps {
  event: IEvent;
  paletteIndex: number;
  onClose(): void;
}

interface IStateProps {
  deleteEventCommunication: ICommunication;
  opportunitiesWithEvents: IOpportunityWithEvents[];
}

interface IActionProps {
  deleteEvent: typeof actions.deleteEvent;
  requestEditEvent: typeof actions.requestEditEvent;
}

type TProps = IOwnProps & IStateProps & IActionProps;

class NpoEventPopperContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      deleteEventCommunication: selectors.selectCommunication(state, 'deleteEvent'),
      opportunitiesWithEvents: selectors.selectOpportunitiesWithEvents(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      deleteEvent: actions.deleteEvent,
      requestEditEvent: actions.requestEditEvent,
    }, dispatch);
  }

  public componentDidUpdate(prevProps: TProps) {
    if (prevProps.deleteEventCommunication.isRequesting && this.props.deleteEventCommunication.isLoaded) {
      this.props.onClose();
    }
  }

  public render() {
    const { event, paletteIndex } = this.props;
    return (
      <EventPopperComponent
        event={event}
        paletteIndex={paletteIndex}
        deleteCommunication={this.props.deleteEventCommunication}
        opportunity={this.getOpportunityById(event.opportunityId)}
        onEditEvent={this.editEventHandler}
        onDeleteEvent={this.handleDeleteEvent}
      />
    );
  }

  @bind
  private getOpportunityById(opportunityId: string) {
    return this.props.opportunitiesWithEvents.find(opportunity => opportunity.id === opportunityId);
  }

  @bind
  private handleDeleteEvent(event: IEvent) {
    this.props.deleteEvent(event.id);
  }

  @bind
  private editEventHandler(event: IEvent) {
    this.props.requestEditEvent(event);
  }
}

const withRedux = connect<IStateProps, IActionProps, IOwnProps>(
  NpoEventPopperContainer.mapStateToProps,
  NpoEventPopperContainer.mapDispatch,
)(NpoEventPopperContainer);
export default withRedux;
