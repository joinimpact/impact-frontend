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
import { IEventResponsesResponse } from 'shared/types/responses/npo';

interface IOwnProps {
  event: IEvent;
  paletteIndex: number;
  onClose(): void;
}

interface IStateProps {
  deleteEventCommunication: ICommunication;
  opportunitiesWithEvents: IOpportunityWithEvents[];
  loadEventResponsesCommunication: ICommunication;
  eventResponses: IEventResponsesResponse[];
}

interface IActionProps {
  deleteEvent: typeof actions.deleteEvent;
  requestEditEvent: typeof actions.requestEditEvent;
  loadEventResponses: typeof actions.loadEventResponses;
  resetEventResponses: typeof actions.resetEventResponses;
}

type TProps = IOwnProps & IStateProps & IActionProps;

class NpoEventPopperContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      deleteEventCommunication: selectors.selectCommunication(state, 'deleteEvent'),
      opportunitiesWithEvents: selectors.selectOpportunitiesWithEvents(state),
      loadEventResponsesCommunication: selectors.selectCommunication(state, 'loadEventResponses'),
      eventResponses: selectors.selectCurrentEventResponses(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      deleteEvent: actions.deleteEvent,
      requestEditEvent: actions.requestEditEvent,
      loadEventResponses: actions.loadEventResponses,
      resetEventResponses: actions.resetEventResponses,
    }, dispatch);
  }

  public componentDidMount() {
    this.props.loadEventResponses(this.props.event.id);
  }

  public componentDidUpdate(prevProps: TProps) {
    if (prevProps.deleteEventCommunication.isRequesting && this.props.deleteEventCommunication.isLoaded) {
      this.props.onClose();
    }
  }

  public componentWillUnmount() {
    this.props.resetEventResponses();
  }

  public render() {
    const { event, paletteIndex, loadEventResponsesCommunication, eventResponses } = this.props;
    return (
      <EventPopperComponent
        event={event}
        paletteIndex={paletteIndex}
        loadEventResponsesCommunication={loadEventResponsesCommunication}
        eventResponses={eventResponses}
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
