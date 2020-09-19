import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import moment from 'moment';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IUser } from 'shared/types/models/user';
import { selectors as userSelectors } from 'services/user';
import { IAppReduxState } from 'shared/types/app';
import { Button, Preloader } from 'shared/view/elements';
import { ThisWeekTasksComponent, TodayTasksComponent } from 'features/volunteer/view/components';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { OpportunitiesGrid } from 'shared/view/components';
import { IEvent } from 'shared/types/models/events';
import { $moment } from 'shared/helpers/moment';
import { $event } from 'shared/helpers/events';
import { UserEventPopperContainer } from 'features/volunteer/view/containers/index';
import { IMenuContentProps } from 'shared/view/elements/Menu/Menu';

import './UserHomeContainer.scss';

interface IOwnProps {
	onViewOpportunityClicked(opportunityId: string): void;
	onGoToViewOpportunities(): void;
	onGoToViewCalendar(): void;
}

interface IStateProps {
	currentUser: IUser | null;
	loadEnrolledOpportunitiesCommunication: ICommunication;
	currentEnrolledOpportunities: IOpportunityResponse[];
	loadUserEventsCommunication: ICommunication;
	userEvents: IEvent[];
}

interface IActionProps {
	loadEnrolledOpportunities: typeof actions.loadEnrolledOpportunities;
	loadUserEvents: typeof actions.loadUserEvents;
}

const b = block('user-home-container');

type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;

class UserHomeContainer extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			currentUser: userSelectors.selectCurrentUser(state),
			loadEnrolledOpportunitiesCommunication: selectors.selectCommunication(state, 'loadUserEnrolledOpportunities'),
			currentEnrolledOpportunities: selectors.selectCurrentEnrolledOpportunities(state),
			loadUserEventsCommunication: selectors.selectCommunication(state, 'loadUserEvents'),
			userEvents: selectors.selectUserEvents(state),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				loadEnrolledOpportunities: actions.loadEnrolledOpportunities,
				loadUserEvents: actions.loadUserEvents,
			},
			dispatch,
		);
	}

	public componentDidMount() {
		this.props.loadEnrolledOpportunities();
		this.props.loadUserEvents();
	}

	public render() {
		const {
			translate: t,
			currentUser,
			loadEnrolledOpportunitiesCommunication,
			currentEnrolledOpportunities,
			loadUserEventsCommunication,
		} = this.props;
		// console.log('currentRecommendOpportunities: ', this.props.currentRecommendOpportunities);

		return (
			<div className={b()}>
				<div className={b('top-pane')}>
					<div className={b('top-pane-title')}>
						{t('USER-HOME-CONTAINER:TOP:TITLE', {
							name: (
								<span key="name" className={b('top-pane-user-name')}>
									{currentUser!.firstName}
								</span>
							),
						})}
					</div>
					<div className={b('top-pane-spent-time-notify')}>{this.renderSpentTimeNotify()}</div>
				</div>
				<div className={b('events')}>
					<div className={b('events-top')}>
						<div className={b('events-top-title')}>{t('USER-HOME-CONTAINER:STATIC:UPCOMING-EVENTS')}</div>
						<div className={b('events-top-actions')}>
							<Button color="blue" onClick={this.props.onGoToViewCalendar}>
								{t('USER-HOME-CONTAINER:BUTTON:VIEW-CALENDAR')}
							</Button>
						</div>
					</div>
					<div className={b('events-body')}>
						<Preloader isShow={loadUserEventsCommunication.isRequesting} position="relative" size={14}>
							<TodayTasksComponent todayTasks={this.todayEvents} renderEventPopper={this.renderEventPopper} />
							<ThisWeekTasksComponent
								weekEvents={this.thisWeekEvents}
								onViewTaskClicked={this.props.onViewOpportunityClicked}
								renderEventPopper={this.renderEventPopper}
							/>
						</Preloader>
					</div>
				</div>
				<div className={b('enrolled-opportunities')}>
					<div className={b('enrolled-opportunities-top')}>
						<div className={b('enrolled-opportunities-top-title')}>
							{t('USER-HOME-CONTAINER:STATIC:MY-ENROLLED-OPPORTUNITIES')}
						</div>
						<div className={b('enrolled-opportunities-top-actions')}>
							<Button color="blue" onClick={this.props.onGoToViewOpportunities}>
								{t('USER-HOME-CONTAINER:BUTTON:VIEW-OPPORTUNITIES')}
							</Button>
						</div>
					</div>
					<div className={b('enrolled-opportunities-content')}>
						<Preloader isShow={loadEnrolledOpportunitiesCommunication.isRequesting} position="relative" size={14}>
							<OpportunitiesGrid
								viewOnClick
								opportunities={currentEnrolledOpportunities}
								onViewOpportunity={this.handleViewOpportunity}
							/>
						</Preloader>
					</div>
				</div>
			</div>
		);
	}

	@bind
	private renderEventPopper(event: IEvent, props: IMenuContentProps) {
		return <UserEventPopperContainer readonly event={event} paletteIndex={0} onClose={props.close} />;
	}

	@bind
	private renderSpentTimeNotify() {
		const { translate: t } = this.props;
		return (
			<div className={b('spent-time')}>
				<div className={b('spent-time-hours')}>
					23 <i className="zi zi-checkmark" />
				</div>
				<div className={b('spent-time-title')}>{t('USER-HOME-CONTAINER:TOP:SPENT-TIME-TITLE')}</div>
			</div>
		);
	}

	@bind
	private handleViewOpportunity(opportunity: IOpportunityResponse) {
		this.props.onViewOpportunityClicked(opportunity.id);
	}

	private get todayEvents(): IEvent[] {
		const { userEvents } = this.props;
		const res: IEvent[] = [];
		const today = moment().startOf('day');

		for (const event of userEvents) {
			if ($moment(today).inRange(event.schedule.from, event.schedule.to)) {
				res.push(event);
			}
		}
		return res;
	}

	private get thisWeekEvents(): IEvent[] {
		const { userEvents } = this.props;
		const startOfWeek = moment().startOf('week').startOf('day');
		const endOfWeek = moment().endOf('week').endOf('day');
		const res: IEvent[] = [];

		for (const event of userEvents) {
			if ($event(event).inRange(startOfWeek, endOfWeek)) {
				res.push(event);
			}
		}
		return res;
	}
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
	UserHomeContainer.mapStateToProps,
	UserHomeContainer.mapDispatch,
)(UserHomeContainer);
export default i18nConnect<IOwnProps>(withRedux);
