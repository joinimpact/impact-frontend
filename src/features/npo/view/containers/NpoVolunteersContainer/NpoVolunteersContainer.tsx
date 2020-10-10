import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { Button, Preloader } from 'shared/view/elements';
import { ErrorScreen, SearchInput } from 'shared/view/components';
import { NpoVolunteersTable } from '../../components';

import './NpoVolunteersContainer.scss';
import { IOrganizationVolunteersResponse, IWithOpportunity, IAbstractVolunteer } from 'shared/types/responses/npo';

interface IStateProps {
	loadOrganizationVolunteersCommunication: ICommunication;
	organizationVolunteers: IOrganizationVolunteersResponse | null;
}

interface IActionProps {
	loadOrganizationVolunteers: typeof actions.loadOrganizationVolunteers;
	showInviteTeamMembersModal: typeof actions.showInviteTeamMembersModal;
}

interface IState {
	currentFilter: string | null;
}

const b = block('npo-volunteer-container');

type TProps = IStateProps & IActionProps & ITranslateProps;

class NpoVolunteersContainer extends React.PureComponent<TProps, IState> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			loadOrganizationVolunteersCommunication: selectors.selectCommunication(state, 'loadOrganizationVolunteers'),
			organizationVolunteers: selectors.selectOrganizationVolunteers(state),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				loadOrganizationVolunteers: actions.loadOrganizationVolunteers,
				showInviteTeamMembersModal: actions.showInviteTeamMembersModal,
			},
			dispatch,
		);
	}

	public state: IState = {
		currentFilter: null,
	};

	public componentDidMount() {
		console.log('Hello world');
		this.props.loadOrganizationVolunteers();
	}

	public render() {
		const { translate: t, organizationVolunteers, loadOrganizationVolunteersCommunication } = this.props;
		return (
			<div className={b()}>
				<Preloader isShow={loadOrganizationVolunteersCommunication.isRequesting} position="relative" size={14}>
					{Boolean(loadOrganizationVolunteersCommunication.error) && (
						<ErrorScreen
							title={t('NPO-VOLUNTEER-CONTAINER:ERROR:TITLE')}
							message={loadOrganizationVolunteersCommunication.error!}
						/>
					)}
					{Boolean(organizationVolunteers) && this.renderOrganizationVolunteers(organizationVolunteers!)}
				</Preloader>
			</div>
		);
	}

	@bind
	private renderOrganizationVolunteers(organizationVolunteers: IOrganizationVolunteersResponse) {
		const { translate: t } = this.props;
		return (
			<div className={b('content')}>
				<div className={b('top-bar')}>
					<div className={b('top-bar-title')}>{t('NPO-VOLUNTEERS-CONTAINER:STATIC:TITLE')}</div>
					<div className={b('top-bar-actions')}>
						<Button color="blue" onClick={this.handleShowInviteTeamMembersModal}>
							{t('NPO-VOLUNTEERS-CONTAINER:ACTIONS:INVITE-VOLUNTEERS')}
						</Button>
					</div>
				</div>
				<div className={b('search-bar')}>
					<SearchInput
						withSearchIcon
						placeholder={t('NPO-VOLUNTEERS-CONTAINER:PLACEHOLDER:SEARCH-VOLUNTEERS')}
						onSearchRequested={this.handleSearchRequested}
					/>
				</div>
				<div className={b('volunteers-table')}>
					<NpoVolunteersTable allVolunteers={organizationVolunteers.volunteers} filteredVolunteers={this.volunteers} />
				</div>
			</div>
		);
	}

	private get volunteers(): IWithOpportunity<IAbstractVolunteer>[] {
		const { currentFilter } = this.state;
		const { organizationVolunteers } = this.props;

		if (organizationVolunteers) {
			if (!currentFilter) {
				return organizationVolunteers.volunteers;
			}

			const lowerValue = currentFilter.toLowerCase();
			return organizationVolunteers.volunteers.filter((volunteer) => {
				return `${volunteer.firstName}${volunteer.lastName}`.toLowerCase().indexOf(lowerValue) >= 0;
			});
		}

		return [];
	}

	@bind
	private handleSearchRequested(value: string | null) {
		this.setState({ currentFilter: value });
	}

	@bind
	private handleShowInviteTeamMembersModal() {
		this.props.showInviteTeamMembersModal();
	}
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
	NpoVolunteersContainer.mapStateToProps,
	NpoVolunteersContainer.mapDispatch,
)(NpoVolunteersContainer);
export default i18nConnect<{}>(withRedux);
