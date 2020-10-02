import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IInvitedMember, IOrganizationMembersResponse } from 'shared/types/responses/volunteer';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { Button, Preloader } from 'shared/view/elements';
import { ErrorScreen, SearchInput } from 'shared/view/components';
import { NpoVolunteersTable } from '../../components';

import './NpoVolunteersContainer.scss';

interface IStateProps {
	loadOrganizationMembersCommunication: ICommunication;
	organizationMembers: IOrganizationMembersResponse | null;
}

interface IActionProps {
	loadOrganizationMembers: typeof actions.loadOrganizationMembers;
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
			loadOrganizationMembersCommunication: selectors.selectCommunication(state, 'loadOrganizationMembers'),
			organizationMembers: selectors.selectOrganizationMembers(state),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				loadOrganizationMembers: actions.loadOrganizationMembers,
				showInviteTeamMembersModal: actions.showInviteTeamMembersModal,
			},
			dispatch,
		);
	}

	public state: IState = {
		currentFilter: null,
	};

	public componentDidMount() {
		this.props.loadOrganizationMembers();
	}

	public render() {
		const { translate: t, organizationMembers, loadOrganizationMembersCommunication } = this.props;
		return (
			<div className={b()}>
				<Preloader isShow={loadOrganizationMembersCommunication.isRequesting} position="relative" size={14}>
					{Boolean(loadOrganizationMembersCommunication.error) && (
						<ErrorScreen
							title={t('NPO-VOLUNTEER-CONTAINER:ERROR:TITLE')}
							message={loadOrganizationMembersCommunication.error!}
						/>
					)}
					{Boolean(organizationMembers) && this.renderOrganizationMembers(organizationMembers!)}
				</Preloader>
			</div>
		);
	}

	@bind
	private renderOrganizationMembers(organizationMembers: IOrganizationMembersResponse) {
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
					<NpoVolunteersTable allMembers={organizationMembers.invited} filteredMembers={this.members} />
				</div>
			</div>
		);
	}

	private get members(): IInvitedMember[] {
		const { currentFilter } = this.state;
		const { organizationMembers } = this.props;

		if (organizationMembers) {
			if (!currentFilter) {
				return organizationMembers.invited;
			}

			const lowerValue = currentFilter.toLowerCase();
			return organizationMembers.invited.filter((member) => {
				return `${member.firstName}${member.lastName}`.toLowerCase().indexOf(lowerValue) >= 0;
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
