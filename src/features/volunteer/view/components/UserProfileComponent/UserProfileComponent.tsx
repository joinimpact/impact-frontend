import React from 'react';
import block from 'bem-cn';
import { IUser } from 'shared/types/models/user';
import { UserAvatar } from 'shared/view/components';
import { Button, Image } from 'shared/view/elements';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './UserProfileComponent.scss';

interface IOwnProps {
	user: IUser;
	onMessageClicked(): void;
}

const b = block('user-profile-component');

type TProps = IOwnProps & ITranslateProps;

class UserProfileComponent extends React.PureComponent<TProps> {
	public render() {
		const { user, translate: t } = this.props;
		return (
			<div className={b()}>
				<div className={b('logo')}>
					{user.avatarUrl ? (
						<Image src={user.avatarUrl} />
					) : (
						<UserAvatar firstName={user.firstName} lastName={user.lastName} />
					)}
				</div>
				<div className={b('name')}>
					{user.firstName} {user.lastName}
				</div>
				{Boolean(user.school) && <div className={b('school')}>{user.school}</div>}
				<div className={b('actions')}>
					<Button color="grey" onClick={this.props.onMessageClicked}>
						{t('SHARED:BUTTONS:MESSAGE')}
					</Button>
				</div>
			</div>
		);
	}
}

export default i18nConnect<IOwnProps>(UserProfileComponent);
