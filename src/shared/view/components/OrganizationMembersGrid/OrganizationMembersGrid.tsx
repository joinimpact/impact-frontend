import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IMember } from 'shared/types/responses/volunteer';
import { Image } from 'shared/view/elements';
import { UserAvatar } from 'shared/view/components/index';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './OrganizationMembersGrid.scss';

interface IOwnProps {
	members: IMember[];
	onViewUser(userId: string): void;
}

const b = block('organization-members-grid');

type TProps = IOwnProps & ITranslateProps;

class OrganizationMembersGrid extends React.PureComponent<TProps> {
	public render() {
		const { members } = this.props;
		return <div className={b()}>{members.map(this.renderMember)}</div>;
	}

	@bind
	private renderMember(member: IMember, index: number) {
		return (
			<div className={b('member')} onClick={this.props.onViewUser.bind(this, member.id)} key={`member-${index}`}>
				<div className={b('member-avatar')}>
					{Boolean(member.profilePicture) ? (
						<Image src={member.profilePicture} />
					) : (
						<UserAvatar firstName={member.firstName} lastName={member.lastName} />
					)}
				</div>
				<div className={b('member-name')}>
					{member.firstName} {member.lastName}
				</div>
				<div className={b('member-type')}>{this.accessTypeLabel(member.permissionsFlag)}</div>
			</div>
		);
	}

	@bind
	private accessTypeLabel(flag: number) {
		const { translate: t } = this.props;
		switch (flag) {
			case 0:
				return t('ORGANIZATION-MEMBERS-GRID:LABEL:MANAGER');
			case 1:
				return t('ORGANIZATION-MEMBERS-GRID:LABEL:ADMIN');
			case 2:
				return t('ORGANIZATION-MEMBERS-GRID:LABEL:CREATOR');
		}

		return null;
	}
}

export default i18nConnect<IOwnProps>(OrganizationMembersGrid);
