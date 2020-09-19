import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IMember } from 'shared/types/responses/volunteer';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { memberRoles, TRoleType } from 'shared/types/app';
import { Button, Image, Link } from 'shared/view/elements';
import { UserAvatar } from 'shared/view/components';
import routes from 'modules/routes';

import './NpoMembersTable.scss';

interface IOwnProps {
	allMembers: IMember[];
	filteredMembers: IMember[];
}

const b = block('npo-members-table');

type TProps = IOwnProps & ITranslateProps;

class NpoMembersTable extends React.PureComponent<TProps> {
	public render() {
		const { translate: t, filteredMembers } = this.props;
		return (
			<div className={b()}>
				<table className={b('table')} cellPadding={0} cellSpacing={0}>
					<thead>
						<tr className={b('table-head-row')}>
							<th>{t('NPO-MEMBER-TABLE:HEADER:MEMBER')}</th>
							<th>{t('NPO-MEMBER-TABLE:HEADER:ROLE')}</th>
							<th>{t('NPO-MEMBER-TABLE:HEADER:INVITED-BY')}</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{filteredMembers.map(this.renderRow)}</tbody>
				</table>
			</div>
		);
	}

	@bind
	private renderRow(member: IMember, index: number) {
		const { translate: t } = this.props;
		const inviterMember = this.getMemberById(member.inviterId);
		return (
			<tr className={b('table-row')} key={`row-${index}`}>
				<td>
					<Link href={`${routes.dashboard.organization.profile.view.getPath()}/${member.id}`}>
						{this.renderUser(member)}
					</Link>
				</td>
				<td>{this.roleTypeToLabel(memberRoles[member.permissionsFlag])}</td>
				<td>
					{`${member.inviterId}` !== '0' ? (
						<>
							{
								Boolean(inviterMember) ? this.renderUser(inviterMember!) : member.inviterId // Unknown user...
							}
						</>
					) : (
						t('NPO-MEMBER-TABLE:ROLE:CREATED-ORGANIZATION')
					)}
				</td>
				<td>{this.renderActions(member)}</td>
			</tr>
		);
	}

	@bind
	private renderUser(member: IMember) {
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
	private getMemberById(memberId: string): IMember | undefined {
		return this.props.allMembers.find((member) => member.id === memberId);
	}

	@bind
	private renderUserAvatar(member: IMember) {
		if (member.profilePicture) {
			return <Image src={member.profilePicture} />;
		}

		return <UserAvatar firstName={member.firstName} lastName={member.lastName} />;
	}

	@bind
	private renderActions(member: IMember) {
		const { translate: t } = this.props;
		return (
			<div className={b('actions')}>
				<Button color="grey">{t('NPO-MEMBER-TABLE:ACTION:MESSAGE')}</Button>
			</div>
		);
	}

	@bind
	private roleTypeToLabel(role: TRoleType) {
		const { translate: t } = this.props;
		switch (role) {
			case 'manager':
				return t('NPO-MEMBER-TABLE:LABEL:MANAGER');
			case 'admin':
				return t('NPO-MEMBER-TABLE:LABEL:ADMIN');
			case 'creator':
				return t('NPO-MEMBER-TABLE:LABEL:CREATOR');
		}

		return null;
	}
}

export default i18nConnect<IOwnProps>(NpoMembersTable);
