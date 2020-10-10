import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import moment from 'moment';
import { IInvitedVolunteerResponseItem, IWithOpportunity, IAbstractVolunteer } from 'shared/types/responses/npo';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Image, Link } from 'shared/view/elements';
import { UserAvatar } from 'shared/view/components';
import { defaultDateLongFormat } from 'shared/types/app';
import routes from 'modules/routes';

import './NpoVolunteersTable.scss';

interface IOwnProps {
	allVolunteers: IWithOpportunity<IAbstractVolunteer>[];
	filteredVolunteers: IWithOpportunity<IAbstractVolunteer>[];
}

const b = block('npo-volunteers-table');

type TProps = IOwnProps & ITranslateProps;

class NpoVolunteersTable extends React.PureComponent<TProps> {
	public render() {
		const { translate: t, filteredVolunteers } = this.props;
		return (
			<div className={b()}>
				<table className={b('table')} cellPadding={0} cellSpacing={0}>
					<thead>
						<tr className={b('table-head-row')}>
							<th>{t('NPO-VOLUNTEERS-TABLE:HEADER:VOLUNTEER')}</th>
							<th>{t('NPO-VOLUNTEERS-TABLE:HEADER:OPPORTUNITY')}</th>
							<th>{t('NPO-VOLUNTEERS-TABLE:HEADER:STARTING-DATE')}</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{filteredVolunteers.map(this.renderRow)}</tbody>
				</table>
			</div>
		);
	}

	@bind
	private renderRow(volunteer: IWithOpportunity<IInvitedVolunteerResponseItem>, index: number) {
		return (
			<tr className={b('table-row')} key={`row-${index}`}>
				<td>
					<Link href={`${routes.dashboard.organization.profile.view.getPath()}/${volunteer.id}`}>
						{this.renderUser(volunteer)}
					</Link>
				</td>
				<td>{volunteer.opportunity.title}</td>
				<td>{moment(volunteer.joinedAt).format(defaultDateLongFormat)}</td>
				<td>{this.renderActions(volunteer)}</td>
			</tr>
		);
	}

	@bind
	private renderUser(volunteer: IWithOpportunity<IInvitedVolunteerResponseItem>) {
		return (
			<div className={b('user')}>
				<div className={b('user-avatar')}>{this.renderUserAvatar(volunteer)}</div>
				<div className={b('user-name')}>
					{volunteer.firstName} {volunteer.lastName}
				</div>
			</div>
		);
	}

	@bind
	private renderUserAvatar(volunteer: IWithOpportunity<IInvitedVolunteerResponseItem>) {
		if (volunteer.profilePicture) {
			return <Image src={volunteer.profilePicture} />;
		}

		return <UserAvatar firstName={volunteer.firstName} lastName={volunteer.lastName} />;
	}

	@bind
	private renderActions(volunteer: IWithOpportunity<IInvitedVolunteerResponseItem>) {
		const { translate: t } = this.props;
		return (
			<div className={b('actions')}>
				<Button color="grey">{t('NPO-MEMBER-TABLE:ACTION:MESSAGE')}</Button>
			</div>
		);
	}
}

export default i18nConnect<IOwnProps>(NpoVolunteersTable);
