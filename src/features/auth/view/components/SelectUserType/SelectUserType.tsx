import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { TUserType } from 'shared/types/app';
import { Button, Radio } from 'shared/view/elements';

import './SelectUserType.scss';

interface IOwnProps {
	onUserTypeSelected(userType: TUserType): void;
}

interface IState {
	userType: TUserType | null;
}

const b = block('select-user-type');

type TProps = IOwnProps & ITranslateProps;

class SelectUserType extends React.PureComponent<TProps, IState> {
	public state: IState = {
		userType: null,
	};

	public render() {
		const { translate: t } = this.props;
		const { userType } = this.state;
		return (
			<div className={b()}>
				<div className={b('caption')}>{t('SIGN-UP-FORM-CONTAINER:STATIC:SELECT-USER-TYPE-CAPTION')}</div>
				<div className={b('cards')}>
					<div
						className={b('card', { selected: userType === 'volunteer' })}
						onClick={this.handleSelectUserType.bind(this, 'volunteer')}
					>
						<div className={b('card-title')}>{t('SELECT-USER-TYPE:CAPTION:VOLUNTEER')}</div>
						<div className={b('card-body')}>{t('SELECT-USER-TYPE:STATIC:VOLUNTEER-TEXT')}</div>
						<div className={b('card-action')}>
							<Radio
								checked={userType === 'volunteer'}
								type="circle"
								name={'select-user-type'}
								label={t('SELECT-USER-TYPE:STATIC:I-AM-A-VOLUNTEER')}
								onChange={this.handleSelectUserType.bind(this, 'volunteer')}
							/>
						</div>
					</div>
					<div
						className={b('card', { selected: userType === 'npo' })}
						onClick={this.handleSelectUserType.bind(this, 'npo')}
					>
						<div className={b('card-title')}>{t('SELECT-USER-TYPE:CAPTION:ORGANIZATION')}</div>
						<div className={b('card-body')}>{t('SELECT-USER-TYPE:STATIC:ORGANIZATION-TEXT')}</div>
						<div className={b('card-action')}>
							<Radio
								checked={userType === 'npo'}
								type="circle"
								name={'select-user-type'}
								label={t('SELECT-USER-TYPE:STATIC:I-AM-AN-ORGANIZATION')}
								onChange={this.handleSelectUserType.bind(this, 'npo')}
							/>
						</div>
					</div>
				</div>
				<div className={b('actions')}>
					<Button color="blue" disabled={userType == null} onClick={this.handleContinue}>
						{t('SHARED:BUTTONS:CONTINUE')}
					</Button>
				</div>
			</div>
		);
	}

	@bind
	private handleSelectUserType(userType: TUserType) {
		this.setState({
			userType,
		});
		// this.props.onUserTypeSelected(userType);
	}

	@bind
	private handleContinue() {
		this.props.onUserTypeSelected(this.state.userType!);
	}
}

export default i18nConnect<IOwnProps>(SelectUserType);
