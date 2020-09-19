import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Modal } from 'services/modal';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Image, Error } from 'shared/view/elements';
import { UserAvatar } from 'shared/view/components';
import { ICommunication } from 'shared/types/redux';

import './InviteOrganizationModal.scss';

interface IOwnProps {
	acceptCommunication: ICommunication;
	declineCommunication: ICommunication;
	organization: IOrganizationsResponseItem;
	onClose(): void;
	onAccept(): void;
	onDecline(): void;
}

const b = block('invite-organization-modal');

type TProps = IOwnProps & ITranslateProps;

class InviteOrganizationModal extends React.PureComponent<TProps> {
	public render() {
		const { translate: t, organization } = this.props;
		return (
			<Modal isOpen disablePadding onClose={this.props.onClose}>
				<div className={b()}>
					<div className={b('top')}>
						<div className={b('avatar')}>{this.renderAvatar()}</div>
						<div className={b('content')}>
							<div className={b('content-header')}>
								{t('INVITE-ORGANIZATION-MODAL:STATIC:TITLE', {
									name: organization.name,
								})}
							</div>
							<div className={b('content-body')}>
								{t('INVITE-ORGANIZATION-MODAL:STATIC:BODY', {
									name: organization.name,
								})}
							</div>
						</div>
					</div>

					{this.renderError()}

					<div className={b('bottom')}>
						<Button
							color="grey"
							isShowPreloader={this.props.declineCommunication.isRequesting}
							onClick={this.props.onDecline}
						>
							{t('INVITE-ORGANIZATION-MODAL:ACTION:DECLINE')}
						</Button>
						<Button
							color="blue"
							isShowPreloader={this.props.acceptCommunication.isRequesting}
							onClick={this.props.onAccept}
						>
							{t('INVITE-ORGANIZATION-MODAL:ACTION:ACCEPT-INVITATION')}
						</Button>
					</div>
				</div>
			</Modal>
		);
	}

	@bind
	private renderAvatar() {
		const { organization } = this.props;

		if (organization.profilePicture) {
			return <Image src={organization.profilePicture} />;
		}

		return <UserAvatar firstName={organization.name} />;
	}

	@bind
	private renderError() {
		const { acceptCommunication, declineCommunication } = this.props;

		if (acceptCommunication.error) {
			return (
				<div className={b('error')}>
					<Error>{acceptCommunication.error}</Error>
				</div>
			);
		}

		if (declineCommunication.error) {
			return (
				<div className={b('error')}>
					<Error>{declineCommunication.error}</Error>
				</div>
			);
		}
	}
}

export default i18nConnect<IOwnProps>(InviteOrganizationModal);
