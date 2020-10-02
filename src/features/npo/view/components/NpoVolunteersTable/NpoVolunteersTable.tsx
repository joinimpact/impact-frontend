import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import moment from 'moment';
import { IInvitedMember } from 'shared/types/responses/volunteer';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Image, Link } from 'shared/view/elements';
import { UserAvatar } from 'shared/view/components';
import { defaultDateLongFormat } from 'shared/types/app';
import routes from 'modules/routes';

import './NpoVolunteersTable.scss';

interface IOwnProps {
	allMembers: IInvitedMember[];
	filteredMembers: IInvitedMember[];
}

const b = block('npo-volunteers-table');

type TProps = IOwnProps & ITranslateProps;

class NpoVolunteersTable extends React.PureComponent<TProps> {
	public render() {
		const { translate: t, filteredMembers } = this.props;
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
					<tbody>{filteredMembers.map(this.renderRow)}</tbody>
				</table>
			</div>
		);
	}

	@bind
	private renderRow(member: IInvitedMember, index: number) {
		return (
			<tr className={b('table-row')} key={`row-${index}`}>
				<td>
					<Link href={`${routes.dashboard.organization.profile.view.getPath()}/${member.id}`}>
						{this.renderUser(member)}
					</Link>
				</td>
				<td>{member.Organization.name}</td>
				<td>{moment(member.createdAt).format(defaultDateLongFormat)}</td>
				<td>{this.renderActions(member)}</td>
			</tr>
		);
	}

	@bind
	private renderUser(member: IInvitedMember) {
		return (
			<div className={b('user')}>
				<div className={b('user-avatar')}>{this.renderUserAvatar(member)}</div>
				<div className={b('user-name')}>
					{member.firstName} {member.lastName}
				</div>
			</div>
		);
	}

	@bind
	private renderUserAvatar(member: IInvitedMember) {
		if (member.profilePicture) {
			return <Image src={member.profilePicture} />;
		}

		return <UserAvatar firstName={member.firstName} lastName={member.lastName} />;
	}

	@bind
	private renderActions(member: IInvitedMember) {
		const { translate: t } = this.props;
		return (
			<div className={b('actions')}>
				<Button color="grey">{t('NPO-MEMBER-TABLE:ACTION:MESSAGE')}</Button>
			</div>
		);
	}
}

export default i18nConnect<IOwnProps>(NpoVolunteersTable);
